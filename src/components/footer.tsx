import { Scissors, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-barbershop-accent w-10 h-10 rounded-full flex items-center justify-center">
                <Scissors className="text-white" size={20} />
              </div>
              <h3 className="font-poppins font-bold text-xl">Barbershop Prestige</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Najlepszy barbershop w mieście. Profesjonalne usługi fryzjerskie dla wymagających mężczyzn.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="text-gray-400 hover:text-barbershop-accent transition-colors"
                data-testid="footer-facebook"
              >
                <svg className="text-xl w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-barbershop-accent transition-colors"
                data-testid="footer-instagram"
              >
                <svg className="text-xl w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.735-3.018-1.806-.285-.535-.285-1.171 0-1.706.57-1.071 1.721-1.806 3.018-1.806 1.297 0 2.448.735 3.018 1.806.285.535.285 1.171 0 1.706-.57 1.071-1.721 1.806-3.018 1.806z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-barbershop-accent transition-colors"
                data-testid="footer-google"
              >
                <svg className="text-xl w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-bold text-lg mb-6">Szybkie Linki</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-link-home"
                >
                  Strona Główna
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('uslugi')} 
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-link-services"
                >
                  Usługi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('galeria')} 
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-link-gallery"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('o-nas')} 
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-link-about"
                >
                  O Nas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('kontakt')} 
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-link-contact"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-bold text-lg mb-6">Usługi</h4>
            <ul className="space-y-3">
              <li><span className="text-gray-400">Klasyczne Strzyżenie</span></li>
              <li><span className="text-gray-400">Stylizacja Brody</span></li>
              <li><span className="text-gray-400">Pakiet Luksusowy</span></li>
              <li><span className="text-gray-400">Strzyżenie Dziecięce</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-bold text-lg mb-6">Kontakt</h4>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-center">
                <MapPin className="text-barbershop-accent mr-2" size={16} />
                ul. Główna 15, Warszawa
              </p>
              <p className="text-gray-400 flex items-center">
                <Phone className="text-barbershop-accent mr-2" size={16} />
                +48 123 456 789
              </p>
              <p className="text-gray-400 flex items-center">
                <Mail className="text-barbershop-accent mr-2" size={16} />
                kontakt@barbershopprestige.pl
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Barbershop Prestige. Wszystkie prawa zastrzeżone. | 
            <a href="#" className="hover:text-white transition-colors ml-1">Polityka Prywatności</a> | 
            <a href="#" className="hover:text-white transition-colors ml-1">Regulamin</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
