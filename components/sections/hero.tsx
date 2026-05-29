"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { RegistrationCorners } from "@/components/registration-corners";
import { cn } from "@/lib/utils";

/**
 * Hero — Section 1 of the homepage narrative arc.
 *
 * Composition: 7/5 asymmetric split. Left: thesis statement + single CTA.
 * Right: an editorial tearsheet stack — three overlapping case cards
 * (Allegiance front, Tax2Win middle, Yug Vaastra back) angled like a
 * physical pile of brand spec sheets on a desk. Each card pulls its mark
 * from the verified-logo manifest; when the studio drops a real artefact
 * at /public/clients/<slug>.svg (and flips the manifest), the card swaps
 * to the real mark — same component, no rewrite.
 *
 * Motion choreography:
 *   t=0.05  eyebrow fades in
 *   t=0.15  headline line 1 reveals word-by-word
 *   t=0.55  headline line 2 (serif italic accent)
 *   t=1.35  sub-text settles
 *   t=1.55  CTA enters
 *   t=1.85  back card resolves
 *   t=1.95  middle card resolves
 *   t=2.05  front card resolves
 *   t=2.25  meta-strip stats stagger in
 *
 * Reveal masking: the per-line mask is `overflow-hidden pb-[0.2em]
 * -mb-[0.2em]`. Earlier per-word masks clipped italic glyph overshoot
 * + serif descenders ("p" in "people", "g" in "design") because each
 * word sat in its own narrow clip box. Per-line keeps the mask at
 * line boundaries where overshoot is harmless.
 *
 * Everything respects prefers-reduced-motion via the global media-query
 * safety net in globals.css.
 */

// Standard ease-out-quart — used everywhere on the hero for a cohesive feel.
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax only on screens that can hold attention; mobile reads straight through.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Each card moves at its own rate — front slowest, back fastest — to
  // create depth differential without overdoing it.
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const yLetter = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityStack = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100svh-64px)] items-end overflow-hidden pb-12 pt-28 md:pb-16 md:pt-32"
    >
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      {/* Oversized brand letter that parallaxes upward — counter-motion to the stack */}
      <motion.div
        aria-hidden
        style={isDesktop ? { y: yLetter } : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute -bottom-32 right-[-8vw] -z-10 select-none font-serif italic leading-[0.7] text-foreground/[0.04] dark:text-foreground/[0.06] text-[clamp(20rem,42vw,55rem)]"
      >
        a
      </motion.div>

      <div className="container relative">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {/* LEFT — thesis */}
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              The Studio · Jaipur · Worldwide · Since 2016
            </motion.p>

            <h1 className="mt-7 pb-[0.12em] font-display font-light text-d-1">
              <RevealLine startDelay={0.15}>We design the brands</RevealLine>
              <RevealLine
                startDelay={0.55}
                className="text-gradient-brand font-serif italic tracking-tight"
              >
                people choose.
              </RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.35, ease: EASE }}
              className="mt-8 max-w-md text-body-lg text-muted-foreground"
            >
              A strategic branding and digital-experience studio. We argue that
              brands are won on coherence — not budget — and then we build for it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.55, ease: EASE }}
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

          {/* RIGHT — tearsheet stack */}
          <div className="md:col-span-5">
            <motion.figure
              style={isDesktop ? { opacity: opacityStack } : undefined}
              className="relative mx-auto aspect-[4/5] w-full max-w-md"
            >
              {/* Back — Yug Vaastra. Hidden on mobile so the layout breathes. */}
              <div
                aria-hidden
                className="absolute inset-0 hidden -translate-x-[7%] translate-y-[6%] rotate-[-4deg] md:block"
              >
                <motion.div
                  style={isDesktop ? { y: yBack } : undefined}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 0.55, scale: 1 }}
                  transition={{ duration: 1.2, delay: 1.85, ease: EASE }}
                  className="h-full w-full"
                >
                  <CaseCard
                    slug="yug-vaastra"
                    name="Yug Vaastra"
                    sector="D2C · Fashion"
                    metric="+48%"
                    tone="back"
                  />
                </motion.div>
              </div>

              {/* Middle — Tax2Win. Hidden on mobile. */}
              <div
                aria-hidden
                className="absolute inset-0 hidden translate-x-[4%] translate-y-[3%] rotate-[3deg] md:block"
              >
                <motion.div
                  style={isDesktop ? { y: yMid } : undefined}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{ duration: 1.15, delay: 1.95, ease: EASE }}
                  className="h-full w-full"
                >
                  <CaseCard
                    slug="liaison360"
                    name="Liaison360"
                    sector="B2B · Identity"
                    metric="New"
                    tone="mid"
                  />
                </motion.div>
              </div>

              {/* Front — Allegiance. The primary read, single card on mobile. */}
              <motion.div
                style={isDesktop ? { y: yFront } : undefined}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.05, ease: EASE }}
                className="relative h-full w-full"
              >
                <CaseCard
                  slug="allegiance-education"
                  name="Allegiance Education"
                  sector="Edtech · Test Prep"
                  metric="+62%"
                  tone="front"
                />
              </motion.div>
            </motion.figure>
          </div>
        </div>

        {/* Micro-trust strip — staggered in last so the eye finishes here */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { delayChildren: 2.25, staggerChildren: 0.08 },
            },
          }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm md:mt-24 md:grid-cols-4"
        >
          <Stat label="Brands shipped" value="60+" />
          <Stat label="Google rating" value="4.6 ★" />
          <Stat label="Reply window" value="< 4 working hrs" />
          <Stat label="Accreditation" value="DesignRush · Clutch" />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * One tearsheet card. Chrome (border, RegistrationCorners, caption) is
 * shared; the brand mark routes through ClientLogo, which reads the
 * verified-logo manifest. Drop a real artefact at /public/clients/<slug>.svg
 * (and flip the manifest entry to "verified") and the card replaces its
 * typographic placeholder with the real mark — same code path.
 */
function CaseCard({
  slug,
  name,
  sector,
  metric,
  tone,
}: {
  slug: string;
  name: string;
  sector: string;
  metric: string;
  tone: "front" | "mid" | "back";
}) {
  return (
    <figure
      className={cn(
        "relative h-full w-full",
        tone === "back" && "blur-[0.5px]"
      )}
    >
      <div className="absolute inset-0 rounded-2xl border border-hairline bg-card/90 shadow-[0_30px_80px_-40px_rgba(14,13,10,0.25)] dark:bg-card/60 dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]" />
      <RegistrationCorners inset="inset-3" />

      <div className="absolute inset-x-10 inset-y-12 flex items-center justify-center">
        <ClientLogo
          name={name}
          slug={slug}
          className="max-h-[60%] w-auto max-w-full"
          loading={tone === "front" ? "eager" : "lazy"}
          fallback={
            <span className="text-center font-serif text-4xl italic text-foreground/85 md:text-5xl">
              {name.split(" ")[0]}
            </span>
          }
        />
      </div>

      <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between rounded-lg border border-hairline bg-card px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:bg-card/80">
        <span>{sector}</span>
        <span className="font-mono">{metric}</span>
      </figcaption>
    </figure>
  );
}

/**
 * RevealLine — wraps a single line of headline copy in a per-line mask
 * and animates each word rising from below.
 *
 * Per-line (not per-word) clipping: italic / serif glyphs overshoot
 * their own box on the slanted side. When each word had its own narrow
 * clip box, that overshoot was clipped at the word boundary, producing
 * visibly truncated letters in line 2 ("people choose."). One line-wide
 * mask keeps the overshoot inside the clip and only ever clips at the
 * line's outer edges, where there's nothing to overshoot into.
 *
 * pb-[0.2em] / -mb-[0.2em]: the mask extends 0.2em below the line-box
 * so descenders ("p", "g", "y") sit inside the visible band. The
 * negative margin pulls the next sibling back up so layout doesn't
 * shift. 0.2em clears Instrument Serif Italic descenders; the previous
 * 0.12em was tuned for sans only.
 */
function RevealLine({
  children,
  startDelay = 0,
  stagger = 0.05,
  className,
}: {
  children: string;
  startDelay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = String(children).split(/(\s+)/);
  return (
    <span
      className={cn(
        "relative -mb-[0.2em] block overflow-hidden pb-[0.2em]",
        className
      )}
    >
      {words.map((segment, i) => {
        // Preserve raw whitespace segments so wrapping behaves naturally.
        if (/^\s+$/.test(segment)) {
          return <span key={i}>{segment}</span>;
        }
        return (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              ease: EASE,
              delay: startDelay + i * stagger,
            }}
            className="inline-block"
          >
            {segment}
          </motion.span>
        );
      })}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-medium tracking-tight">{value}</div>
    </motion.div>
  );
}
