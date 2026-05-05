"use client";

import { motion } from "framer-motion";

const METRICS = [
  { v: "60+", l: "brands shipped since 2016" },
  { v: "9 yrs", l: "in business — and counting" },
  { v: "12+", l: "tier-1 features earned" },
  { v: "4.6★", l: "client rating · 11 reviews" },
];

export function Metrics() {
  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="container py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-background/60">
              005 — Trust
            </p>
            <h2 className="mt-5 text-balance font-semibold text-fluid-3xl leading-[1.1] tracking-tight md:text-fluid-4xl">
              Numbers, signed off by the{" "}
              <span className="font-serif italic text-teal-300">
                people who paid
              </span>{" "}
              for them.
            </h2>
          </div>
          <div className="md:col-span-8">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-background/10 bg-background/10">
              {METRICS.map((m, i) => (
                <motion.li
                  key={m.l}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-foreground p-6 md:p-8"
                >
                  <div className="font-semibold text-fluid-4xl tracking-tightest md:text-fluid-5xl">
                    {m.v}
                  </div>
                  <div className="mt-2 text-sm text-background/70">{m.l}</div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
