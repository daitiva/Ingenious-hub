# Client logos

Drop logo files here, one per client. The site picks them up automatically by
slug; if a file is missing the wordmark renders as text, so it's safe to add
files incrementally.

## File spec

- **Format**: SVG preferred. PNG with transparent background also works.
- **Filename**: `<slug>.svg` — lowercase, dashes for spaces.
  Example: `Allegiance Education` → `allegiance-education.svg`.
- **Aspect**: tile is rendered at 4:3 — pad your artwork inside that ratio.
- **Color**: deliver in single-color (black or grey). The grid auto-tints
  for dark mode.

## Where the slug comes from

Slugs are derived from the `name` field in `lib/clients.ts`. To add a new
client:

1. Open `lib/clients.ts`.
2. Add a row: `{ name: "New Client", category: "D2C" }`.
3. Drop the SVG in this folder named `new-client.svg`.

## Editing client info

There is no admin panel yet. All content lives in `lib/*.ts`:

- `lib/clients.ts` — names, categories
- `lib/work.ts` — case studies, results, accents
- `lib/services.ts` — service pillars
- `lib/insights.ts` — blog posts

Each file is plain TypeScript. Edit, commit, push — Vercel rebuilds in ~60s.

When you're ready for a true admin (CMS), see the **CMS migration roadmap**
in the project README — the data shapes here mirror Sanity / Payload schemas
exactly, so the swap is mechanical.
