"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CLIENTS, type Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

const FILTERS = [
  "All",
  "Edtech",
  "D2C",
  "Fintech",
  "B2B",
  "Healthcare",
  "Tech",
  "Public",
  "Media",
  "Real Estate",
] as const;

type Filter = (typeof FILTERS)[number];

export function ClientEcosystem() {
  const [filter, setFilter] = React.useState<Filter>("All");

  const list = React.useMemo<Client[]>(() => {
    if (filter === "All") return CLIENTS;
    return CLIENTS.filter((c) => c.category === filter);
  }, [filter]);

  return (
    <section className="relative">
      <div className="container py-20 md:py-28">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Client ecosystem
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              {CLIENTS.length}+ brands.{" "}
              <span className="font-serif italic text-muted-foreground">
                One studio.
              </span>
            </h2>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap gap-2 md:mt-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-teal-500/40 hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 md:mt-12 md:grid-cols-4 lg:grid-cols-5">
          {list.map((c, i) => (
            <motion.li
              key={c.name}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.012, 0.4) }}
              className="group relative flex aspect-[4/3] items-center justify-center bg-background p-4 text-center md:p-6"
            >
              <span className="text-balance text-sm font-medium tracking-tight text-foreground/80 transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400 md:text-base">
                {c.name}
              </span>
              <span className="absolute right-2 top-2 font-mono text-[9px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {c.category}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
