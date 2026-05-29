"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CLIENTS } from "@/lib/clients";
import { ClientLogo } from "@/components/client-logo";
import { cn } from "@/lib/utils";

/**
 * ClientsWall — Section 6 of the homepage.
 *
 * The 86-client roster as a sector-filterable wall. Default view is
 * monochrome; hover reveals colour. Sector tabs above the wall let
 * the visitor narrow by industry — same mechanic as the /clients
 * full index page, but lighter (no search, no inline counts).
 *
 * Sorted alphabetical within each sector — keeps the read predictable.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

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

export function ClientsWall() {
  const [active, setActive] = useState<Sector>("All");

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
              <span className="text-gradient-brand font-serif italic">
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
              onClick={() => setActive(s)}
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

        {/* The wall — monochrome by default, colour on hover */}
        <ul className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 12) * 0.02 }}
              className="group flex aspect-[5/3] items-center justify-center bg-background px-4 py-6 transition-colors hover:bg-muted/40"
            >
              <ClientLogo
                name={c.name}
                tone="mono"
                className="max-h-[60%] w-auto max-w-full"
              />
            </motion.li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No brands in this sector yet.
          </p>
        )}
      </div>
    </section>
  );
}
