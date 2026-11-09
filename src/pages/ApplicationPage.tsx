import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import { site } from '../data/site'
import definition from '../data/applicationForm.json'
import './application.css'

type Rule = { field_id: string; operator: string; value?: string }
type Field = { id: string; type: string; label: string; required: boolean; options?: string[]; placeholder?: string; accept?: string; show_if?: Rule & { match?: string; conditions?: Rule[] } }
type Answers = Record<string, string | boolean>
const fields = definition.fields as Field[]
const pages: { title: string; fields: Field[] }[] = [{ title: 'Your rental application', fields: [] }]
for (const field of fields) {
  if (field.type === 'page_break') pages.push({ title: field.label, fields: [] })
  else pages[pages.length - 1].fields.push(field)
}
const inputFields = (field: Field) => !['text_block', 'heading'].includes(field.type)
const acceptTypes = { image: 'image/jpeg,image/png,image/gif,image/webp', document: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp' }

function visibleFields(answers: Answers) {
  const visible = new Set<string>()
  for (const field of fields) {
    const condition = field.show_if
    if (condition) {
      const checks = (condition.conditions ?? [condition]).map(rule => visible.has(rule.field_id) && answers[rule.field_id] === rule.value)
      if (!(condition.match === 'any' ? checks.some(Boolean) : checks.every(Boolean))) continue
    }
    visible.add(field.id)
  }
  return visible
}

const subscribe = () => () => {}

export default function ApplicationPage() {
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false)
  const [search] = useSearchParams()
  const [answers, setAnswers] = useState<Answers>(() => ({ preferred_property: (search.get('property') ?? '').slice(0, 200) }))
  const [uploads, setUploads] = useState<Record<string, File>>({})
  const [current, setCurrent] = useState(0)
  const [status, setStatus] = useState<'editing' | 'sending' | 'sent'>('editing')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const requestKey = useRef<string | null>(null)
  const controller = useRef<AbortController | null>(null)
  const visible = visibleFields(answers)
  const available = pages.map((page, index) => page.fields.some(field => inputFields(field) && visible.has(field.id)) ? index : -1).filter(index => index >= 0)
  const position = available.indexOf(current)
  const last = position === available.length - 1

  useEffect(() => () => controller.current?.abort(), [])

  function update(id: string, value: string | boolean) {
    setAnswers(previous => ({ ...previous, [id]: value }))
    requestKey.current = null
    setError('')
  }

  function move(index: number) {
    setCurrent(index)
    setError('')
    requestAnimationFrame(() => {
      headingRef.current?.focus()
      headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function validate(index: number) {
    const controls = formRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(`[data-application-page="${index}"] input:not(:disabled), [data-application-page="${index}"] textarea:not(:disabled)`)
    const invalid = Array.from(controls ?? []).find(input => !input.validity.valid)
    if (!invalid) return true
    setCurrent(index)
    requestAnimationFrame(() => { invalid.focus(); invalid.reportValidity() })
    return false
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status !== 'editing') return
    if (!last) { if (validate(current)) move(available[position + 1]); return }
    for (const index of available) if (!validate(index)) return
    const activeUploads = Object.entries(uploads).filter(([id]) => visible.has(id))
    if (activeUploads.some(([, file]) => file.size > 10 * 1024 * 1024)) { setError('Each file must be 10 MB or smaller.'); return }
    if (activeUploads.length > 4 || activeUploads.reduce((total, [, file]) => total + file.size, 0) > 20 * 1024 * 1024) { setError('Upload no more than four files, totalling 20 MB or less. Combine documents into PDFs where needed.'); return }
    const submitted: Record<string, string | boolean> = {}
    for (const field of fields) {
      if (!inputFields(field) || field.type === 'page_break' || !visible.has(field.id)) continue
      submitted[field.id] = field.type === 'file' ? uploads[field.id]?.name ?? '' : answers[field.id] ?? (field.type === 'checkbox' ? false : '')
    }
    const honeypot = formRef.current?.querySelector<HTMLInputElement>('[name="vexur_honeypot"]')?.value
    if (honeypot) submitted.vexur_honeypot = honeypot
    requestKey.current ??= crypto.randomUUID()
    const body = new FormData()
    body.set('payload', JSON.stringify({ requestKey: requestKey.current, fields: submitted, attribution: { pageUrl: window.location.href, referrer: document.referrer || null } }))
    for (const [id, file] of activeUploads) body.append(`file:${id}`, file, file.name)
    controller.current = new AbortController()
    const timeout = window.setTimeout(() => controller.current?.abort(), 90000)
    setStatus('sending')
    setError('')
    try {
      const response = await fetch(definition.endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body, signal: controller.current.signal })
      const result = await response.json()
      if (!response.ok || result.success === false || !result.submissionId) throw new Error(response.status === 429 ? 'Please wait a minute before trying again.' : 'Your application could not be confirmed. Please try again or contact our team.')
      setStatus('sent')
      setUploads({})
      setAnswers({})
      formRef.current?.reset()
      requestAnimationFrame(() => headingRef.current?.focus())
    } catch (failure) {
      setStatus('editing')
      setError(failure instanceof Error && failure.name !== 'AbortError' && failure.message !== 'Failed to fetch' ? failure.message : 'The connection was interrupted. Your answers are still here. Please try again.')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  function renderField(field: Field) {
    if (field.type === 'text_block') return <p className="application-note">{field.label}</p>
    if (field.type === 'heading') return <h3>{field.label}</h3>
    const disabled = !enhanced || !visible.has(field.id) || status === 'sending'
    const label = <>{field.label}{field.required && <span aria-hidden="true"> *</span>}</>
    if (field.type === 'radio') return <fieldset className="application-question" disabled={disabled}>
      <legend>{label}</legend>
      <div className="application-options">{field.options?.map(option => <label key={option}>
        <input type="radio" name={field.id} value={option} required={field.required} checked={answers[field.id] === option} onChange={() => update(field.id, option)} />
        <span>{option}</span>
      </label>)}</div>
    </fieldset>
    if (field.type === 'checkbox') return <label className="application-consent">
      <input type="checkbox" name={field.id} required={field.required} disabled={disabled} checked={answers[field.id] === true} onChange={event => update(field.id, event.target.checked)} />
      <span>{label}</span>
    </label>
    return <label className="application-question" htmlFor={field.id}>
      <span>{label}</span>
      {field.type === 'textarea' ? <textarea id={field.id} name={field.id} required={field.required} disabled={disabled} rows={4} value={String(answers[field.id] ?? '')} onChange={event => update(field.id, event.target.value)} />
        : field.type === 'file' ? <input id={field.id} name={field.id} type="file" required={field.required} disabled={disabled} accept={field.accept === 'image' ? acceptTypes.image : acceptTypes.document} onChange={event => {
          const file = event.target.files?.[0]
          setUploads(previous => { const next = { ...previous }; if (file) next[field.id] = file; else delete next[field.id]; return next })
          requestKey.current = null
          setError('')
        }} />
          : <input id={field.id} name={field.id} type={field.type === 'phone' ? 'tel' : field.type} required={field.required} disabled={disabled} value={String(answers[field.id] ?? '')} onChange={event => update(field.id, event.target.value)} />}
    </label>
  }

  return <section className="section-padding section-surface bg-dark">
    <div className="section-container application-shell">
      <Link className="service-showcase-link" to="/rooms-for-rent">Back to rental locations</Link>
      <header className="application-intro">
        <p className="eyebrow">Enopac Property Group</p>
        <h1 className="section-title">Apply for a room</h1>
        <p className="section-subtitle">Complete an application for one or two people. If you need help, call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </header>
      <noscript><p className="application-note">The online application needs JavaScript. Please call or email our team using the contact details above for help applying.</p></noscript>
      <div className="application-card">
        {status === 'sent' ? <div className="application-success" role="status">
          <p className="eyebrow">Thank you</p>
          <h2 ref={headingRef} tabIndex={-1}>Application received</h2>
          <p>{definition.successMessage}</p>
          <Button to="/rooms-for-rent">Back to rental locations</Button>
        </div> : <form ref={formRef} method="post" action="/apply" onSubmit={submit} noValidate aria-busy={status === 'sending'}>
          <div className="application-progress"><span>Step {position + 1} of {available.length}</span><span>Required fields are marked *</span></div>
          <progress max={available.length} value={position + 1} aria-label="Application progress" />
          <h2 ref={headingRef} tabIndex={-1}>{pages[current].title}</h2>
          <div className="application-trap" aria-hidden="true"><label>Leave blank<input name="vexur_honeypot" tabIndex={-1} autoComplete="off" /></label></div>
          {pages.map((page, index) => <section key={index} data-application-page={index} hidden={index !== current}>
            {page.fields.map(field => <div key={field.id} hidden={!visible.has(field.id)}>{renderField(field)}</div>)}
          </section>)}
          {error && <p className="application-error" role="alert">{error}</p>}
          <div className="application-actions">
            {position > 0 && <Button onClick={() => move(available[position - 1])} disabled={!enhanced || status === 'sending'} variant="outline">Back</Button>}
            <Button type="submit" disabled={!enhanced || status === 'sending'}>{status === 'sending' ? 'Sending application…' : last ? 'Send application' : 'Next'}</Button>
          </div>
          <p className="application-privacy">Your details are used to assess your application. This does not sign you up for marketing.</p>
        </form>}
      </div>
    </div>
  </section>
}
