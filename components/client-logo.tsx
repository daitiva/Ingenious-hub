"use client";

import * as React from "react";
import { cn, slugify } from "@/lib/utils";
import { getLogoEntry } from "@/lib/client-logos";
import { CLIENTS } from "@/lib/clients";

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
 * Two-tier source strategy:
 *   1. /public/clients/<slug>.<ext> if the manifest says `verified`.
 *   2. Google's favicon service at sz=128 if the client has a public
 *      `domain` set on lib/clients.ts. This is "good enough" for an
 *      editorial wall — sharp icon, served from Google's CDN, no
 *      third-party JS, no privacy hit.
 *   3. Typographic placeholder at identical dimensions otherwise.
 *
 * All three render at the same box so the grid never shifts.
 */

const GOOGLE_FAVICON = "https://www.google.com/s2/favicons?sz=128&domain=";

export function ClientLogo({
  name,
  slug: slugOverride,
  forceMono,
  tone = "auto",
  className,
  fallback,
  loading = "lazy",
}: ClientLogoProps) {
  const [localErrored, setLocalErrored] = React.useState(false);
  const [domainErrored, setDomainErrored] = React.useState(false);

  const slug = slugOverride ?? slugify(name);
  const entry = getLogoEntry(slug);
  const client = CLIENTS.find((c) => c.name === name);

  // Blocked entries never render an asset.
  if (entry.status === "blocked") {
    return (
      <Placeholder name={name} className={className}>
        {fallback ?? name}
      </Placeholder>
    );
  }

  // Tier 1 — verified local asset.
  if (entry.status === "verified" && !localErrored) {
    const ext = entry.ext ?? "svg";
    const src = `/clients/${slug}.${ext}`;
    const mono = forceMono ?? entry.monochrome ?? false;
    return (
      <BrandImg
        src={src}
        alt={name}
        loading={loading}
        mono={mono}
        tone={tone}
        className={className}
        onError={() => setLocalErrored(true)}
      />
    );
  }

  // Tier 2 — domain-sourced fallback (Google favicons). Sharp 128px PNG.
  if (client?.domain && !domainErrored) {
    return (
      <BrandImg
        src={`${GOOGLE_FAVICON}${client.domain}`}
        alt={name}
        loading={loading}
        // Favicons are full-colour by default; respect tone="mono" for the wall
        mono={forceMono ?? false}
        tone={tone}
        className={cn("h-auto max-h-12 w-auto", className)}
        onError={() => setDomainErrored(true)}
      />
    );
  }

  // Tier 3 — typographic placeholder.
  return (
    <Placeholder name={name} className={className}>
      {fallback ?? name}
    </Placeholder>
  );
}

function BrandImg({
  src,
  alt,
  loading,
  mono,
  tone,
  className,
  onError,
}: {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
  mono?: boolean;
  tone?: "auto" | "mono" | "default";
  className?: string;
  onError?: () => void;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={200}
      height={120}
      loading={loading ?? "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={onError}
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
