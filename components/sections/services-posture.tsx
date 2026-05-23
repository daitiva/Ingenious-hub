"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/motion-reveal";
import { cn } from "@/lib/utils";

/**
 * Services as posture — Section 4.
 *
 * Five pillars rendered as an editorial list (left), with a single hover
 * preview pane (right) revealing the studio's *posture* on each pillar.
 *
 * On mobile, every pillar shows its posture line inline (no hover).
 */
export function ServicesPosture() {
  const [active, setActive] = React.useState<number | null>(0);

  return (
    <section aria-labelledby="services-heading" className="relative border-t border-border py-24 md:py-32">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Headline column */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                004 — Services
              </p>
              <h2
                id="services-heading"
                className="mt-4 text-balance font-display text-h-1 font-light"
              >
                Five pillars. <span className="font-serif italic text-teal-600 dark:text-teal-300">Not thirty.</span>
              </h2>
              <p className="mt-6 max-w-md text-body text-muted-foreground">
                We don&rsquo;t do thirty things badly. We do five things well — and we plug them together so positioning, product surface, and acquisition stop fighting each other.
              </p>
              <Link
                href="/services"
                className="focus-ring group mt-8 inline-flex items-center gap-2 text-sm font-medium"
              >
                <span className="underline-offset-4 group-hover:underline">All services</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </Reveal>
          </div>

          {/* Editorial list */}
          <div className="md:col-span-7">
            <ol className="border-t border-border" onMouseLeave={() => setActive(null)}>
              {SERVICES.map((s, i) => {
                const isActive = active === i;
                return (
                  <li key={s.id} className="border-b border-border">
                    <Link
                      href={`/services#${s.id}`}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="focus-ring group flex items-baseline justify-between gap-6 py-6 md:py-8"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                          0{i + 1}
                        </span>
                        <motion.span
                          animate={{ x: isActive ? 8 : 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className={cn(
                            "font-display font-light text-h-2 transition-colors duration-300",
                            isActive
                              ? "text-teal-600 dark:text-teal-300"
                              : "text-foreground"
                          )}
                        >
                          {s.title}
                        </motion.span>
                      </span>
                      <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-all md:inline-flex group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                      </span>
                    </Link>

                    {/* Mobile-only inline posture */}
                    <p className="-mt-2 mb-5 pl-9 text-sm text-muted-foreground md:hidden">
                      {s.tagline}
                    </p>

                    {/* Desktop-only inline reveal */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="hidden overflow-hidden pl-9 md:block"
                        >
                          <div className="grid gap-6 pb-7 pr-12 md:grid-cols-[1fr_auto]">
                            <p className="text-pretty text-body text-muted-foreground">
                              {s.tagline}
                            </p>
                            <div className="text-right">
                              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Outcome
                              </p>
                              <p className="mt-1 text-sm font-medium">{s.outcomeMetric}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
