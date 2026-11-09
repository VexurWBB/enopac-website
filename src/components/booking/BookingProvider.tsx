import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BookingModal from './BookingModal'
import { preloadVexurCalendar } from '../../lib/vexurCalendarLoader'

type BookingContextValue = {
  openBooking: () => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToInlineCalendar = useCallback(() => {
    const target = document.getElementById('book')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }
    return false
  }, [])

  useEffect(() => {
    if (location.pathname === '/contact') {
      preloadVexurCalendar()
    }
  }, [location.pathname])

  const openBooking = useCallback(() => {
    if (location.pathname === '/contact') {
      scrollToInlineCalendar()
      return
    }
    preloadVexurCalendar()
    setModalOpen(true)
  }, [location.pathname, scrollToInlineCalendar])

  const closeBooking = useCallback(() => {
    setModalOpen(false)
    if (location.hash === '#book') {
      navigate({ pathname: location.pathname, hash: '' }, { replace: true })
    }
  }, [location.hash, location.pathname, navigate])

  useEffect(() => {
    if (location.pathname === '/contact' && location.hash === '#book') {
      requestAnimationFrame(() => scrollToInlineCalendar())
    }
  }, [location.pathname, location.hash, scrollToInlineCalendar])

  const value = useMemo(
    () => ({ openBooking, closeBooking }),
    [openBooking, closeBooking],
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={modalOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  )
}
