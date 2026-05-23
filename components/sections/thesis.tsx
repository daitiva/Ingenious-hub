"use client";

import { Reveal } from "@/components/motion-reveal";

/**
 * Thesis — Section 2.
 *
 * One opinionated paragraph. The studio's argument, not a service summary.
 * Composition: deliberate 3/9 inversion of the hero (eyebrow right of the
 * argument), with the paragraph rendered at editorial body-lg size.
 */
export function Thesis() {
  return (
    <section
      aria-labelledby="thesis-heading"
      className="relative border-t border-border bg-bone/40 py-24 dark:bg-muted/20 md:py-32"
    >
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Argument */}
          <div className="md:col-span-9 md:col-start-1">
            <Reveal as="p" className="text-balance font-display text-h-1 font-light text-foreground/90">
              <span id="thesis-heading">
                Most brands lose <span className="italic text-muted-foreground">slowly</span> — a tagline that argues
                one thing, a website that argues another, ads that sound like a
                fourth brand altogether. We make brands that hold their{" "}
                <span className="font-serif italic text-teal-600 dark:text-teal-300">argument</span> across every
                surface. That&rsquo;s the work.
              </span>
            </Reveal>
          </div>

          {/* Eyebrow + signature line — right-aligned, like a column byline */}
          <aside className="md:col-span-3 md:col-start-10 md:row-start-1">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                002 — Thesis
              </p>
              <p className="mt-6 font-serif text-base italic text-muted-foreground">
                A note from the studio.
              </p>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
