import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Crown, Bus, Clock } from "lucide-react";
import type { Service } from "@shared/schema";

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "fas fa-cut":
      return <Scissors className="text-white text-2xl" size={24} />;
    case "fas fa-crown":
      return <Crown className="text-white text-2xl" size={24} />;
    case "fas fa-user-tie":
      return <Bus className="text-white text-2xl" size={24} />;
    case "fas fa-scissors":
      return <Scissors className="text-white text-2xl" size={24} />;
    default:
      return <Scissors className="text-white text-2xl" size={24} />;
  }
};

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  if (isLoading) {
    return (
      <section id="uslugi" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-barbershop-primary mb-6">
              Nasze Usługi
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-gray-50 animate-pulse">
                <CardContent className="p-8">
                  <div className="bg-gray-300 w-16 h-16 rounded-full mb-6" />
                  <div className="h-6 bg-gray-300 rounded mb-4" />
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded mb-6" />
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-300 rounded w-16" />
                    <div className="h-4 bg-gray-300 rounded w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="uslugi" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-barbershop-primary mb-6">
            Nasze Usługi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferujemy pełen zakres usług fryzjerskich dla mężczyzn. Każda usługa wykonywana jest 
            z najwyższą precyzją i dbałością o szczegóły.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services?.map((service) => (
            <Card 
              key={service.id} 
              className="bg-gray-50 hover:shadow-xl transition-shadow group"
              data-testid={`service-card-${service.id}`}
            >
              <CardContent className="p-8">
                <div className="bg-barbershop-accent w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="font-poppins font-bold text-xl text-barbershop-primary mb-4">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-barbershop-accent" data-testid={`service-price-${service.id}`}>
                    {(service.price / 100).toFixed(0)} zł
                  </span>
                  <span className="text-gray-500 flex items-center" data-testid={`service-duration-${service.id}`}>
                    <Clock className="mr-1" size={16} />
                    {service.duration} min
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
