# Ingenious Hub — Full Surface Rebuild

**Started:** Session of 2026-05-29
**Direction approved by studio:** 8-section homepage, full surface rebuild, navigation matching live ingenioushub.com, primary references **Ogilvy** + **Pentagram**.

---

## 1. Positioning shift (locked)

| From | To |
| --- | --- |
| "A Jaipur-based strategic branding studio · Since 2016" | "A global brand and design agency based in Jaipur" |
| Studio voice | Agency voice — claims international presence |
| Specific city framing | India-first dominance, then global recognition |

Every hero copy, footer line, and JSON-LD self-description gets re-stated to match. The studio is a *global agency that happens to be based in Jaipur* — not a Jaipur studio with global aspirations.

---

## 2. Navigation — from live ingenioushub.com

```
Logo (centered)        Explore ▾    Work    Clients    Blogs
                         ├ About Us
                         ├ Services
                         ├ Process
                         └ Contact Us
```

- Logo can be left or centered (Ogilvy uses centered — going with that)
- "Explore" opens a quiet dropdown on hover (desktop) / tap (mobile)
- On mobile: Explore expands inline, Work/Clients/Blogs stack below
- No "Start a project" pill in the nav (Ogilvy doesn't have one either)

---

## 3. Homepage — 8 sections, in order

### Section 1 — Hero (cinematic full-bleed)
Reference: Ogilvy's red hero with centered wordmark + thesis statement.

- **Background**: full-bleed brand teal gradient (`#81D5D3 → #009E8B`), 100vh
- **Top center**: "Ingenious Hub" wordmark, small in the nav position
- **Center**: a 3-sentence thesis claim in bold Open Sans, large, tight tracking
- **Cinematic moment on scroll**: the wordmark scales up massively (Ogilvy does this — the small logo at top grows to a full-page wordmark as user scrolls) and the next section (Capabilities) slides in behind it

**Draft thesis copy** (your edit):
> "Brands aren't built by louder voices. They're built by stronger arguments. Ingenious Hub is the agency for brands with something to say — and the conviction to say it across every surface that matters."

### Section 2 — Capabilities (editorial scroll storytelling)
9 disciplines from your brief: Branding · Advertising · Marketing · PR · Strategy · Campaigns · UI/UX · Creative Direction · Digital Experiences.

- **Layout**: large editorial running list, one capability per row, asymmetric. Capability number rises in mono, the label fades in, a quiet 1-line description follows.
- **Motion**: scroll-tied reveal per capability, mild rotation/translate on the number, content slides in from the left
- **No icon grids** — this is a manifesto, not a cards section

### Section 3 — Randomised Portfolio (alive, cinematic)
Preserving the randomised-on-refresh identity feature you flagged.

- **Layout**: masonry-style, 8-10 tiles, varied sizes (matches Ogilvy's varied-tile grid)
- **Randomisation**: on each load, the order of featured projects shuffles deterministically per session (so it changes but doesn't shuffle on every re-render)
- **Tiles**: brand cover (uses verified logos where present), hover reveals a quiet "View case" pill + sector
- **No filter chips at top** — Ogilvy doesn't have them
- **Includes ALL existing cases** + room for future drops via lib/work.ts

### Section 4 — Featured Case (one immersive moment)
One case as a "trailer" embedded in the homepage.

- **Layout**: full-bleed, with the case cover bleeding to viewport edges
- **Copy structure**: small "Featured" eyebrow, then Problem → Thinking → Execution → Impact as quiet scroll-stops, each with a key image/placeholder
- **CTA**: small "Read the case" link → goes to /work/[slug]
- **Rotates**: featured case can rotate (initially pin to Allegiance, the strongest essay)

### Section 5 — Trust & Accreditation (editorial trust wall)
DesignRush · Clutch · Trustpilot · 50Pros · Google rating.

- **Layout**: an editorial trust statement — "Recognised by" eyebrow, then a 4-up of accreditation marks
- **Each accreditation**: name, rating/recognition, link out
- **Animated count-up**: only on the Google rating ("4.6 ★ from N reviews")
- **No chips, no badges, no awards wall clutter**

### Section 6 — Client Ecosystem (animated wall)
Your 86-client roster (40 verified, 46 placeholder).

- **Layout**: 6-col grid (matches your current /clients page, refined)
- **Sector tabs**: Edtech · D2C · Fintech · Healthcare · B2B · Media · Public · Real Estate · Tech — filter the wall by sector
- **Default**: monochrome wall, hover reveals full-colour mark
- **Sort**: alphabetical (matches your existing rule)
- **CTA at bottom**: "See full ecosystem (86 brands)" → /clients

### Section 7 — Insights / Blogs (magazine editorial)
3 most-recent posts.

- **Layout**: 1 large featured post left + 2 smaller stacked right (magazine standard)
- **Each post**: large headline (Open Sans bold), byline mono, faint divider
- **No blog cards with gradients** — pure editorial
- **CTA**: "All writing" → /blogs

**Note**: /insights becomes /blogs to match your live nav. I'll rename the route.

### Section 8 — Final CTA (emotional closing)
- **Layout**: full-width, large editorial closing statement, centered or left-aligned
- **Copy**: "Let's build the brand people remember." — your studio voice
- **Three CTAs**: WhatsApp · Email · Schedule consultation (Cal.com or similar)
- **Below**: address line, studio details — quiet, mono

---

## 4. Other pages — same standard

Each gets rebuilt to match the homepage's editorial bar:

| Route | Treatment |
| --- | --- |
| **/work** | Full asymmetric grid of ALL projects (vs. homepage's 8-10 featured). Sector filter chips appear after first scroll. |
| **/work/[slug]** | Already rebuilt to scrolling sequence — refine to match new typography, add brand-teal wash hero, varied panel sizes |
| **/clients** | Refined version of homepage Section 6. Filter chips, sector toggles, sorted alphabetical. |
| **/blogs** (renamed from /insights) | Magazine-style index of all posts. Phase C content (essay copy) comes later. |
| **/about** | Full-bleed brand hero like homepage, then long-form belief essay, team grid (future), values list. Positions Ingenious Hub as a global agency. |
| **/services** | 9 capabilities in editorial detail — each with deliverables, examples, FAQs. |
| **/process** | 6 methodology steps as a cinematic vertical scroll. |
| **/contact** | Two-step scope picker (existing) + WhatsApp/email/Cal.com options, brand-teal accent wash. |

---

## 5. Files to touch

**New files:**
- `components/sections/hero.tsx` — REWRITE (was already there but Pentagram-stripped)
- `components/sections/capabilities.tsx` — NEW (replaces services-posture)
- `components/sections/featured-case.tsx` — NEW (single immersive case)
- `components/sections/insights.tsx` — NEW (magazine 3-up)
- `components/dropdown-nav.tsx` — NEW (the Explore ▾ dropdown)
- `app/blogs/page.tsx` — NEW (rename from /insights)
- `lib/featured.ts` — NEW (random seed picker)

**Rewrites:**
- `app/page.tsx` — compose all 8 sections in the new order
- `components/navbar.tsx` — centered logo, Explore dropdown, mobile sheet
- `components/sections/work-grid.tsx` — asymmetric, randomised, cinematic
- `components/sections/proof.tsx` — editorial trust wall (not slab)
- `components/sections/clients-wall.tsx` — sector tabs, hover reveal
- `components/sections/final-cta.tsx` — cleaner, more decisive
- `app/work/page.tsx` — match new homepage grid style
- `app/clients/clients-client.tsx` — sector filters refined
- `app/about/page.tsx` — global-agency positioning
- `app/contact/page.tsx` — calmer, brand-aligned

**Updates:**
- `app/layout.tsx` — JSON-LD positioning (global agency, not Jaipur studio)
- `CLAUDE.md` — record the positioning shift + new section count

**Retire:**
- `app/insights/page.tsx` — replaced by /blogs
- `app/industries/page.tsx` + dynamic — fold into /services + /work filters

---

## 6. Animation system

- **Lenis** smooth scroll (already in place) for the cinematic feel
- **Framer Motion** for in-view reveals on every section (already pattern)
- **Add GSAP** for the hero wordmark-scaling scroll moment (Framer alone doesn't do the wordmark-tracking-camera effect cleanly)
- **prefers-reduced-motion** kill switch (already in globals.css)
- **Page transitions**: subtle fade between routes via Next's `loading.tsx` boundary

---

## 7. What is NOT in scope this session

- **CMS / admin panel** (your Section F) — Phase C. Will scope separately with Sanity once visual direction is locked.
- **Custom display typeface licensing** — Open Sans only as you specified
- **Real photography commissioning** — drop-zones ready, you commission separately
- **Remaining 46 client logos** (A-O range) — you upload as ready

---

## 8. Build / verification gate before commit

After each section lands:
1. `npm run build` clean
2. `npm run lint` clean
3. Visual check on mobile (390px), tablet (768px), desktop (1280px), wide (1920px)
4. Reduced-motion check (transitions instant)
5. Dark-mode check (warm graphite preserved)

---

## 9. Atomic commit policy

Per your Section K — one commit per section ships:
- `feat(home): hero` — Section 1
- `feat(home): capabilities` — Section 2
- `feat(home): work-grid randomised` — Section 3
- `feat(home): featured-case` — Section 4
- `feat(home): accreditation` — Section 5
- `feat(home): client-ecosystem` — Section 6
- `feat(home): insights` — Section 7
- `feat(home): final-cta` — Section 8
- `feat(nav): centered logo + Explore dropdown` — Navigation
- Then individual route rebuilds.

---

## Status

- [x] Plan written (this file)
- [x] DECISIONS.md captured (separate file)
- [ ] **Awaiting your sign-off before any code changes**
- [ ] Section 1 — Hero
- [ ] Section 2 — Capabilities
- [ ] Section 3 — Randomised Portfolio
- [ ] Section 4 — Featured Case
- [ ] Section 5 — Accreditation
- [ ] Section 6 — Client Ecosystem
- [ ] Section 7 — Insights / Blogs
- [ ] Section 8 — Final CTA
- [ ] Navbar — centered, dropdown
- [ ] /work
- [ ] /work/[slug] refinement
- [ ] /clients
- [ ] /blogs (renamed from /insights)
- [ ] /about
- [ ] /services
- [ ] /process
- [ ] /contact
- [ ] CLAUDE.md updated for positioning
