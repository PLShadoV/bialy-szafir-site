import Header from "@/components/Header";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Gallery = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen page-enter">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-8 gradient-text">Galeria</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
            Zobacz nasze piękne domki letniskowe w malowniczym otoczeniu Rusinowa nad Bałtykiem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="feature-card rounded-xl overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative overflow-hidden">
                  <span className="text-muted-foreground text-lg font-medium">Zdjęcie {item}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2 text-lg">Domek {item}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Komfortowy domek z pełnym wyposażeniem dla {2 + item} osób
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