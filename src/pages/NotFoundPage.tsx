import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section style={{ padding: '10rem 1.5rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p style={{ margin: '1rem 0 2rem' }}>This page has moved or no longer exists.</p>
      <Link to="/">Back to home</Link>
    </section>
  )
}
