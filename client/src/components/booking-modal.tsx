import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check, X, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertAppointmentSchema, type InsertAppointment, type Service, type Barber } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      serviceId: "",
      barberId: "",
      date: "",
      time: "",
      firstName: "",
      phone: "",
      email: "",
    },
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const { data: barbers } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });

  const { data: availability } = useQuery({
    queryKey: ['/api/availability', form.watch('barberId'), selectedDate],
    enabled: !!form.watch('barberId') && !!selectedDate,
  });

  const bookingMutation = useMutation({
    mutationFn: (data: InsertAppointment) => apiRequest("POST", "/api/appointments", data),
    onSuccess: () => {
      toast({
        title: "Wizyta zarezerwowana!",
        description: "Twoja wizyta została pomyślnie zarezerwowana.",
      });
      form.reset();
      setSelectedDate("");
      onClose();
      // Invalidate availability data
      queryClient.invalidateQueries({ queryKey: ['/api/availability'] });
    },
    onError: (error: any) => {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się zarezerwować wizyty",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAppointment) => {
    bookingMutation.mutate(data);
  };

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 7 : firstDay; // Convert Sunday from 0 to 7
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const isDateDisabled = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (year: number, month: number, day: number) => {
    if (isDateDisabled(year, month, day)) return;
    
    const dateStr = formatDate(year, month, day);
    setSelectedDate(dateStr);
    form.setValue('date', dateStr);
  };

  const handleTimeSelect = (time: string) => {
    form.setValue('time', time);
  };

  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 1; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-3" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day);
      const isDisabled = isDateDisabled(year, month, day);
      const isSelected = selectedDate === dateStr;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(year, month, day)}
          disabled={isDisabled}
          className={`
            p-3 text-center rounded-lg transition-colors
            ${isDisabled 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-barbershop-accent hover:text-white'
            }
            ${isSelected ? 'bg-barbershop-accent text-white' : ''}
          `}
          data-testid={`calendar-day-${day}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins font-bold text-3xl text-barbershop-primary flex items-center justify-between">
            Zarezerwuj Wizytę
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X size={24} />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-barbershop-primary font-semibold text-lg">
                        Wybierz Usługę
                      </FormLabel>
                      <div className="space-y-3">
                        {services?.map((service) => (
                          <label
                            key={service.id}
                            className={`
                              flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                              ${field.value === service.id ? 'border-barbershop-accent bg-barbershop-accent/5' : 'border-gray-300'}
                            `}
                          >
                            <input
                              type="radio"
                              value={service.id}
                              checked={field.value === service.id}
                              onChange={field.onChange}
                              className="mr-4 text-barbershop-accent"
                              data-testid={`service-option-${service.id}`}
                            />
                            <div className="flex-1">
                              <div className="font-semibold">{service.name}</div>
                              <div className="text-sm text-gray-600">
                                {service.duration} min • {(service.price / 100).toFixed(0)} zł
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-barbershop-primary font-semibold text-lg">
                        Wybierz Fryzjera
                      </FormLabel>
                      <div className="grid grid-cols-1 gap-3">
                        {barbers?.map((barber) => (
                          <label
                            key={barber.id}
                            className={`
                              flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                              ${field.value === barber.id ? 'border-barbershop-accent bg-barbershop-accent/5' : 'border-gray-300'}
                            `}
                          >
                            <input
                              type="radio"
                              value={barber.id}
                              checked={field.value === barber.id}
                              onChange={field.onChange}
                              className="mr-3 text-barbershop-accent"
                              data-testid={`barber-option-${barber.id}`}
                            />
                            <img
                              src={barber.imageUrl}
                              alt={barber.name}
                              className="w-12 h-12 rounded-full object-cover mr-3"
                            />
                            <div>
                              <div className="font-semibold">{barber.name}</div>
                              <div className="text-sm text-gray-600">{barber.title}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-barbershop-primary font-semibold">Imię</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Twoje imię" 
                            {...field} 
                            data-testid="input-booking-first-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-barbershop-primary font-semibold">Telefon</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+48 123 456 789" 
                            {...field} 
                            data-testid="input-booking-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-barbershop-primary font-semibold">
                        Email (opcjonalny)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="twoj@email.pl" 
                          {...field} 
                          data-testid="input-booking-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-barbershop-accent hover:bg-barbershop-warm text-white py-4 font-semibold"
                  disabled={bookingMutation.isPending || !selectedDate || !form.watch('time')}
                  data-testid="button-confirm-booking"
                >
                  {bookingMutation.isPending ? (
                    <>Rezerwowanie...</>
                  ) : (
                    <>
                      <Check className="mr-2" size={20} />
                      Potwierdź Rezerwację
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Calendar */}
          <div>
            <h3 className="font-poppins font-bold text-xl text-barbershop-primary mb-4">
              Wybierz Termin
            </h3>
            
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousMonth}
                data-testid="button-previous-month"
              >
                <ChevronLeft size={20} />
              </Button>
              <h4 className="font-semibold text-lg" data-testid="calendar-current-month">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextMonth}
                data-testid="button-next-month"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Pon</div>
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Wt</div>
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Śr</div>
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Czw</div>
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Pt</div>
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Sob</div>
              <div className="text-center p-2 text-sm font-semibold text-gray-600">Nie</div>
              
              {renderCalendar()}
            </div>
            
            {/* Time Slots */}
            {selectedDate && form.watch('barberId') && (
              <>
                <h4 className="font-semibold text-barbershop-primary mb-4">
                  Dostępne Godziny - {selectedDate}
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {availability?.map((slot: any) => (
                    <Button
                      key={slot.time}
                      variant={form.watch('time') === slot.time ? "default" : "outline"}
                      className={`
                        ${slot.available 
                          ? form.watch('time') === slot.time 
                            ? 'bg-barbershop-accent text-white' 
                            : 'hover:border-barbershop-accent hover:bg-barbershop-accent hover:text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }
                      `}
                      disabled={!slot.available}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      data-testid={`time-slot-${slot.time}`}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Info className="text-barbershop-accent mr-2" size={16} />
                      Zajęte terminy są oznaczone kolorem szarym i nie można ich zarezerwować.
                    </p>
                  </CardContent>
                </Card>
              </>
            )}

            {selectedDate && !form.watch('barberId') && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <p className="text-sm text-yellow-800 flex items-center">
                    <Info className="text-yellow-600 mr-2" size={16} />
                    Najpierw wybierz fryzjera, aby zobaczyć dostępne godziny.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
