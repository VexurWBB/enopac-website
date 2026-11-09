import sharp from 'sharp'
import { rename, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const logoPath = join(__dirname, '../public/logo.png')
const tempPath = `${logoPath}.tmp`

/** Black/near-black pixels become transparent; dark olive wreath is preserved. */
const THRESHOLD = 32
const FEATHER = 20

const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

for (let i = 0; i < data.length; i += 4) {
  const max = Math.max(data[i], data[i + 1], data[i + 2])

  if (max <= THRESHOLD) {
    data[i + 3] = 0
  } else if (max <= THRESHOLD + FEATHER) {
    data[i + 3] = Math.round(255 * ((max - THRESHOLD) / FEATHER))
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 10 })
  .png()
  .toFile(tempPath)

await unlink(logoPath)
await rename(tempPath, logoPath)

console.log(`Updated ${logoPath} with transparent background`)
