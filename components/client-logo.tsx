"use client";

import * as React from "react";
import { slugify, cn } from "@/lib/utils";

type ClientLogoProps = {
  name: string;
  /** override slug if filename doesn't match the slugified name */
  slug?: string;
  /** override extension; tries .png first */
  ext?: "png" | "svg" | "jpg" | "jpeg" | "webp";
  className?: string;
  /** what to render when the image is missing — defaults to wordmark text */
  fallback?: React.ReactNode;
  /** image fit; default contain */
  fit?: "contain" | "cover";
};

/**
 * Renders a client's logo from /public/clients/<slug>.<ext>.
 * If the file doesn't load, falls back to a wordmark.
 * Use this anywhere a brand mark should appear in the UI.
 */
export function ClientLogo({
  name,
  slug,
  ext = "png",
  className,
  fallback,
  fit = "contain",
}: ClientLogoProps) {
  const [errored, setErrored] = React.useState(false);
  const filename = `${slug || slugify(name)}.${ext}`;
  const src = `/clients/${filename}`;

  if (errored) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center text-balance font-serif italic leading-none",
          className
        )}
      >
        {fallback ?? name}
      </span>
    );
  }

  // Plain <img> rather than next/image so 404s degrade gracefully via onError
  // without throwing during static generation.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className={cn(
        "block max-h-full max-w-full",
        fit === "contain" ? "object-contain" : "object-cover",
        className
      )}
      loading="lazy"
    />
  );
}
