"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";

export function ServicesGrid() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              What we do
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Five tightly packaged offerings.{" "}
              <span className="font-serif italic text-muted-foreground">
                No 30-service menu.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-muted-foreground">
            We collapsed every &ldquo;we-do-everything&rdquo; agency list into the five things that
            actually move revenue for the brands we work with.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const wide = i === 0 || i === 4;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={wide ? "lg:col-span-2" : ""}
              >
                <Link
                  href={`/services#${s.id}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-[0_20px_60px_-30px_rgba(13,148,136,0.5)]"
                >
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-500/10 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.includes.map((it) => (
                        <li
                          key={it}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative mt-7 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-muted-foreground">{s.outcomeMetric}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-teal-600 transition-transform group-hover:translate-x-0.5 dark:text-teal-400">
                      Explore <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
