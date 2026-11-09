/**
 * Prepare hero-home.jpg for the landing page.
 *
 * Output: 3840 × 2160 px (16:9), JPEG q92, horizontally flipped.
 *
 *   npm run prepare-hero
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HERO_W = 3840
const HERO_H = 2160

const PIXABAY_CDN =
  'https://cdn.pixabay.com/photo/2023/02/10/14/32/night-view-7781007_1280.jpg'

const candidates = [
  path.join(__dirname, '../public/images/hero-home-source.jpg'),
  path.join(__dirname, '../public/images/hero-home-source.png'),
  path.join(__dirname, '../public/images/hero-home-source.jpeg'),
]

const out = path.join(__dirname, '../public/images/hero-home.jpg')
const defaultSource = path.join(__dirname, '../public/images/hero-home-source.jpg')

async function ensureSource() {
  let src = candidates.find((file) => fs.existsSync(file))

  if (!src) {
    console.log('Downloading hero source from Pixabay CDN…')
    const res = await fetch(PIXABAY_CDN, {
      headers: {
        Referer: 'https://pixabay.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })
    if (!res.ok) throw new Error(`Pixabay download failed: ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await fs.promises.writeFile(defaultSource, buf)
    src = defaultSource
  }

  return src
}

const src = await ensureSource()
const meta = await sharp(src).metadata()

if ((meta.width ?? 0) < 2000) {
  console.warn(
    `Note: source is ${meta.width}×${meta.height}. Drop a larger file at public/images/hero-home-source.jpg for maximum sharpness.`,
  )
}

const info = await sharp(src)
  .flop()
  .resize(HERO_W, HERO_H, {
    fit: 'cover',
    position: 'center',
  })
  .sharpen({ sigma: 0.5 })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(out)

console.log(`Source: ${path.basename(src)} (${meta.width}×${meta.height})`)
console.log(`Prepared ${out}: ${info.width}×${info.height} (${info.size} bytes), flipped`)
