import ResponsiveImage from './ResponsiveImage'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'
import { heroImages } from '../../data/heroImages'
import BookingButton from './BookingButton'
import ArrowIcon from './ArrowIcon'

const serviceImages: Record<string, { src: string; alt: string }> = {
  'property-management': heroImages['property-management'],
  'buyers-agency': heroImages['buyers-agency'],
  development: heroImages.development,
}

type ServiceShowcaseProps = {
  services: Service[]
}

export default function ServiceShowcase({ services }: ServiceShowcaseProps) {
  return (
    <div className="service-showcase">
      {services.map((service, index) => {
        const image = serviceImages[service.slug]
        const featured = index === 1

        return (
          <article
            key={service.slug}
            className={`service-showcase-panel${featured ? ' service-showcase-panel--featured' : ''}`}
          >
            <div className={`service-showcase-split${index % 2 === 1 ? ' service-showcase-split--reverse' : ''}`}>
              <div className="service-showcase-media">
                <figure className="service-showcase-frame">
                  <ResponsiveImage src={image.src} alt={image.alt} loading="lazy" />
                  <span className="service-showcase-frame-corner service-showcase-frame-corner--tl" aria-hidden="true" />
                  <span className="service-showcase-frame-corner service-showcase-frame-corner--br" aria-hidden="true" />
                  <span className="service-showcase-frame-bar" aria-hidden="true" />
                  <span className="service-showcase-watermark" aria-hidden="true">{service.abbr}</span>
                  <span className="service-showcase-index">{String(index + 1).padStart(2, '0')}</span>
                </figure>
              </div>

              <div className="service-showcase-content">
                <span className="service-showcase-rail-glow" aria-hidden="true" />

                <div className="service-showcase-meta">
                  <span className="service-showcase-fee">{service.fee}</span>
                </div>

                <h2 className="service-showcase-title">{service.title}</h2>
                <p className="service-showcase-desc">{service.description}</p>

                <div className="service-showcase-features">
                  <p className="service-showcase-features-label">What&apos;s included</p>
                  <ul>
                    {service.features.slice(0, service.slug === 'development' ? 7 : 6).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-showcase-actions">
                  <Link to={`/services/${service.slug}`} className="service-showcase-link">
                    <span>View full details</span>
                    <ArrowIcon />
                  </Link>
                  <BookingButton />
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
