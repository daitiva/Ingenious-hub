# Client logos

This folder is the asset side of the client trust system. The data side
lives in `lib/clients.ts` and the verification manifest is in
`lib/client-logos.ts`.

## How the system renders a logo

The `<ClientLogo>` component (`components/client-logo.tsx`) reads the
manifest and picks one of three states per client:

| Status | Renders |
| --- | --- |
| `verified` | The file at `/public/clients/<slug>.<ext>` (preferred: SVG). |
| `placeholder` | A tasteful typographic placeholder at the same dimensions. |
| `blocked` | Name as text only (used for organisations whose policy disallows logo reuse). |

Everything is `placeholder` by default — you opt-in to `verified` per client.

## Adding a verified logo

1. **Source the official asset.** Pull from the brand's own website, their
   press kit, or their verified LinkedIn page. Prefer SVG; transparent PNG
   is a fallback. Never use a scraped, blurry, or watermarked image.
2. **Save it under the correct slug.** Convert the brand name to slug form
   (lowercase, dashes for spaces, drop apostrophes and punctuation) and
   save as `<slug>.svg` (or `.png`). Examples:
   - `Allegiance Education` → `allegiance-education.svg`
   - `Tax2Win` → `tax2win.svg`
   - `Yug Vaastra` → `yug-vaastra.svg`
   - `Modernwala's` → `modernwalas.svg`
   - `TheFabricLibrary` → `thefabriclibrary.svg`
3. **Flip the manifest.** Open `lib/client-logos.ts` and uncomment (or
   add) the override for that slug:
   ```ts
   "allegiance-education": {
     slug: "allegiance-education",
     status: "verified",
     ext: "svg",
     monochrome: false, // set true if the mark is single-colour and
                        // should auto-invert in dark mode
   },
   ```
4. **Commit + push.** Vercel rebuilds; the wall picks up the new asset.

## Slug derivation

If you're not sure what slug a client will produce, run the helper:

```ts
import { slugify } from "@/lib/utils";
slugify("Anand Niketan Group of Schools"); // "anand-niketan-group-of-schools"
```

The same helper is the source of truth for the manifest, so a slug you
generate locally will match what the renderer expects.

## Aspect, colour, dimensions

- **Aspect**: cells render at roughly 4:3. Pad the artwork inside the
  SVG canvas so the safe area sits clear of the edge.
- **Single colour vs full colour**: deliver in full colour. The wall on
  the homepage and `/clients` defaults to a monochrome treatment via CSS
  filters — set `tone="default"` on the `<ClientLogo>` if you want
  colour-out-of-the-box.
- **Monochrome marks in dark mode**: if a logo is solid black or solid
  white on transparent, set `monochrome: true` in the manifest and the
  component will apply `dark:invert` so it stays legible on both themes.

## What's in `_unverified-archive/`

52 PNGs that were bulk-uploaded to this folder before the verification
manifest landed. They couldn't be confidently mapped to specific brands
(filenames like `client_2-2.png` give no hint). They live in
`_unverified-archive/` so they're not lost — when you have time to
match them, rename to the right slug and move to this folder, then flip
the manifest entry.

## When `<ClientLogo>` 404s

If the manifest says `verified` but the file isn't there, the component
catches the error and gracefully falls back to the typographic
placeholder. Layout never breaks.
