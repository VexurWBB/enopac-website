const MIN_SPLASH_MS = 700

export function dismissAppSplash(): void {
  const splash = document.getElementById('app-splash')
  if (!splash || splash.dataset.dismissed === 'true') return

  splash.dataset.dismissed = 'true'

  const started = Number(splash.dataset.started ?? Date.now())
  const elapsed = Date.now() - started
  const delay = Math.max(0, MIN_SPLASH_MS - elapsed)

  window.setTimeout(() => {
    splash.classList.add('app-splash--hide')
    splash.addEventListener(
      'transitionend',
      () => splash.remove(),
      { once: true },
    )
  }, delay)
}
