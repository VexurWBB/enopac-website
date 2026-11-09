import { vexurForm } from '../data/vexur'

export type VexurContactFields = {
  name: string
  email: string
  phone?: string
  message: string
}

type VexurSubmitResponse = {
  success?: boolean
  submissionId?: string
  formId?: string
  error?: string
  message?: string
}

export async function submitVexurForm(fields: VexurContactFields): Promise<string> {
  if (!vexurForm.anonKey) {
    throw new Error('Contact form is not configured. Missing VITE_VEXUR_ANON_KEY.')
  }

  const response = await fetch(vexurForm.submitUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: vexurForm.anonKey,
      Authorization: `Bearer ${vexurForm.anonKey}`,
    },
    body: JSON.stringify({
      formId: vexurForm.formId,
      fields: {
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone?.trim() ?? '',
        message: fields.message.trim(),
      },
      attribution: {
        pageUrl: window.location.href,
        referrer: document.referrer || null,
      },
    }),
  })

  const data = (await response.json().catch(() => ({}))) as VexurSubmitResponse

  if (!response.ok || data.success === false) {
    throw new Error(data.error || data.message || 'We could not submit the form. Please try again.')
  }

  return data.submissionId ?? ''
}
