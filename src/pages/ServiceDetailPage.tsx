import { Navigate, useParams } from 'react-router-dom'
import BookingButton from '../components/ui/BookingButton'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import CheckList from '../components/ui/CheckList'
import Reveal from '../components/ui/Reveal'
import { getService } from '../data/services'
import { heroImages, type HeroImageKey } from '../data/heroImages'

const serviceHeroKeys: Record<string, HeroImageKey> = {
  'property-management': 'property-management',
  'buyers-agency': 'buyers-agency',
  development: 'development',
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? getService(slug) : undefined
  if (!service) return <Navigate to="/services" replace />

  const imageKey = serviceHeroKeys[service.slug] ?? 'services'
  const hero = heroImages[imageKey]

  return (
    <>
      <PageHero
        eyebrow={`${service.abbr} · ${service.fee}`}
        title={service.title}
        description={service.shortDescription}
        image={hero.src}
        imageAlt={hero.alt}
        imageCaption={service.fee}
        actions={<><BookingButton />{service.slug === 'property-management' && <Button to="/rooms-for-rent" variant="outline">View rooms for rent</Button>}</>}
      />

      <section className="section-padding section-surface bg-dark">
        <div className="section-container">
          <Reveal>
            <div className="split-grid">
              <div>
                <h2 className="section-title">Overview</h2>
                <p className="section-subtitle">{service.description}</p>
                <h3 className="accordion-title mt-10">What&apos;s included</h3>
                <CheckList items={service.features} className="checklist--cols-2" />
              </div>
              <div className="card" style={{ position: 'sticky', top: '6rem', alignSelf: 'start' }}>
                <h3 className="accordion-title">Key benefits</h3>
                <CheckList items={service.benefits} />
                <p className="eyebrow mt-6">{service.fee}</p>
                <div className="mt-6">
                  <BookingButton />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding section-surface section-light">
        <div className="section-container">
          <Reveal>
            <h2 className="section-title text-center">How it works</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid-4 mt-14">
              {service.process.map((step, i) => (
                <div key={step.step} className="card">
                  <span className="accordion-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="accordion-title mt-4">{step.step}</h3>
                  <p className="section-subtitle" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{step.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CTASection title={`Ready to get started with ${service.title}?`} />
      </Reveal>
    </>
  )
}
