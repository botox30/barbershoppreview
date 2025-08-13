export default function Gallery() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Nowoczesne strzyżenie męskie"
    },
    {
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Klasyczne narzędzia fryzjerskie"
    },
    {
      src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Stylizacja brody"
    },
    {
      src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Wnętrze barbershop"
    },
    {
      src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Klasyczny barbershop"
    },
    {
      src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Doświadczony fryzjer w pracy"
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-barbershop-primary mb-6">
            Galeria Naszych Prac
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zobacz przykłady naszych realizacji i przekonaj się o wysokiej jakości usług.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              data-testid={`gallery-image-${index}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            className="bg-barbershop-accent hover:bg-barbershop-warm text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            data-testid="button-view-more-gallery"
          >
            <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Zobacz Więcej Zdjęć
          </button>
        </div>
      </div>
    </section>
  );
}
