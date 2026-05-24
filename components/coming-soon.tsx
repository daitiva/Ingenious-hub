import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion-reveal";

/**
 * Used by route page files to tag a ComingSoon page as `noindex`. Spread
 * into the route's `export const metadata` so search engines don't surface
 * placeholder content. Once the real essay lands, drop the spread.
 */
export const comingSoonMetadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: { index: false, follow: true },
  },
} as const;

type ComingSoonProps = {
  /** e.g. "Industries · Edtech" */
  eyebrow: string;
  /** Display label — e.g. "Edtech & Education" */
  title: string;
  /** One-paragraph editorial note about what will live here */
  note?: string;
  /** Back-link destination (defaults to home) */
  backHref?: string;
  /** Back-link label */
  backLabel?: string;
};

/**
 * Coming Soon — reusable editorial placeholder for routes whose content
 * lives in Phase C. Quiet, restrained, never the loud "🚧 under construction"
 * pattern. Same type system as the rest of the site so it doesn't feel like
 * a fallback.
 */
export function ComingSoon({
  eyebrow,
  title,
  note,
  backHref = "/",
  backLabel = "Back to studio",
}: ComingSoonProps) {
  return (
    <section className="relative flex min-h-[calc(100svh-104px)] items-center py-20 md:py-28">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {eyebrow}
            </p>
          </div>
          <div className="md:col-span-9">
            <Reveal as="h1" tone="editorial" className="text-balance font-display text-d-2 font-light leading-[1.05]">
              {title}
            </Reveal>
            <Reveal>
              <p className="mt-10 max-w-2xl text-body-lg text-muted-foreground">
                {note ??
                  "This page is being written. The work it covers exists; the long-form essay does not. We are taking the time to write it properly rather than ship a placeholder essay."}
              </p>

              <p className="mt-5 max-w-2xl text-body text-muted-foreground">
                In the meantime, see the{" "}
                <Link
                  href="/work"
                  className="focus-ring underline-offset-4 hover:underline"
                >
                  selected work
                </Link>{" "}
                — most of which lives in this category — or send a brief if
                yours is the kind we should be writing about next.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
                <Link
                  href="/contact"
                  className="focus-ring group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link
                  href={backHref}
                  className="focus-ring group inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                  {backLabel}
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Status · in development · publishing on rolling basis
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
