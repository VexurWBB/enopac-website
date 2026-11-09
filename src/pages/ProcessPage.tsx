import BookingButton from '../components/ui/BookingButton'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import CTASection from '../components/ui/CTASection'
import ProcessTimeline from '../components/ui/ProcessTimeline'
import Reveal from '../components/ui/Reveal'
import { heroImages } from '../data/heroImages'

const steps = [
  { num: '01', tag: 'Start Here', title: 'Discovery Call', desc: 'No obligation, just clarity. We understand your goals, budget, and timeline.' },
  { num: '02', tag: 'Plan', title: 'Strategy & Brief', desc: 'A detailed strategy with location analysis, finance considerations, and clear criteria.' },
  { num: '03', tag: 'Search', title: 'Property Search', desc: 'On-market and off-market shortlists matched to your brief.' },
  { num: '04', tag: 'Assess', title: 'Due Diligence', desc: 'Thorough assessment before you commit — inspections, appraisals, comparables.' },
  { num: '05', tag: 'Negotiate', title: 'Expert Negotiation', desc: 'Best outcome on your behalf — private treaty, auctions, and off-market deals.' },
  { num: '06', tag: 'Settle', title: 'Settlement Support', desc: 'Final inspections, handover, and guidance as you take ownership.' },
  { num: '07', tag: 'Grow', title: 'Manage & Develop', desc: 'Ongoing management and development opportunities to accelerate wealth building.' },
]

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={<>A clear path from <span className="gold">brief to portfolio</span></>}
        description="Seven structured steps — discovery call through settlement and beyond — so you always know what happens next."
        image={heroImages.process.src}
        imageAlt={heroImages.process.alt}
        imageCaption="7 steps from discovery to portfolio growth"
        pills={['Discovery Call', 'Strategy', 'Settlement', 'Ongoing Support']}
        actions={<BookingButton />}
      />

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <SectionHeader
              eyebrow="The Journey"
              title={<>Seven steps. <span className="text-gold">Zero guesswork.</span></>}
              subtitle="From first conversation to portfolio growth — every stage is structured, transparent, and investor-first."
              centered
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <ProcessTimeline steps={steps} />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CTASection title={<>Your goals. Our process.<br />Let&apos;s get started.</>} />
      </Reveal>
    </>
  )
}
