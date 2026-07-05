"use client";

import { motion } from "framer-motion";

/**
 * Route transition — every navigation re-mounts this template, so the
 * incoming page arrives with a quiet fade + 12px rise instead of a
 * hard cut. Duration is short enough that fast readers never wait on
 * it; MotionProvider's reducedMotion="user" collapses the rise to a
 * plain fade for visitors who prefer reduced motion.
 *
 * Deliberately no exit animation: Next's App Router template unmounts
 * synchronously on navigation, and holding the old page hostage for
 * an outro reads as lag, not craft.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
