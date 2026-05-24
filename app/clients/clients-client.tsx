"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CLIENTS, type Client } from "@/lib/clients";
import { ClientLogo } from "@/components/client-logo";
import { logoStats } from "@/lib/client-logos";
import { cn } from "@/lib/utils";

const FILTERS = [
  "All",
  "Edtech",
  "D2C",
  "B2C",
  "Fintech",
  "B2B",
  "Healthcare",
  "Tech",
  "Public",
  "Media",
  "Real Estate",
] as const;

type Filter = (typeof FILTERS)[number];

export function ClientsClient() {
  const params = useSearchParams();
  const initial = (params?.get("cat") as Filter) || "All";
  const [filter, setFilter] = React.useState<Filter>(
    FILTERS.includes(initial) ? initial : "All"
  );

  const list = React.useMemo<Client[]>(() => {
    if (filter === "All") return CLIENTS;
    return CLIENTS.filter((c) => c.category === filter);
  }, [filter]);

  const stats = logoStats();

  return (
    <>
      {/* HEADER */}
      <section className="relative border-b border-border bg-bone/40 py-20 dark:bg-muted/20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Clients · {CLIENTS.length}+ engagements
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="text-balance font-display text-d-2 font-light leading-[1.05]">
                The brands that{" "}
                <span className="font-serif italic text-teal-600 dark:text-teal-300">
                  asked us to argue
                </span>{" "}
                their case.
              </h1>
              <p className="mt-7 max-w-2xl text-body-lg text-muted-foreground">
                Startups, family enterprises, public-good missions, fintechs,
                D2C labels — every entry below is a real engagement. Logos
                appear in monochrome on the wall by design; hover or focus a
                tile to see the brand mark in full colour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + WALL */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div
            role="tablist"
            aria-label="Filter clients by industry"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => {
              const isActive = filter === f;
              const count =
                f === "All"
                  ? CLIENTS.length
                  : CLIENTS.filter((c) => c.category === f).length;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "focus-ring inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  )}
                >
                  <span>{f}</span>
                  <span className="text-[10px] opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          <motion.ul
            layout
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 md:mt-16 md:grid-cols-4 lg:grid-cols-5"
          >
            {list.map((c, i) => (
              <motion.li
                key={c.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.012, 0.4) }}
                className="bg-background"
              >
                <div className="group relative flex aspect-[4/3] items-center justify-center p-5 transition-colors hover:bg-card md:p-7">
                  <div className="flex h-full max-h-16 w-full max-w-[140px] items-center justify-center md:max-h-20">
                    <ClientLogo name={c.name} tone="mono" />
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-2 top-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {c.category}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Admin / honesty strip */}
          <p className="mt-10 max-w-3xl text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.18em] text-foreground/60">
              Logo verification
            </span>{" "}
            ·{" "}
            <span className="tabular-nums">{stats.verified}</span> of{" "}
            <span className="tabular-nums">{stats.total}</span> marks are
            sourced from official brand assets. The rest render as
            typographic placeholders at the same dimensions until each
            verified file lands at{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
              public/clients/&lt;slug&gt;.svg
            </code>
            .
          </p>
        </div>
      </section>
    </>
  );
}
