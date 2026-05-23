# Ingenious Hub — Marketing Site

A premium, editorial marketing site for **Ingenious Hub**, a Jaipur-based creative & growth studio.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a hand-rolled shadcn-style UI layer.

---

## Local preview

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import on <https://vercel.com/new> — no env vars required.
3. Build command: `next build` (auto).
4. Production branch: `claude/ingenious-hub-website-tkURa` (or merge to `main`).

---

## Home page — 8-section experience flow

1. **Hero** — *"Brands aren't built. They're remembered."* with line-rise reveal + scroll parallax.
2. **Capabilities** — editorial list of 9 disciplines, hover-driven dim/highlight.
3. **Randomized Work** — masonry grid that reshuffles every visit (signature interaction).
4. **Featured Cases** — 3 full-bleed slabs with **Problem / Thinking / Execution / Impact** triptych.
5. **Accreditation Wall** — DesignRush · Clutch · Trustpilot · 50Pros · Google.
6. **Client Ecosystem** — 50+ brands with category filter chips.
7. **Insights** — 4 editorial articles.
8. **Final CTA** — *"Let's build the brand people remember."*

---

## Content modules (CMS-ready)

All content is typed and lives in `lib/`:

| File | Purpose |
| ---- | ------- |
| `lib/services.ts` | 5 service pillars (Branding, Web, Performance, Creative, PR) |
| `lib/work.ts` | Case studies + tile sizing for the randomized grid |
| `lib/clients.ts` | Client roster with category taxonomy |
| `lib/accreditations.ts` | DesignRush, Clutch, Trustpilot, 50Pros entries |
| `lib/insights.ts` | Blog/article data |
| `lib/capabilities.ts` | 9 capability headlines for the editorial reveal |

These are the modules the homepage reads from. Update copy here and the UI follows.

---

## CMS migration roadmap

The structure above is intentionally CMS-shaped. To swap to a headless CMS without touching the UI:

### Option A — **Sanity** (recommended for editorial flexibility)

```bash
npm install @sanity/client groq
```

Define schemas mirroring the existing TypeScript types (each `lib/*.ts` file maps to one Sanity document type), then replace each `import { CLIENTS } from "@/lib/clients"` with a server-side fetch:

```ts
// lib/sanity.ts
import { createClient } from "@sanity/client";
export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});

// example usage in a server component
import { sanity } from "@/lib/sanity";
const CLIENTS = await sanity.fetch(`*[_type == "client"]{name, category}`);
```

The Sanity Studio (`npm create sanity@latest`) gives you a hosted admin with auth, image uploads, drafts, and roles.

### Option B — **Payload CMS** (self-hosted, sits inside this repo)

```bash
npm create payload-app
```

Payload runs *in the Next.js app* under `/admin`, storing content in Postgres or MongoDB. Best if you want a single deployment with both site and admin.

### Option C — **Markdown + Git-based** (simplest)

Move each `lib/*.ts` array into a `content/<type>/*.mdx` folder and read with `gray-matter`. Editors push commits; the site rebuilds. Free, but no admin UI.

### Recommendation for Ingenious Hub

**Sanity** is the right fit:
- Image upload + transforms come built-in (key for project covers).
- Rich-text for case studies (Problem / Thinking / Execution / Impact blocks).
- Studio is hosted by Sanity, no infra burden.
- Free tier covers a single-studio agency.

A starter Sanity schema for the case study type is included as a comment block at the bottom of `lib/work.ts` so the migration is mechanical.

---

## Editing content (today, no CMS yet)

- `lib/services.ts` — service pillars on `/` and `/services`
- `lib/work.ts` — case studies on `/` and `/work`
- `lib/clients.ts` — client logo wall
- `lib/insights.ts` — blog cards
- `lib/accreditations.ts` — recognition wall
- `app/about/page.tsx` — story, reasons, stats
- `components/footer.tsx` — address, email, phone, socials
- `app/contact/page.tsx` — replace the `+919999999999` placeholder

---

## SEO

Three JSON-LD blocks ship in `app/layout.tsx`:

- `Organization` — name, address, contactPoint, sameAs, areaServed, knowsAbout
- `ProfessionalService` — AggregateRating 4.6/11, geo, opening hours
- `WebSite` — SearchAction

---

## Stack

- Next.js 14 · React 18 · TypeScript
- Tailwind CSS + `tailwindcss-animate`
- Framer Motion (line-rise hero, parallax case covers, hover-magnetic work grid)
- Radix primitives + custom shadcn-style components
- `next-themes` (dark mode)
- `lucide-react` (icons)

---

## Standalone preview

`index.html` at the repo root is a single-file mirror of the homepage — works on double-click, no build, no Next.js. Useful for sharing previews on shared drives or GitHub Pages.

To enable a hosted standalone preview: **Settings → Pages → Source: Deploy from a branch → `claude/ingenious-hub-website-tkURa` / root → Save**. The site will be live at `https://daitiva.github.io/Ingenious-hub/`.
