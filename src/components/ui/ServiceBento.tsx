import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'
import ArrowIcon from './ArrowIcon'

type ServiceBentoProps = {
  services: Service[]
}

export default function ServiceBento({ services }: ServiceBentoProps) {
  return (
    <div className="service-bento">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          to={`/services/${s.slug}`}
          className="service-tile"
        >
          <span className="service-tile-watermark" aria-hidden="true">{s.abbr}</span>
          <span className="service-tile-index">0{i + 1}</span>
          <h3 className="service-tile-title">{s.title}</h3>
          <p className="service-tile-desc">{s.shortDescription}</p>
          <div className="service-tile-footer">
            <span className="service-tile-fee">{s.fee}</span>
            <ArrowIcon />
          </div>
        </Link>
      ))}
    </div>
  )
}
