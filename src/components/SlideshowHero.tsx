import seoRoutes from "@/seo/routes.json";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/1.jpg";
import heroImage2 from "@/assets/herodron.jpg";
import heroImage3 from "@/assets/2.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

const SlideshowHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visited, setVisited] = useState([0]);

  useEffect(() => {
    setVisited((previous) => previous.includes(currentIndex) ? previous : [...previous, currentIndex]);
  }, [currentIndex]);

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
        >
          {visited.includes(index) && <img src={`/media/${["1", "herodron", "2"][index]}-1440.webp`} srcSet={`/media/${["1", "herodron", "2"][index]}-720.webp 720w, /media/${["1", "herodron", "2"][index]}-1440.webp 1440w`} sizes="100vw" alt="" width={[1536, 1920, 1024][index]} height={[1024, 653, 1024][index]}
            fetchPriority={index === 0 ? "high" : "low"} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {seoRoutes.find((route) => route.path === "/")!.h1}
        </h1>
        <p className="text-xl md:text-2xl mb-4 text-white/90">
          Domki wczasowe nad morzem
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/80">
          {seoRoutes[0].paragraphs[0]}
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3" asChild>
          <Link to="/rezerwacja">Zarezerwuj teraz</Link>
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
