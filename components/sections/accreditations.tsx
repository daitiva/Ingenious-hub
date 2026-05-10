"use client";

import { motion } from "framer-motion";
import { ACCREDITATIONS } from "@/lib/accreditations";

export function Accreditations() {
  return (
    <section className="relative border-y border-border bg-cream/40 dark:bg-muted/20">
      <div className="container py-20 md:py-28">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Accreditation
            </p>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              Recognised by the rooms that{" "}
              <span className="font-serif italic text-muted-foreground">
                set the bar.
              </span>
            </h2>
          </div>
        </header>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-16 md:grid-cols-5">
          {ACCREDITATIONS.map((a, i) => (
            <motion.li
              key={a.org}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-background p-6 md:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={a.href ?? "#"}
                  target={a.href ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                >
                  {a.href ? "View ↗" : "Verified"}
                </a>
              </div>
              <h3 className="mt-6 font-semibold tracking-tight text-fluid-xl">
                {a.org}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.byline}</p>
              <div className="mt-7 border-t border-border pt-4">
                <div className="font-semibold tracking-tightest text-fluid-2xl">
                  {a.metric}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {a.metricLabel}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
