import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for isn't here.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-[calc(100svh-64px)] items-center pt-16"
      role="main"
    >
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              404 — Page not found
            </p>
          </div>
          <div className="md:col-span-9">
            <h1 className="text-balance font-display text-d-2 font-light leading-[1.05]">
              That URL doesn&rsquo;t lead anywhere we&rsquo;ve{" "}
              <span className="text-gradient-brand font-serif italic">
                shipped yet.
              </span>
            </h1>
            <p className="mt-10 max-w-2xl text-body-lg text-muted-foreground">
              You might be looking for the work, the services, or the studio.
              If you arrived here from a saved link, the page may have been
              renamed during the v2 redesign — try one of these.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
              <Link
                href="/"
                className="focus-ring group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Home
              </Link>
              <Link
                href="/work"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                Selected work
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                href="/contact"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                Contact the studio
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
