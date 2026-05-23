"use client";

import { motion } from "framer-motion";
import { ACCREDITATIONS } from "@/lib/accreditations";
import { Reveal } from "@/components/motion-reveal";

const QUOTES = [
  {
    body: "They understood our business before designing anything. The results spoke for themselves.",
    name: "Saurabh Sharma",
    role: "Founder, Allegiance Education",
  },
  {
    body: "First studio we've worked with that talks revenue, not impressions. CAC dropped a third in two months.",
    name: "Aakash V.",
    role: "Growth Lead, Tax2Win",
  },
];

const METRICS = [
  { v: "60+", l: "brands shipped since 2016" },
  { v: "9 yrs", l: "in business and counting" },
  { v: "12+", l: "tier-1 features earned" },
  { v: "4.6 ★", l: "Google · independently rated" },
];

/**
 * Proof — Section 6.
 *
 * Single inverted slab doing the work three sections did before:
 * accreditations on top hairline, two large testimonials in the centre,
 * metrics across the bottom. One tonal break from the bone-toned arc above.
 */
export function Proof() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="relative border-y border-foreground/40 bg-ink text-bone"
    >
      <div className="container py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Headline */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60">
                006 — Proof
              </p>
              <h2
                id="proof-heading"
                className="mt-4 text-balance font-display text-h-1 font-light"
              >
                Signed off by the{" "}
                <span className="font-serif italic text-teal-300">people who paid</span> for it.
              </h2>
            </Reveal>
          </div>

          {/* Quotes */}
          <div className="space-y-10 md:col-span-7">
            {QUOTES.map((q, i) => (
              <Reveal as="figure" key={q.name} i={i} tone="editorial">
                <blockquote className="font-display text-h-2 font-light text-bone/95">
                  <span className="font-serif italic text-teal-300">“</span>
                  {q.body}
                  <span className="font-serif italic text-teal-300">”</span>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/60">
                  <span className="h-px w-8 bg-bone/30" />
                  {q.name}, {q.role}
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Accreditations row */}
        <div className="mt-20 border-t border-bone/15 pt-10 md:mt-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/50">
            Independently recognised
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
            {ACCREDITATIONS.map((a, i) => (
              <motion.li
                key={a.org}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
              >
                <div className="font-display text-h-3 font-light">{a.org}</div>
                <div className="mt-1 text-xs text-bone/55">{a.byline}</div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-teal-300">
                  {a.metric}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Metrics row */}
        <div className="mt-16 border-t border-bone/15 pt-10">
          <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {METRICS.map((m, i) => (
              <motion.li
                key={m.l}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
              >
                <div className="font-display text-d-2 font-light leading-none tabular-nums">{m.v}</div>
                <div className="mt-3 max-w-[140px] text-xs text-bone/55">{m.l}</div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
