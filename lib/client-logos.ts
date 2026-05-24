/**
 * Client logo verification manifest.
 *
 * Every client in `lib/clients.ts` is represented here with a verification
 * status. The <ClientLogo> component reads this manifest to decide whether
 * to render an actual asset or a typographic placeholder.
 *
 * STATUS MEANINGS
 * ----------------
 * "verified"   — the file at /public/clients/<slug>.<ext> is the official mark,
 *                sourced from the brand's own site or LinkedIn. Renders the asset.
 * "placeholder"— no verified asset yet. Renders a typographic placeholder with
 *                consistent dimensions and a brand-tinted background.
 * "blocked"    — sensitive brand (e.g. govt body); use text only by policy.
 *
 * WORKFLOW
 * ----------------
 * 1. Source the official SVG/PNG (transparent background preferred).
 * 2. Save it as `/public/clients/<slug>.svg` (or `.png`).
 * 3. Flip `status` here from "placeholder" to "verified".
 * 4. If the mark is monochrome and needs to flip in dark mode, set
 *    `monochrome: true`. The component applies `dark:invert` for those.
 *
 * Currently 52 unmapped PNGs sit in /public/clients/_unverified-archive/ —
 * they were a bulk upload that couldn't be confidently mapped to specific
 * brands. They live there for reference until a human can match them.
 */

import { CLIENTS } from "@/lib/clients";
import { slugify } from "@/lib/utils";

export type LogoStatus = "verified" | "placeholder" | "blocked";

export type LogoManifestEntry = {
  /** kebab-case slug; matches the file name we expect under public/clients/ */
  slug: string;
  status: LogoStatus;
  /** File extension when status === "verified". Defaults to "svg". */
  ext?: "svg" | "png" | "webp";
  /** If true, the rendered logo is treated as monochrome and gets
   *  `dark:invert` to flip on the dark-mode surface. */
  monochrome?: boolean;
};

/**
 * Explicit overrides. Start small — only add an entry when you've
 * personally verified the file is in /public/clients/<slug>.<ext>.
 */
const OVERRIDES: Record<string, LogoManifestEntry> = {
  "trueline-technologies": {
    slug: "trueline-technologies",
    status: "verified",
    ext: "svg",
    monochrome: false,
  },
  "yug-vaastra": {
    slug: "yug-vaastra",
    status: "verified",
    ext: "svg",
    monochrome: false,
  },
  // TODO(verification): 40 additional SVGs were uploaded under
  // /public/clients/ in a batch. They need a per-file audit before
  // being flipped to "verified": confirm filename slug matches the
  // CLIENTS entry, check monochrome treatment, rename outliers
  // (e.g. "pure earth.svg" → "pureearth.svg", "tagore-IPS.svg" →
  // "tagore-ips.svg"), and add OVERRIDES entries here.
};

/** Default-derive a manifest entry for any client by slugifying its name. */
function defaultEntry(name: string): LogoManifestEntry {
  return { slug: slugify(name), status: "placeholder" };
}

/** Build the full manifest at module-load. Keys are slugified names. */
export const LOGO_MANIFEST: Record<string, LogoManifestEntry> = (() => {
  const map: Record<string, LogoManifestEntry> = {};
  for (const c of CLIENTS) {
    const slug = slugify(c.name);
    map[slug] = OVERRIDES[slug] ?? defaultEntry(c.name);
  }
  return map;
})();

export function getLogoEntry(nameOrSlug: string): LogoManifestEntry {
  const slug = nameOrSlug.includes(" ") ? slugify(nameOrSlug) : nameOrSlug;
  return LOGO_MANIFEST[slug] ?? defaultEntry(nameOrSlug);
}

/** Aggregate counts — useful for /clients page meta + admin debugging. */
export function logoStats() {
  const all = Object.values(LOGO_MANIFEST);
  return {
    total: all.length,
    verified: all.filter((e) => e.status === "verified").length,
    placeholder: all.filter((e) => e.status === "placeholder").length,
    blocked: all.filter((e) => e.status === "blocked").length,
  };
}
