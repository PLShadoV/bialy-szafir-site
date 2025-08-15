import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Star, MapPin, Users, Wifi, Car, Utensils } from "lucide-react";

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
          
          // ✅ Automatyczne wczytanie wszystkich obrazów z katalogu src/assets/gallery
//   (Vite + TS/JS). Dopuszczalne rozszerzenia: jpg, jpeg, png, webp.
const modules = import.meta.glob("@/assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

type ImgEntry = { id: number; src: string; alt: string };

// Zamieniamy mapę modułów na tablicę {id, src, alt}
const galleryImages: ImgEntry[] = Object.entries(modules).map(
  ([path, mod], idx) => {
    // @ts-ignore - Vite zwraca moduł z default URL
    const url = (mod as { default?: string }).default ?? (mod as unknown as string);
    const filename = path.split("/").pop() || `photo-${idx + 1}`;
    const name = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");

    return {
      id: idx + 1,
      src: url,
      alt: `Zdjęcie: ${name}`,
    };
  }
);

const Galeria = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---- Lightbox state/logic ----
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const total = galleryImages.length;
  const current = useMemo(() => galleryImages[index], [index]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
    setScale(1);
    document.body.style.overflow = "hidden"; // blokuje scroll tła
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

  // Klawiatura: ESC, strzałki
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

  // Zoom kółkiem
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.min(3, Math.max(0.5, s + delta)));
  };

  // Prosty swipe na mobile
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
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroForest})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Galeria
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
              Zobacz nasze komfortowe domki letniskowe i piękne otoczenie w Rusinowie
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              Zdjęcia domków
            </h2>

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

          {/* Features section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Nasze domki</h2>
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
                  <CardDescription>
                    Bezpłatny dostęp do szybkiego internetu we wszystkich domkach
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Car className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Parking prywatny</CardTitle>
                  <CardDescription>
                    Każdy domek posiada własne miejsce parkingowe
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Utensils className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Wyposażona kuchnia</CardTitle>
                  <CardDescription>
                    Pełne wyposażenie kuchenne do przygotowywania posiłków
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Promotional videos section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Filmy promocyjne</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative">
                  <span className="text-muted-foreground text-lg font-medium">Film promocyjny 1</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Prezentacja domków</h3>
                  <p className="text-sm text-muted-foreground">Sprawdź nasze piękne domki</p>
                </div>
              </div>
              
              <div className="feature-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative">
                  <span className="text-muted-foreground text-lg font-medium">Film promocyjny 2</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Okolica i atrakcje</h3>
                  <p className="text-sm text-muted-foreground">Odkryj piękno Rusinowa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
