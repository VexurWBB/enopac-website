import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import { listedRentals, getApplicationUrl } from '../data/rentals'
import { site } from '../data/site'
import './rentals.css'

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
            <div className="rental-photo rental-photo--detail mt-10">
              {property.photo ? <img src={property.photo.src} alt={property.photo.alt} /> : <><span className="rental-photo-code" aria-hidden="true">{property.state}</span><span className="eyebrow">Photos coming soon</span></>}
            </div>
          </div>
          <div className="card rental-application">
            <p className="eyebrow">Enopac Property Management</p>
            <h2 className="accordion-title mt-4">Interested in a room?</h2>
            <p className="section-subtitle">Contact our team for current availability, rent and room details at this property.</p>
            {applicationUrl ? <>
              <p className="section-subtitle">Complete our application on Google Forms and include {property.street}, {property.suburb} as your preferred property.</p>
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
