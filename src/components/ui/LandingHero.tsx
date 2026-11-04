import ResponsiveImage from './ResponsiveImage'
type LandingHeroProps = {

  eyebrow: string

  title: React.ReactNode

  description: string

  image: string

  imageAlt: string

  trustItems?: string[]

  actions?: React.ReactNode

}



export default function LandingHero({

  eyebrow,

  title,

  description,

  image,

  imageAlt,

  trustItems,

  actions,

}: LandingHeroProps) {

  return (

    <section className="hero">

      <div className="hero-bg hero-bg-blend">

        <div className="hero-media">

          <ResponsiveImage

            src={image}

            alt={imageAlt}

            className="hero-bg-img"

            loading="eager"

            fetchPriority="high"

            decoding="async"

            sizes="100vw"

            width={3840}

            height={2160}

          />

        </div>

      </div>



      <div className="hero-content">

        <div className="hero-text">

          <div className="hero-eyebrow">

            <span className="hero-eyebrow-line" aria-hidden="true" />

            <p className="hero-eyebrow-text">{eyebrow}</p>

          </div>

          <h1 className="hero-title hero-title--display">{title}</h1>

          <p className="hero-desc">{description}</p>

          {actions && <div className="hero-actions">{actions}</div>}

        </div>

      </div>



      {trustItems && trustItems.length > 0 && (

        <div className="hero-trust-bar">

          <div className="hero-trust-marquee" aria-label="Trust highlights">

            <div className="hero-trust-track">

              {[...trustItems, ...trustItems].map((item, i) => (

                <span
                  key={`${item}-${i}`}
                  className="hero-trust-item"
                  aria-hidden={i >= trustItems.length ? true : undefined}
                >

                  <span className="hero-trust-icon" aria-hidden="true" />

                  <span>{item}</span>

                </span>

              ))}

            </div>

          </div>

        </div>

      )}

    </section>

  )

}

