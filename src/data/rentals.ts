export type RentalProperty = {
  slug: string
  street: string
  suburb: string
  state: 'WA' | 'VIC'
  published: boolean
  photos?: RentalPhoto[]
  coverPhoto?: RentalPhoto
  applicationUrl?: string
}

export type RentalPhoto = { src: string; alt: string }

const roomLabels: Record<string, string> = {
  kitchen: 'Kitchen',
  living: 'Living area',
  'living-dining': 'Living and dining',
  dining: 'Dining area',
  bedroom: 'Bedroom',
  bathroom: 'Bathroom',
  laundry: 'Laundry',
  outdoor: 'Outdoor area',
  backyard: 'Backyard',
  front: 'Front of the house',
  'local-area': 'Local area',
}

// Files live in public/images/rentals/<slug>/ and are named NN-room.webp.
// Order follows Matt's request: kitchen, living/dining, bedrooms, bathrooms, then extras.
function gallery(slug: string, street: string, files: string[]): RentalPhoto[] {
  return files.map((file) => {
    const room = file.replace(/^\d+-/, '').replace(/\.webp$/, '')
    return { src: `/images/rentals/${slug}/${file}`, alt: `${roomLabels[room] ?? 'Photo'} at ${street}` }
  })
}

// Shared application form. A property can override it below.
export const rentalApplicationUrl: string = '/apply'

// Eleven slots: ten supplied locations and one unpublished slot awaiting details.
// Photos and availability must be confirmed before advertising individual rooms.
export const rentalProperties: RentalProperty[] = [
  { slug: 'commander-drive-alkimos', street: 'Commander Drive', suburb: 'Alkimos', state: 'WA', published: true,
    photos: gallery('commander-drive-alkimos', 'Commander Drive', ['01-kitchen.webp', '02-living.webp', '03-living-dining.webp', '04-dining.webp', '05-laundry.webp']) },
  { slug: 'bleiberg-way-alkimos', street: 'Bleiberg Way', suburb: 'Alkimos', state: 'WA', published: true,
    photos: gallery('bleiberg-way-alkimos', 'Bleiberg Way', ['01-kitchen.webp', '02-bedroom.webp', '03-bedroom.webp', '04-bathroom.webp', '05-bathroom.webp', '06-laundry.webp', '07-local-area.webp']) },
  { slug: 'santorini-promenade-alkimos', street: 'Santorini Promenade', suburb: 'Alkimos', state: 'WA', published: true,
    coverPhoto: { src: '/images/rentals/santorini-promenade-alkimos/06-local-area.webp', alt: 'Coastal cafe and gardens near Santorini Promenade, Alkimos' },
    photos: gallery('santorini-promenade-alkimos', 'Santorini Promenade', ['01-kitchen.webp', '02-living-dining.webp', '03-bedroom.webp', '04-bedroom.webp', '05-bathroom.webp', '06-local-area.webp']) },
  { slug: 'pipon-way-eglinton', street: 'Pipon Way', suburb: 'Eglinton', state: 'WA', published: true },
  { slug: 'santa-clara-clarkson', street: 'Santa Clara', suburb: 'Clarkson', state: 'WA', published: true,
    photos: gallery('santa-clara-clarkson', 'Santa Clara', ['01-kitchen.webp', '02-living.webp', '03-dining.webp', '04-bedroom.webp', '05-bedroom.webp', '06-bedroom.webp', '07-bedroom.webp', '08-bedroom.webp', '09-bathroom.webp', '10-outdoor.webp']) },
  { slug: 'haslam-street-brabham', street: 'Haslam Street', suburb: 'Brabham', state: 'WA', published: true,
    photos: gallery('haslam-street-brabham', 'Haslam Street', ['01-kitchen.webp', '02-living.webp', '03-bedroom.webp', '04-bathroom.webp', '05-bathroom.webp', '06-laundry.webp', '07-front.webp']) },
  { slug: 'lambeth-circle-wellard', street: 'Lambeth Circle', suburb: 'Wellard', state: 'WA', published: true,
    photos: gallery('lambeth-circle-wellard', 'Lambeth Circle', ['01-kitchen.webp', '02-kitchen.webp', '03-living.webp', '04-bedroom.webp', '05-bathroom.webp', '06-laundry.webp', '07-outdoor.webp']) },
  { slug: 'newsham-grove-lakelands', street: 'Newsham Grove', suburb: 'Lakelands', state: 'WA', published: true,
    photos: gallery('newsham-grove-lakelands', 'Newsham Grove', ['01-kitchen.webp', '02-living.webp', '03-bedroom.webp', '04-bedroom.webp', '05-bathroom.webp', '06-laundry.webp', '07-backyard.webp', '08-front.webp']) },
  { slug: 'gibson-street-mandurah', street: 'Gibson Street', suburb: 'Mandurah', state: 'WA', published: true,
    photos: gallery('gibson-street-mandurah', 'Gibson Street', ['01-kitchen.webp', '02-living.webp', '03-living-dining.webp', '04-outdoor.webp']) },
  { slug: 'tower-avenue-frankston', street: 'Tower Avenue', suburb: 'Frankston', state: 'VIC', published: true,
    photos: gallery('tower-avenue-frankston', 'Tower Avenue', ['01-kitchen.webp', '02-bathroom.webp']) },
  { slug: 'property-11', street: '', suburb: '', state: 'WA', published: false },
]

export const listedRentals = rentalProperties.filter((property) => property.published)

export function getApplicationUrl(property: RentalProperty): string | undefined {
  const value = property.applicationUrl || rentalApplicationUrl
  if (!value) return undefined
  if (value === '/apply') return `/apply?property=${encodeURIComponent(`${property.street}, ${property.suburb}, ${property.state}`)}`
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}
