import { vexurCalendar } from '../data/vexur'

let loadPromise: Promise<void> | null = null

function isScriptAlreadyFetched(url: string): boolean {
  return performance.getEntriesByName(url).some(
    (entry) => (entry as PerformanceResourceTiming).responseEnd > 0,
  )
}

function waitForScript(script: HTMLScriptElement): Promise<void> {
  if (script.dataset.loaded === 'true') return Promise.resolve()

  return new Promise((resolve, reject) => {
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      resolve()
    }, { once: true })
    script.addEventListener('error', () => reject(new Error('Vexur calendar failed to load')), { once: true })
  })
}

/** Start loading the Vexur embed script as early as possible. */
export function preloadVexurCalendar(): void {
  ensureVexurCalendarLoaded().catch(() => {})
}

export function ensureVexurCalendarLoaded(): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${vexurCalendar.loaderUrl}"]`,
    )

    if (existing) {
      if (existing.dataset.loaded === 'true' || isScriptAlreadyFetched(vexurCalendar.loaderUrl)) {
        existing.dataset.loaded = 'true'
        resolve()
        return
      }

      waitForScript(existing).then(resolve).catch(reject)
      return
    }

    const script = document.createElement('script')
    script.src = vexurCalendar.loaderUrl
    script.integrity = vexurCalendar.loaderIntegrity
    script.crossOrigin = 'anonymous'
    script.async = true
    script.dataset.vexurLoader = 'true'

    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      resolve()
    }, { once: true })
    script.addEventListener('error', () => reject(new Error('Vexur calendar failed to load')), { once: true })

    document.head.appendChild(script)
  })

  return loadPromise
}

/** Ask the Vexur loader to mount any new `.vexur-widget` nodes (SPA-safe). */
export function initVexurCalendarWidgets(): void {
  const win = window as Window & {
    VexurWidgetLoader?: { mountAll?: () => void; refresh?: () => void }
  }

  win.VexurWidgetLoader?.mountAll?.()
  win.VexurWidgetLoader?.refresh?.()
}
