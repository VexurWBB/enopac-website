import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../ui/Logo'
import BookingButton from '../ui/BookingButton'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

const HERO_SCROLL_THRESHOLD = 32

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const overHero = pathname === '/'

  useEffect(() => {
    if (!overHero) {
      return
    }

    const onScroll = () => {
      setScrolled(window.scrollY > HERO_SCROLL_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overHero])

  const headerClass = [
    'site-header',
    overHero && 'site-header--hero',
    overHero && scrolled && 'site-header--scrolled',
  ]
    .filter(Boolean)
    .join(' ')

  const handleNavClick = () => {
    setOpen(false)
    scrollToTop()
  }

  return (
    <header className={headerClass}>
      <div className="section-container">
        <NavLink to="/" className="header-brand" onClick={handleNavClick}>
          <Logo size="nav" />
        </NavLink>

        <nav className="site-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={handleNavClick}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <BookingButton onClick={handleNavClick}>Book a Call</BookingButton>
        </div>

        <button type="button" className="mobile-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span style={open ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
          <span style={open ? { opacity: 0 } : {}} />
          <span style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
        </button>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={handleNavClick}
            >
              {link.label}
            </NavLink>
          ))}
          <div style={{ marginTop: '1rem' }}>
            <BookingButton onClick={handleNavClick}>Book a Call</BookingButton>
          </div>
        </nav>
      )}
    </header>
  )
}
