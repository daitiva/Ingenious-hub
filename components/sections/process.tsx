"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    label: "Understand",
    duration: "Week 1–2",
    body: "We audit positioning, product surface, and acquisition. You get a sharp diagnosis — gaps, opportunities, and the one bet that compounds fastest.",
  },
  {
    label: "Build",
    duration: "Week 3–8",
    body: "Brand, web, and campaigns built in parallel by one senior team. Weekly demo, one shared roadmap, no agency-stitching.",
  },
  {
    label: "Scale",
    duration: "Ongoing",
    body: "Monthly compounding. Performance dashboards, sprint cadence, and a retainer that earns its keep against the same metric every month.",
  },
];

export function Process() {
  return (
    <section className="border-y border-border bg-cream/40 dark:bg-muted/20">
      <div className="container py-24 md:py-32">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              How we work
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="text-balance font-light text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              A loop, not a{" "}
              <span className="font-serif italic text-muted-foreground">
                deck.
              </span>
            </h2>
          </div>
        </header>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-20 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background p-7 md:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.duration}
                </span>
              </div>
              <h3 className="mt-6 text-fluid-2xl font-light tracking-tight">
                {s.label}.
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
