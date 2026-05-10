"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
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

  return (
    <>
      <section className="border-b border-border bg-cream/40 py-16 dark:bg-muted/20 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
            Clients
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-3 text-balance font-light text-fluid-5xl leading-[1.05] tracking-tightest md:text-fluid-6xl"
          >
            {CLIENTS.length}+ brands.{" "}
            <span className="font-serif italic text-teal-600 dark:text-teal-400">
              One studio.
            </span>
          </motion.h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            Founders we&rsquo;ve built brands, websites, and pipelines for —
            across edtech, D2C, fintech, healthcare, B2B, and beyond.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex flex-wrap gap-2">
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
                {f !== "All" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {CLIENTS.filter((c) => c.category === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {list.map((c, i) => (
              <motion.li
                key={c.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i * 0.012, 0.4),
                }}
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

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Logo files for these clients live at{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
              public/clients/
            </code>{" "}
            — drop in <code>{`<slug>.svg`}</code> to swap a name for a mark.
          </p>
        </div>
      </section>
    </>
  );
}
