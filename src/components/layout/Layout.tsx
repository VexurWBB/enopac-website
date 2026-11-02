import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import RouteMeta from './RouteMeta'
import BookingProvider from '../booking/BookingProvider'

export default function Layout() {
  return (
    <BookingProvider>
      <ScrollToTop />
      <RouteMeta />
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </BookingProvider>
  )
}
