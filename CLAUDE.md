# Ingenious Hub — Claude Code project notes

This is a working website for **Ingenious Hub**, a global brand and
design agency headquartered in Jaipur. Strategy, identity, advertising,
marketing, PR, and digital — built as one practice. The deployed
preview lives at <https://ingenious-hub.vercel.app/>. Production target
domain: `ingenioushub.com` (Vercel-hosted).

**Positioning** (locked 2026-05-29): "Ingenious Hub is a global brand
and design agency based in Jaipur." Not "a Jaipur studio." Every hero
line, JSON-LD self-description, and footer line speaks as a global
agency. Reference: ogilvy.com, pentagram.com.

Read this file at the start of every new session so you don't relitigate
choices that are already locked.

---

## 1. What this project is — and what it isn't

**Is**: a production marketing site for a real studio. Premium positioning,
editorial pacing, restraint over flash. Built with Next.js 14 / TypeScript
/ Tailwind / Framer Motion / Lenis.

**Is not**: an AI-pattern template, a Framer agency clone, a motion
showcase, a do-everything boilerplate. Several past iterations drifted
there; we explicitly reversed them. Don't reintroduce:
- auto-rotating "Now showing" hero cards
- infinite marquees on every section
- floating-blob gradients (the brand wordmark gradient is the ONLY
  gradient on site — use `text-gradient-brand` / `bg-gradient-wash`)
- numbered nav `01 Home / 02 Work`
- "we are passionate / driven by innovation" copy
- pure-black `#000000` dark mode
- warm-bone surface (`#F4F0E8`) — retired in favour of pure white

The brand voice guide is `lib/voice.md`. Read it before writing copy.

---

## 2. Repository map

```
/
├── app/                        Next.js App Router
│   ├── layout.tsx              Root layout — fonts, theme, JSON-LD, footer
│   ├── page.tsx                Homepage — 8-section Ogilvy-shape experience flow
│   ├── about/page.tsx          Editorial belief-system essay
│   ├── api/contact/route.ts    Edge runtime · Turnstile + Upstash + Resend
│   ├── clients/                Index page + client-side filter shell
│   │   ├── page.tsx
│   │   └── clients-client.tsx
│   ├── contact/page.tsx        Calm two-step scope picker
│   ├── blogs/page.tsx          Editorial index (renamed from /insights)
│   ├── process/page.tsx        Six-step methodology essay
│   ├── services/               Pillar overview + dynamic [slug] (ComingSoon)
│   ├── work/                   Index + dynamic [slug] (real cases)
│   ├── sitemap.ts              Static + dynamic routes
│   ├── robots.ts               Crawl rules
│   ├── not-found.tsx           Custom 404
│   ├── error.tsx               Route-level error boundary
│   ├── global-error.tsx        Root error boundary (last resort)
│   └── globals.css             Tokens, fonts, accessibility safety net
│
├── components/
│   ├── sections/               One file per homepage section
│   │   ├── hero.tsx            01 — Full-bleed brand wash + thesis
│   │   ├── capabilities.tsx    02 — Nine disciplines editorial list
│   │   ├── work-grid.tsx       03 — Randomised selected work
│   │   ├── featured-case.tsx   04 — One immersive case (Allegiance)
│   │   ├── proof.tsx           05 — Accreditation + testimonials
│   │   ├── clients-wall.tsx    06 — 86-brand sectored wall
│   │   ├── insights.tsx        07 — Magazine 3-up of recent writing
│   │   └── final-cta.tsx       08 — Closing brand wash + CTAs
│   ├── client-logo.tsx         Reads the manifest → asset or placeholder
│   ├── client-logo placeholders happen via manifest, never hard-coded
│   ├── registration-corners.tsx  Shared editorial trim marks (4 in one)
│   ├── coming-soon.tsx         Reusable placeholder for Phase C routes
│   ├── contact-form.tsx        Two-step form + Turnstile + honeypot
│   ├── footer.tsx              · navbar.tsx · smooth-scroll.tsx (Lenis)
│   ├── motion-reveal.tsx       Two motion personalities — Quiet + Editorial
│   ├── theme-provider.tsx      next-themes wrapper
│   └── theme-toggle.tsx
│
├── lib/                        Typed content modules (CMS-shaped)
│   ├── accreditations.ts       DesignRush / Clutch / Trustpilot / 50Pros
│   ├── cases.ts                Long-form case essays + helpers
│   ├── clients.ts              86+ client roster + industries
│   ├── client-logos.ts         Verification manifest (verified | placeholder)
│   ├── industries.ts           6 industries with slug + blurb
│   ├── insights.ts             Reserved for Phase C insights data
│   ├── services.ts             5 service pillars
│   ├── voice.md                Studio copy guide
│   └── work.ts                 Lean roster (slug, client, sector, metrics)
│
├── public/
│   ├── logo.svg                Official wordmark (user-supplied)
│   ├── logo-mark.svg           Square mark
│   ├── favicon.svg
│   └── clients/
│       ├── README.md           Verification workflow
│       ├── trueline-technologies.svg   ← only verified asset today
│       └── _unverified-archive/        ← 52 bulk PNGs awaiting matching
│
├── CLAUDE.md                   ← you are here
├── STATUS.md                   Phase A/B/C state + open punch-list
├── SECURITY.md                 Threat model + secrets + hardening
├── README.md                   Public-facing run / deploy guide
└── plans/ (in .claude)         Original v2 strategic brief
```

---

## 3. Tech stack — locked

- **Next.js 14.2.x** (App Router). Pinned to a patched version; bump on
  Vercel rebuilds. `output: "standalone"` not used — we deploy to Vercel's
  default Node runtime + edge for `/api/contact`.
- **TypeScript** strict.
- **Tailwind 3.x** with a custom token system. Never add an arbitrary
  colour — extend `tailwind.config.ts` `colors.*` instead.
- **Framer Motion** for `<Reveal>` and the two designated editorial
  reveals. Don't add a third motion personality.
- **Lenis** for desktop smooth scroll. Gated by `(prefers-reduced-motion)`,
  `(pointer: coarse)`, and `innerWidth < 1024`. Don't remove these gates.
- **Resend** (email), **Upstash Redis** (rate limit), **Cloudflare
  Turnstile** (bot challenge) — all behind `process.env`, fail-open in dev.
- **next-themes** for class-based dark mode.
- No CSS-in-JS. No Sanity yet (Phase C). No GSAP.

---

## 4. Design tokens — the rules

- **Light surface is pure white** (`#FFFFFF`). The earlier warm bone
  (`#F4F0E8`) was retired — the brand wanted a cleaner, more
  professional read. The `bone` token name is preserved as an alias
  for backward compatibility; it now resolves to white.
- **Brand colour triad**, taken from `logo.svg`:
  - **Mint** `#81D5D3` — light bookend of the wordmark gradient,
    also `teal-300`.
  - **Brand teal** `#009E8B` — deep bookend of the wordmark gradient,
    also `teal-600` and the `--primary` token.
  - **Brand grey** `#636363` — the wordmark "hub" + tagline colour;
    available as `grey-500` and serves as the counterpoint
    (replacing the retired rust palette).
- **Gradient is reserved.** Use `text-gradient-brand` for *one*
  editorial italic accent per section (e.g. the "people choose."
  italic in the hero). Section-scale washes via `bg-gradient-wash`
  (subtle) and `bg-gradient-wash-strong` (Final CTA). Never on
  large blocks of text, never on primary CTAs, never on cards.
- **Dark mode is warm charcoal**, not AMOLED black. `--background:
  30 7% 14%` (#25221F) and `ink: #1B1916`. Don't darken below this.
- **Type families**: two-family system.
  - **Open Sans** is body, display, and mono. Every `font-sans`,
    `font-display`, and `font-mono` resolves here.
  - **Baskervville** (regular, no italic) is the editorial accent face.
    Every `font-serif` (one moment per section: "people choose.",
    "Nine sectors.", "upstream", etc.) renders in Baskervville
    regular. Transitional serif that pairs cleanly with the
    Open Sans grotesque. Italic was tried and dropped per the
    studio's call.
    (Cormorant was tried first and pulled — didn't visually sit
    next to Open Sans.)
  - Don't introduce a third family without an explicit call from
    the studio.
- **Weights are conservative**: 300 for display, 400 for sub-heading and
  body, 500 for emphasis, 700 reserved for impact metrics only.
- **Type scale** is a named ladder (`text-d-1`, `text-d-2`, `text-h-1`,
  `text-h-2`, `text-h-3`, `text-body-lg`, `text-body`, `text-body-sm`,
  `text-meta`). Don't introduce arbitrary `text-[Npx]`.
- **Don't widen the palette.** If you need contrast, use opacity on an
  existing token, or use the existing teal/grey scales. Don't reach for
  amber / red / purple / etc. — `red-500` for form error states is the
  one exception.

---

## 5. Performance + accessibility — non-negotiable

- Every interactive element uses `.focus-ring`. No exceptions.
- All animations behind `prefers-reduced-motion`. The site must read fine
  with motion disabled.
- `html, body { overflow-x: clip }` is a load-bearing safety net. Don't
  remove it.
- All form controls have associated `<label>`s; errors via `role="alert"`.
- `next-themes` `attribute="class"` + `suppressHydrationWarning` on
  `<html>`. Don't move this to body.
- Navbar scroll progress is DOM-mutated via ref, never via React state, to
  avoid re-renders on every scroll event.

---

## 6. The voice — short version

Long version in `lib/voice.md`. Highlights:

- Specific over abstract. *"+62% admissions for Allegiance"* not *"we
  transform brands"*.
- Sentences that could appear in an essay, not a deck.
- Use em dashes for asides; one italic per paragraph max.
- Banned: "elevate", "unlock", "redefine", "leverage", "ecosystem",
  "synergy", "innovate", "cutting-edge", "premium" (to describe
  ourselves), "transform your X", "we help X" (without saying how).
- One thesis per page. End every page with a clear next move.

---

## 7. Run commands

```bash
npm install          # install deps
npm run dev          # local dev (http://localhost:3000)
npm run build        # production build — must pass clean before push
npm run start        # serve the production build locally
npm run lint         # next lint (ESLint + react/no-unescaped-entities)
```

JSX gotcha: react/no-unescaped-entities will fail the build on any raw
apostrophe (`'`) inside JSX text. Always use `&rsquo;` (or `&apos;`) in
copy.

---

## 8. Working with the repo

- Working branch: `claude/ingenious-hub-website-tkURa`. Main is
  fast-forwarded to match after each meaningful milestone (see PR #1).
- Commits use conventional-style headlines (`feat:`, `fix:`, `feat(v2):`).
  Bodies are detailed multi-paragraph because the repo doubles as a
  decision log.
- Never amend pushed commits. Never force-push to `main`.
- Drop the `https://claude.ai/code/session_...` reference at the bottom
  of commit messages.

---

## 9. Where Vercel sits

- Auto-deploys on push.
- Required env vars in Vercel → Settings → Environment Variables:
  ```
  NEXT_PUBLIC_TURNSTILE_SITE_KEY
  TURNSTILE_SECRET_KEY
  RESEND_API_KEY
  RESEND_FROM_EMAIL          (= hello@ingenioushub.com)
  CONTACT_NOTIFY_EMAIL       (= hello@ingenioushub.com)
  UPSTASH_REDIS_REST_URL
  UPSTASH_REDIS_REST_TOKEN
  ```
- Without those, the contact form fails open in dev and fails closed for
  email in prod (logs only). The site otherwise runs unaffected.

---

## 10. Don't do this

- Don't add a CMS yet. Phase C work.
- Don't write essays for `/industries/<slug>` or `/services/<slug>` until
  the user signs off the voice on a sample.
- Don't generate fake brand logos. The verification manifest is the
  contract — `placeholder` is preferred over fabricated.
- Don't reintroduce the 17-section homepage from v1. The current 8 are
  load-bearing.
- Don't widen the colour palette. If you need contrast, use opacity on
  an existing token.
- Don't add a third font family. Inter + Instrument Serif + JetBrains
  Mono is the system.

---

## 11. Files that double as decision logs

When you finish a meaningful pass, update these alongside the code:

- `STATUS.md` — shipped, in progress, pending
- `SECURITY.md` — threat model, secrets, hardening backlog
- `lib/voice.md` — copy guide

Don't let them drift from reality. They are this project's memory.
