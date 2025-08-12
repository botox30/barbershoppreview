import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Wiadomość wysłana!",
        description: "Skontaktujemy się z Tobą w najbliższym czasie.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Błąd",
        description: error.message || "Nie udało się wysłać wiadomości",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="kontakt" className="py-20 bg-barbershop-primary">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl mb-6">Skontaktuj Się z Nami</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Umów wizytę lub zadaj pytanie. Jesteśmy tutaj, aby pomóc Ci wyglądać najlepiej.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          <div className="text-white">
            <h3 className="font-poppins font-bold text-2xl mb-8">Informacje Kontaktowe</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-barbershop-accent w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adres</h4>
                  <p className="text-gray-300" data-testid="contact-address">ul. Główna 15, 00-001 Warszawa</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-barbershop-accent w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <p className="text-gray-300" data-testid="contact-phone">+48 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-barbershop-accent w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-300" data-testid="contact-email">kontakt@barbershopprestige.pl</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-barbershop-accent w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Godziny Otwarcia</h4>
                  <div className="space-y-1 text-gray-300">
                    <p data-testid="hours-weekdays">Pon - Pt: 9:00 - 19:00</p>
                    <p data-testid="hours-saturday">Sob: 9:00 - 17:00</p>
                    <p data-testid="hours-sunday">Nie: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-semibold mb-4">Znajdź Nas w Mediach Społecznościowych</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-barbershop-accent hover:bg-barbershop-warm w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  data-testid="social-facebook"
                >
                  <Facebook className="text-white" size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-barbershop-accent hover:bg-barbershop-warm w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  data-testid="social-instagram"
                >
                  <Instagram className="text-white" size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-barbershop-accent hover:bg-barbershop-warm w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                  data-testid="social-google"
                >
                  <svg className="text-white" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <Card className="bg-white">
            <CardContent className="p-8">
              <h3 className="font-poppins font-bold text-2xl text-barbershop-primary mb-6">Wyślij Wiadomość</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
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
                              data-testid="input-first-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-barbershop-primary font-semibold">Nazwisko</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Twoje nazwisko" 
                              {...field} 
                              data-testid="input-last-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-barbershop-primary font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="twoj@email.pl" 
                              {...field} 
                              data-testid="input-email"
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
                              type="tel" 
                              placeholder="+48 123 456 789" 
                              {...field} 
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-barbershop-primary font-semibold">Wiadomość</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5} 
                            placeholder="Twoja wiadomość..." 
                            {...field} 
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-barbershop-accent hover:bg-barbershop-warm text-white py-4 font-semibold"
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? (
                      <>Wysyłanie...</>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        Wyślij Wiadomość
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
