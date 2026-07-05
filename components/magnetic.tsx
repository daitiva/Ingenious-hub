"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic — a wrapper that lets its child drift a few pixels toward
 * the cursor while hovered, then spring back on leave. The classic
 * high-craft CTA detail, tuned to be felt rather than noticed.
 *
 * Guards:
 *  - Fine pointers only (mouse/trackpad). Touch never sees the effect.
 *  - prefers-reduced-motion disables it entirely.
 *  - Max displacement is `strength` px (default 6) — subtle by design.
 *
 * Purely presentational: keyboard focus, click targets, and layout
 * are untouched; only a transform moves.
 */
export function Magnetic({
  children,
  strength = 6,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const [enabled, setEnabled] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  React.useEffect(() => {
    const mq = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * strength * 2);
    y.set(relY * strength * 2);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={enabled ? { x: sx, y: sy } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
