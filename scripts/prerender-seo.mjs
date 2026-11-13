import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pageSchema } from '../src/seo/schema.js';

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const routes = await readJson('../src/seo/routes.json');
const business = await readJson('../src/seo/business.json');
const gallery = await readJson('../src/seo/gallery-dimensions.json');
const variants = await readJson('../src/seo/image-variants.json');
const pricing = await readJson('../src/seo/pricing.json');
const manifest = await readJson('../dist/.vite/manifest.json');
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const asset = (source) => {
  const entry = manifest[source] ?? Object.values(manifest).find((entry) => entry.src === source);
  if (!entry) throw new Error(`Missing built asset: ${source}`);
  return `/${entry.file}`;
};
const anchor = ({ href, label }) => `<a class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-3 text-center" href="${escape(href)}">${escape(label)}</a>`;
const p = (text) => `<p class="leading-relaxed">${escape(text)}</p>`;
const nav = () => `<nav aria-label="Nawigacja główna"><ul class="flex flex-wrap gap-x-6 gap-y-3" style="display:flex;flex-wrap:wrap;gap:12px 24px;list-style:none;margin:0;padding:0">${routes.map((r) => `<li><a href="${r.path}">${escape(r.path === '/' ? 'Strona główna' : r.path === '/nasze-osrodki' ? 'Nasze ośrodki' : r.path.slice(1)[0].toUpperCase() + r.path.slice(2))}</a></li>`).join('')}</ul></nav>`;
const content = (route, sections = route.sections) => `<section class="py-16 bg-cozy-cream"><div class="container mx-auto px-4 max-w-6xl"><div class="grid grid-cols-1 ${sections.length === 1 ? '' : sections.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8">
${sections.map((section) => `<article class="feature-card flex flex-col min-w-0">${section.image ? `<img src="${section.image}" width="720" height="480" loading="lazy" decoding="async" alt="${escape(section.heading)}" class="w-full h-48 object-cover rounded-lg mb-6">` : ''}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-primary mb-4"><path d="M3 10 12 3l9 7v11H3Z M9 21v-8h6v8"/></svg><h2 class="text-2xl font-bold text-primary mb-4">${escape(section.heading)}</h2><div class="space-y-4 mb-6">${section.paragraphs.map(p).join('')}</div><div class="mt-auto flex flex-col gap-3">${section.links.map(anchor).join('')}</div></article>`).join('')}
</div></div></section>`;

const cleanTemplate = template
  .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
  .replace(/<meta\b(?=[^>]*(?:name\s*=\s*["'](?:description|robots|twitter:title|twitter:description|twitter:site)["']|property\s*=\s*["']og:(?:title|description|url)["']))[^>]*>/gi, '')
  .replace(/<link\b(?=[^>]*rel\s*=\s*["']canonical["'])[^>]*>/gi, '')
  .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

for (const route of routes) {
  const url = `https://szafirrusinowo.pl${route.path}`;
  const stem = route.hero.file.replace(/\.jpg$/, "");
  const image = `/media/${stem}-1440.webp`;
  const imageSet = `/media/${stem}-720.webp 720w, ${image} 1440w`;
  const head = `<title>${escape(route.title)}</title>
    <meta name="description" content="${escape(route.description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escape(route.title)}" />
    <meta property="og:description" content="${escape(route.description)}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:title" content="${escape(route.title)}" />
    <meta name="twitter:description" content="${escape(route.description)}" />
    <link rel="preload" as="image" href="/media/${stem}-720.webp" media="(max-width: 767px)" fetchpriority="high" />
    <link rel="preload" as="image" href="${image}" imagesrcset="${imageSet}" imagesizes="100vw" media="(min-width: 768px)" fetchpriority="high" />
    <script type="application/ld+json">${JSON.stringify(pageSchema(route, business)).replace(/</g, '\\u003c')}</script>`;
  let extra = '';
  if (route.path === '/galeria') extra = `<section class="container mx-auto px-4 py-12"><h2 class="text-3xl font-bold mb-8">Zdjęcia domków</h2>${['Otoczenie i tarasy', 'Wnętrza domków'].map((group) => `<section><h3 class="text-2xl font-bold my-6">${group}</h3><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">${Object.entries(gallery).filter(([, entry]) => entry.group === group).map(([file, entry], i) => `<figure><a href="${asset(`src/assets/gallery/${file}`)}"><img src="${variants[file][360]}" srcset="${variants[file][360]} 360w, ${variants[file][720]} 720w" sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" width="${entry.width}" height="${entry.height}" alt="${escape(entry.alt)}" loading="lazy" decoding="async" class="w-full aspect-square object-cover rounded-lg" /></a><figcaption>${escape(entry.alt)}</figcaption></figure>`).join('')}</div></section>`).join('')}</section>`;
  if (route.path === '/galeria') {
    extra = extra.replace('<h2 class="text-3xl font-bold mb-8">', `${content(route, [route.sections[0]])}<h2 class="text-3xl font-bold mb-8">`);
    const films = [
      ['Prezentacja o\u015brodka Bia\u0142y Szafir', 'jQCNl9kFRmc'],
      ['Film w j\u0119zyku angielskim', 'xZh-FGzdwRU'],
      ['Film w j\u0119zyku niemieckim', '4PGKNfEpsaU'],
      ['Film w j\u0119zyku ukrai\u0144skim', 'cXGtRpL3qJg'],
      ['Film w j\u0119zyku czeskim', 'oTzryXOi2Y0'],
    ];
    extra += `${content(route, [route.sections[1]])}<section class="container mx-auto px-4 pb-16"><div class="grid grid-cols-1 lg:grid-cols-3 gap-6">${films.map(([title, id]) => `<article class="feature-card"><h3 class="text-xl font-bold text-primary mb-4">${title}</h3><iframe class="w-full aspect-video" loading="lazy" src="https://www.youtube.com/embed/${id}" title="${title}" allowfullscreen></iframe></article>`).join('')}</div></section>`;
  }
  if (route.path === '/cennik') extra = `<section class="container mx-auto px-4 max-w-6xl py-12"><h2 class="text-3xl font-bold text-primary text-center mb-4">Cennik domków na 2026 rok</h2><p class="text-center mb-10">Zł za domek za dobę, maksymalnie 6 osób. Minimalny pobyt: 3 doby.</p><div class="hidden md:block feature-card"><table class="w-full text-left"><thead><tr><th scope="col" class="p-3">Termin</th><th scope="col" class="p-3">Cena za dobę</th><th scope="col" class="p-3">Dostępność</th></tr></thead><tbody>${pricing.map(item => `<tr class="border-t"><th scope="row" class="p-3">${escape(item.period)}</th><td class="p-3">${escape(item.price)} zł</td><td class="p-3">${anchor({href:'/rezerwacja', label:'Sprawdź termin'})}</td></tr>`).join('')}</tbody></table></div><div class="grid grid-cols-1 md:hidden gap-8">${pricing.map(item => `<article class="pricing-card text-center"><h3 class="text-xl font-semibold text-primary mb-4">${escape(item.period)}</h3><p class="text-4xl font-bold text-primary mb-2">${escape(item.price)} zł</p><p class="mb-6">Za domek za dobę, do 6 osób</p>${anchor({href:'/rezerwacja',label:'Sprawdź termin'})}</article>`).join('')}</div></section>`;
  if (route.path === '/rezerwacja') extra = `<section class="container mx-auto px-4 max-w-6xl py-12"><article class="feature-card"><h2 class="text-2xl font-bold text-primary mb-4">System rezerwacji online</h2><p class="leading-relaxed mb-6">System rezerwacji jest dostępny po włączeniu JavaScriptu. Pobyt możesz również zarezerwować telefonicznie lub e-mailem.</p><div class="flex flex-wrap gap-4">${anchor({href:'tel:+48504201117',label:'Zadzwoń: +48 504 201 117'})}${anchor({href:'mailto:info@szafirrusinowo.pl',label:'Napisz: info@szafirrusinowo.pl'})}</div></article></section>`;
  const hero = `<section class="relative ${route.path === '/' ? 'min-h-screen' : 'min-h-96 py-12'} flex items-center justify-center overflow-hidden"><picture><source media="(max-width: 767px)" srcset="/media/${stem}-720.webp"><img src="${image}" srcset="${imageSet}" sizes="100vw" width="${route.hero.width}" height="${route.hero.height}" fetchpriority="high" alt="" class="absolute inset-0 w-full h-full object-cover" /></picture><div class="absolute inset-0 bg-black/40"></div><div class="relative z-10 text-center text-white px-4 max-w-4xl"><h1 class="${route.path === '/' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'} font-bold mb-6">${escape(route.h1)}</h1>${p(route.paragraphs[0])}</div></section>`;
  const body = `<header class="bg-primary text-primary-foreground p-6 space-y-4"><a class="text-2xl font-bold" href="/">Biały Szafir</a>${nav()}</header><main>${hero}${extra}${route.path === "/galeria" ? "" : content(route)}${route.path === "/kontakt" || route.path === "/" ? `<section class="container mx-auto px-4 max-w-6xl pb-16"><article class="feature-card"><h2 class="text-2xl text-primary mb-4">Kontakt z Białym Szafirem</h2><p>ul. Sosnowa 19, 76-107 Rusinowo</p><p>Telefon codziennie 8:00–20:00. Odpowiedzi na wiadomości w ciągu 24 godzin.</p><div class="flex flex-wrap gap-4 mt-6">${anchor({href:"tel:+48504201117",label:"Zadzwoń: +48 504 201 117"})}${anchor({href:"mailto:info@szafirrusinowo.pl",label:"Napisz: info@szafirrusinowo.pl"})}</div></article></section>` : ""}</main>`;
  const html = cleanTemplate.replace('</head>', `${head}\n</head>`).replace(/<div id="root">[\s\S]*?<\/div>/, `<!--email_off--><div id="root">${body}</div><!--/email_off-->`);
  // one file per route: /galeria -> galeria.html. Cloudflare Pages serves it at /galeria with no trailing-slash
  // redirect (a galeria/ folder would force /galeria -> /galeria/).
  await writeFile(new URL(route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`, dist), html);
}

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>https://szafirrusinowo.pl${route.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile(new URL('sitemap.xml', dist), sitemap);
await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
console.log(`Generated SEO HTML for ${routes.length} routes.`);
