import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import ArrowIcon from '../components/ui/ArrowIcon'
import Reveal from '../components/ui/Reveal'
import { heroImages } from '../data/heroImages'
import { listedRentals } from '../data/rentals'
import './rentals.css'

export default function RentalsPage() {
  const hero = heroImages['property-management']
  return (
    <>
      <PageHero
        eyebrow="Enopac Property Management"
        title={<>Find your <span className="gold">next room</span></>}
        description="Explore our rental locations across Western Australia and Victoria. Contact our team for current room availability."
        image={hero.src}
        imageAlt={hero.alt}
        actions={<Button href="#properties">Explore properties &rarr;</Button>}
      />
      <section id="properties" className="section-padding section-surface bg-dark rentals-section">
        <div className="section-container">
          <SectionHeader eyebrow="Rooms for Rent" title="Our rental locations" subtitle="Property photos and room details are coming soon. Select a location to find out how to apply." />
          {(['WA', 'VIC'] as const).map((state) => (
            <div className="rentals-region" key={state}>
              <h3 className="accordion-title">{state === 'WA' ? 'Western Australia' : 'Victoria'}</h3>
              <div className="grid-3 mt-6">
                {listedRentals.filter((property) => property.state === state).map((property) => (
                  <Reveal key={property.slug}>
                    <Link className="card rental-card" to={`/rooms-for-rent/${property.slug}`} aria-label={`View ${property.street}, ${property.suburb}`}>
                      <div className="rental-photo">
                        {property.photo ? <img src={property.photo.src} alt={property.photo.alt} loading="lazy" /> : <><span className="rental-photo-code" aria-hidden="true">{property.state}</span><span className="eyebrow">Photos coming soon</span></>}
                      </div>
                      <div className="rental-card-content">
                        <p className="eyebrow">{property.suburb} · {property.state}</p>
                        <h4 className="accordion-title mt-4">{property.street}</h4>
                        <p className="section-subtitle">Contact us for room availability.</p>
                        <div className="service-tile-footer"><span className="service-tile-fee">View property</span><ArrowIcon /></div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
