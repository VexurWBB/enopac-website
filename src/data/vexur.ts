export const vexurForm = {
  formId: import.meta.env.VITE_VEXUR_FORM_ID ?? '00eaa3aa-7930-4e00-9419-c1e42fb344c5',
  agentId: import.meta.env.VITE_VEXUR_AGENT_ID ?? 'f8c250d5-5117-41f1-932c-aa154a9d8218',
  submitUrl:
    import.meta.env.VITE_VEXUR_SUBMIT_URL ??
    'https://iipazmwbtctblpyszspb.supabase.co/functions/v1/form-submit',
  anonKey: import.meta.env.VITE_VEXUR_ANON_KEY ?? '',
} as const

export const vexurCalendar = {
  agentId: import.meta.env.VITE_VEXUR_AGENT_ID ?? 'f8c250d5-5117-41f1-932c-aa154a9d8218',
  loaderUrl: 'https://embed.vexur.com.au/v1.1.47/loader.js',
  loaderIntegrity:
    'sha384-pjDYxRt9BIeERJoux3y3A/1rJ67Wse9OVGZd0UgUGdY6F1J01pFpM9uk+88bv3eM',
  embedOrigin: 'https://embed.vexur.com.au',
  theme: 'light' as const,
  primaryColor: '#c9b06a',
  buildId: 'calendar-5056b737',
  renderer: 'calendar-render-v2',
  version: '2026-06-16T07:17:42.647452+00:00',
} as const
