type SectionHeaderProps = {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ eyebrow, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`section-title mt-4 ${centered ? 'mx-auto' : ''}`}>{title}</h2>
      {subtitle && <p className={`section-subtitle ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </div>
  )
}
