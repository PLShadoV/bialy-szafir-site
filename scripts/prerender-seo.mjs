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
const anchor = ({ href, label }) => `<a class="text-primary underline underline-offset-4" href="${escape(href)}">${escape(label)}</a>`;
const p = (text) => `<p class="leading-relaxed">${escape(text)}</p>`;
const links = (route) => `<nav aria-label="Poznaj Biały Szafir" class="flex flex-wrap gap-6">${routes.filter((other) => other.path !== route.path).map((other) => anchor({ href: other.path, label: other.h1 })).join('')}</nav>`;
const content = (route) => `<section class="py-16 bg-cozy-cream"><div class="container mx-auto px-4 max-w-4xl space-y-10">
  ${route.paragraphs.map(p).join('')}
  ${route.sections.map((section) => `<section class="space-y-4"><h2 class="text-2xl md:text-3xl font-bold text-primary">${escape(section.heading)}</h2>${section.paragraphs.map(p).join('')}<div class="flex flex-wrap gap-6">${section.links.map(anchor).join('')}</div></section>`).join('')}
  <section id="faq"><h2 class="text-2xl font-bold text-primary mb-6">Najczęstsze pytania</h2>${route.faq.map(({ q, a }) => `<details class="border-b py-4"><summary>${escape(q)}</summary>${p(a)}</details>`).join('')}</section>${links(route)}
  </div></section>`;

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
    <link rel="preload" as="image" href="${image}" imagesrcset="${imageSet}" imagesizes="100vw" fetchpriority="high" />
    <script type="application/ld+json">${JSON.stringify(pageSchema(route, business)).replace(/</g, '\\u003c')}</script>`;
  let extra = '';
  if (route.path === '/cennik') extra = `<section class="container mx-auto px-4 max-w-4xl py-12"><h2 class="text-2xl font-bold mb-6">Ceny za domek za dobę dla maksymalnie 6 osób</h2><table class="w-full"><thead><tr><th scope="col">Termin</th><th scope="col">Cena za dobę</th></tr></thead><tbody>${pricing.map((item) => `<tr><th scope="row">${escape(item.period)}</th><td>${escape(item.price)} zł</td></tr>`).join('')}</tbody></table></section>`;
  if (route.path === '/galeria') extra = `<section class="container mx-auto px-4 py-12"><h2 class="text-3xl font-bold mb-8">Zdjęcia domków</h2>${['Otoczenie i tarasy', 'Wnętrza domków'].map((group) => `<section><h3 class="text-2xl font-bold my-6">${group}</h3><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">${Object.entries(gallery).filter(([, entry]) => entry.group === group).map(([file, entry], i) => `<figure><a href="${asset(`src/assets/gallery/${file}`)}"><img src="${variants[file][360]}" srcset="${variants[file][360]} 360w, ${variants[file][720]} 720w" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" width="${entry.width}" height="${entry.height}" alt="${escape(entry.alt)}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async" class="w-full aspect-square object-cover rounded-lg" /></a><figcaption>${escape(entry.alt)}</figcaption></figure>`).join('')}</div></section>`).join('')}</section>`;
  if (route.path === '/rezerwacja') extra = `<section class="container mx-auto px-4 max-w-4xl py-12"><h2>Rezerwacja online</h2><p>System rezerwacji jest dostępny po włączeniu JavaScriptu. Możesz również <a href="tel:+48504201117">zadzwonić: +48 504 201 117</a> lub <a href="mailto:info@szafirrusinowo.pl">napisać: info@szafirrusinowo.pl</a>.</p></section>`;
  const hero = `<section class="relative ${route.path === '/' ? 'min-h-screen' : 'h-96'} flex items-center justify-center overflow-hidden"><img src="${image}" srcset="${imageSet}" sizes="100vw" width="${route.hero.width}" height="${route.hero.height}" fetchpriority="high" alt="" class="absolute inset-0 w-full h-full object-cover" /><div class="absolute inset-0 bg-black/40"></div><div class="relative z-10 text-center text-white px-4 max-w-4xl"><h1 class="${route.path === '/' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'} font-bold mb-6">${escape(route.h1)}</h1>${p(route.paragraphs[0])}</div></section>`;
  const body = `<header class="bg-primary text-primary-foreground h-16 flex items-center px-4"><a class="text-2xl font-bold" href="/">Biały Szafir</a></header><main>${hero}${content(route)}${extra}</main>`;
  const html = cleanTemplate.replace('</head>', `${head}\n</head>`).replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${body}</div>`);
  const directory = new URL(route.path === '/' ? './' : `${route.path.slice(1)}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
  // Cloudflare Pages serves /galeria.html at /galeria (no trailing-slash redirect); Vercel keeps using /galeria/index.html
  if (route.path !== '/') await writeFile(new URL(`${route.path.slice(1)}.html`, dist), html);
}

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>https://szafirrusinowo.pl${route.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile(new URL('sitemap.xml', dist), sitemap);
await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
console.log(`Generated SEO HTML for ${routes.length} routes.`);
