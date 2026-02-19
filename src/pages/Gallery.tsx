import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Car, Utensils, Globe } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// 👉 automatyczne wczytanie obrazów
const modules = import.meta.glob("@/assets/gallery/*.{jpg,jpeg,png,webp}", { eager: true });

type ImgEntry = { id: number; src: string; alt: string };

const galleryImages: ImgEntry[] = Object.entries(modules).map(([path, mod], idx) => {
  const url = (mod as { default?: string }).default ?? (mod as unknown as string);
  const filename = path.split("/").pop() || `photo-${idx + 1}`;
  const name = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  return { id: idx + 1, src: url, alt: `Zdjęcie: ${name}` };
});

import heroForest from "@/assets/hero-forest.jpg";

const Gallery: React.FC = () => {
  useScrollToTop();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const total = galleryImages.length;
  const current = useMemo(() => galleryImages[index], [index]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
    setScale(1);
    document.body.style.overflow = "hidden";
  };

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    if (!total) return;
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (!total) return;
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.min(3, Math.max(0.5, s + delta)));
  };

  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) =>
    setTouchX(e.touches[0].clientX);
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 50) prev();
    if (dx < -50) next();
    setTouchX(null);
  };

  return (
    <div className="min-h-screen page-enter font-quicksand">
      <Header />
      <PageHero 
        title="Galeria"
        description="Zobacz nasze komfortowe domki letniskowe i piękne otoczenie w Rusinowie"
        backgroundImage={heroForest}
      />
      
      <main>
        {/* Gallery Grid */}
        <section className="py-16 bg-cozy-beige">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-primary text-center mb-12">Zdjęcia domków</h3>

            {total === 0 ? (
              <p className="text-center text-muted-foreground">
                Dodaj zdjęcia do <code>src/assets/gallery/</code>, aby wyświetlić galerię.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {galleryImages.map((image, i) => (
                  <button
                    key={image.id}
                    className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-ocean transition-all duration-300 aspect-square"
                    onClick={() => openAt(i)}
                    aria-label={`Otwórz podgląd: ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-cozy-cream">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8 gradient-text">Nasze domki</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4"><Wifi className="h-12 w-12 text-primary" /></div>
                  <CardTitle>Szybki internet WiFi</CardTitle>
                  <CardDescription>Bezpłatny dostęp do sieci</CardDescription>
                </CardHeader>
              </Card>
              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4"><Car className="h-12 w-12 text-primary" /></div>
                  <CardTitle>Parking prywatny</CardTitle>
                  <CardDescription>Własne miejsce parkingowe</CardDescription>
                </CardHeader>
              </Card>
              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4"><Utensils className="h-12 w-12 text-primary" /></div>
                  <CardTitle>Wyposażona kuchnia</CardTitle>
                  <CardDescription>Pełne zaplecze kuchenne</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16 bg-cozy-beige">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Filmy promocyjne</h3>
            
            {/* Main Video - Large */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="feature-card rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/jQCNl9kFRmc" 
                    title="Prezentacja domków" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 bg-white">
                  <h4 className="text-xl font-bold text-primary mb-2">Prezentacja główna</h4>
                  <p className="text-muted-foreground">Poznaj nasze domki i zobacz jak wyglądają z bliska.</p>
                </div>
              </div>
            </div>

            {/* Language Versions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { lang: "English", label: "Film w języku angielskim", url: "ADRES_YOUTUBE_EN" },
                { lang: "Deutsch", label: "Film w języku niemieckim", url: "ADRES_YOUTUBE_DE" },
                { lang: "Українська", label: "Film w języku ukraińskim", url: "ADRES_YOUTUBE_UA" },
                { lang: "Čeština", label: "Film w języku czeskim", url: "ADRES_YOUTUBE_CZ" }
              ].map((item, idx) => (
                <div key={idx} className="feature-card rounded-xl overflow-hidden bg-white shadow-md flex flex-col">
                  <div className="aspect-video bg-muted flex items-center justify-center relative group">
                    {/* Placeholder dla iframe / miniatury */}
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={item.url.includes("ADRES") ? "" : item.url} 
                      title={item.label}
                      className="bg-primary/5"
                    ></iframe>
                    {!item.url.includes("ADRES") ? null : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <Globe className="h-8 w-8 text-primary/40 mb-2" />
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.lang}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-100 mt-auto">
                    <h5 className="font-semibold text-sm mb-1">{item.label}</h5>
                    <p className="text-xs text-muted-foreground">Kliknij, aby obejrzeć</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox overlay */}
        {open && current && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={close}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
          >
            <button className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl" onClick={close}>&times;</button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-5xl" onClick={(e) => { e.stopPropagation(); prev(); }}>&#8249;</button>
            <div className="max-w-6xl max-h-[85vh]">
              <img
                src={current.src}
                alt={current.alt}
                className="object-contain transition-transform"
                style={{ transform: `scale(${scale})` }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-5xl" onClick={(e) => { e.stopPropagation(); next(); }}>&#8250;</button>
          </div>
        )}
      </main>
      <FloatingActions />
    </div>
  );
};

export default Gallery;