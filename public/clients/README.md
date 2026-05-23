# Client logos

Drop logo files here, one per client. The site picks them up by slug; if a
file is missing the component falls back to the wordmark, so it's safe to
add files incrementally.

## File spec

- **Format**: PNG, SVG, JPG, or WEBP. PNG with a transparent background is
  the easiest path.
- **Filename**: `<slug>.png` — lowercase, dashes for spaces, no apostrophes
  or punctuation.
  - `Allegiance Education` → `allegiance-education.png`
  - `Tax2Win` → `tax2win.png`
  - `Yug Vaastra` → `yug-vaastra.png`
  - `Modernwala's` → `modernwalas.png`
  - `TheFabricLibrary` → `thefabriclibrary.png`
- **Aspect**: cells render at roughly 3:2 or 4:3 — pad your artwork inside
  the canvas so the safe area stays clear.
- **Color**: deliver in full colour. The renderer never tints; if you want
  monochrome chips, deliver them that way.

## Where the slug comes from

Slugs are derived from the `name` field in `lib/clients.ts` via the
`slugify()` helper in `lib/utils.ts`. Add a new row to `lib/clients.ts`,
drop the file here with the matching slug, and you're done.

## Editing client info

There is no admin panel yet. All content lives in `lib/*.ts`:

- `lib/clients.ts` — names, categories
- `lib/work.ts` — case studies, results
- `lib/services.ts` — service pillars
- `lib/insights.ts` — blog posts

Each file is plain TypeScript. Edit, commit, push — Vercel rebuilds in ~60s.

When you're ready for a true admin (CMS), see the **CMS migration roadmap**
in the project README — the data shapes here mirror Sanity / Payload
schemas exactly, so the swap is mechanical.
