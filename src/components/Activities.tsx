import { Button } from "@/components/ui/button";
import dogBeachImage from "@/assets/dog-beach.jpg";
import bikeForestImage from "@/assets/bike-forest.jpg";

const Activities = () => {
  return (
    <section className="py-20 bg-cozy-beige font-quicksand">
      <div className="container mx-auto px-4">
        {/* Pet-friendly section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <img
              src="/media/dog-beach-720.webp" srcSet="/media/dog-beach-720.webp 720w, /media/dog-beach-1440.webp 1440w" sizes="(min-width: 1024px) 50vw, 100vw" width={1200} height={800} loading="lazy" decoding="async"
              alt="Pies na plaży nad Bałtykiem - wakacje z czworonogiem w Rusinowie"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-4 text-cozy-charcoal">
              Pobyt z czworonogiem
            </h2>
            <p className="text-cozy-charcoal/80 mb-4 leading-relaxed">
              Akceptujemy zwierzęta po wcześniejszym zgłoszeniu. Wasze pupile muszą znajdować się
              pod stałym nadzorem podczas całego pobytu. Zapewniamy przyjazne środowisko dla całej
              rodziny, w tym dla waszych czworonożnych przyjaciół.
            </p>
            <p className="text-cozy-charcoal/80 leading-relaxed">
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
              src="/media/bike-forest-720.webp" srcSet="/media/bike-forest-720.webp 720w, /media/bike-forest-1440.webp 1440w" sizes="(min-width: 1024px) 50vw, 100vw" width={1200} height={800} loading="lazy" decoding="async"
              alt="Trasy rowerowe przez lasy w okolicy Rusinowa - aktywny wypoczynek"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-cozy-charcoal">
              Rowerem nad morzem
            </h2>
            <p className="text-cozy-charcoal/80 mb-4 leading-relaxed">
              Odkryj malownicze trasy rowerowe w okolicy Rusinowa. Przejażdżki wśród sosnowych lasów,
              ścieżki nadmorskie i malownicze trasy łączące nasze miasteczko z sąsiednimi kurortami
              zapewnią niezapomniane wrażenia.
            </p>
            <p className="text-cozy-charcoal/80 leading-relaxed">
              Przed wycieczką zapytaj nas o wskazówki dotyczące okolicy i zaplanuj trasę odpowiednią do swoich potrzeb.
            </p>
          </div>
        </div>

        {/* Location section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-cozy-charcoal">
            Najbliższa okolica Rusinowa
          </h2>
          <p className="text-cozy-charcoal/80 mb-6 leading-relaxed">
            Nasze domki położone są w cichym miejscu przy lesie, który zaprasza na spokojne spacery
            i kontakt z naturą. Znajdujemy się w pobliżu Jarosławca i Wici, co zapewnia dostęp do
            dodatkowych atrakcji turystycznych i gastronomicznych.
          </p>
          <p className="text-cozy-charcoal/80 mb-8 leading-relaxed">
            Biały Szafir znajduje się przy ul. Sosnowej 19 w Rusinowie. Skontaktuj się z nami, jeśli potrzebujesz wskazówek dojazdu lub dojścia do plaży.
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