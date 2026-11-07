import ResponsiveImage from './ResponsiveImage'
type EditorialSplitProps = {
  eyebrow?: string
  badge?: string
  title: React.ReactNode
  subtitle: string
  image: { src: string; alt: string }
  imageCaption?: React.ReactNode
  portrait?: boolean
  reverse?: boolean
  children?: React.ReactNode
}

export default function EditorialSplit({
  eyebrow,
  badge,
  title,
  subtitle,
  image,
  imageCaption,
  portrait = false,
  reverse = false,
  children,
}: EditorialSplitProps) {
  return (
    <div className="editorial-split-wrap">
      <div className={`editorial-split${reverse ? ' editorial-split--reverse' : ''}${portrait ? ' editorial-split--portrait' : ''}`}>
        <div className="editorial-split-content">
          <span className="editorial-split-rail-glow" aria-hidden="true" />
          {(badge || eyebrow) && (
            <div className="editorial-split-meta">
              {badge && <span className="badge">{badge}</span>}
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            </div>
          )}
          <h2 className="section-title mt-4">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
          {children}
        </div>
        <div className="editorial-split-media">
          <figure className={`editorial-frame${portrait ? ' editorial-frame--portrait' : ''}`}>
            <span className="editorial-frame-corner editorial-frame-corner--tl" aria-hidden="true" />
            <span className="editorial-frame-corner editorial-frame-corner--br" aria-hidden="true" />
            <ResponsiveImage src={image.src} alt={image.alt} loading="lazy" />
            <span className="editorial-frame-bar" aria-hidden="true" />
            {imageCaption && (
              <figcaption className="editorial-frame-caption">{imageCaption}</figcaption>
            )}
          </figure>
        </div>
      </div>
    </div>
  )
}
