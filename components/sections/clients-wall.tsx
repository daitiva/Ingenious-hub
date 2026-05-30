"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CLIENTS } from "@/lib/clients";
import { WORK } from "@/lib/work";
import { ClientLogo } from "@/components/client-logo";
import { cn, slugify } from "@/lib/utils";

/**
 * ClientsWall — Section 6 of the homepage.
 *
 * Sector-filterable wall of every brand the studio has worked with.
 * Default view is monochrome; hover reveals colour.
 *
 * Mobile behaviour (per studio call): show only the first 12 brands by
 * default with a "Show more" toggle to expand the rest. Keeps the
 * scroll experience tight on phones.
 *
 * Click-through: when a brand has a matching case study in lib/work.ts,
 * the tile becomes a link to /work/<slug>. Brands without a case
 * remain non-clickable (no broken navigation). The fuller per-client
 * page lives in Phase C / CMS — at that point every brand will route
 * to /clients/<slug>.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_INITIAL = 12;

const SECTORS = [
  "All",
  "Edtech",
  "D2C",
  "Fintech",
  "Healthcare",
  "B2B",
  "Tech",
  "Media",
  "Public",
  "Real Estate",
] as const;

type Sector = (typeof SECTORS)[number];

// Build a fast lookup: client name → /work/<slug> if a case exists.
const WORK_HREF_BY_NAME = new Map<string, string>(
  WORK.map((w) => [w.client.toLowerCase(), `/work/${w.slug}`])
);

function clientHref(name: string): string | null {
  // Direct name match first
  const direct = WORK_HREF_BY_NAME.get(name.toLowerCase());
  if (direct) return direct;
  // Slug match (e.g. "Yug Vaastra" → yug-vaastra)
  const slug = slugify(name);
  const bySlug = WORK.find((w) => w.slug === slug);
  return bySlug ? `/work/${bySlug.slug}` : null;
}

export function ClientsWall() {
  const [active, setActive] = useState<Sector>("All");
  const [showAllMobile, setShowAllMobile] = useState(false);

  const filtered = useMemo(() => {
    if (active === "All") return CLIENTS;
    return CLIENTS.filter((c) => c.category === active);
  }, [active]);

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative border-t border-border"
    >
      <div className="container py-20 md:py-28">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              05 — Client ecosystem
            </p>
          </div>
          <div className="md:col-span-7">
            <h2
              id="clients-heading"
              className="text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest"
            >
              {CLIENTS.length} brands.{" "}
              <span className="font-serif italic text-gradient-brand">
                Nine sectors.
              </span>
            </h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <Link
              href="/clients"
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              Full ecosystem →
            </Link>
          </div>
        </div>

        {/* Sector tabs */}
        <div className="mt-12 flex flex-wrap gap-2 border-y border-border py-5">
          {SECTORS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setActive(s);
                setShowAllMobile(false); // reset mobile expansion when changing filter
              }}
              className={cn(
                "focus-ring rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                active === s
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* The wall — monochrome by default, colour on hover.
            On mobile, the list is sliced to the first MOBILE_INITIAL
            unless the user has tapped "Show more". On md+, every brand
            is rendered (no slice). */}
        <ul className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((c, i) => (
            <Tile
              key={c.name}
              name={c.name}
              index={i}
              hiddenOnMobile={!showAllMobile && i >= MOBILE_INITIAL}
            />
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No brands in this sector yet.
          </p>
        )}

        {/* Mobile-only "Show more" / "Full ecosystem" controls.
            Surface only when the filter has more than MOBILE_INITIAL entries
            and the user hasn't already expanded. */}
        {!showAllMobile && filtered.length > MOBILE_INITIAL && (
          <div className="mt-8 flex flex-col items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium transition-colors hover:border-foreground"
            >
              Show more ({filtered.length - MOBILE_INITIAL} more)
            </button>
            <Link
              href="/clients"
              className="focus-ring text-sm font-medium underline-offset-4 hover:underline"
            >
              Full ecosystem →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function Tile({
  name,
  index,
  hiddenOnMobile,
}: {
  name: string;
  index: number;
  hiddenOnMobile: boolean;
}) {
  const href = clientHref(name);
  const inner = (
    <ClientLogo
      name={name}
      tone="mono"
      className="max-h-[60%] w-auto max-w-full"
    />
  );

  const cellClass = cn(
    "group flex aspect-[5/3] items-center justify-center bg-background px-4 py-6 transition-colors hover:bg-muted/40",
    // Hide the tile on mobile when beyond the initial slice. md:flex
    // restores visibility on tablets and up where the wall isn't long.
    hiddenOnMobile && "hidden md:flex"
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: (index % 12) * 0.02 }}
      className={cellClass}
    >
      {href ? (
        <Link href={href} className="focus-ring flex h-full w-full items-center justify-center" aria-label={`${name} — view case`}>
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.li>
  );
}
