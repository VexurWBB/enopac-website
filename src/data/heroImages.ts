/** Page imagery: supplied WA property photos and licensed Australian stock. */

export const heroImages = {
  home: {
    src: '/images/hero-home.jpg',
    alt: 'Retro urban night scene — Enopac Property Group',
  },
  about: {
    src: '/images/rentals/newsham-grove-lakelands/08-front.webp',
    alt: 'Contemporary home in Lakelands, Western Australia',
  },
  services: {
    src: '/images/hero-services.jpg',
    alt: 'Contemporary apartment building in an investment corridor',
  },
  process: {
    src: '/images/hero-process.jpg',
    alt: 'Elegant property interior at handover',
  },
  contact: {
    src: '/images/hero-contact.jpg',
    alt: 'Modern commercial building exterior',
  },
  'property-management': {
    src: '/images/hero-property-management.jpg',
    alt: 'Well-maintained rental property exterior',
  },
  'buyers-agency': {
    src: '/images/rentals/newsham-grove-lakelands/08-front.webp',
    alt: 'Modern single-storey home in Lakelands, Western Australia',
  },
  development: {
    src: '/images/development-timber-vic.jpg',
    alt: 'Timber framing and roof trusses at a new home in Clyde North, Victoria',
  },
} as const

export const sectionImages = {
  buyersAgency: {
    src: '/images/section-buyers.jpg',
    alt: 'Bright living space in a newly acquired investment property',
  },
  aboutStory: {
    src: '/images/section-about.jpg',
    alt: 'Open-plan home showcasing quality finishes',
  },
  portfolio: {
    src: '/images/rentals/haslam-street-brabham/07-front.webp',
    alt: 'Residential property in Brabham, Western Australia',
  },
} as const

export type HeroImageKey = keyof typeof heroImages
