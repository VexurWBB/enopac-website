type ProcessStep = {
  num: string
  tag: string
  title: string
  desc: string
}

type ProcessTimelineProps = {
  steps: ProcessStep[]
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="process-timeline">
      <div className="process-timeline-spine" aria-hidden="true">
        <span className="process-timeline-spine-line" />
        <span className="process-timeline-spine-glow" />
      </div>

      <ol className="process-timeline-list">
        {steps.map((step, index) => (
          <li key={step.num} className="process-timeline-item">
            <div className="process-timeline-marker" aria-hidden="true">
              <span className="process-timeline-ring" />
              <span className="process-timeline-num">{step.num}</span>
            </div>

            <article className="process-timeline-card">
              <span className="process-timeline-watermark" aria-hidden="true">{step.num}</span>
              <span className="process-timeline-rail" aria-hidden="true" />

              <div className="process-timeline-card-head">
                <span className="process-timeline-tag">{step.tag}</span>
                {index === 0 && <span className="process-timeline-start">Start here</span>}
                {index === steps.length - 1 && <span className="process-timeline-end">Ongoing</span>}
              </div>

              <h2 className="process-timeline-title">{step.title}</h2>
              <p className="process-timeline-desc">{step.desc}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
