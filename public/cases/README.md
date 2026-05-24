# /public/cases — case artefact drop-zone

Real case-study photography and brand artefacts live here. The hero
tearsheet stack on the homepage and the case-study pages at
`/work/<slug>` both read from this convention.

## Naming convention

Each case slug gets a folder. The slug matches the entry in
`lib/work.ts` and `lib/cases.ts`.

```
public/cases/<slug>/
├── hero.jpg              ← 1600×2000 (4:5), under 400 KB, sRGB
├── gallery-01.jpg        ← optional, used in /work/<slug> execution
├── gallery-02.jpg
└── ...
```

Prefer `.jpg` for photography, `.svg` for vector-clean brand artefacts.

## What the site uses today

Until real photography lands, the hero cards and case-study heroes
fall back to a typographic placeholder rendered via
`components/client-logo.tsx`. The verification manifest at
`lib/client-logos.ts` is the contract — flipping an entry from
`placeholder` to `verified` swaps the placeholder for a real mark.

Per-case photography (`hero.jpg`, gallery images) is currently not
wired into the components — the moment a folder of real photos lands,
update the engineering side (`<CaseCard>` in
`components/sections/hero.tsx` and the hero block of
`app/work/[slug]/page.tsx`) to read from `/cases/<slug>/hero.jpg`.

## Tips for the studio

- Export at 2x retina width (3200 wide) only if the photo will display
  full-bleed on desktop; otherwise 1600 wide is plenty.
- Keep file sizes lean — Vercel's image optimisation handles formats
  and resolutions on the fly, but the source still matters.
- Document any model release / location release alongside the photo
  if applicable.
