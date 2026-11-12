import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routes from "./routes.json";
import business from "./business.json";
import { pageSchema } from "./schema.js";

export default function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const route = routes.find((entry) => entry.path === path);
    const title = route?.title ?? "404 | Biały Szafir";
    const description = route?.description ?? "Nie znaleziono strony.";
    document.title = title;
    const meta = (attribute: string, key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    meta("name", "description", description);
    meta("name", "robots", route ? "index,follow" : "noindex,follow");
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("property", "og:image", "https://szafirrusinowo.pl/og-image.jpg");
    meta("name", "twitter:image", "https://szafirrusinowo.pl/og-image.jpg");
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);
    document.head.querySelector('meta[name="twitter:site"]')?.remove();
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((element) => element.remove());
    if (route) {
      const schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.textContent = JSON.stringify(pageSchema(route, business));
      document.head.appendChild(schema);
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (route) {
      const url = `https://szafirrusinowo.pl${route.path}`;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      meta("property", "og:url", url);
    } else {
      canonical?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [pathname]);
  return null;
}
