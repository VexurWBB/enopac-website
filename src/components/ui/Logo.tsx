import { useEffect, useState } from 'react'

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
  const [useImage, setUseImage] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setUseImage(true)
    img.onerror = () => setUseImage(false)
    img.src = '/logo.png'
  }, [])

  if (useImage) {
    return (
      <img
        src="/logo.png"
        alt="Enopac Property Group"
        className={`logo-img logo-img--${size}${className ? ` ${className}` : ''}`}
        decoding="async"
        onError={() => setUseImage(false)}
      />
    )
  }

  return <LogoText className={className} size={size} />
}
