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
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-border bg-cream/40 dark:bg-muted/20"
    >
      <div className="container py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              002 — The Studio
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
              Most agencies sell{" "}
              <span className="font-serif italic text-muted-foreground">
                deliverables.
              </span>{" "}
              We sell{" "}
              <span className="text-teal-600 dark:text-teal-400">outcomes</span>.
            </motion.p>

            <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
              <Pillar
                num="01"
                label="Problem"
                body="Three vendors, no shared metric. Brand pretty, ads burning."
              />
              <Pillar
                num="02"
                label="Insight"
                body="Brand, web, and acquisition compound only when one team owns them."
              />
              <Pillar
                num="03"
                label="Solution"
                body="Senior crew. One roadmap. Weekly dashboards."
              />
            </div>
          </div>
        </div>
      </div>

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

function Pillar({
  num,
  label,
  body,
}: {
  num: string;
  label: string;
  body: string;
}) {
  return (
    <div className="border-t border-border pt-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-muted-foreground">{num}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-3 text-pretty text-fluid-base font-medium text-foreground/90">
        {body}
      </p>
    </div>
  );
}
