import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import BookingButton from '../components/ui/BookingButton'
import LandingHero from '../components/ui/LandingHero'
import SectionHeader from '../components/ui/SectionHeader'
import CTASection from '../components/ui/CTASection'
import ArrowIcon from '../components/ui/ArrowIcon'
import CheckList from '../components/ui/CheckList'
import StatsBand from '../components/ui/StatsBand'
import ServiceOfferSlider from '../components/ui/ServiceOfferSlider'
import EditorialSplit from '../components/ui/EditorialSplit'
import DifferenceRail from '../components/ui/DifferenceRail'
import FaqAccordion from '../components/ui/FaqAccordion'
import Reveal from '../components/ui/Reveal'
import { homeFaqItems } from '../data/faq'
import { heroImages, sectionImages } from '../data/heroImages'

const differenceItems = [
  { num: '01', title: 'Boutique by Design', desc: 'Client-focused support shaped around your goals, with direct access to our team.' },
  { num: '02', title: '100% Investor-Side', desc: 'Every search, negotiation, and recommendation is made exclusively in your interest.' },
  { num: '03', title: 'Skin in the Game', desc: 'Our directors bring eight-figure personal portfolio experience.' },
  { num: '04', title: 'Connected Support', desc: 'Property services with trusted referrals for accounting, lending and settlement.' },
]

export default function HomePage() {
  return (
    <>
      <LandingHero
        eyebrow="WA & VIC · Investor Focused"
        title={<>The right property,<br />the <span className="gold">right strategy.</span><br />The right partner.</>}
        description="A boutique, client-focused property firm for investors. Our directors bring eight-figure personal portfolio experience to property management, buyers agency and development."
        image={heroImages.home.src}
        imageAlt={heroImages.home.alt}
        trustItems={[
          'WA & VIC Coverage',
          'Off-Market Access',
          'Expert Negotiation',
          'Boutique & Client-Focused',
        ]}
        actions={
          <>
            <BookingButton />
            <Button to="/services" variant="outline">Learn More</Button>
          </>
        }
      />

      <Reveal>
        <StatsBand />
      </Reveal>

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <div className="page-hero-eyebrow-center-wrap mb-10 md:mb-12">
              <p className="eyebrow page-hero-eyebrow-center">What we Offer</p>
              <span className="page-hero-eyebrow-flare" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ServiceOfferSlider />
          </Reveal>
          <Reveal delay={160}>
            <div className="hero-actions center mt-10">
              <Button to="/services" variant="outline">View All Services</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <EditorialSplit
              eyebrow="About Enopac"
              title="Invest with clarity. Build with confidence."
              subtitle="Independent, client-focused property services backed by our directors' eight-figure personal portfolio and over seven years of active investing across WA and VIC."
              image={sectionImages.aboutStory}
              reverse
            >
              <CheckList items={['Off-market access', 'Transparent fee structures', 'Expert negotiation', 'WA & VIC coverage']} />
              <Link to="/about" className="editorial-cta">
                <span>Meet our team</span>
                <ArrowIcon />
              </Link>
            </EditorialSplit>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <SectionHeader
              eyebrow="The Enopac Difference"
              title={<>Independent expertise. <span className="text-gold">Built on experience.</span></>}
              centered
            />
          </Reveal>
          <Reveal delay={120}>
            <DifferenceRail items={differenceItems} />
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface section-light">
        <div className="section-container">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title={<>Common questions, <span className="text-gold">answered.</span></>}
              centered
            />
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion items={homeFaqItems} />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CTASection title={<>Your goals. Our mission.<br />Let&apos;s build your portfolio.</>} />
      </Reveal>
    </>
  )
}
