# Enopac Property Group Website

Multi-page marketing website for **Enopac Property Group** — styled to match the brand logo (dark charcoal background, gold typography, laurel wreath accents).

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services overview |
| `/services/property-management` | Property Management |
| `/services/buyers-agency` | Buyers Agency |
| `/services/development` | Development Opportunities |
| `/contact` | Contact & strategy session booking |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Live site

The latest version is published at [enopac-website.ben-03a.workers.dev](https://enopac-website.ben-03a.workers.dev).

To publish updates with Cloudflare access:

```bash
npm ci
npm run deploy:worker
```

The Worker serves the Vite build in `dist/` and supports direct links to all site routes.

## Brand theme (from logo)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#232F34` | Page background |
| Gold | `#E6C773` | Headings, logo, CTAs |
| Gold dark | `#5B5B34` | Laurel wreath accents |
| Cream | `#F5F0E6` | Body text |

## Next steps

- [ ] Add official logo image to `public/logo.png`
- [ ] Connect contact form to email backend
- [x] Deploy to Cloudflare Workers
