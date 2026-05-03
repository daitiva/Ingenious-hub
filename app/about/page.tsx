import type { Metadata } from "next";
import { Target, Gauge, Users, ShieldCheck } from "lucide-react";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ingenious Hub is a Jaipur-based branding and growth studio building brands that perform.",
};

const REASONS = [
  {
    icon: Target,
    title: "Strategy first",
    body: "We don't open Figma until we've answered who you're for and how the market has it wrong.",
  },
  {
    icon: Gauge,
    title: "Tied to numbers",
    body: "Every brief ends with a metric: leads, revenue, CAC, conversion. Dashboards weekly.",
  },
  {
    icon: Users,
    title: "One team, full stack",
    body: "Brand, web, performance, and PR sit at the same table. No agency-stitching.",
  },
  {
    icon: ShieldCheck,
    title: "Senior on every project",
    body: "The people who pitch are the people who ship. No hand-offs after kickoff.",
  },
];

const STATS = [
  { metric: "60+", label: "Brands shipped" },
  { metric: "4.6★", label: "Google · 11 reviews" },
  { metric: "9 yrs", label: "Operating since 2016" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-16 md:py-24">
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            About
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            We build brands{" "}
            <span className="font-serif italic">that perform.</span>
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-pretty text-base text-muted-foreground md:text-lg">
            <p>
              Ingenious Hub is a Jaipur-based branding and growth studio helping
              startups and SMEs turn ideas into impact.
            </p>
            <p>
              We combine strategy, design, and marketing into one cohesive system —
              so your brand doesn&rsquo;t just look good, it grows.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-3 md:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-7 text-center"
              >
                <div className="text-4xl font-semibold tracking-tight gradient-text md:text-5xl">
                  {s.metric}
                </div>
                <div className="mt-1.5 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Why founders choose us
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Four reasons —{" "}
              <span className="font-serif italic">zero of them fluff.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
