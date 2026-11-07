import { services } from './services'
import { listedRentals } from './rentals'
import { site } from './site'

export type RouteMeta = {
  path: string
  title: string
  description: string
  breadcrumb?: { name: string; path: string }[]
  service?: string
}

const serviceMeta: Record<string, { title: string; description: string }> = {
  'property-management': {
    title: 'Property Management for Investors in Perth | Enopac',
    description:
      'Investor-focused property management across Perth and WA, from people who hold their own portfolio. Talk to Enopac about your rental property.',
  },
  'buyers-agency': {
    title: 'Buyers Agent for Property Investors, Perth WA | Enopac',
    description:
      'Fixed fee buyers agency for investors: strategy, research, due diligence and negotiation. We work only for the buyer, across WA and Victoria.',
  },
  development: {
    title: 'Property Development Opportunities, WA | Enopac',
    description:
      'Development opportunities for investors, with fixed or equity based arrangements confirmed before work begins. Speak with the Enopac team.',
  },
}

const home = { name: 'Home', path: '/' }

export const seoRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Property Management and Buyers Agent, Perth WA | Enopac',
    description:
      'Property management, buyers agency and development opportunities for property investors in Perth, across WA and in Victoria. Book a free strategy session.',
  },
  {
    path: '/about',
    title: 'About Enopac Property Group, Perth WA',
    description:
      'A boutique, client-focused property firm for investors, licensed in Western Australia and Victoria. Meet the team behind Enopac Property Group.',
    breadcrumb: [home, { name: 'About', path: '/about' }],
  },
  {
    path: '/services',
    title: 'Property Services for Investors, WA and VIC | Enopac',
    description:
      'Property management, buyers agency and development opportunities for investors across Western Australia and Victoria. See how Enopac can help.',
    breadcrumb: [home, { name: 'Services', path: '/services' }],
  },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    title: serviceMeta[s.slug]?.title ?? `${s.title} | Enopac Property Group`,
    description: serviceMeta[s.slug]?.description ?? s.shortDescription,
    service: s.title,
    breadcrumb: [home, { name: 'Services', path: '/services' }, { name: s.title, path: `/services/${s.slug}` }],
  })),
  {
    path: '/contact',
    title: 'Contact Enopac Property Group | Book a Strategy Session',
    description: `Book a free strategy session with Enopac Property Group, or call ${site.phone}. Property services across Western Australia and Victoria.`,
    breadcrumb: [home, { name: 'Contact', path: '/contact' }],
  },
  {
    path: '/rooms-for-rent',
    title: 'Rooms for Rent in Perth and Mandurah | Enopac',
    description:
      'Rooms for rent in Alkimos, Eglinton, Clarkson, Brabham, Wellard, Lakelands and Mandurah, plus Frankston VIC. Contact Enopac for current availability.',
    breadcrumb: [home, { name: 'Rooms for Rent', path: '/rooms-for-rent' }],
  },
  {
    path: '/apply',
    title: 'Room Application | Enopac Property Group',
    description: 'Apply for a room with Enopac Property Group. Complete a rental application for one or two people and provide supporting documents.',
    breadcrumb: [home, { name: 'Rooms for Rent', path: '/rooms-for-rent' }, { name: 'Apply', path: '/apply' }],
  },
  ...listedRentals
    .filter((r) => r.street)
    .map((r) => ({
      path: `/rooms-for-rent/${r.slug}`,
      title: `Rooms for Rent, ${r.street}, ${r.suburb} ${r.state} | Enopac`,
      description: `Rooms for rent at ${r.street}, ${r.suburb} ${r.state}. See the photos and contact Enopac Property Management for current availability, rent and room details.`,
      breadcrumb: [
        home,
        { name: 'Rooms for Rent', path: '/rooms-for-rent' },
        { name: `${r.street}, ${r.suburb}`, path: `/rooms-for-rent/${r.slug}` },
      ],
    })),
]

export function metaForPath(pathname: string): RouteMeta {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  return seoRoutes.find((r) => r.path === clean) ?? seoRoutes[0]
}
