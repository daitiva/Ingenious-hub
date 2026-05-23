"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { Reveal } from "@/components/motion-reveal";

/**
 * Industries — Section 5.
 * Quietly proves breadth. Six tiles, no card-stack treatment. Light layout,
 * heavy whitespace. Each tile links to its industry page (Phase B).
 */
export function Industries() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="relative border-t border-border bg-bone/40 py-24 dark:bg-muted/20 md:py-32"
    >
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                005 — Industries
              </p>
              <h2
                id="industries-heading"
                className="mt-4 text-balance font-display text-h-1 font-light"
              >
                Categories we&rsquo;ve{" "}
                <span className="font-serif italic text-teal-600 dark:text-teal-300">learned to listen to.</span>
              </h2>
              <p className="mt-6 max-w-md text-body text-muted-foreground">
                Each industry has its own grammar — its trust signals, regulatory edges, buyer psychology. The work doesn&rsquo;t translate. The discipline does.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <ul className="grid grid-cols-1 gap-px border border-border bg-border/80 md:grid-cols-2">
              {INDUSTRIES.map((ind, i) => (
                <Reveal as="li" key={ind.slug} i={i} tone="editorial">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="focus-ring group flex h-full flex-col justify-between gap-8 bg-background p-6 transition-colors hover:bg-card md:p-8"
                  >
                    <p className="font-display text-h-3 font-light tracking-tight">
                      {ind.label}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        0{i + 1} / {INDUSTRIES.length}
                      </span>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
