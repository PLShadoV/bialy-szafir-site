import routes from "@/seo/routes.json";
import { useLocation } from "react-router-dom";

interface PageHeroProps {
  title: string;
  description: string;
  backgroundImage: string;
}

const PageHero = ({ title, description, backgroundImage }: PageHeroProps) => {
  const { pathname } = useLocation();
  const hero = routes.find((route) => route.path === pathname.replace(/\/$/, ""))?.hero;
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <img src={hero ? `/media/${hero.file.replace(/\.jpg$/, "")}-1440.webp` : backgroundImage} srcSet={hero ? `/media/${hero.file.replace(/\.jpg$/, "")}-720.webp 720w, /media/${hero.file.replace(/\.jpg$/, "")}-1440.webp 1440w` : undefined} sizes="100vw" alt="" width={hero?.width} height={hero?.height} fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">{title}</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
