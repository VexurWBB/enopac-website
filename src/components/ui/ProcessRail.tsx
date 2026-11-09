type Step = {
  num: string
  label: string
  title: string
  desc: string
}

type ProcessRailProps = {
  steps: Step[]
}

export default function ProcessRail({ steps }: ProcessRailProps) {
  return (
    <div className="process-rail-wrap">
      <div className="process-rail-track" aria-hidden="true">
        <span className="process-rail-track-line" />
        <span className="process-rail-track-glow" />
      </div>
      <div className="process-rail" role="list">
        {steps.map((s, i) => (
          <div key={s.num} className="process-rail-item" role="listitem">
            <span className="process-rail-watermark" aria-hidden="true">{s.num}</span>
            <div className="process-rail-marker">
              <span className="process-rail-ring" aria-hidden="true" />
              <span className="process-rail-num">{s.num}</span>
              {i < steps.length - 1 && <span className="process-rail-line" aria-hidden="true" />}
            </div>
            <div className="process-rail-body">
              <p className="process-rail-label">{s.label}</p>
              <h3 className="process-rail-title">{s.title}</h3>
              <p className="process-rail-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
