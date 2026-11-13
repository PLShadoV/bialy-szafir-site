import { Link } from "react-router-dom";
import { Home, Users, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import routes from "./routes.json";

const icons = { home: Home, users: Users, map: MapPin, calendar: CalendarDays };
export default function PageContent({ path, sectionIndex }: { path: string; sectionIndex?: number }) {
  const route = routes.find((entry) => entry.path === path)!;
  const sections = sectionIndex === undefined ? route.sections : [route.sections[sectionIndex]];
  return <section className="py-16 bg-cozy-cream">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className={`grid grid-cols-1 ${sections.length === 1 ? '' : sections.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
        {sections.map((section) => {
          const Icon = icons[section.icon as keyof typeof icons];
          return <article key={section.heading} className="feature-card flex flex-col overflow-hidden min-w-0">
            {section.image && <img src={section.image} alt={section.heading === "Twój domek w Rusinowie" ? "Salon z aneksem kuchennym w domku Biały Szafir" : section.heading === "Na terenie ośrodka" ? "Trawnik i plac zabaw między domkami w Rusinowie" : "Plaża nad Bałtykiem"} width="720" height="480" loading="lazy" decoding="async" className="w-full h-48 object-cover rounded-lg mb-6" />}
            <Icon className="h-8 w-8 text-primary mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-primary mb-4">{section.heading}</h2>
            <div className="space-y-4 text-cozy-charcoal/80 leading-relaxed mb-6">{section.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
            <div className="mt-auto flex flex-col gap-3">{section.links.map((link) => <Button key={link.href} asChild className="h-auto min-h-11 whitespace-normal text-center py-3">
              {link.href.startsWith('/') ? <Link to={link.href}>{link.label}</Link> : <a href={link.href}>{link.label}</a>}
            </Button>)}</div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
