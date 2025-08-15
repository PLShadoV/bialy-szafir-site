import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Car, Utensils } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// 👉 automatyczne wczytanie obrazów (poza komponentem!)
const modules = import.meta.glob("@/assets/gallery/*.{jpg,jpeg,png,webp}", { eager: true });

type ImgEntry = { id: number; src: string; alt: string };

const galleryImages: ImgEntry[] = Object.entries(modules).map(([path, mod], idx) => {
  // @ts-ignore – Vite daje default z URL-em
  const url = (mod as { default?: string }).default ?? (mod as unknown as string);
  const filename = path.split("/").pop() || `photo-${idx + 1}`;
  const name = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  return { id: idx + 1, src: url, alt: `Zdjęcie: ${name}` };
});

// Jeśli chcesz tło w hero – podmień ścieżkę na istniejący plik:
import heroForest from "@/assets/hero-forest.jpg"; // lub usuń sekcję hero

const Gallery: React.FC = () => {
  useScrollToTop();

  // Lightbox
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

  // swipe mobile
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
    <div className="min-h-screen page-enter">
      <Header />
      <PageHero 
        title="Galeria"
        description="Zobacz nasze komfortowe domki letniskowe i piękne otoczenie w Rusinowie"
        backgroundImage={heroForest}
      />
      
      <main>
        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-primary text-center mb-12">Zdjęcia domków</h3>

            {total === 0 ? (
              <p className="text-center text-muted-foreground">
                Dodaj zdjęcia do <code>src/assets/gallery/</code> (jpg/png/webp), aby wyświetlić galerię.
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
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8 gradient-text">Nasze domki</h3>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Oferujemy komfortowe domki z pełnym wyposażeniem i dostępem do plaży w pięknej okolicy Rusinowa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Wifi className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Szybki internet WiFi</CardTitle>
                  <CardDescription>Bezpłatny dostęp do szybkiego internetu we wszystkich domkach</CardDescription>
                </CardHeader>
              </Card>

              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Car className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Parking prywatny</CardTitle>
                  <CardDescription>Każdy domek posiada własne miejsce parkingowe</CardDescription>
                </CardHeader>
              </Card>

              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Utensils className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Wyposażona kuchnia</CardTitle>
                  <CardDescription>Pełne wyposażenie kuchenne do przygotowywania posiłków</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Videos */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8 gradient-text">Filmy promocyjne</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative">
                  <span className="text-muted-foreground text-lg font-medium">Film promocyjny 1</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Prezentacja domków</h4>
                  <p className="text-sm text-muted-foreground">Sprawdź nasze piękne domki</p>
                </div>
              </div>

              <div className="feature-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative">
                  <span className="text-muted-foreground text-lg font-medium">Film promocyjny 2</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Okolica i atrakcje</h4>
                  <p className="text-sm text-muted-foreground">Odkryj piękno Rusinowa</p>
                </div>
              </div>
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
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
              onClick={close}
              aria-label="Zamknij"
            >
              ×
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Poprzednie zdjęcie"
            >
              ‹
            </button>

            <div className="max-w-6xl max-h-[85vh]">
              <img
                src={current.src}
                alt={current.alt}
                className="object-contain transition-transform"
                style={{ transform: `scale(${scale})` }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Następne zdjęcie"
            >
              ›
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
