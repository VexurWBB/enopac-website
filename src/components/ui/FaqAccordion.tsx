import type { FaqItem } from '../../data/faq'

type FaqAccordionProps = { items: FaqItem[] }

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="faq-accordion">
      {items.map((item) => (
        <details key={item.question} className="faq-item" name="enopac-faq">
          <summary className="faq-trigger">
            <span className="faq-question">{item.question}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-answer"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  )
}
