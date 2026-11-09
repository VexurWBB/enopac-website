import ResponsiveImage from './ResponsiveImage'
type SectionImageProps = {
  src: string
  alt: string
  tall?: boolean
}

export default function SectionImage({ src, alt, tall }: SectionImageProps) {
  return (
    <figure className={`section-image${tall ? ' tall' : ''}`}>
      <ResponsiveImage src={src} alt={alt} loading="lazy" />
    </figure>
  )
}
