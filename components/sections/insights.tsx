"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { INSIGHTS } from "@/lib/insights";
import { cn } from "@/lib/utils";

const COVERS = [
  "from-amber-200/50 to-teal-300/30",
  "from-rose-200/50 to-teal-300/30",
  "from-sky-200/50 to-teal-300/30",
  "from-emerald-200/50 to-teal-300/30",
];

export function Insights() {
  return (
    <section className="relative border-t border-border bg-cream/40 dark:bg-muted/20">
      <div className="container py-20 md:py-28">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Insights
            </p>
          </div>
          <div className="md:col-span-6">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              Notes from the{" "}
              <span className="font-serif italic text-muted-foreground">
                studio.
              </span>
            </h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <a
              href="#"
              className="group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              All writing
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>
        </header>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {INSIGHTS.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <a
                href="#"
                className="group block"
              >
                <div
                  className={cn(
                    "relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br",
                    COVERS[i % COVERS.length]
                  )}
                >
                  <div className="absolute inset-0 grid place-items-center px-6 text-center">
                    <span className="font-serif text-fluid-3xl italic leading-tight text-foreground/85 md:text-fluid-4xl">
                      {p.topic}
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70">
                    <span>{new Date(p.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                    <span>{p.readMins} min read</span>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-balance text-fluid-xl font-medium leading-snug tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-md text-pretty text-sm text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
