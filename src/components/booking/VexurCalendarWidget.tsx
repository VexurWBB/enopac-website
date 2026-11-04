import { useEffect, useRef, useState } from 'react'
import { vexurCalendar } from '../../data/vexur'
import { site } from '../../data/site'
import { ensureVexurCalendarLoaded, initVexurCalendarWidgets } from '../../lib/vexurCalendarLoader'
import Button from '../ui/Button'

type VexurCalendarWidgetProps = {
  className?: string
}

export default function VexurCalendarWidget({ className = '' }: VexurCalendarWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const host = hostRef.current
    if (!host) return

    const timeout = window.setTimeout(() => {
      controller.abort()
      if (!cancelled) setStatus('unavailable')
    }, 15000)

    const observer = new MutationObserver(() => {
      if (!cancelled && host.querySelector('[data-vx-widget], iframe')) {
        window.clearTimeout(timeout)
        setStatus('ready')
      }
    })
    observer.observe(host, { childList: true, subtree: true })

    async function mount() {
      try {
        const params = new URLSearchParams({ calendar_widget_build_id: vexurCalendar.buildId, fresh: '1' })
        const response = await fetch(`${vexurCalendar.embedOrigin}/embed-api/widget-config?${params}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Calendar configuration unavailable')
        const config = await response.json()
        if (config.calendarConnected === false) throw new Error('Calendar is not connected')
        if (cancelled || !host) return
        // Wait for a connected calendar before allowing the loader to mount it.
        host.classList.add('vexur-widget')
        await ensureVexurCalendarLoaded()
        if (!cancelled) initVexurCalendarWidgets()
      } catch {
        window.clearTimeout(timeout)
        if (!cancelled) setStatus('unavailable')
      }
    }
    void mount()

    return () => {
      cancelled = true
      controller.abort()
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <div className={`vexur-calendar-shell${status !== 'loading' ? ' vexur-calendar-shell--ready' : ''}`}>
      {status === 'loading' && (
        <div className="vexur-calendar-shell__loader" role="status" aria-label="Loading booking calendar">
          <div className="vexur-calendar-shell__track" />
        </div>
      )}
      {status === 'unavailable' && (
        <div className="card" role="status">
          <p className="eyebrow">Arrange a call</p>
          <h2 className="accordion-title mt-4">Let&apos;s find a time to talk</h2>
          <p className="section-subtitle">Online booking is currently unavailable. Contact our team to arrange your free strategy session.</p>
          <div className="hero-actions mt-6">
            <Button href={site.phoneHref}>Call {site.phone}</Button>
            <Button href={`mailto:${site.email}?subject=Strategy%20session%20enquiry`} variant="outline">Email our team</Button>
          </div>
        </div>
      )}
      <div
        ref={hostRef}
        hidden={status === 'unavailable'}
        className={className || undefined}
        data-widget="calendar"
        data-agent={vexurCalendar.agentId}
        data-loader="v2"
        data-theme={vexurCalendar.theme}
        data-primary-color={vexurCalendar.primaryColor}
        data-show-branding="true"
        data-consent="pending"
        data-vx-no-fallback="true"
        data-vx-param-calendar-widget-build-id={vexurCalendar.buildId}
        data-vx-param-renderer={vexurCalendar.renderer}
        data-vx-param-v={vexurCalendar.version}
      />
    </div>
  )
}
