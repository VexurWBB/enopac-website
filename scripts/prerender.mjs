// Writes real HTML, metadata and structured data for every route after the Vite build.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssr = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const { render, seoRoutes, site } = ssr
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const abs = (path) => `${site.url}${path}`

const business = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${site.url}/#business`,
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/images/hero-home.jpg`,
  email: site.email,
  telephone: site.phoneHref.replace('tel:', ''),
  address: { '@type': 'PostalAddress', addressRegion: 'WA', addressCountry: 'AU' },
  areaServed: site.regions.map((name) => ({ '@type': 'State', name })),
  identifier: site.licences.map((l) => ({ '@type': 'PropertyValue', propertyID: `${l.state} real estate licence`, value: l.number })),
  sameAs: [site.social.facebook],
}

function schemaFor(route) {
  const blocks = route.path === '/' ? [business] : []
  if (route.service) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: route.service,
      description: route.description,
      url: abs(route.path),
      provider: { '@id': `${site.url}/#business` },
      areaServed: site.regions.map((name) => ({ '@type': 'State', name })),
    })
  }
  if (route.breadcrumb) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumb.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: abs(b.path) })),
    })
  }
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`).join('')
}

function page(route, { noindex = false } = {}) {
  const url = abs(route.path)
  const head = [
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/images/hero-home.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    schemaFor(route),
  ].join('')
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(route.description)}" />`)
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`)
}

for (const route of seoRoutes) {
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path.slice(1), 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(route))
}

writeFileSync(
  join(dist, '404.html'),
  page(
    { path: '/this-page-does-not-exist', title: 'Page not found | Enopac Property Group', description: 'This page has moved or no longer exists.' },
    { noindex: true },
  ),
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${seoRoutes.map((r) => `  <url><loc>${abs(r.path)}</loc></url>`).join('\n')}\n</urlset>\n`,
)
rmSync('dist-ssr', { recursive: true, force: true })
console.log(`Prerendered ${seoRoutes.length} routes`)
