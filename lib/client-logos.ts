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
 * Verified overrides. Each entry signals that /public/clients/<slug>.<ext>
 * exists and the studio has confirmed the asset is the official brand mark.
 * Anything not listed here falls through to the typographic placeholder.
 */
const verified = (slug: string, monochrome = false): LogoManifestEntry => ({
  slug,
  status: "verified",
  ext: "svg",
  monochrome,
});

const OVERRIDES: Record<string, LogoManifestEntry> = {
  // First batch (pre-roster verification).
  "trueline-technologies": verified("trueline-technologies"),
  "yug-vaastra": verified("yug-vaastra"),

  // Roster drop — P through Y (40 brands). Filenames pre-matched to
  // slugify(name) — outliers (pure-earth, tagore-IPS, techzu, etc.)
  // were renamed on disk to match.
  "pragyatah": verified("pragyatah"),
  "prowess-healthcare": verified("prowess-healthcare"),
  "pureearth": verified("pureearth"),
  "quincy": verified("quincy"),
  "res-rajasthan-engineering-colleges-society": verified("res-rajasthan-engineering-colleges-society"),
  "reliable-media": verified("reliable-media"),
  "rr-gurukul": verified("rr-gurukul"),
  "satya-smriti": verified("satya-smriti"),
  "sbn-group-of-schools": verified("sbn-group-of-schools"),
  "schege": verified("schege"),
  "shiksha-setu": verified("shiksha-setu"),
  "shree-security-fender": verified("shree-security-fender"),
  "shreenath-group": verified("shreenath-group"),
  "shubh-vaibhav-decor": verified("shubh-vaibhav-decor"),
  "summer-hills": verified("summer-hills"),
  "tagore-ips": verified("tagore-ips"),
  "tagore-engineering-college": verified("tagore-engineering-college"),
  "tagore-law-college": verified("tagore-law-college"),
  "team-phoenix": verified("team-phoenix"),
  "techzu-software": verified("techzu-software"),
  "tg-consultancy": verified("tg-consultancy"),
  "the-rainbow-threads": verified("the-rainbow-threads"),
  "the-wash-hut": verified("the-wash-hut"),
  "the-wellness-clinic": verified("the-wellness-clinic"),
  "unlock-career": verified("unlock-career"),
  "upjay-foundation": verified("upjay-foundation"),
  "upturn-health": verified("upturn-health"),
  "urnik-restro": verified("urnik-restro"),
  "volimy": verified("volimy"),
  "volkaline": verified("volkaline"),
  "wealth-wisdom-consultants": verified("wealth-wisdom-consultants"),
  "white-eudicots": verified("white-eudicots"),
  "whmcs-pro": verified("whmcs-pro"),
  "woocom-pro": verified("woocom-pro"),
  "yash-publicity": verified("yash-publicity"),
  "yisf": verified("yisf"),
  "yogritu": verified("yogritu"),
  "yogscape": verified("yogscape"),

  // TODO(verification): 46 remaining clients (alphabet A through O) still
  // have no verified asset and render as typographic placeholders. Drop the
  // SVG at /public/clients/<slug>.svg and add an entry above as each lands.
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
