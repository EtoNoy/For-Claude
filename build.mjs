// Builds the static site into ./dist. No dependencies: run `node build.mjs`.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { header, footer, esc } from './src/templates/partials.mjs';
import * as pages from './src/templates/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const readJSON = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const site = readJSON('src/data/site.json');
const areas = readJSON('src/data/practice-areas.json');
const questions = readJSON('src/data/questions.json');

// Sanity checks so a typo in the data fails the build instead of shipping a broken link.
const slugs = new Set(areas.map((a) => a.slug));
for (const a of areas) for (const r of a.related) if (!slugs.has(r)) throw new Error(`${a.slug}: unknown related area "${r}"`);
for (const s of site.featured) if (!slugs.has(s)) throw new Error(`featured: unknown area "${s}"`);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });
cpSync(join(root, 'public'), out, { recursive: true });

// Cache-busting version for CSS/JS.
const ver = createHash('sha1')
  .update(readFileSync(join(root, 'src/assets/css/styles.css')))
  .update(readFileSync(join(root, 'src/assets/js/main.js')))
  .digest('hex').slice(0, 8);

const ctx = { site, areas, questions };

function layout(p) {
  const url = site.url + (p.path === '/404.html' ? '/' : p.path);
  const img = site.url + (p.image || '/assets/images/og-image.jpg');
  const page = { ...ctx, path: p.path };
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="${site.themeColor}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" sizes="64x64" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/playfair-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/dm-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css?v=${ver}">
${p.path === '/' ? jsonLd() : ''}
</head>
<body class="${p.bodyClass || ''}">
${header(page)}
<main id="main">
${p.body}
</main>
${footer(page)}
<script src="/assets/js/main.js?v=${ver}" defer></script>
</body>
</html>
`;
}

function jsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.name,
    url: site.url,
    telephone: '+61421066608',
    email: site.email,
    image: site.url + '/assets/images/og-image.jpg',
    address: { '@type': 'PostalAddress', postOfficeBoxNumber: '104', addressLocality: 'Murwillumbah', addressRegion: 'NSW', postalCode: '2484', addressCountry: 'AU' },
    areaServed: ['Northern Rivers NSW', 'South East Queensland'],
    founder: { '@type': 'Person', name: site.lawyer.name, jobTitle: site.lawyer.title }
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

const all = [
  pages.home(ctx),
  pages.expertise(ctx),
  ...areas.map((a) => pages.area(ctx, a)),
  pages.about(ctx),
  pages.approach(ctx),
  pages.questions(ctx),
  pages.contact(ctx),
  pages.thanks(ctx),
  pages.privacy(ctx),
  pages.legal(ctx),
  pages.notFound(ctx)
];

for (const p of all) {
  const file = p.file ? join(out, p.file) : join(out, p.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, layout(p));
}

// Downloadable checklists (the "Save checklist" link on each practice area page).
mkdirSync(join(out, 'checklists'), { recursive: true });
for (const a of areas) {
  const txt = [
    `Frontline Lawyers — ${a.name}`,
    'Before we speak: a useful starting point',
    '',
    ...a.checklist.map((c) => `[ ] ${c}`),
    '',
    'You don’t need everything before you call.',
    `Call Adam on ${site.phone} or email ${site.email}`,
    '',
    'General information, not legal advice.'
  ].join('\r\n');
  writeFileSync(join(out, 'checklists', `${a.slug}.txt`), txt);
}

// sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
const indexable = all.filter((p) => !p.noindex);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

if (!existsSync(join(out, 'favicon.svg'))) console.warn('warning: public/favicon.svg missing');
console.log(`Built ${all.length} pages into dist/ (assets v${ver})`);
