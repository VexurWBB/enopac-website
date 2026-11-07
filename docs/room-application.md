# Room application

`/apply` is the custom Enopac application. Rental-detail links prefill the property through `?property=`. The general Rooms for Rent link opens the same form with an empty property field.

The reference is Matthew's Google form: https://forms.gle/QiP2DjVJGwUxQRpB9. All 58 source questions across its 23 sections were mapped, with repeated questions shared between the one-person and two-person paths. Conditional pages cover children, pets, employment schedules, residency and visa details, the second applicant, and furniture.

## Vexur connection

- Form: `3122522c-322c-4e84-aa90-ea80159684cf` (Enopac Room Application).
- Published native form: https://app.vexur.com.au/forms/enopac-room-application-3122522c.
- Endpoint: `aae9339f-e30d-41d1-a970-3f1c24ac9310`. Its public URL is in `src/data/applicationForm.json`; it is safe to expose to browsers and is not an admin credential.
- The endpoint resolves the owner and form server-side. The browser supplies answers and uploads, never a tenant or owner ID.
- Allowed hosts: the existing Worker URL, `enopacpg.com`, `www.enopacpg.com`, and Vexur's app/embed hosts.
- Existing contact creation/update and in-app notification settings are retained. Email notifications remain disabled.

`ApplicationPage.tsx` sends multipart data: a JSON `payload` with `requestKey`, `fields`, and attribution, plus `file:<field_id>` parts. A retry keeps the same request key until an answer or file changes. Success requires a returned `submissionId`; an interrupted request preserves the form for retry. There are no browser storage copies of applicant answers.

## Keeping the schemas aligned

`src/data/applicationForm.json` and the Vexur form's `fields` must be updated together. Keep stable field IDs and conditions. Only visible answers and files are submitted.

The primary applicant uses the canonical name, email and phone mapping. Applicant 2's email and phone intentionally use text fields with distinct labels: marking these as native email/phone fields would overwrite the primary CRM contact in Vexur's current mapper. Applicant 2 remains available in the application answers.

## Upload differences from Google

Vexur currently accepts four files across the application, 10 MB per file and 20 MB combined. The custom page states these limits and asks applicants to combine documents into PDFs. If pets are included, the pet-photo field takes one slot and three supporting-document slots remain. Multiple pet photos must be combined into one image.

Google allowed ten supporting documents and up to five pet photos. Raising those limits requires a coordinated Vexur backend change, including upload receipts and storage validation; changing only this page is insufficient. Files use Vexur's private upload pipeline.

The source application's consent text is retained. Its promise to delete unsuccessful applications remains an Enopac operational responsibility; this page does not add an automatic deletion workflow.

## Verification

Desktop and mobile browser journeys cover both applicant counts, conditional follow-ups, required fields, oversized uploads, a failed request followed by retry, payload validation and separate applicant mapping. Successful requests were intercepted during QA to avoid creating test contacts, documents or notifications. A live preflight and invalid empty request verified endpoint access and required-field rejection.

Build with `npm run build:assets`. The regular `build` command includes a TypeScript check, which repository instructions require separate user authorization to run.
