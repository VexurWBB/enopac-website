import { useEffect, useRef } from 'react'
import VexurCalendarWidget from './VexurCalendarWidget'

type BookingModalProps = { open: boolean; onClose: () => void }

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [open])

  return <dialog ref={ref} className="booking-modal" aria-label="Book a strategy session" onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={event => {
    if (event.key !== 'Tab') return
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]'))
      .filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0)
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }}>
    <button type="button" className="booking-modal-backdrop" tabIndex={-1} aria-label="Close booking" onClick={onClose} />
    <div className="booking-modal-content">
      <button type="button" className="booking-modal-close" aria-label="Close" onClick={onClose}>&times;</button>
      {open && <VexurCalendarWidget />}
    </div>
  </dialog>
}
