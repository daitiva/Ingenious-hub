# Design + architecture decisions

Recorded per `CLAUDE.md` Section 11 "files that double as decision logs". Every meaningful design call lives here so future sessions don't relitigate them.

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
