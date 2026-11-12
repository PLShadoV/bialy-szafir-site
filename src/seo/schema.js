export function pageSchema(route, business) {
  const url = `https://szafirrusinowo.pl${route.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      ...(route.path === "/" ? [] : [{
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Biały Szafir", item: "https://szafirrusinowo.pl/" },
          { "@type": "ListItem", position: 2, name: route.h1, item: url },
        ],
      }]),
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: route.faq.map(({ q, a }) => ({
        "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
      })) },
    ],
  };
}
