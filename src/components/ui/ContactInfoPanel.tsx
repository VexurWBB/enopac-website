import FooterSocials from './FooterSocials'
import BookingButton from './BookingButton'
import { site } from '../../data/site'

const contactItems = [
  {
    label: 'Phone',
    value: site.phone,
    href: site.phoneHref,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Based in',
    value: 'Western Australia & Victoria',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" fill="currentColor" />
      </svg>
    ),
  },
]

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-info-callout-icon">
      <path
        d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm2 4h10v2H7v-2zm0 4h6v2H7v-2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ContactInfoPanel() {
  return (
    <aside className="contact-info-panel">
      <span className="contact-info-rail" aria-hidden="true" />

      <header className="contact-info-head">
        <p className="contact-info-eyebrow">Direct Contact</p>
        <h2 className="contact-info-title">
          Or reach our team <em>directly.</em>
        </h2>
        <p className="contact-info-lead">
          No call centres, no hand-offs — just a direct line to our team.
        </p>
      </header>

      <ul className="contact-info-list">
        {contactItems.map((item) => (
          <li key={item.label} className="contact-info-item">
            <span className="contact-info-icon" aria-hidden="true">{item.icon}</span>
            <div className="contact-info-body">
              <p className="contact-info-label">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="contact-info-value">{item.value}</a>
              ) : (
                <p className="contact-info-value">{item.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="contact-info-foot">
        <div className="contact-info-callout">
          <p className="contact-info-callout-label">Prefer a quick call?</p>
          <BookingButton className="contact-info-callout-btn">
            <CalendarIcon />
            <span>{site.cta}</span>
          </BookingButton>
          <p className="contact-info-callout-note">
            WA Licence {site.licence} · Our team
          </p>
        </div>

        <footer className="contact-info-social">
          <p className="contact-info-social-label">Follow</p>
          <FooterSocials />
        </footer>
      </div>
    </aside>
  )
}
