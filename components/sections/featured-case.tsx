"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { RegistrationCorners } from "@/components/registration-corners";
import { getCase } from "@/lib/cases";

/**
 * FeaturedCase — Section 4 of the homepage.
 *
 * A "trailer" for the studio's strongest case study. Allegiance is the
 * default pin (62% admissions lift, fullest essay copy). The component
 * is structured so the pinned case can change later without re-shape —
 * it reads getCase() at render time.
 *
 * Layout — Ogilvy-style asymmetric immersive panel:
 *   - Full-bleed brand wash on one side (the artefact card)
 *   - Long-form editorial copy on the other
 *   - Problem / Thinking / Execution / Impact as quiet scroll-stops
 *   - One CTA to the full case page
 *
 * Acts as proof — the visitor sees ONE case end-to-end on the homepage
 * without needing to leave.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const PINNED_SLUG = "allegiance-education";

export function FeaturedCase() {
  // Hooks above any conditional return — React rules-of-hooks.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yArt = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const work = getCase(PINNED_SLUG);
  if (!work) return null;
  const { detail } = work;

  return (
    <section
      ref={ref}
      aria-labelledby="featured-case-heading"
      className="relative border-t border-border bg-grey-100/60 dark:bg-grey-700/20"
    >
      <div className="container py-20 md:py-32">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* LEFT — artefact column, parallaxes mildly on scroll */}
          <div className="md:col-span-6 md:order-1">
            <motion.div style={{ y: yArt }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline bg-background shadow-[0_30px_80px_-40px_rgba(14,13,10,0.25)] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
                <RegistrationCorners />
                <div className="absolute inset-x-12 inset-y-16 flex items-center justify-center">
                  <ClientLogo
                    name={work.client}
                    slug={work.slug}
                    className="max-h-[55%] w-auto max-w-full"
                    loading="lazy"
                    fallback={
                      <span className="text-center font-serif text-5xl italic text-foreground/85">
                        {work.client}
                      </span>
                    }
                  />
                </div>

                {/* Metric strip — magazine-shape three-up at the foot */}
                <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 divide-x divide-hairline border-t border-hairline pt-4">
                  {detail.metrics.map((m) => (
                    <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                      <div className="font-display text-h-3 font-light tabular-nums">
                        {m.metric}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — editorial column */}
          <div className="md:col-span-6 md:order-2">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              03 — Featured case · {detail.eyebrow}
            </motion.p>

            <motion.h2
              id="featured-case-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
              className="mt-6 text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest"
            >
              {work.title}
            </motion.h2>

            <dl className="mt-12 space-y-7 border-t border-border pt-8">
              <Stop label="Problem" body={detail.problemEssay} />
              <Stop
                label="Thinking"
                body={detail.thinkingEssay[0] ?? ""}
              />
              <Stop label="Execution" body={detail.executionEssay} />
              <Stop label="Impact" body={detail.impactEssay} accent />
            </dl>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-12"
            >
              <Link
                href={`/work/${work.slug}`}
                className="focus-ring group inline-flex items-center gap-3 text-sm font-medium"
              >
                <span className="underline-offset-4 group-hover:underline">
                  Read the full case
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground transition-all group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stop({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid grid-cols-[5rem_1fr] gap-5 md:grid-cols-[6rem_1fr] md:gap-7"
    >
      <dt className="pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </dt>
      <dd
        className={
          accent
            ? "text-pretty text-body-lg font-medium text-foreground"
            : "text-pretty text-body text-foreground/85"
        }
      >
        {body}
      </dd>
    </motion.div>
  );
}
