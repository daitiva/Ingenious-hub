"use client";

import { motion } from "framer-motion";

const CITIES = [
  { city: "Jaipur", note: "HQ · Studio" },
  { city: "Bengaluru", note: "Founders & SaaS" },
  { city: "Mumbai", note: "D2C & Media" },
  { city: "Delhi NCR", note: "B2B & Edtech" },
  { city: "Dubai", note: "GCC accounts" },
  { city: "London", note: "EMEA partners" },
];

const CAPS = [
  "Brand Strategy",
  "Identity Systems",
  "Web & Product UI",
  "Engineering",
  "Performance Marketing",
  "Lead Generation",
  "Content Engines",
  "Public Relations",
  "Founder Branding",
];

export function GlobalReach() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              006 — Reach
            </p>
            <h2 className="mt-5 text-balance font-semibold text-fluid-3xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              A studio in Jaipur.{" "}
              <span className="font-serif italic text-muted-foreground">
                Brands across continents.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-muted-foreground">
              We work with founders building from India and beyond — across
              edtech, fintech, D2C, healthcare, and B2B SaaS. Async by default,
              senior on every call.
            </p>
          </div>

          <div className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {CITIES.map((c, i) => (
                <motion.li
                  key={c.city}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="bg-background p-6"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-fluid-xl font-medium tracking-tight">
                    {c.city}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {c.note}
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {CAPS.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
