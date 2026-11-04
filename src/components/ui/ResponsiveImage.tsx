import type { ImgHTMLAttributes } from 'react'
import images from '../../data/optimisedImages.json'

type Entry = { src: string; srcSet: string; width: number; height: number }
const manifest: Record<string, Entry> = images

export default function ResponsiveImage({ src = '', alt, sizes = '(max-width: 700px) 100vw, 50vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = manifest[src.split('?')[0]]
  return <img {...props} src={image?.src ?? src} srcSet={image?.srcSet} sizes={image ? sizes : undefined} width={image?.width} height={image?.height} decoding="async" alt={alt} />
}
