import Button from '../components/ui/Button'
import BookingButton from '../components/ui/BookingButton'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import CTASection from '../components/ui/CTASection'
import EditorialSplit from '../components/ui/EditorialSplit'
import CheckList from '../components/ui/CheckList'
import FeatureAccordion from '../components/ui/FeatureAccordion'
import RegionPanels from '../components/ui/RegionPanels'
import Reveal from '../components/ui/Reveal'
import { site } from '../data/site'
import { heroImages, sectionImages } from '../data/heroImages'

const whyFeatures = [
  {
    number: '01',
    title: '8-Figure Portfolio Experience',
    summary: 'Deep expertise across property purchasing, management, and development — backed by real portfolio results.',
    details: 'Our directors have an eight-figure personal property portfolio. Their first-hand experience with complex trust structures helps them understand how a purchase fits a broader investment plan.',
    bullets: [
      'Over seven years of active hands-on investing across WA and VIC',
      'First-hand experience with complex trust structures in their own portfolio',
      'Understands what makes a property perform — and what hidden issues can derail returns',
      'Skilled in reading contracts, comparable sales, and market cycles',
      'Guidance grounded in real transactions, not theory',
    ],
  },
  {
    number: '02',
    title: 'Truly Independent',
    summary: 'We work exclusively for investors. No seller commissions, no conflicts of interest.',
    details: 'As your property partner, our loyalty is tied entirely to securing the right outcomes for you.',
    bullets: [
      'No commissions from developers, agents, or vendors — ever',
      'Honest advice on when to walk away',
      'Transparent fee structure discussed upfront',
      'We advocate with one goal: protect your position',
    ],
  },
  {
    number: '03',
    title: 'Holistic Approach',
    summary: 'One point of contact for full turnkey investment support, shaped around your goals and timeline.',
    details: 'We connect acquisition, management and development services, and can introduce you to trusted professional partners for accounting, lending and settlement. We work to your timeline, with no sales quotas or fulfilment targets driving the decision.',
    bullets: [
      'Considers borrowing capacity and future plans',
      'Factors in rental yield, capital growth, and development potential',
      'Trusted referrals for accounting, lending and settlement',
      'The right decision at your pace, never a rushed transaction',
      'Clear, consistent communication throughout',
    ],
  },
  {
    number: '04',
    title: 'Boutique and Client-Focused',
    summary: 'Personal attention from a small team that takes time to understand your goals.',
    details: 'We keep the relationship personal and tailor our work to your position, priorities and pace.',
    bullets: [
      'Direct access to our team',
      'Advice tailored to your investment brief',
      'A long-term relationship beyond a single transaction',
    ],
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Your advocate.<br /><span className="gold">Your advantage.</span></>}
        description="Independent property services built on deep investing expertise — exclusively on your side of every transaction."
        image={heroImages.about.src}
        imageAlt={heroImages.about.alt}
        pills={['7+ Years Experience', 'Boutique & Client-Focused', 'WA & VIC']}
        actions={
          <>
            <BookingButton />
            <Button to="/contact" variant="outline">Meet our team</Button>
          </>
        }
      />

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <EditorialSplit
              reverse
              eyebrow="Meet our team"
              badge={`WA Licence ${site.licence}`}
              title="A property partner who thinks beyond the purchase."
              subtitle="Our directors have an eight-figure personal portfolio and over seven years of active investing. Their experience with complex trust structures in their own portfolio helps us consider the right property and structure for your goals."
              image={sectionImages.portfolio}
            >
              <CheckList items={['Off-market access', 'Portfolio strategy guidance', 'Expert negotiation', 'WA & VIC coverage']} />
              <div className="hero-actions">
                <BookingButton />
              </div>
            </EditorialSplit>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface section-light">
        <div className="section-container">
          <Reveal>
            <SectionHeader eyebrow="Why Choose Us" title="What sets us apart" centered />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-14" style={{ maxWidth: '48rem', margin: '3.5rem auto 0' }}>
              <FeatureAccordion features={whyFeatures} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <SectionHeader
              eyebrow="Service Areas"
              title={<>WA &amp; VIC — <span className="text-gold">two markets, one approach</span></>}
              subtitle="We support investors across Western Australia and Victoria."
              centered
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <RegionPanels />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CTASection title={<>Let&apos;s talk about<br />your next move.</>} />
      </Reveal>
    </>
  )
}
