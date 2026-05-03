import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five tightly packaged offerings: Branding & Identity, Website & UI/UX, Performance Marketing, Creative & Content, and PR & Growth.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20 md:py-28">
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Services
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Five offerings.{" "}
            <span className="font-serif italic">One growth engine.</span>
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            We don&rsquo;t do thirty things badly. We do five things well — and we plug
            them together so your brand, site, and acquisition stop fighting each other.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container space-y-20 md:space-y-28">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 === 1;
            return (
              <article
                key={s.id}
                id={s.id}
                className="grid scroll-mt-24 gap-10 md:grid-cols-12 md:items-start"
              >
                <div
                  className={`md:col-span-5 ${
                    reversed ? "md:order-2" : ""
                  }`}
                >
                  <div className="sticky top-24 rounded-2xl border border-border bg-gradient-to-br from-teal-500/8 via-card to-card p-8">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        0{i + 1} / 05
                      </span>
                    </div>
                    <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight">
                      {s.title}
                    </h2>
                    <p className="mt-2 font-serif text-lg italic text-muted-foreground">
                      {s.tagline}
                    </p>
                    <Button asChild className="mt-7" size="sm">
                      <Link href="/contact">
                        Start a project <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div
                  className={`space-y-8 md:col-span-7 ${
                    reversed ? "md:order-1" : ""
                  }`}
                >
                  <p className="text-pretty text-lg text-muted-foreground">
                    {s.description}
                  </p>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      What it includes
                    </h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {s.includes.map((it) => (
                        <li
                          key={it}
                          className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3 text-sm"
                        >
                          <Check className="h-4 w-4 text-teal-500" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Who it&rsquo;s for
                      </h4>
                      <p className="mt-2 text-sm text-foreground">{s.whoItsFor}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5">
                      <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Outcome you can expect
                      </h4>
                      <p className="mt-2 text-sm text-foreground">
                        {s.outcomeMetric}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
