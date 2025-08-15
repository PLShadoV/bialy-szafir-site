import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/herodron.jpg";
import heroImage2 from "@/assets/hero-beach.jpg";
import heroImage3 from "@/assets/hero-nature.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

const SlideshowHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      setProgress(0);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / 40); // 4000ms / 100ms = 40 steps
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
      
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

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-64 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-center mt-2 space-x-2">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlideshowHero;
