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
 * Renders a client logo with three states:
 *   verified   — loads /public/clients/<slug>.<ext>, lazy by default
 *   placeholder — tasteful typographic placeholder at consistent dimensions
 *   blocked    — name rendered as text only (policy)
 *
 * Dark-mode safe: monochrome marks get `dark:invert`; full-colour marks pass
 * through. Lazy + no implicit width so we never trigger CLS at scale.
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
    return (
      <Placeholder name={name} className={className}>
        {fallback ?? name}
      </Placeholder>
    );
  }

  // Verified path — render the asset. If it 404s at runtime, gracefully
  // fall back to the placeholder so layout never breaks. Explicit dimensions
  // + aspect-ratio container so we never trigger CLS even when images load
  // slowly on a cold cache.
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
            "[filter:grayscale(1)_contrast(0.9)] opacity-80 transition-[filter,opacity] duration-300 hover:[filter:grayscale(0)] hover:opacity-100 dark:invert",
          className
        )}
      />
    );
  }

  // Placeholder path.
  return (
    <Placeholder name={name} className={className}>
      {fallback ?? name}
    </Placeholder>
  );
}

/**
 * Typographic placeholder — consistent dimensions, never breaks the grid.
 * Uses the brand's serif italic so it reads as intentional, not absent.
 */
function Placeholder({
  name,
  className,
  children,
}: {
  name: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isLong = name.length > 18;
  return (
    <span
      aria-label={name}
      className={cn(
        "flex h-full w-full items-center justify-center text-balance text-center font-serif italic leading-tight tracking-tight text-foreground/70",
        isLong ? "text-base md:text-lg" : "text-lg md:text-2xl",
        className
      )}
    >
      {children}
    </span>
  );
}
