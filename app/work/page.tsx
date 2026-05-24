"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WORK, type WorkCategory } from "@/lib/work";
import { CASE_DETAILS } from "@/lib/cases";
import { ClientLogo } from "@/components/client-logo";
import { Reveal } from "@/components/motion-reveal";
import { cn } from "@/lib/utils";

const FILTERS: ("All" | WorkCategory)[] = [
  "All",
  "Branding",
  "Web",
  "Marketing",
  "PR",
  "Campaign",
];

export default function WorkIndexPage() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All");
  const items = React.useMemo(
    () => (filter === "All" ? WORK : WORK.filter((w) => w.category === filter)),
    [filter]
  );

  return (
    <>
      {/* HEADER */}
      <section className="relative border-b border-border bg-bone/40 py-20 dark:bg-muted/20 md:py-28">
        <div className="container max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Work · {WORK.length} projects
          </p>
          <h1 className="mt-4 text-balance font-display text-d-2 font-light">
            Strategy is{" "}
            <span className="font-serif italic text-teal-600 dark:text-teal-300">
              upstream
            </span>{" "}
            of design.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
            Each project here was won or lost on a single strategic call. The
            design followed the argument.
          </p>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => {
              const isActive = filter === f;
              const count =
                f === "All" ? WORK.length : WORK.filter((w) => w.category === f).length;
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

          <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
            <AnimatePresence mode="popLayout">
              {items.map((w, i) => {
                const hasDeepLink = Boolean(CASE_DETAILS[w.slug]);
                const href = hasDeepLink ? `/work/${w.slug}` : "/contact";
                return (
                  <motion.li
                    key={w.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(i * 0.04, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(i % 4 === 1 || i % 4 === 2 ? "md:mt-12" : "")}
                  >
                    <Link
                      href={href}
                      className="focus-ring group block"
                    >
                      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-hairline bg-card">
                        <span aria-hidden className="absolute left-4 top-4 h-3 w-3 border-l border-t border-foreground/30" />
                        <span aria-hidden className="absolute right-4 top-4 h-3 w-3 border-r border-t border-foreground/30" />
                        <span aria-hidden className="absolute left-4 bottom-4 h-3 w-3 border-l border-b border-foreground/30" />
                        <span aria-hidden className="absolute right-4 bottom-4 h-3 w-3 border-r border-b border-foreground/30" />

                        <div className="absolute inset-x-10 inset-y-12 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                          <ClientLogo
                            name={w.client}
                            slug={w.slug}
                            className="max-h-[60%] w-auto max-w-full"
                            fallback={
                              <span className="text-center font-serif text-4xl italic text-foreground/85 md:text-5xl">
                                {w.client}
                              </span>
                            }
                          />
                        </div>

                        <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          {String(i + 1).padStart(2, "0")} · {w.category}
                        </span>
                      </div>

                      <div className="mt-5 flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                            {w.client} · {w.sector}
                          </p>
                          <p className="mt-2 max-w-md text-balance font-display text-h-3 font-light leading-snug">
                            {w.title}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all",
                            hasDeepLink
                              ? "group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
                              : "opacity-60"
                          )}
                          aria-hidden
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                        </span>
                      </div>

                      {!hasDeepLink && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Full case write-up on request.
                        </p>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {/* Soft CTA at the foot of the grid */}
          <Reveal>
            <div className="mt-24 border-t border-border pt-12 text-center md:mt-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Looking for something specific?
              </p>
              <p className="mx-auto mt-4 max-w-xl text-balance text-body-lg text-muted-foreground">
                We&rsquo;ve shipped work across {new Set(WORK.map((w) => w.category)).size}+
                disciplines and {new Set(WORK.map((w) => w.sector.split(" · ")[0])).size}+
                industries. If you don&rsquo;t see a match here, ask.
              </p>
              <Link
                href="/contact"
                className="focus-ring group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                Request a relevant brief
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
