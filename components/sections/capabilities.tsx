"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CAPABILITIES } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

export function Capabilities() {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <section className="relative border-y border-border py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
      />
      <div className="container">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
              Capabilities
            </p>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="text-balance font-light leading-[1.05] tracking-tightest text-fluid-4xl md:text-fluid-5xl"
            >
              We work across{" "}
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
                nine disciplines
              </span>{" "}
              — and connect them.
            </motion.h2>
          </div>
        </header>

        <ul
          className="mt-12 md:mt-20"
          onMouseLeave={() => setActive(null)}
        >
          {CAPABILITIES.map((c, i) => {
            const isActive = active === i;
            const isDimmed = active !== null && active !== i;
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.06 + i * 0.045,
                }}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "group relative grid items-baseline gap-2 border-t border-border py-5 last:border-b md:grid-cols-[1fr_auto_36px] md:gap-6 md:py-7",
                  // Mobile: clickable + brand-coloured by default
                  "md:transition-opacity md:duration-300"
                )}
                style={{
                  opacity: isDimmed ? 0.35 : 1,
                }}
                onClick={() => setActive(isActive ? null : i)}
              >
                <motion.span
                  animate={{ x: isActive ? 16 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "block font-light tracking-tightest transition-colors text-fluid-3xl md:text-fluid-5xl",
                    // Mobile baseline: brand color (no hover available)
                    "text-teal-600 dark:text-teal-400 md:text-foreground",
                    // Desktop hover: switch to brand color
                    "md:group-hover:text-teal-600 md:dark:group-hover:text-teal-400",
                    // Active state on mobile click — gradient
                    isActive &&
                      "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 bg-clip-text text-transparent dark:from-teal-300 dark:via-teal-400 dark:to-teal-500"
                  )}
                >
                  {c.label}
                </motion.span>

                <motion.span
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 20,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden max-w-xs text-right text-sm text-muted-foreground md:block"
                >
                  {c.byline}
                </motion.span>

                <span className="hidden font-mono text-[11px] text-muted-foreground md:inline-block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Mobile byline — always visible, full row */}
                <span className="block w-full text-sm leading-relaxed text-muted-foreground md:hidden">
                  {c.byline}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
