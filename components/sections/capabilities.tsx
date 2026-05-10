"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CAPABILITIES } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

export function Capabilities() {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <section className="relative border-y border-border py-20 md:py-28">
      <div className="container">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Capabilities
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              We work across{" "}
              <span className="font-serif italic text-muted-foreground">
                nine disciplines
              </span>{" "}
              — and connect them.
            </h2>
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
                onMouseEnter={() => setActive(i)}
                animate={{
                  opacity: isDimmed ? 0.35 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="group relative flex items-baseline justify-between gap-6 border-t border-border py-5 last:border-b md:py-7"
              >
                <motion.span
                  animate={{ x: isActive ? 16 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "block font-semibold tracking-tightest transition-colors text-fluid-3xl md:text-fluid-5xl",
                    isActive && "text-teal-600 dark:text-teal-400"
                  )}
                >
                  {c.label}
                </motion.span>

                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 24,
                  }}
                  transition={{ duration: 0.4 }}
                  className="hidden max-w-xs text-right text-sm text-muted-foreground md:block"
                >
                  {c.byline}
                </motion.span>

                <span className="hidden font-mono text-[11px] text-muted-foreground md:inline-block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Mobile byline */}
                <span className="block w-full text-right text-xs text-muted-foreground md:hidden">
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
