import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Phone, CheckCircle } from "lucide-react";
import BookingModal from "./booking-modal";

export default function Hero() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="font-poppins font-bold text-5xl md:text-6xl mb-6 leading-tight">
                Profesjonalny<br />
                <span className="text-barbershop-accent">Barbershop</span>
              </h2>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Odkryj najlepszy barbershop w mieście. Oferujemy klasyczne i nowoczesne strzyżenia, 
                stylizację brody oraz profesjonalne usługi dla wymagających mężczyzn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-barbershop-accent hover:bg-barbershop-warm text-white font-semibold text-lg px-8 py-4"
                  onClick={() => setIsBookingOpen(true)}
                  data-testid="button-book-visit"
                >
                  <CheckCircle className="mr-2" size={20} />
                  Zarezerwuj Wizytę
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-barbershop-primary font-semibold text-lg px-8 py-4"
                  data-testid="button-call"
                >
                  <Phone className="mr-2" size={20} />
                  Zadzwoń: +48 123 456 789
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-barbershop-accent" data-testid="stat-experience">15+</div>
                  <div className="text-sm text-gray-300">Lat Doświadczenia</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-barbershop-accent" data-testid="stat-customers">5000+</div>
                  <div className="text-sm text-gray-300">Zadowolonych Klientów</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-barbershop-accent" data-testid="stat-rating">4.9</div>
                  <div className="text-sm text-gray-300">Ocena Google</div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <h3 className="font-poppins font-bold text-2xl text-barbershop-primary mb-6 text-center">
                  Szybka Rezerwacja
                </h3>
                
                <div className="space-y-4">
                  <p className="text-gray-600 text-center mb-6">
                    Kliknij poniżej, aby otworzyć pełny formularz rezerwacji z kalendarzem i dostępnymi terminami.
                  </p>
                  
                  <Button 
                    className="w-full bg-barbershop-accent hover:bg-barbershop-warm text-white py-4 font-semibold"
                    onClick={() => setIsBookingOpen(true)}
                    data-testid="button-open-booking-form"
                  >
                    <Calendar className="mr-2" size={20} />
                    Otwórz Formularz Rezerwacji
                  </Button>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-barbershop-primary mb-3">Popularne Usługi:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Klasyczne Strzyżenie - 60 zł</li>
                      <li>• Strzyżenie + Broda - 90 zł</li>
                      <li>• Pakiet Luksusowy - 120 zł</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
}
