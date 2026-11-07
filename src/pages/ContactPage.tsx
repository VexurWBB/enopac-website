import ContactInfoPanel from '../components/ui/ContactInfoPanel'
import VexurCalendarWidget from '../components/booking/VexurCalendarWidget'
import Reveal from '../components/ui/Reveal'

export default function ContactPage() {
  return (
    <section id="contact-form" className="section-padding section-padding-compact contact-section section-surface bg-dark">
      <div className="section-container">
        <Reveal>
          <div className="page-hero-eyebrow-center-wrap contact-section-head">
            <h1 className="section-title">Contact Enopac Property Group</h1>
            <span className="page-hero-eyebrow-flare" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="contact-layout">
            <ContactInfoPanel />

            <div id="book" className="contact-booking-slot">
              <VexurCalendarWidget />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
