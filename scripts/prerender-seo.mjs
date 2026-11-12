import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';

// JSON is shared with React; no TypeScript loader or build dependencies required.
const routes = JSON.parse(await readFile(new URL('../src/seo/routes.json', import.meta.url), 'utf8'));
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
if (!/<div id="root">[\s\S]*?<\/div>/.test(template)) {
  throw new Error('Missing React root in the Vite HTML template.');
}
const escape = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const dimensions = JSON.parse(await readFile(new URL('../src/seo/gallery-dimensions.json', import.meta.url), 'utf8'));
// Expose the same gallery photographs without JavaScript, using stable public URLs.
const galleryDirectory = new URL('seo-gallery/', dist);
await mkdir(galleryDirectory, { recursive: true });
const gallery = [];
for (const [index, [filename, size]] of Object.entries(dimensions).entries()) {
  const name = `${index + 1}.${filename.split('.').pop()}`;
  await copyFile(new URL(`../src/assets/gallery/${filename}`, import.meta.url), new URL(name, galleryDirectory));
  gallery.push(`<img src="/seo-gallery/${name}" width="${size.width}" height="${size.height}" alt="Biały Szafir w Rusinowie – zdjęcie ${index + 1}" loading="lazy" />`);
}

for (const route of routes) {
  const url = `https://szafirrusinowo.pl${route.path}`;
  const head = `<title>${escape(route.title)}</title>
    <meta name="description" content="${escape(route.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escape(route.title)}" />
    <meta property="og:description" content="${escape(route.description)}" />
    <meta property="og:url" content="${url}" />`;
  const links = routes.filter((other) => other.path !== route.path)
    .map((other) => `<a href="${other.path}">${escape(other.h1)}</a>`).join(' | ');
  const extra = route.path === '/galeria' ? gallery.join('')
    : route.path === '/nasze-osrodki' ? '<nav aria-label="Strony ośrodków"><a href="https://perlarusinowo.pl">Biała Perła</a> | <a href="https://koralrusinowo.pl">Biały Koral</a></nav>' : '';
  const content = `<main><h1>${escape(route.h1)}</h1>${route.paragraphs.map((text) => `<p>${escape(text)}</p>`).join('')}${extra}</main><nav aria-label="Podstrony">${links}</nav>`;
  const html = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b(?=[^>]*(?:name\s*=\s*["']description["']|property\s*=\s*["']og:(?:title|description|url)["']))[^>]*>/gi, '')
    .replace(/<link\b(?=[^>]*rel\s*=\s*["']canonical["'])[^>]*>/gi, '')
    .replace('</head>', `${head}\n</head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${content}</div>`);
  const directory = new URL(route.path === '/' ? './' : `${route.path.slice(1)}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
}
// Keep the production sitemap aligned with the same route list used by React.
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>https://szafirrusinowo.pl${route.path}</loc></url>`).join('\n')}
</urlset>\n`);
console.log(`Generated SEO HTML for ${routes.length} routes.`);
