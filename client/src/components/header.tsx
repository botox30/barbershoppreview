import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Scissors, Calendar, Menu, X } from "lucide-react";
import BookingModal from "./booking-modal";

export default function Header() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-barbershop-primary shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-barbershop-accent w-10 h-10 rounded-full flex items-center justify-center">
              <Scissors className="text-white" size={20} />
            </div>
            <h1 className="text-white font-poppins font-bold text-2xl">Barbershop Prestige</h1>
          </div>
          
          <ul className="hidden md:flex space-x-8 text-white font-medium">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="hover:text-barbershop-accent transition-colors"
                data-testid="nav-home"
              >
                Strona Główna
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('uslugi')} 
                className="hover:text-barbershop-accent transition-colors"
                data-testid="nav-services"
              >
                Usługi
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('galeria')} 
                className="hover:text-barbershop-accent transition-colors"
                data-testid="nav-gallery"
              >
                Galeria
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('o-nas')} 
                className="hover:text-barbershop-accent transition-colors"
                data-testid="nav-about"
              >
                O Nas
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('kontakt')} 
                className="hover:text-barbershop-accent transition-colors"
                data-testid="nav-contact"
              >
                Kontakt
              </button>
            </li>
          </ul>
          
          <Button 
            className="hidden md:flex bg-barbershop-accent hover:bg-barbershop-warm text-white font-semibold"
            onClick={() => setIsBookingOpen(true)}
            data-testid="button-book-appointment"
          >
            <Calendar className="mr-2" size={16} />
            Umów Wizytę
          </Button>
          
          <button 
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-barbershop-primary border-t border-gray-700">
            <ul className="py-4 space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  data-testid="mobile-nav-home"
                >
                  Strona Główna
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('uslugi')} 
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  data-testid="mobile-nav-services"
                >
                  Usługi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('galeria')} 
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  data-testid="mobile-nav-gallery"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('o-nas')} 
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  data-testid="mobile-nav-about"
                >
                  O Nas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('kontakt')} 
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  data-testid="mobile-nav-contact"
                >
                  Kontakt
                </button>
              </li>
              <li className="px-4 py-2">
                <Button 
                  className="w-full bg-barbershop-accent hover:bg-barbershop-warm text-white font-semibold"
                  onClick={() => {
                    setIsBookingOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="mobile-button-book-appointment"
                >
                  <Calendar className="mr-2" size={16} />
                  Umów Wizytę
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
}
