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
      className="relative border-t border-border bg-gradient-wash py-24 dark:bg-muted/20 md:py-32"
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
                <span className="text-gradient-brand font-serif italic">learned to listen to.</span>
              </h2>
              <p className="mt-6 max-w-md text-body text-muted-foreground">
                Each industry has its own grammar — its trust signals, regulatory edges, buyer psychology. The work doesn&rsquo;t translate. The discipline does.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            {/* Tiles are display-only on the home page — they prove breadth
                without taking the visitor to a coming-soon page. The single
                "Explore industries" link below leads to the index where
                each industry has its own real page. */}
            <ul className="grid grid-cols-1 gap-px border border-border bg-border/80 md:grid-cols-2">
              {INDUSTRIES.map((ind, i) => (
                <Reveal as="li" key={ind.slug} i={i} tone="editorial">
                  <div className="flex h-full flex-col justify-between gap-8 bg-background p-6 md:p-8">
                    <p className="font-display text-h-3 font-light tracking-tight">
                      {ind.label}
                    </p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      0{i + 1} / {INDUSTRIES.length}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <div className="mt-6 flex items-center justify-end">
                <Link
                  href="/industries"
                  className="focus-ring group inline-flex items-center gap-2 text-sm font-medium"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    Explore industries
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
