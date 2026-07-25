"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Scroll-driven 3D primitives.
 *
 * These are deliberately SCROLL-driven, not pointer-driven, so the
 * effect exists identically on touch devices — the studio asked for
 * 3D on both web and mobile, and hover-based depth is invisible on a
 * phone.
 *
 * Everything animates transform + opacity only, on a GPU-composited
 * layer, so mid-range Android holds 60fps. All of it is gated on
 * prefers-reduced-motion (via the global MotionProvider plus the
 * local `enabled` check) and collapses to a static, correct layout
 * when disabled.
 *
 * Rotation budgets are intentionally small (≤ 8°). Depth should be
 * felt as physicality, never seen as a trick.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared reduced-motion gate. */
function useMotionAllowed() {
  const [allowed, setAllowed] = React.useState(true);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return allowed;
}

/**
 * TiltIn — an element that rises out of the page as you scroll to it.
 *
 * Starts pitched back on the X axis (as if lying away from the
 * viewer) and rotates upright as it crosses the viewport, gaining a
 * little scale and opacity on the way. The classic "card standing up"
 * move, tuned to be subtle.
 *
 * @param depth  Max pitch in degrees at the start of the range (default 8)
 * @param origin transform-origin — "bottom" reads as hinging up from
 *               the page, "center" as floating into place.
 */
export function TiltIn({
  children,
  className,
  depth = 8,
  origin = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  origin?: "bottom" | "center" | "top";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Track from the element entering the bottom of the viewport until
    // its top reaches roughly the upper third — the whole "arrival".
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(smooth, [0, 1], [depth, 0]);
  const scale = useTransform(smooth, [0, 1], [0.94, 1]);
  const y = useTransform(smooth, [0, 1], [28, 0]);
  const opacity = useTransform(smooth, [0, 0.55], [0.35, 1]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1400, transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={
          allowed
            ? {
                rotateX,
                scale,
                y,
                opacity,
                transformOrigin:
                  origin === "bottom"
                    ? "center bottom"
                    : origin === "top"
                      ? "center top"
                      : "center center",
                willChange: "transform, opacity",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * DepthLayer — parallax on the Z axis rather than the Y.
 *
 * Children translate along Z and drift on Y at a rate set by `speed`.
 * Stacking two or three of these at different speeds inside one
 * section produces genuine depth separation as you scroll, on both
 * desktop and touch.
 *
 * @param speed  -1 … 1. Positive drifts slower than the page
 *               (recedes), negative drifts faster (approaches).
 */
export function DepthLayer({
  children,
  className,
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const y = useTransform(smooth, [0, 1], [`${speed * 60}px`, `${speed * -60}px`]);
  const z = useTransform(smooth, [0, 0.5, 1], [-40 * speed, 0, -40 * speed]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={
          allowed
            ? { y, translateZ: z, willChange: "transform" }
            : undefined
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScrollScene — a perspective container whose children can use
 * `preserve-3d`. Wrap a section in this when several TiltIn /
 * DepthLayer children should share one camera rather than each
 * establishing their own.
 */
export function ScrollScene({
  children,
  className,
  perspective = 1400,
}: {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
}) {
  return (
    <div
      className={className}
      style={{ perspective, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/**
 * FloatCard — a card that floats with a slow, continuous idle drift
 * PLUS scroll-linked pitch. Used for hero artefacts where a fully
 * static object would feel dead but a large motion would feel cheap.
 *
 * The idle loop is intentionally long (7-9s) so it registers as
 * "alive" rather than "animated".
 */
export function FloatCard({
  children,
  className,
  delay = 0,
  amplitude = 8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}) {
  const allowed = useMotionAllowed();

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform" }}
      animate={
        allowed
          ? {
              y: [0, -amplitude, 0],
              rotateZ: [0, 0.4, 0],
            }
          : undefined
      }
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxText — oversized display type that drifts horizontally as
 * the section scrolls. Reads as a camera pan across a large surface.
 * Purely decorative; always pass aria-hidden content.
 */
export function ParallaxText({
  children,
  className,
  distance = 60,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  reverse?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const sign = reverse ? -1 : 1;
  const x = useTransform(
    smooth,
    [0, 1],
    [`${sign * distance}px`, `${sign * -distance}px`]
  );

  return (
    <div ref={ref} className={className} aria-hidden>
      <motion.div style={allowed ? { x, willChange: "transform" } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}

export { EASE as SCROLL_3D_EASE };
