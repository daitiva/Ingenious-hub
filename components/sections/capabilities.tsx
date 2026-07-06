"use client";

import { motion } from "framer-motion";

/**
 * Capabilities — Section 2.
 *
 * Nine disciplines as an editorial running list. Not icon cards.
 * Each row: an oversized watermark numeral sitting BEHIND the
 * capability name (overlapping layers, not columns), the name in
 * large display type on top, and a single descriptive line to the
 * right. The hairline separator draws in as the row enters.
 *
 * Reads as a manifesto — the studio's claim of breadth made by
 * typography and layering, not by stamping logos.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const CAPS = [
  { n: "01", label: "Branding", body: "Identity, naming, positioning. The system that holds when the marketing changes." },
  { n: "02", label: "Advertising", body: "Campaigns that compound — built around one promise that survives every channel cut." },
  { n: "03", label: "Marketing", body: "Performance, lifecycle, content. The work that turns awareness into pipeline." },
  { n: "04", label: "Public Relations", body: "Press relationships first; coverage second. We earn the story before we pitch it." },
  { n: "05", label: "Strategy", body: "What to argue, who to argue with, and why the buyer cares. Written before anything is designed." },
  { n: "06", label: "Campaigns", body: "Brand moments that move the needle in a single quarter without breaking the long game." },
  { n: "07", label: "UI / UX", body: "Web, product, mobile. Built so the brand reads at every touchpoint, not just the homepage." },
  { n: "08", label: "Creative Direction", body: "A single masthead across brand, web, and acquisition. No agency-stitching." },
  { n: "09", label: "Digital Experiences", body: "When the experience itself is the brand asset — installations, microsites, interactive editorial." },
];

export function Capabilities() {
  return (
    <section
      aria-labelledby="caps-heading"
      className="relative border-t border-border"
    >
      {/* Section eyebrow + thesis */}
      <div className="container py-20 md:py-28">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              01 — Capabilities
            </p>
          </div>
          <div className="md:col-span-9">
            <h2
              id="caps-heading"
              className="text-balance font-display text-d-1 font-light leading-[0.98] tracking-tightest"
            >
              Nine disciplines.{" "}
              <span className="text-gradient-brand font-serif">
                One practice.
              </span>
            </h2>
            <p className="mt-8 max-w-2xl text-body-lg text-muted-foreground">
              We don&rsquo;t split branding from advertising from product. The
              brands that win do them as one argument — and so do we.
            </p>
          </div>
        </div>
      </div>

      {/* The list */}
      <ol className="border-t border-border">
        {CAPS.map((c, i) => (
          <CapabilityRow key={c.n} cap={c} index={i} />
        ))}
      </ol>
    </section>
  );
}

function CapabilityRow({
  cap,
  index,
}: {
  cap: (typeof CAPS)[number];
  index: number;
}) {
  return (
    <li className="group relative overflow-hidden transition-colors hover:bg-muted/40">
      {/* Hairline separator draws left→right as the row enters —
          replaces a static border-b so the list assembles itself
          in step with the scroll. */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-border"
      />

      <div className="container relative">
        {/* Watermark numeral — oversized, low-contrast, sits behind
            the capability name. Overlapping layers give the row depth
            without a single pixel of decoration. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(6rem,14vw,12rem)] font-light leading-none tabular-nums text-foreground/[0.05] transition-colors duration-500 group-hover:text-foreground/[0.09] md:left-6"
        >
          {cap.n}
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.05 }}
          className="relative grid gap-4 py-12 pl-10 md:grid-cols-[1fr_minmax(0,32ch)] md:items-baseline md:gap-10 md:py-16 md:pl-24"
        >
          {/* Capability name — the load-bearing typography moment,
              sitting on top of its own numeral */}
          <h3 className="text-balance font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.02] tracking-tightest">
            {cap.label}
          </h3>

          {/* Right-side description, fixed width — magazine-shape */}
          <p className="max-w-[32ch] text-body text-muted-foreground">
            {cap.body}
          </p>
        </motion.div>
      </div>
    </li>
  );
}
