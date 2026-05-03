# Ingenious Hub — Marketing Site

A modern, conversion-focused marketing site for **Ingenious Hub**, a Jaipur-based branding & growth studio.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a hand-rolled shadcn-style UI layer.

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
3. Build command: `next build` · Output: `.next` (auto-detected).

## Editing content

All copy is in plain TypeScript — no CMS to wire up:

- `lib/services.ts` — the five service pillars shown on `/` and `/services`.
- `lib/work.ts` — case studies shown on `/` and `/work`.
- `app/about/page.tsx` — company story, reasons-to-choose, stats.
- `components/footer.tsx` — address, email, phone, socials.
- `app/contact/page.tsx` — replace the `+919999999999` placeholder with the real WhatsApp / phone number.

## Scripts

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint (Next defaults) |

## Stack

- Next.js 14 · React 18 · TypeScript
- Tailwind CSS + `tailwindcss-animate`
- Framer Motion
- Radix primitives + custom shadcn-style components
- `next-themes` for dark mode
- `lucide-react` icons
