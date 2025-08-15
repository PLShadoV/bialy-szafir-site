import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cottages.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Biały Szafir
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-white/90">
          Domki wczasowe nad morzem
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/80">
          Odkryj idealne miejsce na wakacje w Rusinowie. Komfortowe domki w otoczeniu lasu, 
          zaledwie 600 metrów od plaży Bałtyku. Ciesz się spokojem natury i bliskością morza.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3">
          Zarezerwuj teraz
        </Button>
      </div>
    </section>
  );
};

export default Hero;