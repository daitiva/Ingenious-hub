import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion-reveal";

export const metadata: Metadata = {
  title: "About — the studio",
  description:
    "A strategic branding studio in Jaipur. How we think, what we refuse to do, and why restraint is the most undervalued tool in our field.",
  alternates: { canonical: "/about" },
};

const BELIEFS = [
  {
    n: "01",
    title: "Strategy is upstream of design.",
    body: "Every brand we've built lost or won before the first sketch — at the question we asked the founder. We've stopped opening Figma until that question has an honest answer.",
  },
  {
    n: "02",
    title: "Coherence beats volume.",
    body: "A brand that says one thing across thirty touchpoints will out-compound a brand that says ten things across three. We measure ourselves against the boring version: did everything argue the same thing?",
  },
  {
    n: "03",
    title: "Restraint is a tool, not a style.",
    body: "We use it where it's a competitive edge — categories crowded with noise. We don't use it where the audience won't reward it. Restraint is decided per brief.",
  },
  {
    n: "04",
    title: "Senior on every project.",
    body: "Whoever you spoke to in the pitch is the person who ships. We don't run a delivery pyramid. The trade-off is we take fewer clients.",
  },
  {
    n: "05",
    title: "The work outlives the engagement.",
    body: "Most of our brands are still running the systems we shipped two or three years on. We design for that — for the team that inherits it, not for the launch screenshot.",
  },
];

const TEAM_VALUES = [
  {
    label: "Output",
    text: "Three or four projects at a time. We refuse the rest.",
  },
  {
    label: "Tempo",
    text: "Weekly demos. The brand answers a question every week.",
  },
  {
    label: "Hand-off",
    text: "Documentation as a deliverable. Brand guides that read like editorials, not specs.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HEADER — editorial column, no hero photo */}
      <section className="relative border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                About — the studio
              </p>
            </div>
            <div className="md:col-span-9">
              <Reveal as="h1" tone="editorial" className="text-balance font-display text-d-2 font-light leading-[1.05]">
                A small studio in Jaipur with a{" "}
                <span className="text-gradient-brand font-serif italic">
                  short list of beliefs.
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN — short, no pitch-deck */}
      <section className="relative border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Why we exist
              </p>
            </div>
            <div className="space-y-6 md:col-span-9">
              <Reveal as="p" className="text-balance font-display text-h-2 font-light leading-snug text-foreground/90">
                We started Ingenious Hub in 2016 because we kept being hired
                twice for the same brand — once to ship the identity, then six
                months later to fix the website that didn&rsquo;t carry it. The two
                jobs were always the same job. So we stopped pretending they
                weren&rsquo;t.
              </Reveal>
              <Reveal as="p" className="text-body-lg text-muted-foreground">
                Today the studio is a tight crew that runs brand strategy,
                identity, web, and acquisition under one masthead. We work with
                founders we like, in categories we understand, on briefs we
                think we can argue an honest position for.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FIVE BELIEFS */}
      <section className="relative border-b border-border bg-gradient-wash py-20 dark:bg-muted/20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                How we think
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="sr-only">Beliefs</h2>
              <ol className="space-y-12 md:space-y-16">
                {BELIEFS.map((b, i) => (
                  <Reveal
                    as="li"
                    key={b.n}
                    i={i}
                    tone="editorial"
                    className="grid gap-3 md:grid-cols-[80px_1fr] md:gap-10"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:pt-2">
                      {b.n}
                    </span>
                    <div>
                      <h3 className="text-balance font-display text-h-2 font-light leading-tight">
                        {b.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
                        {b.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE WON&rsquo;T DO */}
      <section className="relative border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                What we don&rsquo;t take on
              </p>
            </div>
            <div className="md:col-span-9">
              <Reveal as="p" className="max-w-3xl text-balance font-display text-h-2 font-light leading-snug">
                Logo-only briefs without a strategy phase. Categories with
                regulatory complexity we don&rsquo;t already understand. Founders who
                want a vendor instead of a partner. Engagements we can&rsquo;t put a
                senior team on. We say no to roughly four briefs for every one
                we say yes to. The clients we work with are usually grateful
                for the no, eventually.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM RHYTHM — no headshots needed */}
      <section className="relative border-b border-border bg-gradient-wash py-20 dark:bg-muted/20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                How we work
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 className="sr-only">Team rhythm</h2>
              <ul className="divide-y divide-border border-y border-border">
                {TEAM_VALUES.map((v, i) => (
                  <Reveal
                    as="li"
                    key={v.label}
                    i={i}
                    className="grid gap-3 py-6 md:grid-cols-[160px_1fr] md:gap-10 md:py-8"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {v.label}
                    </span>
                    <span className="text-body-lg text-foreground/90">{v.text}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STATS — kept honest */}
      <section className="relative border-b border-foreground/40 bg-ink py-20 text-bone md:py-24">
        <div className="container">
          <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {[
              { v: "2016", l: "studio founded" },
              { v: "60+", l: "brands shipped" },
              { v: "4.6 ★", l: "google · 11 reviews" },
              { v: "12+", l: "tier-1 press features" },
            ].map((s, i) => (
              <Reveal as="li" key={s.l} i={i}>
                <div className="font-display text-d-2 font-light leading-none tabular-nums">
                  {s.v}
                </div>
                <div className="mt-3 max-w-[180px] text-xs text-bone/55">
                  {s.l}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SOFT CTA */}
      <section className="relative py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Working together
            </p>
            <h2 className="mt-4 text-balance font-display text-d-2 font-light">
              We take{" "}
              <span className="text-gradient-brand font-serif italic">
                three or four
              </span>{" "}
              briefs a quarter.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-muted-foreground">
              If you&rsquo;re early enough that strategy still matters, send a short
              brief. We reply within four working hours.
            </p>
            <Link
              href="/contact"
              className="focus-ring group mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
