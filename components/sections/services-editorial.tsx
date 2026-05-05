"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";

const ACCENTS = [
  "from-amber-300/40 to-teal-400/30",
  "from-sky-300/40 to-teal-500/30",
  "from-emerald-300/40 to-teal-500/30",
  "from-rose-300/40 to-teal-500/30",
  "from-violet-300/40 to-teal-500/30",
];

export function ServicesEditorial() {
  const [active, setActive] = React.useState<number | null>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  return (
    <section
      className="relative py-24 md:py-32"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <div className="container">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              003 — Capabilities
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              Five disciplines.{" "}
              <span className="font-serif italic text-muted-foreground">
                One growth system.
              </span>
            </h2>
          </div>
        </header>

        <ol className="mt-14 md:mt-20">
          {SERVICES.map((s, i) => (
            <li
              key={s.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative border-t border-border last:border-b"
            >
              <Link
                href={`/services#${s.id}`}
                className="flex items-baseline justify-between gap-6 py-7 md:py-10"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <motion.h3
                    initial={false}
                    animate={{ x: active === i ? 12 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-fluid-3xl font-medium tracking-tight md:text-fluid-5xl"
                  >
                    <span className="block transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {s.title}
                    </span>
                  </motion.h3>
                  <motion.p
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0.55, x: active === i ? 12 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 max-w-md text-sm text-muted-foreground md:text-base"
                  >
                    {s.tagline}
                  </motion.p>
                </div>

                <div className="hidden md:block w-56 shrink-0 text-right">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Outcome
                  </p>
                  <p className="mt-1 text-sm font-medium">{s.outcomeMetric}</p>
                </div>

                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all md:inline-flex group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Hover image preview that follows cursor */}
      <div
        className={`reveal-img-stage hidden md:block ${active !== null ? "show" : ""}`}
        style={{ left: pos.x, top: pos.y }}
        aria-hidden
      >
        {active !== null && (
          <div
            className={`relative h-full w-full bg-gradient-to-br ${
              ACCENTS[active % ACCENTS.length]
            }`}
          >
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-serif text-5xl italic text-foreground/80">
                {SERVICES[active].title.split(" ")[0]}
              </span>
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-foreground/10 bg-background/70 px-3 py-2 text-xs backdrop-blur">
              <span className="font-mono text-muted-foreground">
                {String(active + 1).padStart(2, "0")} / 05
              </span>
              <span>Read brief →</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
