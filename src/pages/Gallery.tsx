import variants from "@/seo/image-variants.json";
import PageContent from "@/seo/PageContent";
import imageDimensions from "@/seo/gallery-dimensions.json";
import seoRoutes from "@/seo/routes.json";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import { Globe } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// 👉 automatyczne wczytanie obrazów
const modules = import.meta.glob("@/assets/gallery/*.{jpg,jpeg,png,webp}", { eager: true });

type ImgEntry = { id: number; src: string; alt: string; width: number; height: number; group: string; small: string; large: string };

const galleryImages: ImgEntry[] = Object.entries(modules).map(([path, mod], idx) => {
  const url = (mod as { default?: string }).default ?? (mod as unknown as string);
  const filename = path.split("/").pop() || `photo-${idx + 1}`;
  const sizes = variants[filename as keyof typeof variants];
  return { id: idx + 1, src: url, small: sizes["360"], large: sizes["720"], ...imageDimensions[filename as keyof typeof imageDimensions] };
});

import heroForest from "@/assets/hero-forest.jpg";

// Start below-the-fold requests close to the viewport instead of the browser's
// generous native lazy-loading threshold. Full files are never prefetched for the lightbox.
function GalleryPhoto({ image }: { image: ImgEntry }) {
  const ref = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible || !ref.current) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);
  return <img ref={ref} src={visible ? image.small : undefined} srcSet={visible ? `${image.small} 360w, ${image.large} 720w` : undefined} sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" alt={image.alt}
    width={image.width} height={image.height} decoding="async"
    loading="lazy"
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />;
}

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
        title={seoRoutes.find((route) => route.path === "/galeria")!.h1}
        description={seoRoutes.find((route) => route.path === "/galeria")!.paragraphs[0]}
        backgroundImage={heroForest}
      />
      
      <main>
        {/* Gallery Grid */}
        <section className="py-16 bg-cozy-beige">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Zdjęcia domków</h2>
            <PageContent path="/galeria" sectionIndex={0} />

            {total === 0 ? (
              <p className="text-center text-muted-foreground">
                Dodaj zdjęcia do <code>src/assets/gallery/</code>, aby wyświetlić galerię.
              </p>
            ) : (
              <div className="space-y-12 mb-16">
                {["Otoczenie i tarasy", "Wnętrza domków"].map((group) => <section key={group}>
                <h3 className="text-2xl font-semibold text-primary mb-6">{group}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {galleryImages.filter((image) => image.group === group).map((image) => (
                  <figure key={image.id}>
                  <button
                    key={image.id}
                    className="group relative w-full overflow-hidden rounded-lg shadow-soft hover:shadow-ocean transition-all duration-300 aspect-square"
                    onClick={() => openAt(galleryImages.indexOf(image))}
                    aria-label={`Otwórz podgląd: ${image.alt}`}
                  >
                    <GalleryPhoto image={image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <figcaption className="text-sm text-muted-foreground mt-2">{image.alt}</figcaption>
                  </figure>
                ))}
                </div></section>)}
              </div>
            )}
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16 bg-cozy-beige">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Filmy z ośrodka</h2>
            <PageContent path="/galeria" sectionIndex={1} />
            
            {/* Main Video - Large */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="feature-card rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <iframe loading="lazy"
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/jQCNl9kFRmc" 
                    title="Prezentacja ośrodka Biały Szafir" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 bg-white text-center">
                  <h3 className="text-2xl font-bold text-primary mb-3">Prezentacja ośrodka Biały Szafir</h3>
                  <p className="text-muted-foreground text-lg">Poznaj nasze domki i zobacz, jak wyglądają z bliska.</p>
                </div>
              </div>
            </div>

            {/* Language Versions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { lang: "English", label: "Film w języku angielskim", url: "https://www.youtube.com/embed/xZh-FGzdwRU" },
                { lang: "Deutsch", label: "Film w języku niemieckim", url: "https://www.youtube.com/embed/4PGKNfEpsaU" },
                { lang: "Українська", label: "Film w języku ukraińskim", url: "https://www.youtube.com/embed/cXGtRpL3qJg" },
                { lang: "Čeština", label: "Film w języku czeskim", url: "https://www.youtube.com/embed/oTzryXOi2Y0" }
              ].map((item, idx) => (
                <div key={idx} className="feature-card rounded-xl overflow-hidden bg-white shadow-md flex flex-col">
                  <div className="aspect-video bg-muted">
                    <iframe loading="lazy"
                      width="100%" 
                      height="100%" 
                      src={item.url} 
                      title={item.label}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="bg-primary/5"
                    ></iframe>
                  </div>
                  <div className="p-4 border-t border-gray-100 mt-auto text-center">
                    <h3 className="font-semibold text-sm mb-1">{item.label}</h3>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                       <Globe className="h-3 w-3" />
                       <span>{item.lang}</span>
                    </div>
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
                width={current.width} height={current.height}
                decoding="async"
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
