# O&F Pristine Solution — Website

A luxury digital experience for **O&F Pristine Solution**, a premium
residential and commercial cleaning company in Nigeria. Built to feel at home
alongside Apple, Airbnb and premium hospitality brands — because people
aren't buying cleaning; they're buying time, confidence and peace of mind.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # strict TypeScript check
```

## Design system

| Token     | Value     | Role                                  |
| --------- | --------- | ------------------------------------- |
| `navy`    | `#0F172A` | Primary — anchor sections, wordmark   |
| `emerald` | `#0F766E` | Secondary — links, labels, accents    |
| `gold`    | `#F59E0B` | Accent — reserved for *light itself*  |
| `cream`   | `#FAFAF8` | Warm-white canvas                     |
| `fog`     | `#F3F4F6` | Soft gray section background          |

**Typography** — Cormorant Garamond (display serif, italics for emphasis)
paired with Albert Sans (body). Loaded via `next/font` with zero layout shift.

**Signature motifs**

- *Light is the brand*: the hero is a code-drawn sunlit room (arched window,
  breathing light shaft, dust motes dissolving) — no stock buckets or mops.
- *The sheen*: a band of light sweeps across cards and buttons on hover,
  like the gleam on a just-polished surface (`.sheen` utility).
- *Before/After*: an interactive comparison slider of one hand-drawn SVG
  room in two states — driven by an invisible native range input, so drag,
  click and arrow keys all work.

## Architecture

```
app/
  layout.tsx          # fonts, metadata, Open Graph, JSON-LD (LocalBusiness + FAQ)
  page.tsx            # section composition
  globals.css         # Tailwind v4 theme tokens, keyframes, utilities
  opengraph-image.tsx # generated social share card
  icon.svg            # favicon (sparkle mark)
  sitemap.ts / robots.ts
  privacy/ terms/     # legal pages
components/
  site/               # Navbar, Footer, Preloader, CursorGlow, SmoothScroll, Logo
  sections/           # Hero, TrustBar, Services, WhyUs, Process,
                      # BeforeAfter, Testimonials, Pricing, Faq, Contact
  ui/                 # MagneticButton, Reveal, TextReveal, Eyebrow, Sparkle
lib/
  site.ts             # contact details, nav, WhatsApp helpers
  data.ts             # services, pricing, testimonials, FAQs — edit copy here
```

All copy, prices and contact channels live in `lib/` — content updates never
touch component code.

## Engineering notes

- **Stack**: Next.js 15 (App Router) · React 19 · TypeScript (strict) ·
  Tailwind CSS v4 · Framer Motion · Lenis smooth scrolling.
  Framer Motion covers every animation need here; GSAP was deliberately
  omitted to keep the bundle lean for a Lighthouse-95+ budget.
- **Booking flow**: the contact form composes a prefilled WhatsApp message —
  bookings land where the business actually operates, with no backend to
  host or maintain.
- **Accessibility**: semantic landmarks, skip link, visible focus rings,
  ARIA-wired accordion and comparison slider, keyboard operable throughout,
  and `prefers-reduced-motion` respected by every animation (Lenis, Framer
  Motion and CSS keyframes all check it).
- **Performance**: no stock imagery — every visual is CSS/SVG drawn in code;
  fonts subset via `next/font`; the map iframe lazy-loads; AVIF/WebP enabled
  for any future photography.
- **SEO**: per-page metadata, canonical URLs, Open Graph + Twitter cards,
  generated OG image, `sitemap.xml`, `robots.txt`, and structured data
  (`LocalBusiness` with service offers, `FAQPage`).

## Going live

1. Set the production domain in `lib/site.ts` (`site.url`).
2. Confirm phone numbers and social handles in `lib/site.ts`.
3. Adjust prices in `lib/data.ts` as packages evolve.
4. Deploy (Vercel recommended): `vercel` or connect the repo.
