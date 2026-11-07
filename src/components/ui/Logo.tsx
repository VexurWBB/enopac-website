import { useState } from 'react'

type LogoProps = {
  className?: string
  size?: 'nav' | 'sm' | 'lg'
}

function LogoText({ className = '', size = 'sm' }: LogoProps) {
  const sizeClass =
    size === 'lg' ? 'logo-lg' : size === 'nav' ? 'logo-nav' : ''
  return (
    <div className={`${sizeClass} ${className}`.trim()}>
      <div className="logo-main">ENOPAC</div>
      <div className="logo-line" />
      <div className="logo-sub">PROPERTY GROUP</div>
    </div>
  )
}

export default function Logo({ className = '', size = 'sm' }: LogoProps) {
  const [useImage, setUseImage] = useState(true)

  if (useImage) {
    return (
      <img
        src="/logo-420.webp"
        srcSet="/logo-160.webp 160w, /logo-240.webp 240w, /logo-420.webp 420w"
        sizes={size === 'lg' ? '211px' : size === 'nav' ? '(min-width: 1024px) 80px, (min-width: 768px) 73px, 66px' : '(min-width: 1024px) 119px, (min-width: 768px) 106px, 93px'}
        loading={size === 'sm' ? 'lazy' : 'eager'}
        width={420}
        height={255}
        alt="Enopac Property Group"
        className={`logo-img logo-img--${size}${className ? ` ${className}` : ''}`}
        decoding="async"
        onError={() => setUseImage(false)}
      />
    )
  }

  return <LogoText className={className} size={size} />
}
