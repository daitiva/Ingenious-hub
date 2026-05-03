"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORK, type WorkCategory } from "@/lib/work";
import { cn } from "@/lib/utils";
import { FinalCTA } from "@/components/sections/final-cta";

const FILTERS: ("All" | WorkCategory)[] = [
  "All",
  "Branding",
  "Web",
  "Marketing",
  "PR",
];

export default function WorkPage() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All");
  const items = filter === "All" ? WORK : WORK.filter((w) => w.category === filter);

  return (
    <>
      <section className="border-b border-border bg-muted/20 py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Work
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Work that{" "}
            <span className="font-serif italic">delivers results.</span>
          </h1>
          <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
            A selection of recent identity, web, marketing, and PR work. Every result is
            real and signed off by the client.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  filter === f
                    ? "border-teal-500 bg-teal-500 text-white"
                    : "border-border text-muted-foreground hover:border-teal-500/40 hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {items.map((w, i) => (
                <motion.article
                  key={w.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-30px_rgba(13,148,136,0.45)]"
                >
                  <div
                    className={cn(
                      "relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br",
                      w.accent
                    )}
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-serif text-6xl italic text-foreground/80 md:text-7xl">
                        {w.client}
                      </span>
                    </div>
                    <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-foreground/10 bg-background/70 px-2.5 py-1 text-xs backdrop-blur">
                      {w.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {w.client} · {w.sector}
                    </p>
                    <h3 className="text-2xl font-semibold leading-snug tracking-tight">
                      {w.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{w.summary}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {w.result.map((r) => (
                        <div
                          key={r.label}
                          className="rounded-xl border border-border bg-background px-4 py-3"
                        >
                          <div className="text-lg font-semibold tracking-tight">
                            {r.metric}
                          </div>
                          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 border-t border-border pt-4">
                      {w.scope.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
