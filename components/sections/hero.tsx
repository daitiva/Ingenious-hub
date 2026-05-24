"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { RegistrationCorners } from "@/components/registration-corners";

/**
 * Hero — Section 1 of the homepage narrative arc.
 *
 * Composition: 7/5 asymmetric split. Left: thesis statement + single CTA.
 * Right: a single curated brand artefact (Allegiance brochure or Yug monogram)
 * with parallax on scroll. No carousel. No auto-rotate. No marquee.
 *
 * Bottom: a thin micro-trust row anchored to the lower edge — not a separate slab.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax only on screens that can hold attention; mobile reads straight through.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const yArtefact = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yLetter = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityArtefact = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100svh-64px)] items-end overflow-hidden pb-12 pt-28 md:pb-16 md:pt-32"
    >
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      {/* Oversized brand letter that parallaxes upward — counter-motion to the artefact */}
      <motion.div
        aria-hidden
        style={isDesktop ? { y: yLetter } : undefined}
        className="pointer-events-none absolute -bottom-32 right-[-8vw] -z-10 select-none font-serif italic leading-[0.7] text-foreground/[0.04] dark:text-foreground/[0.06] text-[clamp(20rem,42vw,55rem)]"
      >
        a
      </motion.div>

      <div className="container relative">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {/* LEFT — thesis */}
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              The Studio · Jaipur · Worldwide · Since 2016
            </p>

            <h1 className="mt-7 font-display font-light text-d-1">
              <SplitLine delay={0.05}>We design the brands</SplitLine>
              <SplitLine delay={0.22}>
                <span className="font-serif italic text-teal-600 dark:text-teal-300">
                  people choose.
                </span>
              </SplitLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-md text-body-lg text-muted-foreground"
            >
              A strategic branding and digital-experience studio. We argue that
              brands are won on coherence — not budget — and then we build for it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="focus-ring group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — single artefact */}
          <div className="md:col-span-5">
            <motion.figure
              style={isDesktop ? { y: yArtefact, opacity: opacityArtefact } : undefined}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-[4/5] w-full max-w-md"
            >
              {/* Soft warm card behind the artefact; not a gradient cliché */}
              <div className="absolute inset-0 rounded-2xl border border-hairline bg-card/60 shadow-[0_30px_80px_-40px_rgba(14,13,10,0.25)] dark:bg-card/40 dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]" />

              {/* Hairline registration marks — feels like an art-board, not a card */}
              <RegistrationCorners inset="inset-3" />

              <div className="absolute inset-x-10 inset-y-12 flex items-center justify-center">
                <ClientLogo
                  name="Allegiance Education"
                  slug="allegiance-education"
                  className="max-h-[60%] w-auto max-w-full"
                  fallback={
                    <span className="text-center font-serif text-5xl italic text-foreground/80">
                      Allegiance
                    </span>
                  }
                />
              </div>

              <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between rounded-lg border border-hairline bg-card px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:bg-card/80">
                <span>Allegiance Education</span>
                <span className="font-mono">+62%</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>

        {/* Micro-trust strip — anchored to the lower edge, four stats, no animation noise */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm md:mt-24 md:grid-cols-4">
          <Stat label="Brands shipped" value="60+" />
          <Stat label="Google rating" value="4.6 ★" />
          <Stat label="Reply window" value="< 4 working hrs" />
          <Stat label="Accreditation" value="DesignRush · Clutch" />
        </div>
      </div>
    </section>
  );
}

function SplitLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium tracking-tight">{value}</div>
    </div>
  );
}
