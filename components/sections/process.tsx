"use client";

import { motion } from "framer-motion";
import { Search, Hammer, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    label: "Understand",
    title: "Audit, position, find the angle.",
    body: "We audit your brand and identify the growth gaps that matter.",
  },
  {
    icon: Hammer,
    label: "Build",
    title: "Design and execute end-to-end.",
    body: "Brand, product, marketing — we ship a system you can run.",
  },
  {
    icon: TrendingUp,
    label: "Scale",
    title: "Optimize and improve continuously.",
    body: "Weekly check-ins, dashboards, and a tight sprint cadence.",
  },
];

export function Process() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            How we work
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Simple. Focused.{" "}
            <span className="font-serif italic">Effective.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Step 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {s.label}. {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
