import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'
import ArrowIcon from './ArrowIcon'

const feeNotes: Record<string, string> = {
  'property-management': 'Scales with your portfolio — no lock-in surprises.',
  'buyers-agency': 'Fixed quote agreed before the search begins.',
  development: 'Equity or fixed fee, scoped to your project.',
}

export default function FeeRail({ services }: { services: Service[] }) {
  return (
    <div className="fee-cards">
      {services.map((service, index) => (
        <article
          key={service.slug}
          className={`fee-card${index === 1 ? ' fee-card--featured' : ''}`}
        >
          <span className="fee-card-rail" aria-hidden="true" />
          <span className="fee-card-watermark" aria-hidden="true">{service.abbr}</span>

          <div className="fee-card-top">
            <span className="fee-card-code">{service.abbr}</span>
          </div>

          <h3 className="fee-card-title">{service.title}</h3>

          <div className="fee-card-price">
            <span className="fee-card-price-label">Fee model</span>
            <p className="fee-card-price-value">{service.fee}</p>
          </div>

          <p className="fee-card-note">{feeNotes[service.slug]}</p>

          <Link to={`/services/${service.slug}`} className="fee-card-link">
            <span>View service details</span>
            <ArrowIcon />
          </Link>
        </article>
      ))}
    </div>
  )
}
