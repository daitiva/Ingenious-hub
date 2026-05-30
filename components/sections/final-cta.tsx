"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

/**
 * FinalCTA — Section 8 of the homepage.
 *
 * Closing editorial moment. Full-bleed brand-teal gradient wash for
 * tonal echo with the hero — the page opens and closes on brand
 * colour, with the work / argument sitting on white between.
 *
 * One sentence of closing copy. Two CTAs (project enquiry + WhatsApp).
 * One quiet meta line (the studio address). No marquee, no rotating
 * promises, no chip strip.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative border-t border-border bg-gradient-brand text-white"
    >
      <div className="container py-24 md:py-36">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70"
            >
              07 — Next
            </motion.p>

            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
              className="mt-6 max-w-3xl text-balance font-display font-light leading-[1.04] tracking-tightest"
            >
              <span className="block text-d-2">Let&rsquo;s build the brand</span>
              <span className="block text-d-2 font-serif text-white/90">
                people remember.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mt-8 max-w-xl text-body-lg text-white/80"
            >
              A 30-minute call. We&rsquo;ll ask uncomfortable questions about your
              category, your buyer, and what isn&rsquo;t working. You leave with
              two or three things to fix that week — whether or not we work
              together.
            </motion.p>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="flex flex-col items-stretch gap-3"
            >
              <Link
                href="/contact"
                className="focus-ring group inline-flex h-14 items-center justify-between gap-6 rounded-full bg-white px-6 text-foreground transition-transform hover:-translate-y-0.5"
              >
                <span className="text-base font-medium">Start a project</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </Link>

              <Link
                href="https://wa.me/919587015816"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group inline-flex h-14 items-center justify-between gap-6 rounded-full border border-white/40 px-6 text-white transition-colors hover:bg-white/10"
              >
                <span className="text-base font-medium">WhatsApp the studio</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
                  <MessageCircle className="h-4 w-4" />
                </span>
              </Link>

              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
                hello@ingenioushub.com &middot; +91 95870 15816
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
