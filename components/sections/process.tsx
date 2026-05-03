"use client";

import { motion } from "framer-motion";
import { Compass, Pencil, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Compass,
    label: "Discover",
    title: "We listen, audit, and find the angle.",
    body: "A focused 60-min strategy call followed by a brand + funnel audit. You walk away with clarity, even if we don't work together.",
  },
  {
    icon: Pencil,
    label: "Design",
    title: "We design the system, not just the deliverable.",
    body: "Brand, web, or campaign — we ship a system you can run, not a one-off file you'll outgrow in six months.",
  },
  {
    icon: Rocket,
    label: "Deploy",
    title: "We launch, measure, and iterate.",
    body: "Weekly check-ins, dashboards, and a sprint cadence. We optimize what's working and kill what isn't.",
  },
];

export function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            How we work
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            A simple,{" "}
            <span className="font-serif italic">three-step</span> way of working.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            No bloated decks. No mystery process. Just a tight loop that compounds.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Step 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
