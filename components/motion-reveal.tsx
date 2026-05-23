"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const QUIET: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const EDITORIAL: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.05 },
  }),
};

type Props = {
  children: ReactNode;
  /** "quiet" (default) or "editorial" for the hero / case-title moments */
  tone?: "quiet" | "editorial";
  /** Stagger index for editorial mode */
  i?: number;
  className?: string;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "li" | "section" | "article" | "figure" | "aside" | "ul" | "ol";
};

/** Single source of truth for the two motion personalities. */
export function Reveal({
  children,
  tone = "quiet",
  i = 0,
  className,
  as = "div",
}: Props) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={tone === "editorial" ? EDITORIAL : QUIET}
      custom={i}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
