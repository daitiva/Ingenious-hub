"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Hero — full-bleed brand wash, Ogilvy-shape.
 *
 * The page opens on the brand teal gradient as the entire viewport.
 * A centered wordmark sits at the top, a three-sentence thesis at the
 * optical centre, and as the user scrolls the wordmark scales up
 * cinematically before the section retires. No carousel, no card,
 * no parallax artefact — the brand colour, the wordmark, the claim.
 *
 * Motion choreography (all behind prefers-reduced-motion via globals.css):
 *   - On load: word-by-word mask reveal of the thesis copy
 *   - On scroll: wordmark scales 1× → 4×, then fades through opacity 0
 *
 * Inverted typography (white on teal) is the point — this section reads
 * as a brand statement, not as a neutral marketing slab.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const THESIS = [
  "Brands aren't built by louder voices.",
  "They're built by stronger arguments.",
  "Ingenious Hub is the agency for brands with something to say — and the conviction to say it across every surface that matters.",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );
    const h = () => setEnabled(mq.matches);
    h();
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [1, 3.4]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.18, 0.08, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-gradient-brand text-white"
      aria-labelledby="hero-thesis"
    >
      {/* Massive tagline, sits behind the thesis as a quiet brand presence.
          Scales up + fades as the user scrolls out of the section. */}
      <motion.div
        aria-hidden
        style={enabled ? { scale: wordmarkScale, opacity: wordmarkOpacity } : { opacity: 0.18 }}
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
      >
        <span className="whitespace-nowrap font-serif text-[clamp(6rem,18vw,22rem)] font-light leading-none tracking-tight text-white">
          energize your brand
        </span>
      </motion.div>

      {/* Thesis copy — sits over the wordmark, brand-white at full opacity.
          Each sentence reveals in a quiet stagger; the whole block parallaxes
          up as the user starts to scroll, suggesting the next section is
          already loading. */}
      <motion.div
        style={enabled ? { y: copyY, opacity: copyOpacity } : undefined}
        className="container relative z-10 mx-auto max-w-4xl text-center"
      >
        <p
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/70"
        >
          A global brand and design agency
        </p>
        <h1
          id="hero-thesis"
          className="mt-10 font-display font-light leading-[1.05] tracking-tight text-white"
        >
          {THESIS.map((line, i) => (
            <ThesisLine key={i} delay={0.2 + i * 0.35}>
              {line}
            </ThesisLine>
          ))}
        </h1>
      </motion.div>

      {/* Scroll cue — quiet at the bottom, never animated */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center justify-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
          Scroll
        </span>
      </div>
    </section>
  );
}

/**
 * One line of the thesis. Each line is its own mask block so the reveal
 * choreography reads as deliberate sentence-by-sentence pacing rather
 * than a wall of text wiping in at once.
 */
function ThesisLine({
  children,
  delay,
}: {
  children: string;
  delay: number;
}) {
  return (
    <span
      className="relative -mb-[0.18em] block overflow-hidden pb-[0.18em] text-balance text-[clamp(1.75rem,4.5vw,3.5rem)]"
    >
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
