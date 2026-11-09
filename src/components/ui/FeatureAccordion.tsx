import { useState } from 'react'

type Feature = {
  number: string
  title: string
  summary: string
  details: string
  bullets: string[]
}

export default function FeatureAccordion({ features }: { features: Feature[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="feature-accordion">
      {features.map((feature, index) => {
        const isOpen = open === index
        return (
          <div
            key={feature.number}
            className={`accordion-item${isOpen ? ' open' : ''}`}
          >
            <div className="accordion-header">
              <span className="accordion-num">{feature.number}</span>
              <div className="accordion-main">
                <p className="accordion-title">{feature.title}</p>
                <p className="accordion-summary">{feature.summary}</p>
                {isOpen && (
                  <div className="accordion-body">
                    <p>{feature.details}</p>
                    <ul className="accordion-bullets">
                      {feature.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="accordion-toggle"
                aria-expanded={isOpen}
                aria-label={isOpen ? `Collapse ${feature.title}` : `Expand ${feature.title}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {isOpen ? '−' : '+'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
