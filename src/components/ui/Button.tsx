import { Link } from 'react-router-dom'

type ButtonProps = {
  to?: string
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

/** Primary = gold CTA style (same design sitewide). Outline/ghost for secondary actions. */
export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = [
    variant === 'primary' ? 'btn-cta' : `btn btn-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) return <Link to={to} className={classes} onClick={onClick}>{children}</Link>
  if (href) return <a href={href} className={classes} onClick={onClick}>{children}</a>
  return <button type={type} className={classes} onClick={onClick} disabled={disabled}>{children}</button>
}
