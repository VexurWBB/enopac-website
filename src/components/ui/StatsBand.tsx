import type { ReactElement } from 'react'

type StatIconName = 'portfolio' | 'experience' | 'investor' | 'coverage'

type Stat = {
  value: string
  label: string
  icon: StatIconName
}

const stats: Stat[] = [
  {
    value: '8-Figure',
    label: 'Personal portfolio',
    icon: 'portfolio',
  },
  {
    value: '7+',
    label: 'Years active investing',
    icon: 'experience',
  },
  {
    value: '100%',
    label: 'Investor-side only',
    icon: 'investor',
  },
  {
    value: '2',
    label: 'States · WA & VIC',
    icon: 'coverage',
  },
]

const stroke = 1.75

function StatIcon({ name }: { name: StatIconName }) {
  const paths: Record<StatIconName, ReactElement> = {
    portfolio: (
      <>
        <path d="M5 18h14" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        <path
          d="M8 15.5l2.75-3 2.5 2L16.5 9"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14.5 9H17v2.5" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    experience: (
      <>
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth={stroke} />
        <path d="M12 8v4.5l3 1.75" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    investor: (
      <path
        d="M12 6.25 14.1 10.5l4.65.7-3.35 3.2.8 4.6L12 16.75l-4.2 2.25.8-4.6-3.35-3.2 4.65-.7L12 6.25Z"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
    ),
    coverage: (
      <>
        <path
          d="M12 5.5c-3.15 0-5.75 2.05-5.75 4.65 0 3.35 5.75 7.35 5.75 7.35s5.75-4 5.75-7.35C17.75 7.55 15.15 5.5 12 5.5Z"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10.15" r="1.85" stroke="currentColor" strokeWidth={stroke} />
      </>
    ),
  }

  return (
    <span className="stats-strip-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {paths[name]}
      </svg>
    </span>
  )
}

export default function StatsBand() {
  return (
    <section className="stats-strip" aria-label="Key statistics">
      <div className="section-container">
        <ul className="stats-strip-grid">
          {stats.map((s) => (
            <li key={s.label} className="stats-strip-card">
              <StatIcon name={s.icon} />
              <span className="stats-strip-value">{s.value}</span>
              <span className="stats-strip-flare" aria-hidden="true" />
              <span className="stats-strip-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
