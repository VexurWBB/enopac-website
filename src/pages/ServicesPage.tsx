import BookingButton from '../components/ui/BookingButton'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import CTASection from '../components/ui/CTASection'
import ServiceShowcase from '../components/ui/ServiceShowcase'
import FeeRail from '../components/ui/FeeRail'
import Reveal from '../components/ui/Reveal'
import { services } from '../data/services'
import { heroImages } from '../data/heroImages'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Tailored support for <span className="gold">every type of investor</span></>}
        description="From portfolio management to acquisitions and development — independent services with transparent fee structures."
        image={heroImages.services.src}
        imageAlt={heroImages.services.alt}
        imageCaption="Property Management · Buyers Agency · Development"
        pills={['3 Service Lines', 'Transparent Fees', 'WA & VIC']}
        actions={<BookingButton />}
      />

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <ServiceShowcase services={services} />
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface section-light">
        <div className="section-container">
          <Reveal>
            <SectionHeader
              eyebrow="Fee Structure"
              title="Transparent pricing, upfront"
              subtitle="No hidden commissions. Every fee model is explained before you commit."
              centered
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <FeeRail services={services} />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CTASection title="Not sure which service is right for you?" />
      </Reveal>
    </>
  )
}
