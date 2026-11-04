import ResponsiveImage from './ResponsiveImage'
type PageHeroProps = {
  eyebrow: string
  title: React.ReactNode
  description: string
  image: string
  imageAlt: string
  imageCaption?: string
  pills?: string[]
  actions?: React.ReactNode
  centerEyebrow?: boolean
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageCaption,
  pills,
  actions,
  centerEyebrow = true,
}: PageHeroProps) {
  return (
    <section className={`page-hero${centerEyebrow ? ' page-hero--center-eyebrow' : ''}`}>
      <div className="section-container">
        {centerEyebrow && (
          <div className="page-hero-eyebrow-center-wrap">
            <p className="eyebrow page-hero-eyebrow-center">{eyebrow}</p>
            <span className="page-hero-eyebrow-flare" aria-hidden="true" />
          </div>
        )}

        <div className="hero-grid">
          <div className="hero-content">
            {!centerEyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="hero-title">{title}</h1>
            <p className="hero-desc">{description}</p>

            {pills && pills.length > 0 && (
              <div className="hero-pills">
                {pills.map((pill) => (
                  <span key={pill} className="stat-pill">{pill}</span>
                ))}
              </div>
            )}

            {actions && <div className="hero-actions">{actions}</div>}
          </div>

          <figure className="hero-media">
            <span className="hero-media-corner hero-media-corner--tl" aria-hidden="true" />
            <span className="hero-media-corner hero-media-corner--br" aria-hidden="true" />
            <ResponsiveImage src={image} alt={imageAlt} loading="eager" fetchPriority="high" />
            {imageCaption && (
              <figcaption className="hero-media-caption">
                <span className="hero-media-caption-dot" aria-hidden="true" />
                {imageCaption}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
      <span className="page-hero-bottom-flare" aria-hidden="true" />
    </section>
  )
}
