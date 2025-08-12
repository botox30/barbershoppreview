import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Barber } from "@shared/schema";

export default function About() {
  const { data: barbers, isLoading } = useQuery<Barber[]>({
    queryKey: ['/api/barbers'],
  });

  return (
    <section id="o-nas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-barbershop-primary mb-6">
              15 Lat Pasji<br />
              <span className="text-barbershop-accent">i Doświadczenia</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Barbershop Prestige to miejsce, gdzie tradycja spotyka się z nowoczesnością. 
              Od 2008 roku tworzymy niezapomniane doświadczenia dla mężczyzn ceniących jakość i styl.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nasz zespół składa się z doświadczonych mistrzów fryzjerstwa, którzy łączą 
              klasyczne techniki z najnowszymi trendami w stylizacji męskiej.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-gray-50">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-barbershop-accent mb-2" data-testid="stat-satisfied-customers">5000+</div>
                  <div className="text-gray-600">Zadowolonych Klientów</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-gray-50">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-barbershop-accent mb-2" data-testid="stat-years-experience">15+</div>
                  <div className="text-gray-600">Lat Doświadczenia</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700" 
              alt="Doświadczony fryzjer w pracy" 
              className="w-full rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-barbershop-accent text-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold" data-testid="google-rating">4.9★</div>
              <div className="text-sm">Ocena Google</div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="font-poppins font-bold text-3xl text-barbershop-primary mb-6">Nasz Zespół</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Poznaj naszych mistrzów fryzjerstwa, którzy z pasją i precyzją dbają o Twój wygląd.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gray-300" />
                <div className="h-6 bg-gray-300 rounded mx-auto mb-2 w-32" />
                <div className="h-4 bg-gray-300 rounded mx-auto mb-3 w-24" />
                <div className="h-4 bg-gray-300 rounded mx-auto w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {barbers?.map((barber) => (
              <div key={barber.id} className="text-center group" data-testid={`barber-card-${barber.id}`}>
                <img 
                  src={barber.imageUrl} 
                  alt={barber.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-barbershop-accent group-hover:scale-105 transition-transform"
                />
                <h4 className="font-poppins font-bold text-xl text-barbershop-primary mb-2" data-testid={`barber-name-${barber.id}`}>
                  {barber.name}
                </h4>
                <p className="text-barbershop-accent font-semibold mb-3" data-testid={`barber-title-${barber.id}`}>
                  {barber.title}
                </p>
                <p className="text-gray-600" data-testid={`barber-experience-${barber.id}`}>
                  {barber.experience}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
