import { readFile, writeFile, mkdir } from 'node:fs/promises';

// JSON is shared with React; no TypeScript loader or build dependencies required.
const routes = JSON.parse(await readFile(new URL('../src/seo/routes.json', import.meta.url), 'utf8'));
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const escape = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

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
  const content = `<main><h1>${escape(route.h1)}</h1>${route.paragraphs.map((text) => `<p>${escape(text)}</p>`).join('')}</main><nav aria-label="Podstrony">${links}</nav>`;
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
console.log(`Generated SEO HTML for ${routes.length} routes.`);
