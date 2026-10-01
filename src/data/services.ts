export type Service = {
  slug: string
  abbr: string
  title: string
  shortDescription: string
  description: string
  fee: string
  features: string[]
  benefits: string[]
  process: { step: string; detail: string }[]
}

export const services: Service[] = [
  {
    slug: 'property-management',
    abbr: 'PM',
    title: 'Property Management',
    shortDescription:
      'Specialist co-living rentals, leasing and end-to-end property management.',
    description:
      'Our property management service is built for investors who want their assets performing at their best without the day-to-day burden. We specialise in co-living rentals and handle leasing, sourcing new tenants, maintenance and reporting with the same care we apply to our own portfolio.',
    fee: 'Percentage-based fee',
    features: [
      'Co-living rental management',
      'Leasing and sourcing new tenants',
      'Comprehensive tenant screening',
      'Lease preparation and renewals',
      'Rent collection and arrears management',
      'Routine and entry/exit inspections',
      'Maintenance coordination and approvals',
      'Detailed monthly investor reporting',
      'Annual income and expense summaries',
    ],
    benefits: [
      'Maximise rental yield and minimise vacancy',
      'Reduce landlord stress with proactive management',
      'Transparent reporting you can trust',
      'Local market expertise across WA and VIC',
    ],
    process: [
      { step: 'Onboarding', detail: 'We review your property, set rental benchmarks, and establish your preferences.' },
      { step: 'Leasing and tenant placement', detail: 'We source and screen new tenants, including for co-living rentals.' },
      { step: 'Ongoing management', detail: 'Inspections, maintenance, and rent collection handled seamlessly.' },
      { step: 'Reporting', detail: 'Regular updates and financial summaries keep you fully informed.' },
    ],
  },
  {
    slug: 'buyers-agency',
    abbr: 'BA',
    title: 'Buyers Agency',
    shortDescription:
      'Exclusive representation to find, assess, and secure the right investment property.',
    description:
      'As your buyers agent, we work solely for you — not the seller. Drawing on our directors\' eight-figure personal portfolio experience and market knowledge across WA and VIC, we identify opportunities others miss and negotiate outcomes that protect your capital.',
    fee: 'Fixed fee structure',
    features: [
      'Investment strategy alignment',
      'Suburb and market analysis',
      'Off-market and on-market sourcing',
      'Comprehensive due diligence',
      'Building and pest inspection coordination',
      'Auction and private treaty negotiation',
      'Settlement support and handover',
    ],
    benefits: [
      'Save time and avoid costly mistakes',
      'Access off-market opportunities',
      'Negotiate from a position of strength',
      'Advice from active investors, not salespeople',
    ],
    process: [
      { step: 'Strategy session', detail: 'We define your goals, budget, and ideal asset profile.' },
      { step: 'Market search', detail: 'Targeted sourcing across your preferred regions and suburbs.' },
      { step: 'Due diligence', detail: 'Thorough assessment of every property before you commit.' },
      { step: 'Acquisition', detail: 'Expert negotiation and support through to settlement.' },
    ],
  },
  {
    slug: 'development',
    abbr: 'Dev',
    title: 'Development Opportunities',
    shortDescription:
      'Identify and execute value-add projects with experienced partners.',
    description:
      'For investors ready to move beyond buy-and-hold, our development service unlocks value-add opportunities — from subdivisions to small-scale developments. We assess feasibility, coordinate the process, and align structures that work for your portfolio.',
    fee: 'Equity and/or fixed fee',
    features: [
      'Site identification and feasibility studies',
      'Planning and approval guidance',
      'Builder and consultant coordination',
      'Budget and timeline management',
      'Investor syndicate structuring',
      'Exit strategy and sales planning',
      'Risk assessment and mitigation',
    ],
    benefits: [
      'Unlock equity growth beyond standard rental yield',
      'Partner with practitioners who invest alongside you',
      'Structured approach reduces development risk',
      'Flexible fee models to suit your project',
    ],
    process: [
      { step: 'Opportunity assessment', detail: 'We identify sites with genuine value-add potential.' },
      { step: 'Feasibility', detail: 'Detailed analysis of costs, returns, and timelines.' },
      { step: 'Execution', detail: 'Coordination of approvals, builders, and project delivery.' },
      { step: 'Realisation', detail: 'Hold, rent, or sell — aligned to your investment strategy.' },
    ],
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
