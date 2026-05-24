# Project status — Ingenious Hub

Last updated by the working session that shipped the audit + foundations
pass. Live preview at <https://ingenious-hub.vercel.app/>.

This is a working document. Update it at the end of every meaningful pass.

---

## At a glance

| Phase | Scope | State |
| --- | --- | --- |
| **A** | Foundations · security headers · home arc · About / Contact | **Shipped** |
| **B** | Case studies · /process · /work · client trust system | **Shipped** |
| **B+** | Coming-soon for `/industries/<slug>`, `/services/<slug>`, `/insights`. Warm-charcoal dark mode. Editorial trust strip. | **Shipped** |
| **B++** | Audit + hardening — registration-corners DRY, custom 404/error, scroll-progress rAF, Lenis touch-gate, CLS-safe ClientLogo, robots disallow, theme-color meta | **Shipped** |
| **C** | Sanity CMS · long-form essays per industry / service · insights blog · custom OG images · verified-logo collection | **Pending** |
| **D** | Localisation · /careers · A/B infra | **Deferred** |

---

## Pages — current state

| Route | State | Notes |
| --- | --- | --- |
| `/` | Live | 8-section editorial arc (Hero · Thesis · FeaturedWork · ClientsWall · ServicesPosture · Industries · Proof · FinalCTA) |
| `/work` | Live | Index with filter chips; deep-links to 6 case pages |
| `/work/[slug]` | Live (6 cases) | Allegiance · Tax2Win · Yug Vaastra · Jaipur Health Festival · Unlock Career · DNS Pointers |
| `/services` | Live | 5-pillar overview |
| `/services/[slug]` | ComingSoon (5) | Long-form pillar essays — Phase C |
| `/industries` | Live | Index of 6 industries linking to `[slug]` |
| `/industries/[slug]` | ComingSoon (6) | Long-form industry essays — Phase C |
| `/process` | Live | Six-step methodology essays |
| `/about` | Live | Belief-system essay, no headshots |
| `/clients` | Live | 86+ roster, monochrome → colour hover, filter chips |
| `/contact` | Live | Two-step scope picker · Turnstile · honeypot · dwell guard |
| `/insights` | ComingSoon | Index — Phase C |
| `/insights/[slug]` | Not built | Phase C |
| `/careers` | Not built | Deferred to Phase D |
| `/privacy` · `/terms` | Not built | Phase C lawyer-reviewed |
| `/sitemap.xml` · `/robots.txt` | Live | Auto-generated |
| `not-found` · `error` · `global-error` | Live | Editorial 404 + boundaries |

---

## What ships in production today

### Performance
- Static / SSG for every marketing page. 23 routes prerendered.
- Edge runtime for `/api/contact` only.
- Lenis smooth scroll gated to desktop + non-touch + reduced-motion.
- Framer Motion code-split per section; `.focus-ring` everywhere.
- `html, body { overflow-x: clip }` safety net.
- Navbar scroll-progress mutates the DOM via ref — zero re-renders.
- `<ClientLogo>` has explicit dimensions to prevent CLS.

### Security headers (all enforced today, except CSP)
- Content-Security-Policy: **Report-Only** for the soak period. Flip to
  enforce after two weeks of no production violations.
- Strict-Transport-Security: `max-age=63072000; includeSubDomains; preload`.
- X-Frame-Options: DENY.
- Referrer-Policy: strict-origin-when-cross-origin.
- Permissions-Policy: locked (camera, mic, geo, payment, FLoC).
- X-Content-Type-Options: nosniff.
- X-Powered-By: removed.

### Contact API (`/api/contact`, edge runtime)
- Zod schema validation.
- Honeypot field (silent 200 if filled).
- 3-second dwell-time floor (silent 200 if too fast).
- Cloudflare Turnstile server-side verify.
- Upstash Redis sliding-window rate limit (5/hr/IP).
- Resend email — notification + confirmation.
- PII-free structured logs to Vercel.

### Accessibility
- Skip-to-content link.
- `prefers-reduced-motion` globally enforced.
- WCAG-AA focus rings on every interactive element.
- Form labels + `role="alert"` for errors.
- Mobile menu: body-scroll lock, Escape-to-close, `aria-*` attrs.
- Featured Work: visual order uses CSS Grid `order`, not `direction:rtl`
  — screen-reader read order is preserved.

### SEO
- Per-route metadata + canonicals.
- JSON-LD: Organization + ProfessionalService + WebSite globally;
  CreativeWork per case study.
- sitemap.xml includes all static + dynamic routes.
- Theme-color meta for both light + dark.

---

## Open hardening backlog (post-Phase A+B)

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| H1 | Strict CSP via nonce middleware — remove `'unsafe-eval'` / `'unsafe-inline'` from scripts | Medium | Needs a middleware that injects a nonce per request; Tailwind's inline styles need a hash strategy or `'unsafe-inline'` staying on `style-src`. |
| H2 | `report-uri` sink for CSP violations | Small | Vercel function logging to Upstash. |
| H3 | Subresource Integrity (SRI) | Small | Only relevant once we add a `<script src>` from a 3rd party. None today. |
| H4 | `Trusted-Types` policy | Small | Pair with H1. |
| H5 | Submit HSTS for preload | Trivial | After H1 + soak. <https://hstspreload.org/> |
| H6 | Custom OG image per route via `next/og` ImageResponse | Medium | Currently uses the default favicon. |

---

## Open content / asset backlog

| # | Item | Owner | Notes |
| --- | --- | --- | --- |
| C1 | Verified client logos — drop SVGs at `public/clients/<slug>.svg` | Studio | 85 placeholders today; manifest at `lib/client-logos.ts`. |
| C2 | Re-match the 52 PNGs in `public/clients/_unverified-archive/` to specific brands | Studio | Files are unnamed by brand. |
| C3 | Real case-study photography under `public/cases/<slug>/` | Studio | Templates ready; logo composition is current placeholder. |
| C4 | Long-form essay copy for `/industries/<slug>` × 6 | Studio + Claude | One per industry. ComingSoon page lives there today. |
| C5 | Long-form essay copy for `/services/<slug>` × 5 | Studio + Claude | One per pillar. |
| C6 | Four launch `/insights/<slug>` essays | Studio + Claude | Voice rules in `lib/voice.md`. |
| C7 | Privacy + Terms pages | Lawyer-reviewed | Standard. |
| C8 | Custom display typeface licence (replacing Inter for `font-display`) | Studio | Pentagram-tier swap; brief calls it out. |

---

## Open technical backlog

| # | Item | Effort | Notes |
| --- | --- | --- | --- |
| T1 | Sanity Studio + content migration | Large | Schema mirrors `lib/*.ts`. Phase C entry point. |
| T2 | A11y audit pass with `@axe-core/cli` in CI | Small | Add to GitHub Action. |
| T3 | Lighthouse CI in GitHub Actions on PR | Small | Currently manual. |
| T4 | Dependabot config | Trivial | `.github/dependabot.yml`. |
| T5 | Bundle-size budget enforcement | Small | `@next/bundle-analyzer` + a CI gate. |
| T6 | Image optimisation script (sharp) for case heroes once photography lands | Small | Pre-process to AVIF + WebP at 1× / 2×. |
| T7 | Site search (kbar / cmdk) — `/` to open | Medium | Only worth doing once `/insights` exists. |

---

## Known small fragility

- **DesignRush / Clutch / Trustpilot accreditation links** point to root
  brand sites, not the studio's profile page. Verify the real URLs and
  swap in `lib/accreditations.ts` when the studio sends them.
- **Case-study impact metrics** are signed off but tightly worded. Don't
  rewrite without checking with the studio.
- **WhatsApp link** uses `+91 95870 15816`. If the number changes, update
  in: `lib/clients` (no), `components/footer.tsx`, `components/sections/
  final-cta.tsx`, `app/contact/page.tsx`, `app/layout.tsx` JSON-LD.

---

## Recommended next session

In rough priority order:

1. **Verify a few real client logos.** Drop the most-recognisable 8–12
   marks as SVGs under `public/clients/<slug>.svg` and flip the manifest
   entries from `placeholder` to `verified`. Highest visible impact for
   the least effort.
2. **Write the `/insights` launch essays.** Voice guide is in
   `lib/voice.md`. Topic suggestions: one per service pillar.
3. **Write `/industries/<slug>` essays** — replace ComingSoon with the
   real piece. Six pages, ~600–800 words each.
4. **Write `/services/<slug>` deep pages.** Includes / who-it's-for /
   sample work / FAQ block per pillar.
5. **Lighthouse CI + dependabot** in `.github/workflows/`.
6. **Strict CSP via middleware (H1)** once 2 weeks of report-only soak
   shows no production violations.
7. **Privacy + Terms pages.** Lawyer-reviewed copy.

---

## How to resume

1. Read `CLAUDE.md` first.
2. Skim this `STATUS.md`.
3. Check the last commit message on `claude/ingenious-hub-website-tkURa`:
   `git log -1`.
4. Run `npm run build` to confirm the current state is clean.
5. Ask the user what they want before adding new sections / routes.
