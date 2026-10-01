import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import FooterSocials from '../ui/FooterSocials'
import { site } from '../../data/site'
import { services } from '../../data/services'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-watermark" aria-hidden="true">ENOPAC</div>

      <div className="section-container">
        <div className="footer-accent" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <Logo size="sm" />
            </Link>
            <p className="footer-tagline">
              Property management, buyers agency, and development opportunities for investors across WA and VIC.
            </p>
            <FooterSocials />
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links footer-links--contact">
              <li>
                <a href={site.phoneHref} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="currentColor"/></svg>
                  </span>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
                  </span>
                  {site.email}
                </a>
              </li>
              <li className="footer-contact-name">{site.contact}</li>
              <li className="footer-contact-detail">WA Licence {site.licence}</li>
            </ul>
          </div>
        </div>

        <div className="footer-trust">
          <span className="footer-trust-pill">Western Australia</span>
          <span className="footer-trust-pill">Victoria</span>
          <span className="footer-trust-pill">WA Licence {site.licence}</span>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
          <p>Invest with confidence across WA &amp; VIC</p>
        </div>
      </div>
    </footer>
  )
}
