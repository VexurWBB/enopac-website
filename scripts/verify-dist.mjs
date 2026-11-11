import { readFile, access } from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = path.resolve('dist')
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
assert.equal(new Set(urls).size, urls.length)
for (const url of urls) {
  const parsed = new URL(url)
  assert.equal(parsed.origin, 'https://www.enopacpropertygroup.com.au')
  const html = await readFile(path.join(root, parsed.pathname, 'index.html'), 'utf8')
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), url)
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`), url)
  assert.doesNotMatch(html, /<meta name="robots" content="noindex/)
  assert.doesNotMatch(html, /fonts\.googleapis\.com/)
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, url)
  const social = html.match(/<meta property="og:image" content="([^"]+)"/)[1]
  assert.equal(social, 'https://enopac-website.ben-03a.workers.dev/social-preview.png')
  assert.ok(html.includes(`<meta name="twitter:image" content="${social}"`), url)
  assert.ok(html.includes('<meta property="og:image:width" content="1200"'), url)
  assert.ok(html.includes('<meta property="og:image:height" content="630"'), url)
  assert.ok(html.includes('<meta property="og:image:type" content="image/png"'), url)
  await access(path.join(root, new URL(social).pathname))
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]+)[^\"]*"/g)) {
    if (/\.(?:js|css|woff2|png|jpg|webp|svg)$/.test(match[1])) await access(path.join(root, match[1]))
  }
}
assert.match(await readFile(path.join(root, '404.html'), 'utf8'), /<meta name="robots" content="noindex/)
assert.match(await readFile(path.join(root, 'apply/index.html'), 'utf8'), /<button(?=[^>]*type="submit")(?=[^>]*disabled)[^>]*>/)
console.log(`Verified ${urls.length} route canonicals, social URLs, local assets and the application fallback`)
