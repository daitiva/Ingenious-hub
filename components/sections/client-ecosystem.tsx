"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CLIENTS } from "@/lib/clients";

const CATEGORIES: {
  key: string;
  label: string;
  blurb: string;
  accent: string;
}[] = [
  {
    key: "Edtech",
    label: "Edtech",
    blurb: "Test-prep, K-12, higher-ed.",
    accent: "from-amber-300/40 to-teal-400/30",
  },
  {
    key: "D2C",
    label: "D2C",
    blurb: "Fashion, wellness, FMCG.",
    accent: "from-rose-300/40 to-teal-500/30",
  },
  {
    key: "Fintech",
    label: "Fintech",
    blurb: "Tax, banking, advisory.",
    accent: "from-emerald-300/40 to-teal-500/30",
  },
  {
    key: "B2B",
    label: "B2B",
    blurb: "Consulting & enterprise.",
    accent: "from-sky-300/40 to-teal-500/30",
  },
  {
    key: "Healthcare",
    label: "Healthcare",
    blurb: "Clinical & wellness brands.",
    accent: "from-violet-300/40 to-teal-500/30",
  },
  {
    key: "Tech",
    label: "Tech & SaaS",
    blurb: "Products, platforms, IT.",
    accent: "from-cyan-300/40 to-teal-500/30",
  },
];

export function ClientEcosystem() {
  return (
    <section className="relative">
      <div className="container py-20 md:py-28">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
              Client ecosystem
            </p>
          </div>
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="text-balance font-light leading-[1.05] tracking-tightest text-fluid-4xl md:text-fluid-5xl"
            >
              {CLIENTS.length}+ brands.{" "}
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
                Six industries.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <Link
              href="/clients"
              className="group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              See all
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </header>

        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const count = CLIENTS.filter((c) => c.category === cat.key).length;
            const sample = CLIENTS.filter((c) => c.category === cat.key).slice(
              0,
              3
            );
            return (
              <motion.li
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/clients?cat=${encodeURIComponent(cat.key)}`}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${cat.accent} p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-30px_rgba(13,148,136,0.45)] md:p-7`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 font-light tracking-tight text-fluid-2xl">
                        {cat.label}
                      </h3>
                      <p className="mt-1 text-sm text-foreground/70">
                        {cat.blurb}
                      </p>
                    </div>
                    <span className="font-light tracking-tightest text-fluid-3xl">
                      {count}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-foreground/10 pt-4 text-xs">
                    {sample.map((s) => (
                      <span
                        key={s.name}
                        className="rounded-full border border-foreground/10 bg-background/60 px-2 py-0.5 text-foreground/70 backdrop-blur"
                      >
                        {s.name}
                      </span>
                    ))}
                    {count > 3 && (
                      <span className="rounded-full px-2 py-0.5 text-foreground/60">
                        +{count - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center md:mt-14">
          <Link
            href="/clients"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            View all {CLIENTS.length}+ clients
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
