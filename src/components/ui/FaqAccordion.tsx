import { useState } from 'react'
import type { FaqItem } from '../../data/faq'

type FaqAccordionProps = {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `faq-panel-${index}`
        const triggerId = `faq-trigger-${index}`

        return (
          <div key={item.question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              id={triggerId}
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="faq-question">{item.question}</span>
              <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="faq-answer"
              hidden={!isOpen}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
