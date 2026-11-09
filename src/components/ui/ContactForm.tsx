import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from './Button'
import { site } from '../../data/site'
import { submitVexurForm } from '../../lib/submitVexurForm'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await submitVexurForm({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not submit the form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="contact-form-success">
        <div className="contact-form-success-icon" aria-hidden="true">✓</div>
        <h3>Thank you — we&apos;ll be in touch soon</h3>
        <p>{site.contact} will reach out within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          placeholder="How can we help?"
          className="form-input contact-form-textarea"
        />
      </div>

      {error && (
        <p className="contact-form-error" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : `${site.cta} →`}
      </Button>
    </form>
  )
}
