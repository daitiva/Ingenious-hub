"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-cream/40 dark:bg-muted/20">
      <div className="container py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              002 — The Studio
            </p>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              Why we exist
            </p>
          </div>

          <div className="md:col-span-9">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="text-balance font-medium text-fluid-3xl leading-[1.15] tracking-tight md:text-fluid-4xl"
            >
              Most agencies sell <span className="font-serif italic text-muted-foreground">deliverables.</span> We sell <span className="text-teal-600 dark:text-teal-400">outcomes</span> — branding, websites, and performance built as a single engine that compounds in a quarter, not a year.
            </motion.p>

            <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-12">
              <Pillar
                num="01"
                title="The problem"
                body="Brands are stuck stitching three vendors who don't talk. The brand looks fine, the site is dated, the ads burn cash."
              />
              <Pillar
                num="02"
                title="Our insight"
                body="Growth happens when positioning, product surface, and acquisition are built by one team — measured against the same number."
              />
              <Pillar
                num="03"
                title="The solution"
                body="A small senior crew that owns brand, web, and performance end-to-end. Weekly dashboards. Monthly compounding."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background marquee */}
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-x-0 -bottom-8 -z-0 select-none whitespace-nowrap text-fluid-display font-semibold leading-none opacity-[0.04]"
        aria-hidden
      >
        Strategy · Design · Engineering · Performance · Strategy · Design · Engineering · Performance
      </motion.div>
    </section>
  );
}

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="border-t border-border pt-5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-muted-foreground">{num}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </span>
      </div>
      <p className="mt-4 text-pretty text-fluid-base text-foreground/90">{body}</p>
    </div>
  );
}
