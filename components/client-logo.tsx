"use client";

import * as React from "react";
import { cn, slugify } from "@/lib/utils";
import { getLogoEntry } from "@/lib/client-logos";

type ClientLogoProps = {
  /** Display name — used for alt text + placeholder + slug derivation */
  name: string;
  /** Manual slug override; otherwise derived from `name` */
  slug?: string;
  /** "monochrome" forces dark-mode auto-invert even if the manifest says no */
  forceMono?: boolean;
  /** Treatment — adjusts colour handling for monochrome walls */
  tone?: "auto" | "mono" | "default";
  className?: string;
  /** Custom fallback for the placeholder; default uses the brand wordmark */
  fallback?: React.ReactNode;
  /** Lazy-load by default; set "eager" for above-the-fold */
  loading?: "lazy" | "eager";
};

/**
 * Two-tier source strategy — kept honest:
 *   1. /public/clients/<slug>.<ext> if the manifest says `verified`. The
 *      file is uploaded by the studio; we render it.
 *   2. Editorial typographic placeholder otherwise. Reads as an intentional
 *      brand wordmark in the studio's serif, not as a missing asset.
 *
 * Past iterations tried Google's favicon CDN as a tier-2 source. The output
 * was upscaled 32px PNGs that read as broken-favicons on a premium wall, so
 * that path is removed. To swap a placeholder for a real mark, drop the SVG
 * at /public/clients/<slug>.svg and flip the manifest entry to "verified".
 */
export function ClientLogo({
  name,
  slug: slugOverride,
  forceMono,
  tone = "auto",
  className,
  fallback,
  loading = "lazy",
}: ClientLogoProps) {
  const [errored, setErrored] = React.useState(false);
  const slug = slugOverride ?? slugify(name);
  const entry = getLogoEntry(slug);

  // Blocked entries never render an asset.
  if (entry.status === "blocked") {
    return <Placeholder name={name}>{fallback ?? name}</Placeholder>;
  }

  // Tier 1 — verified local asset.
  if (entry.status === "verified" && !errored) {
    const ext = entry.ext ?? "svg";
    const src = `/clients/${slug}.${ext}`;
    const mono = forceMono ?? entry.monochrome ?? false;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={200}
        height={120}
        loading={loading}
        decoding="async"
        onError={() => setErrored(true)}
        className={cn(
          "block h-full w-full max-w-full object-contain",
          mono &&
            "[filter:grayscale(1)_contrast(0.95)] opacity-90 dark:invert dark:opacity-95",
          tone === "mono" &&
            "[filter:grayscale(1)_contrast(0.9)] opacity-80 transition-[filter,opacity] duration-300 hover:[filter:grayscale(0)] hover:opacity-100",
          className
        )}
      />
    );
  }

  // Tier 2 — editorial typographic placeholder.
  return <Placeholder name={name}>{fallback ?? name}</Placeholder>;
}

/**
 * The placeholder is a tight, hand-tuned typographic composition designed
 * to look intentional next to real logos on the same wall. Serif italic for
 * the wordmark, a thin hairline rule above and below to mimic a printer's
 * nameplate, and a tiny mono colophon underneath that contextualises it.
 *
 * Two-line names break at the space; long names step down a size so the
 * wall never feels lopsided.
 */
function Placeholder({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  // Three buckets — sizes tuned so a wall of mixed-length names reads
  // visually balanced at the same cell dimensions.
  const len = name.length;
  const size =
    len <= 12
      ? "text-2xl md:text-[1.6rem]"
      : len <= 22
        ? "text-xl md:text-[1.35rem]"
        : "text-base md:text-lg";

  return (
    <span
      aria-label={name}
      className="group/ph relative inline-flex h-full w-full flex-col items-center justify-center gap-1.5 px-2 text-center"
    >
      {/* Top hairline */}
      <span
        aria-hidden
        className="h-px w-6 bg-foreground/25 transition-[width,background] duration-500 group-hover/ph:w-10 group-hover/ph:bg-foreground/45"
      />
      {/* Wordmark */}
      <span
        className={cn(
          "block text-balance font-serif italic leading-[1.05] tracking-tight text-foreground/85",
          size
        )}
      >
        {children}
      </span>
      {/* Bottom hairline */}
      <span
        aria-hidden
        className="h-px w-6 bg-foreground/25 transition-[width,background] duration-500 group-hover/ph:w-10 group-hover/ph:bg-foreground/45"
      />
    </span>
  );
}
