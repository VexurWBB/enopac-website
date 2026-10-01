type Region = {
  code: string
  name: string
  tagline: string
  highlight: string
  image: string
}

const regions: Region[] = [
  {
    code: 'WA',
    name: 'Western Australia',
    tagline: 'Support across Western Australia',
    highlight: 'Strong rental demand across metro and coastal markets',
    image: '/images/region-wa.jpg',
  },
  {
    code: 'VIC',
    name: 'Victoria',
    tagline: 'Support across Victoria',
    highlight: 'Diverse stock from inner-city to regional yield plays',
    image: '/images/region-vic.jpg',
  },
]

export default function RegionPanels() {
  return (
    <div className="region-panels">
      <div className="region-panels-bridge" aria-hidden="true">
        <span />
        <span>Dual-state coverage</span>
        <span />
      </div>

      {regions.map((region) => (
        <article key={region.code} className="region-panel">
          <div className="region-panel-bg" aria-hidden="true">
            <img src={region.image} alt="" loading="lazy" />
          </div>
          <span className="region-panel-watermark" aria-hidden="true">{region.code}</span>
          <span className="region-panel-rail" aria-hidden="true" />

          <div className="region-panel-head">
            <span className="region-panel-code">{region.code}</span>
            <div>
              <h3 className="region-panel-title">{region.name}</h3>
              <p className="region-panel-tagline">{region.tagline}</p>
            </div>
          </div>

          <div className="region-panel-body">
            <p className="region-panel-highlight">{region.highlight}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
