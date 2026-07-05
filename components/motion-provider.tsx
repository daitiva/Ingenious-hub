"use client";

import { MotionConfig } from "framer-motion";

/**
 * MotionProvider — wraps the app in Framer's MotionConfig with
 * reducedMotion="user".
 *
 * The globals.css @media (prefers-reduced-motion) kill-switch only
 * reaches CSS animations/transitions — Framer drives transforms from
 * JS, so it sails straight past that net. This provider closes the
 * gap: when the visitor's OS asks for reduced motion, every Framer
 * animation site-wide collapses transforms to instant and keeps only
 * opacity fades. One line of policy instead of per-component checks.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
