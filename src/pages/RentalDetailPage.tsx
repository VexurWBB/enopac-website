import ResponsiveImage from '../components/ui/ResponsiveImage'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import { listedRentals, getApplicationUrl, type RentalPhoto } from '../data/rentals'
import { site } from '../data/site'
import './rentals.css'

function RentalGallery({ photos }: { photos: RentalPhoto[] }) {
  const [index, setIndex] = useState(0)
  const current = photos[index]
  const step = (delta: number) => setIndex((index + delta + photos.length) % photos.length)

  return (
    <div className="rental-gallery mt-10">
      <div className="rental-photo rental-photo--detail">
        <ResponsiveImage src={current.src} alt={current.alt} fetchPriority="high" />
        {photos.length > 1 && <>
          <button type="button" className="rental-gallery-nav rental-gallery-nav--prev" onClick={() => step(-1)} aria-label="Previous photo">&lsaquo;</button>
          <button type="button" className="rental-gallery-nav rental-gallery-nav--next" onClick={() => step(1)} aria-label="Next photo">&rsaquo;</button>
          <span className="rental-photo-count">{index + 1} / {photos.length}</span>
        </>}
      </div>
      <p className="rental-gallery-caption">{current.alt}</p>
      {photos.length > 1 && <div className="rental-gallery-thumbs">
        {photos.map((photo, i) => (
          <button type="button" key={photo.src} className="rental-gallery-thumb" aria-current={i === index} aria-label={`Show ${photo.alt}`} onClick={() => setIndex(i)}>
            <ResponsiveImage src={photo.src} alt="" sizes="100px" loading="lazy" />
          </button>
        ))}
      </div>}
    </div>
  )
}

export default function RentalDetailPage() {
  const { slug } = useParams()
  const property = listedRentals.find((item) => item.slug === slug)
  if (!property) return <section className="section-padding section-surface bg-dark"><div className="section-container"><h1 className="section-title">Property not found</h1><div className="mt-6"><Button to="/rooms-for-rent">View rental locations</Button></div></div></section>
  const applicationUrl = getApplicationUrl(property)

  return (
    <section className="section-padding section-surface bg-dark">
      <div className="section-container">
        <Link className="service-showcase-link" to="/rooms-for-rent">Back to rental locations</Link>
        <div className="split-grid mt-10">
          <div>
            <p className="eyebrow">{property.suburb} · {property.state}</p>
            <h1 className="hero-title mt-4">{property.street}</h1>
            <p className="section-subtitle">{property.street}, {property.suburb}, {property.state}</p>
            {property.photos?.length ? <RentalGallery key={property.slug} photos={property.photos} /> : <div className="rental-photo rental-photo--detail mt-10">
              <span className="rental-photo-code" aria-hidden="true">{property.state}</span><span className="eyebrow">Photos coming soon</span>
            </div>}
          </div>
          <div className="card rental-application">
            <p className="eyebrow">Enopac Property Management</p>
            <h2 className="accordion-title mt-4">Interested in a room?</h2>
            <p className="section-subtitle">Contact our team for current availability, rent and room details at this property.</p>
            {applicationUrl ? <>
              <p className="section-subtitle">Complete our application and include {property.street}, {property.suburb} as your preferred property.</p>
              <div className="mt-6"><Button href={applicationUrl}>Apply for a room &rarr;</Button></div>
            </> : <>
              <p className="section-subtitle">Online applications are coming soon. You can contact our team in the meantime.</p>
              <div className="mt-6"><Button disabled>Applications coming soon</Button></div>
            </>}
            <div className="hero-actions mt-6">
              <Button href={`mailto:${site.email}?subject=${encodeURIComponent(`Room enquiry: ${property.street}, ${property.suburb}`)}`} variant="outline">Enquire about this property</Button>
              <a className="service-showcase-link" href={site.phoneHref}>{site.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
