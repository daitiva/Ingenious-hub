"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Capabilities — Section 2.
 *
 * Nine disciplines as an editorial running list. Not icon cards.
 * Each capability is a full-bleed row: an oversized index number on
 * the left, the capability name in heavy display type next to it,
 * a single descriptive line below, and a hairline separator that
 * draws in as the row enters the viewport.
 *
 * Reads as a manifesto — the studio's claim of breadth made by typing,
 * not by stamping logos. Pentagram-shape restraint; Ogilvy-scale
 * confidence.
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
              className="text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest"
            >
              Nine disciplines.{" "}
              <span className="text-gradient-brand font-serif italic">
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
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Tiny opacity lift on the number as the row enters — quiet, never showy.
  const numOpacity = useTransform(scrollYProgress, [0, 0.4], [0.25, 1]);

  return (
    <li
      ref={ref}
      className="group relative border-b border-border transition-colors hover:bg-muted/40"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.05 }}
          className="grid grid-cols-[3.5rem_1fr] items-baseline gap-6 py-10 md:grid-cols-[6rem_1fr_minmax(0,32ch)] md:gap-10 md:py-14"
        >
          {/* Index — oversized, low-contrast, lights up as you arrive */}
          <motion.span
            aria-hidden
            style={{ opacity: numOpacity }}
            className="font-display text-[clamp(2.5rem,4vw,4rem)] font-light tabular-nums text-foreground/30 group-hover:text-foreground/60 transition-colors"
          >
            {cap.n}
          </motion.span>

          {/* Capability name — the load-bearing typography moment per row */}
          <h3 className="text-balance font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.04] tracking-tightest">
            {cap.label}
          </h3>

          {/* Right-side description, fixed width — magazine-shape */}
          <p className="col-start-2 max-w-[32ch] text-body text-muted-foreground md:col-start-3 md:mt-2">
            {cap.body}
          </p>
        </motion.div>
      </div>
    </li>
  );
}
