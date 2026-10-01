import BookingButton from './BookingButton'
import { site } from '../../data/site'
import { heroImages } from '../../data/heroImages'

type CTASectionProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
}

export default function CTASection({
  eyebrow = 'Get Started',
  title,
  subtitle = 'Every great property journey starts with a conversation. Book a complimentary strategy session and tell us where you want to be.',
}: CTASectionProps) {
  return (
    <section className="cta-finale section-padding section-surface section-light">
      <div className="cta-finale-bg" aria-hidden="true">
        <img src={heroImages.contact.src} alt="" loading="lazy" />
      </div>
      <div className="cta-finale-frame" aria-hidden="true" />

      <div className="section-container cta-finale-container">
        <div className="cta-finale-inner">
          <div className="cta-finale-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <p className="cta-finale-eyebrow">{eyebrow}</p>
          <h2 className="cta-finale-title">{title}</h2>
          {subtitle && <p className="cta-finale-subtitle">{subtitle}</p>}

          <div className="cta-finale-bar">
            <BookingButton />
            <span className="cta-finale-divider" aria-hidden="true" />
            <div className="cta-finale-contact">
              <a href={site.phoneHref} className="cta-finale-link">
                <span className="cta-finale-link-label">Call</span>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="cta-finale-link">
                <span className="cta-finale-link-label">Email</span>
                {site.email}
              </a>
            </div>
          </div>

          <p className="cta-finale-trust">
            Free consultation · WA &amp; VIC · WA Licence {site.licence} · Our team
          </p>
        </div>
      </div>
    </section>
  )
}
