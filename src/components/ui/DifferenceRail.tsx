import { Link } from 'react-router-dom'
import ArrowIcon from './ArrowIcon'

type Item = {
  num: string
  title: string
  desc: string
}

type DifferenceRailProps = {
  items: Item[]
  linkTo?: string
}

export default function DifferenceRail({ items, linkTo = '/about' }: DifferenceRailProps) {
  return (
    <div className="difference-rail-wrap">
      <div className="difference-rail-spine" aria-hidden="true">
        <span className="difference-rail-spine-line" />
        <span className="difference-rail-spine-glow" />
      </div>
      <div className="difference-rail">
        {items.map((item) => (
          <Link key={item.num} to={linkTo} className="difference-rail-item">
            <div className="difference-rail-marker">
              <span className="difference-rail-dot" aria-hidden="true" />
              <span className="difference-rail-num">{item.num}</span>
            </div>
            <div className="difference-rail-content">
              <h3 className="difference-rail-title">{item.title}</h3>
              <p className="difference-rail-desc">{item.desc}</p>
            </div>
            <ArrowIcon />
          </Link>
        ))}
      </div>
    </div>
  )
}
