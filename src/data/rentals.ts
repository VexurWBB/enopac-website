export type RentalProperty = {
  slug: string
  street: string
  suburb: string
  state: 'WA' | 'VIC'
  published: boolean
  photo?: { src: string; alt: string }
  applicationUrl?: string
}

// Add Matt's Google Form URL here when supplied. A property can override it below.
export const rentalApplicationUrl: string = ''

// Eleven slots: ten supplied locations and one unpublished slot awaiting details.
// Photos and availability must be confirmed before advertising individual rooms.
export const rentalProperties: RentalProperty[] = [
  { slug: 'commander-drive-alkimos', street: 'Commander Drive', suburb: 'Alkimos', state: 'WA', published: true },
  { slug: 'bleiberg-way-alkimos', street: 'Bleiberg Way', suburb: 'Alkimos', state: 'WA', published: true },
  { slug: 'santorini-promenade-alkimos', street: 'Santorini Promenade', suburb: 'Alkimos', state: 'WA', published: true },
  { slug: 'pipon-way-eglinton', street: 'Pipon Way', suburb: 'Eglinton', state: 'WA', published: true },
  { slug: 'santa-clara-clarkson', street: 'Santa Clara', suburb: 'Clarkson', state: 'WA', published: true },
  { slug: 'haslam-street-brabham', street: 'Haslam Street', suburb: 'Brabham', state: 'WA', published: true },
  { slug: 'lambeth-circle-wellard', street: 'Lambeth Circle', suburb: 'Wellard', state: 'WA', published: true },
  { slug: 'newsham-grove-lakelands', street: 'Newsham Grove', suburb: 'Lakelands', state: 'WA', published: true },
  { slug: 'gibson-street-mandurah', street: 'Gibson Street', suburb: 'Mandurah', state: 'WA', published: true },
  { slug: 'tower-avenue-frankston', street: 'Tower Avenue', suburb: 'Frankston', state: 'VIC', published: true },
  { slug: 'property-11', street: '', suburb: '', state: 'WA', published: false },
]

export const listedRentals = rentalProperties.filter((property) => property.published)

export function getApplicationUrl(property: RentalProperty): string | undefined {
  const value = property.applicationUrl || rentalApplicationUrl
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}
