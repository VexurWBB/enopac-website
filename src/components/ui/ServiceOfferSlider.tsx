import { useState } from 'react'
import Button from './Button'
import BookingButton from './BookingButton'
import CheckList from './CheckList'
import EditorialSplit from './EditorialSplit'
import { services } from '../../data/services'
import { heroImages, sectionImages } from '../../data/heroImages'

const serviceImages: Record<string, { src: string; alt: string }> = {
  'property-management': heroImages['property-management'],
  'buyers-agency': sectionImages.buyersAgency,
  development: heroImages.development,
}

/** Manual navigation keeps reading stable and inactive images off the network. */
export default function ServiceOfferSlider() {
  const [index, setIndex] = useState(0)
  const goTo = (next: number) => setIndex((next + services.length) % services.length)
  const service = services[index]
  return <div className="service-offer-slider" aria-roledescription="carousel" aria-label="Our services">
    <div className="service-offer-slider-frame">
      <button type="button" className="service-offer-slider-arrow service-offer-slider-arrow--prev" onClick={() => goTo(index - 1)} aria-label="Previous service">&larr;</button>
      <div className="service-offer-slider-viewport">
        <div className="service-offer-slider-track">
          <div className="service-offer-slider-slide" aria-live="polite" aria-label={service.title}>
            <EditorialSplit badge={service.slug === 'buyers-agency' ? 'Most Chosen' : undefined} title={service.title} subtitle={service.shortDescription} image={serviceImages[service.slug]}>
              <CheckList items={service.features.slice(0, 5)} />
              <div className="hero-actions"><BookingButton /><Button to={`/services/${service.slug}`} variant="outline">View details</Button></div>
            </EditorialSplit>
          </div>
        </div>
      </div>
      <button type="button" className="service-offer-slider-arrow service-offer-slider-arrow--next" onClick={() => goTo(index + 1)} aria-label="Next service">&rarr;</button>
    </div>
    <div className="service-offer-slider-dots" aria-label="Select service">
      {services.map((item, i) => <button key={item.slug} type="button" aria-pressed={i === index} className={`service-offer-slider-dot${i === index ? ' is-active' : ''}`} onClick={() => goTo(i)} aria-label={item.title} />)}
    </div>
    <noscript><p><a href="/services">View all our services</a></p></noscript>
  </div>
}
