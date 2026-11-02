export const site = {
  name: 'Enopac Property Group',
  tagline: 'Property Group',
  email: 'office@enopacpg.com',
  phone: '(08) 6245 7931',
  phoneHref: 'tel:+61862457931',
  contact: 'Our team',
  url: 'https://enopacpg.com',
  licence: 'RA85608',
  // Both current on the WA and Victorian public registers, 2 Nov 2026.
  licences: [
    { state: 'WA', number: 'RA85608' },
    { state: 'VIC', number: '096477L' },
  ],
  state: 'WA',
  regions: ['Western Australia', 'Victoria'],
  cta: 'Book a free strategy session',
  social: {
    facebook: 'https://www.facebook.com/enopacpg',
  },
} as const
