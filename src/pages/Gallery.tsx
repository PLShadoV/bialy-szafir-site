import Header from "@/components/Header";

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Galeria</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Zobacz nasze piękne domki letniskowe w malowniczym otoczeniu Rusinowa nad Bałtykiem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="feature-card rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Zdjęcie {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Domek {item}</h3>
                  <p className="text-sm text-muted-foreground">
                    Opis domku i jego wyposażenia
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;