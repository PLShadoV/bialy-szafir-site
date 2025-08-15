import { Button } from "@/components/ui/button";
import dogBeachImage from "@/assets/dog-beach.jpg";
import bikeForestImage from "@/assets/bike-forest.jpg";

const Activities = () => {
  return (
    <section className="py-20 section-bg">
      <div className="container mx-auto px-4">
        {/* Pet-friendly section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <img 
              src={dogBeachImage} 
              alt="Pies na plaży nad Bałtykiem - wakacje z czworonogiem w Rusinowie"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Pobyt z czworonogiem
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Akceptujemy zwierzęta po wcześniejszym zgłoszeniu. Wasze pupile muszą znajdować się 
              pod stałym nadzorem podczas całego pobytu. Zapewniamy przyjazne środowisko dla całej 
              rodziny, w tym dla waszych czworonożnych przyjaciół.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Plaża w Rusinowie jest idealna dla spacerów z psami. Szeroki pas piasku pozwala na 
              swobodną zabawę, a czyste powietrze i morska bryza sprawią, że Twój pies będzie 
              zachwycony wakacjami nad Bałtykiem.
            </p>
          </div>
        </div>

        {/* Cycling section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div>
            <img 
              src={bikeForestImage} 
              alt="Trasy rowerowe przez lasy w okolicy Rusinowa - aktywny wypoczynek"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Rowerem nad morzem
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Odkryj malownicze trasy rowerowe w okolicy Rusinowa. Przejażdżki wśród sosnowych lasów, 
              ścieżki nadmorskie i malownicze trasy łączące nasze miasteczko z sąsiednimi kurortami 
              zapewnią niezapomniane wrażenia.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Region Słowińskiego Parku Narodowego oferuje kilometry bezpiecznych ścieżek rowerowych. 
              Możesz dotrzeć do Jarosławca, Wici czy Darłowa, podziwiając po drodze unikalne krajobrazy 
              wydm i nadmorskich łąk.
            </p>
          </div>
        </div>

        {/* Location section */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-foreground">
            Najbliższa okolica Rusinowa
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nasze domki położone są w cichym miejscu przy lesie, który zaprasza na spokojne spacery 
            i kontakt z naturą. Znajdujemy się w pobliżu Jarosławca i Wici, co zapewnia dostęp do 
            dodatkowych atrakcji turystycznych i gastronomicznych.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Rusinowo to małe, spokojne miasteczko na polskim wybrzeżu Bałtyku, położone między 
            Darłowem a Jarosławcem. Dzięki położeniu w sercu Słowińskiego Parku Narodowego, oferuje 
            niepowtarzalny kontakt z przyrodą. W okolicy znajdziecie ruchome wydmy, jeziora nadmorskie, 
            latarnię morską w Darłowie oraz liczne szlaki piesze i rowerowe.
          </p>
          <Button variant="outline" size="lg">
            <a href="#kontakt">Dowiedz się więcej</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Activities;