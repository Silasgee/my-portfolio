# Apex Academy

A premium marketing website for **Apex Academy** — a digital skills academy teaching
WordPress website design, copywriting, Facebook Ads, WhatsApp marketing, TikTok
marketing and freelancing.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lenis**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check, no emit
```

## Art direction

A "modern prestige academy" identity, executed consistently:

- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (expressive editorial serif) for display headlines, paired with
  [Manrope](https://fonts.google.com/specimen/Manrope) for body text. Both are
  self-optimized via `next/font` (zero layout shift, no runtime font requests).
- **Color** — five colors only, defined once in `app/globals.css`:
  ink `#0F172A`, royal `#2563EB`, gold `#F59E0B`, white, mist `#F8FAFC`.
  Gold is used as punctuation (italic highlight words, eyebrows, seams), never
  as decoration.
- **Rhythm** — sections alternate ink / white / mist canvases; film-grain and
  slow gradient orbs keep large navy fields from going flat.
- **Imagery** — no stock photos. The hero visual is a code-built "student
  dashboard" illustration; course icons are a hand-drawn SVG set with a shared
  construction (48px grid, 1.7 stroke, single gold accent).

## Motion

All motion honors `prefers-reduced-motion` and degrades to simple opacity or
static layouts.

| Effect | Where |
| --- | --- |
| Preloader curtain (apex mark draws in, panel lifts) | `components/site/Preloader.tsx` |
| Lenis inertial smooth-scroll | `components/site/SmoothScroll.tsx` |
| Cursor glow (desktop pointers only) | `components/site/CursorGlow.tsx` |
| Magnetic buttons | `components/ui/MagneticButton.tsx` |
| Masked word-by-word headline reveals | `components/ui/TextReveal.tsx` |
| Blur-resolve scroll reveals | `components/ui/Reveal.tsx` |
| Hero parallax orbs + floating dashboard cards | `components/sections/Hero.tsx` |
| Scroll-linked gold journey thread | `components/sections/Journey.tsx` |
| Counter-scrolling testimonial marquees (pause on hover) | `components/sections/Testimonials.tsx` |
| Spring count-up statistics | `components/ui/CountUp.tsx` |

## Project structure

```
app/
  layout.tsx            # fonts, metadata, JSON-LD, skip link
  page.tsx              # section composition
  globals.css           # design tokens (Tailwind v4 @theme) + utilities
  icon.svg              # favicon
  opengraph-image.tsx   # social card, generated at build time
  robots.ts / sitemap.ts
components/
  site/                 # chrome: Navbar, Footer, Logo, Preloader, CursorGlow, SmoothScroll
  sections/             # Hero, Courses, WhyApex, Journey, Testimonials, Stats, Faq, Contact
  ui/                   # primitives: MagneticButton, TextReveal, Reveal, CountUp, Eyebrow, CourseIcon
lib/
  site.ts               # site config: name, URL, contacts, nav
  data.ts               # all marketing copy: courses, reasons, journey, testimonials, stats, FAQs
```

## Editing content

All copy lives in `lib/data.ts`; contact details, URL and socials in
`lib/site.ts`. No component changes are needed to update courses, testimonials,
stats or FAQs.

The contact form composes a pre-filled WhatsApp message (the audience's primary
channel) with an email fallback — swap `handleSubmit` in
`components/sections/Contact.tsx` for an API route when a backend is ready.

## The invisible expensive stuff

- Semantic landmarks (`header/nav/main/section/footer`), one `h1`, ordered headings
- WCAG AA: visible focus rings on both light and dark canvases, skip link,
  `aria-expanded`/`aria-controls` accordion, labelled sections and forms,
  marquee clones hidden from assistive tech
- Full keyboard navigability (magnetic buttons are real links/buttons)
- SEO: canonical metadata, Open Graph + Twitter cards, generated OG image,
  `robots.txt`, `sitemap.xml`, JSON-LD (`EducationalOrganization`, `Course` ×6,
  `FAQPage`)
- Performance: server components by default, `next/font` with `display: swap`,
  no external requests at runtime, no image payloads (all visuals are code),
  compressed output, `poweredByHeader` off

## Deployment

Any Node host works. For Vercel: push and import — zero config. Set the real
production domain in `lib/site.ts` (`site.url`) before launch.
