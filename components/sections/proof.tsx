"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ACCREDITATIONS } from "@/lib/accreditations";

/**
 * Proof — Section 5 of the homepage.
 *
 * The studio's accreditation wall as an editorial trust statement,
 * not a badge dump. Five recognitions (DesignRush, Clutch, Trustpilot,
 * 50Pros, Google) sit as a 5-up grid beneath a single bold thesis.
 *
 * The Google rating animates its count-up on view — every other
 * metric stays static. One count-up per page; we burn it here so
 * the trust read feels earned rather than performed.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const QUOTES = [
  {
    body: "They understood our business before designing anything. The results spoke for themselves.",
    name: "Saurabh Sharma",
    role: "Founder, Allegiance Education",
  },
  {
    body: "First studio we've worked with that talks revenue, not impressions. CAC dropped a third in two months.",
    name: "Aakash V.",
    role: "Growth Lead, Tax2Win",
  },
];

export function Proof() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="relative border-t border-border"
    >
      <div className="container py-20 md:py-32">
        {/* Eyebrow + thesis */}
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              04 — Recognised by
            </p>
          </div>
          <div className="md:col-span-9">
            <h2
              id="proof-heading"
              className="text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest"
            >
              The work is{" "}
              <span className="text-gradient-brand font-serif italic">
                signed off
              </span>{" "}
              by the people who paid for it.
            </h2>
          </div>
        </div>

        {/* Accreditation row — 5-up grid, hairline separators */}
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 md:mt-20 md:grid-cols-5">
          {ACCREDITATIONS.map((a, i) => (
            <Accreditation key={a.org} item={a} index={i} />
          ))}
        </ul>

        {/* Testimonials — two quotes, one a side */}
        <div className="mt-20 grid gap-12 border-t border-border pt-12 md:mt-24 md:grid-cols-2 md:gap-16 md:pt-16">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            >
              <blockquote className="text-balance font-display text-h-2 font-light leading-tight">
                <span className="text-gradient-brand font-serif italic">&ldquo;</span>
                {q.body}
                <span className="text-gradient-brand font-serif italic">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/30" />
                {q.name} · {q.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Accreditation({
  item,
  index,
}: {
  item: (typeof ACCREDITATIONS)[number];
  index: number;
}) {
  const ContentTag = item.href ? "a" : "div";
  const isGoogle = item.org === "Google";

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
    >
      <ContentTag
        {...(item.href
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group flex flex-col gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {item.org}
        </span>
        <span className="font-display text-h-3 font-light leading-tight">
          {isGoogle ? <GoogleRatingCountUp /> : item.metric}
        </span>
        <span className="text-xs leading-snug text-muted-foreground">
          {item.metricLabel}
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
          {item.byline}
        </span>
      </ContentTag>
    </motion.li>
  );
}

/**
 * Google star rating with count-up on view. Burns the page's single
 * animated number budget — every other metric stays static so this
 * one moment lands.
 */
function GoogleRatingCountUp() {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let played = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          animate(motionValue, 4.6, {
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => {
              if (el) el.textContent = `${v.toFixed(1)}★`;
            },
          });
          obs.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [motionValue]);

  return (
    <span ref={ref} className="tabular-nums">
      0.0★
    </span>
  );
}
