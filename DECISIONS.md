# Design + architecture decisions

Recorded per `CLAUDE.md` Section 11 "files that double as decision logs". Every meaningful design call lives here so future sessions don't relitigate them.

---

## 2026-07-06 — Scroll-driven 3D (desktop + mobile)

Studio asked for 3D animation on scroll, explicitly on **both** web
and mobile. That constraint decides the architecture: the depth must
be **scroll-driven, not pointer-driven**, because hover-based 3D is
invisible on a phone.

New primitives in `components/scroll-3d.tsx`:
- `TiltIn` — element hinges upright from its lower edge as it crosses
  the viewport (rotateX depth° → 0, plus scale and opacity). The
  workhorse.
- `DepthLayer` — Z-axis parallax; stack two or three at different
  `speed` values for genuine depth separation.
- `ScrollScene` — shared perspective camera for grouped children.
- `FloatCard` — slow continuous idle drift (8s loop) for objects that
  would read as dead if fully static.
- `ParallaxText` — horizontal drift on oversized decorative type.

All five spring-smooth their scroll input (`useSpring`) so motion
never feels mechanically linear, animate transform/opacity only, and
carry an internal `prefers-reduced-motion` gate on top of the global
`MotionProvider`.

Wired in:
- **Work grid** — every tile hinges upright at 9° as it enters.
- **Proof** — accreditation cards hinge at 5° (shallower; five-across
  at a steeper angle reads as noise).
- **Featured case** — card now yaws −7° → +3° and pitches 5° → −3°
  across the section, so it turns to face the reader on arrival and
  away on exit. Pointer tilt survives as an *additional* ±2° layer
  for fine-pointer devices, nested inside the scroll transform.
- **Hero** — thesis block pitches back 12° and recedes 180px on Z
  while the "energize your brand" tagline advances 120px on a
  different curve. The opposing Z curves are what create real
  parallax depth rather than a flat fade.

Rotation budget: nothing exceeds 12°. Standing rule — depth is felt
as physicality, never seen as a trick. No WebGL, no Three.js, no new
dependencies; Framer Motion covers all of it.

---

## 2026-07-06 — Visible contrast pass

Studio feedback: "I can't see any major visual and design changes" —
correct, because the two prior passes were motion + QA (felt, not
seen). Diagnosis of the static sameness: every section shared one
skeleton (eyebrow-left / heading-right), almost every section was
white, and every heading sat at the same d-2 size. Fixes, content
untouched:

1. **Proof is now a full dark ink slab** — the page's one hard tonal
   break. Homepage arc: teal → white → grey wash → INK → white → teal.
2. **Headings raise their voice** — Capabilities, Work, and Proof
   heads moved d-2 → d-1.
3. **Compositions vary per section** — Work header is centered;
   Clients header rides the right edge; Capabilities rows carry an
   oversized watermark numeral BEHIND the discipline name
   (overlapping layers, not columns) with names scaled to
   clamp(2.5rem → 5.5rem).

Standing rule: no two adjacent homepage sections may share both the
same background tone and the same header composition.

---

## 2026-07-05 — Handcrafted QA pass (10 defects fixed)

Studio asked for the site to read handcrafted, work across every
OS/screen/platform, and carry none of the "typical AI bugs". A full
audit found and fixed ten real defects:

1. Hero was `min-h-[100svh]` under a 64px fixed navbar — the scroll
   cue sat below the fold. Now `calc(100svh-64px)`.
2. Work-grid mobile "Show more": tiles revealed at `sm` but the
   button hid at `md` — between 640–768px it promised hidden tiles
   that were already visible. Both now break at `md`.
3. /clients had a "B2C" filter chip with zero matching clients — an
   always-empty filter. Removed until a B2C client exists.
4. Footer still said "creative + growth studio in Jaipur" (pre-
   positioning copy) and was missing the Blogs link. Both fixed.
5. Insights featured-post hover used `group-hover:text-gradient-brand`
   with `transition-colors` — background-clip gradients can't
   transition, so it snapped. Replaced with a smooth teal colour
   transition.
6. `theme-color` was declared in both `metadata.other` and the
   `viewport` export — duplicate, conflicting meta tags. Single
   source now (viewport, both schemes).
7. Homepage cover-probes re-fired 18 image requests on every SPA
   navigation (404 spam until real covers land). Added a module-level
   probe cache — one probe per slug per page session.
8. `<title>`/OG/Twitter titles still read "Strategic Branding &
   Digital Experience Studio" — contradicted the locked positioning.
   Now "Global Brand & Design Agency" everywhere.
9. iOS Safari's grey tap-flash on links suppressed
   (`-webkit-tap-highlight-color: transparent`) — focus states come
   from the `.focus-ring` system.
10. `scrollbar-gutter: stable` on html (kills the Windows sideways
    layout shift between short/long pages) and
    `html:focus-within { scroll-behavior: auto }` (skip-link jumps
    instantly for keyboard users instead of smooth-gliding).

Plus one handcrafted texture: `.grain-light` white-dot paper grain
overlaid on the two brand-wash sections (hero + final CTA) so the
teal gradient reads as printed stock, not a CSS fill.

---

## 2026-07-05 — Design-elevation pass ("less but better")

Studio issued a design-only brief: elevate UI/UX/motion to
international-agency grade **without changing any content**. All copy,
navigation, services, and projects frozen. Changes shipped:

### Motion accessibility becomes policy, not per-component effort
`MotionConfig reducedMotion="user"` now wraps the whole app
(`components/motion-provider.tsx`). Framer drives transforms from JS,
so the CSS `prefers-reduced-motion` kill-switch never reached them —
this closes that gap in one line. Transforms collapse to opacity
fades for reduced-motion visitors, site-wide.

### Route transitions
`app/template.tsx` — every navigation fades + rises in (0.55s,
house ease). Deliberately no exit animation: App Router unmounts
synchronously and holding the old page for an outro reads as lag.

### Animated underline replaces static hover:underline
`.link-underline` utility (globals.css): draws left→right on
hover/focus, retracts right on leave. Applied to the recurring
section links (All work / Full ecosystem / All writing).

### Work-grid image mask reveals
Tiles unmask via `clip-path: inset(12% 6%…) → 0` a beat behind the
figure's rise. Image is *revealed*, not just faded.

### 3D used twice, quietly — never as a gimmick
- Featured-case artefact card: pointer-tracked tilt, max ±2.5°,
  spring-damped, `perspective: 1200`. Fine pointers only;
  reduced-motion opts out entirely.
- Final CTA pills: `Magnetic` wrapper (`components/magnetic.tsx`),
  ≤6px drift toward cursor, springs back. Same gating.
Rule going forward: depth effects must be felt rather than seen.
No WebGL, no scenes, no floating blobs.

### Capabilities hairline choreography
Each row's separator draws left→right (`scaleX 0→1`) as the row
enters — the list assembles itself in step with the scroll.
Replaces the static `border-b`.

---

## 2026-05-29 — Full surface rebuild

### Positioning

> "Ingenious Hub is a global brand and design agency based in Jaipur."

Replaces the prior "Jaipur-based studio" framing. The site speaks as a global agency that happens to be headquartered in Jaipur, not a regional studio with international clients.

### Primary references locked

- **Ogilvy** — full-bleed colour hero with centered wordmark, single bold thesis, cinematic wordmark-scaling scroll moment, asymmetric work grid, minimal centered nav
- **Pentagram** — case-study scrolling sequence template, density of work, restrained motion

Secondary references kept as context (Studio Namma, MAD, Ravi Klaassens, Montone, FromAnother) — informing pacing, not direct cribbing.

### Pentagram-only homepage was wrong

The previous pass deleted 7 of 8 sections and shipped only the work grid. The brief consistently asks for an 8-section experience flow. Reverted course.

### Navigation matches live ingenioushub.com exactly

```
Explore ▾ (About Us, Services, Process, Contact Us)  ·  Work  ·  Clients  ·  Blogs
```

Logo centered (Ogilvy-style). Not the prior `Logo | Work | About | Contact` strip-down.

### `/insights` → `/blogs`

Live site uses "Blogs" in nav. Existing `/insights` route and content scaffolding get renamed. Old route stays as a redirect for SEO (link integrity).

### Typography is Open Sans, single family

Locked previous session. The cinematic Ogilvy-serif feel is achieved with Open Sans weight 700/800 at large sizes with tight tracking. No second font family. Italic accents continue to use `font-serif italic` (resolves to Open Sans italic).

### Brand teal gradient is the hero wash

`#81D5D3 → #009E8B` (the wordmark gradient). Full-bleed background on the hero, similar to Ogilvy's full-red hero. The brand colours, finally used at scale.

### Randomised portfolio is preserved

The studio flagged it as a "strong identity feature". Implementation: deterministic shuffle per session (Fisher-Yates seeded by date/hour so it's stable across re-renders within a browsing session but changes between sessions). Avoids the "shuffles on every refresh" jank.

### GSAP added alongside Framer Motion

For the hero wordmark-scaling scroll moment specifically. Framer's `useScroll` + `useTransform` is sufficient for most effects, but the camera-on-wordmark scroll trick reads cleaner in GSAP's `ScrollTrigger`. Strictly additive — Framer remains the primary motion library.

### CMS is deferred to Phase C

The brief asks for an admin panel (Section F). Doing it right requires Sanity (most stable for studio editorial) + migration of all typed `lib/*.ts` content into schemas. That's a 1-2 day pass on its own. Locking visual direction first; CMS after.

### What we are NOT doing this session

- Re-licensing display type (Open Sans only by the studio's call)
- Commissioning real photography
- Building the admin panel
- A/B testing infra
- Localisation

These are flagged in PROGRESS.md as future-scope and deliberately not let scope-creep into this rebuild.

---

## 2026-05-28 — Earlier locks (pre-rebuild)

### Light surface is pure white

`#FFFFFF`. Retired the warm-bone `#F4F0E8`. The `bone` Tailwind token name is preserved as an alias for backward compatibility.

### Brand triad

- Mint `#81D5D3` (= `teal-300`)
- Brand teal `#009E8B` (= `teal-600`, also `--primary`)
- Brand grey `#636363` (= `grey-500`, counterpoint, replaces former rust)

### Gradient policy

`text-gradient-brand` for one editorial italic accent per section. `bg-gradient-wash` (subtle) and `bg-gradient-wash-strong` (Final CTA) for section backgrounds. Never on cards, never on primary CTAs, never on long body text.

### Dark mode is warm graphite

`hsl(30 7% 14%)` ≈ `#25221F`. Not AMOLED black. The studio confirmed this preference.

### 40 client logos verified

P–Y range. Remaining 46 (A–O) await uploads.
