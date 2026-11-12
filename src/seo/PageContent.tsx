import { Link } from "react-router-dom";
import routes from "./routes.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PageContent({ path }: { path: string }) {
  const route = routes.find((entry) => entry.path === path)!;
  return <section className="py-16 bg-cozy-cream">
    <div className="container mx-auto px-4 max-w-4xl space-y-10">
      {route.paragraphs.map((text) => <p key={text} className="text-lg leading-relaxed text-cozy-charcoal/80">{text}</p>)}
      {route.sections.map((section) => <section key={section.heading} className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{section.heading}</h2>
        {section.paragraphs.map((text) => <p key={text} className="leading-relaxed text-cozy-charcoal/80">{text}</p>)}
        <div className="flex flex-wrap gap-x-6 gap-y-3">{section.links.map((link) => link.href.startsWith("/")
          ? <Link className="text-primary underline underline-offset-4" key={link.href} to={link.href}>{link.label}</Link>
          : <a className="text-primary underline underline-offset-4" key={link.href} href={link.href}>{link.label}</a>)}</div>
      </section>)}
      <section id="faq">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Najczęstsze pytania</h2>
        <Accordion type="multiple">{route.faq.map(({ q, a }, i) => <AccordionItem key={q} value={String(i)}>
          <AccordionTrigger className="text-left">{q}</AccordionTrigger>
          <AccordionContent>{a}</AccordionContent>
        </AccordionItem>)}</Accordion>
      </section>
      <nav aria-label="Poznaj Biały Szafir" className="flex flex-wrap gap-x-6 gap-y-3">
        {routes.filter((entry) => entry.path !== path).map((entry) => <Link key={entry.path} to={entry.path} className="text-primary underline underline-offset-4">{entry.h1}</Link>)}
      </nav>
    </div>
  </section>;
}
