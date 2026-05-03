import type { Metadata } from "next";
import { Target, Gauge, Users, ShieldCheck } from "lucide-react";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ingenious Hub is a Jaipur-based branding and growth studio building brands that perform — for startups, SMEs, and mission-driven teams.",
};

const REASONS = [
  {
    icon: Target,
    title: "Strategy first, deliverables second",
    body: "We don't open Figma until we've answered who you're for, what they need, and how the market has it wrong.",
  },
  {
    icon: Gauge,
    title: "Tied to numbers, not impressions",
    body: "Every brief ends with a metric: leads, ARR, CAC, conversion. We share dashboards weekly.",
  },
  {
    icon: Users,
    title: "One team, full stack",
    body: "Brand, web, performance, and PR sit at the same table. No more agency-stitching.",
  },
  {
    icon: ShieldCheck,
    title: "Senior on every project",
    body: "You don't get handed off after the kickoff. The people who pitch are the people who ship.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20 md:py-28">
        <div className="container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            About
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            We don&rsquo;t just design.{" "}
            <span className="font-serif italic">We build brands that perform.</span>
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Ingenious Hub is a creative + growth studio in Jaipur, helping startups,
            SMEs, and mission-driven teams turn ideas into impact. We craft end-to-end
            systems that blend design, storytelling, strategy, and smart tech.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Our story
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Built in Jaipur for founders who refuse to look like everyone else.
            </h2>
          </div>
          <div className="space-y-5 text-pretty text-muted-foreground md:col-span-7">
            <p>
              We started as a small team of designers who kept getting the same brief:
              &ldquo;our brand looks fine, but it isn&rsquo;t doing anything for the
              business.&rdquo; That sentence became the studio.
            </p>
            <p>
              Today, we&rsquo;re a tight crew of strategists, designers, developers, and
              marketers shipping work for edtech, fintech, D2C, healthcare, and
              founder-led B2B brands across India and the GCC.
            </p>
            <p>
              We believe great branding isn&rsquo;t just seen — it&rsquo;s felt, shared,
              and remembered. And it shows up in pipeline, not just on Behance.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Why founders choose us
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Four reasons —{" "}
              <span className="font-serif italic">and zero of them are fluff.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid gap-10 md:grid-cols-3">
          {[
            { metric: "60+", label: "Brands shipped" },
            { metric: "4.6★", label: "Google rating · 11 reviews" },
            { metric: "9 yrs", label: "Operating since 2016" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-8 text-center"
            >
              <div className="text-5xl font-semibold tracking-tight gradient-text">
                {s.metric}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
