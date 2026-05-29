"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion-reveal";

/**
 * Final CTA — Section 7.
 *
 * One decision. Two ways to make it. No marquee, no city strip, no metrics.
 */
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative border-t border-border bg-gradient-wash-strong py-24 md:py-32">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                007 — Next
              </p>
              <h2
                id="cta-heading"
                className="mt-4 text-balance font-display text-d-2 font-light"
              >
                Let&rsquo;s design what{" "}
                <span className="text-gradient-brand font-serif italic">
                  comes next.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">
                A 60-minute strategy call. Free, no deck. You&rsquo;ll leave with two or three things to fix this week — whether or not we work together.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <Reveal>
              <div className="flex flex-col items-stretch gap-3">
                <Link
                  href="/contact"
                  className="focus-ring group inline-flex h-14 items-center justify-between gap-6 rounded-full bg-foreground px-6 text-background transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-base font-medium">Start a project</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
                <a
                  href="https://wa.me/919587015816?text=Hi%20Ingenious%20Hub%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group inline-flex h-14 items-center justify-between gap-6 rounded-full border border-border px-6 transition-colors hover:bg-muted/50"
                >
                  <span className="text-base font-medium">WhatsApp the studio</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                </a>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Reply within four working hours · Mon–Sat
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
