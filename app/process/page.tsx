import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion-reveal";

export const metadata: Metadata = {
  title: "Process — six steps, no filler",
  description:
    "How the studio runs a brand engagement, end to end. Six steps, each with a deliverable a client can hold.",
  alternates: { canonical: "/process" },
};

type Step = {
  n: string;
  label: string;
  duration: string;
  hed: string;
  body: string;
  deliverables: string[];
};

const STEPS: Step[] = [
  {
    n: "01",
    label: "Listen",
    duration: "Week 1",
    hed: "We start with a strategy session, not a kickoff.",
    body: "Two hours, three people from your side, two from ours. We ask uncomfortable questions about the category, the buyer, the numbers, and what isn't working. You leave with two or three things to fix that week, whether or not we work together.",
    deliverables: ["Strategy session recording", "Initial diagnosis memo (~800 words)"],
  },
  {
    n: "02",
    label: "Position",
    duration: "Weeks 2–3",
    hed: "We write the argument before we design it.",
    body: "Positioning is the part most studios skip. We don't. We write the brand's one-sentence thesis, the audience hierarchy, the words we'll use and the ones we refuse to. The rest of the engagement is a stress test of this document.",
    deliverables: [
      "Positioning brief (12–20 pp)",
      "Audience map",
      "Voice & copy guide",
      "Naming exploration (if applicable)",
    ],
  },
  {
    n: "03",
    label: "Design",
    duration: "Weeks 4–7",
    hed: "We build the system, not the screens.",
    body: "Identity, type system, colour, motion, photography direction, packaging if relevant. Two rounds of feedback, one round of refinement. The system is documented as we build it, not as a separate phase at the end.",
    deliverables: [
      "Identity system (wordmark, marks, palette, type)",
      "Brand application library (collateral, social, signage)",
      "Living brand guide (Notion or Figma)",
    ],
  },
  {
    n: "04",
    label: "Build",
    duration: "Weeks 5–10 (parallel)",
    hed: "Website, product UI, and campaigns ship in parallel.",
    body: "Once positioning is locked, we don't wait for the brand book to finalize before starting the website or the first campaign. The disciplines work in parallel so launch dates are realistic and the brand never sits in a deck.",
    deliverables: [
      "Production-grade Next.js website",
      "CMS schema (Sanity or equivalent)",
      "Launch campaign creative (3 variants)",
      "Analytics + conversion instrumentation",
    ],
  },
  {
    n: "05",
    label: "Ship",
    duration: "Week 11",
    hed: "Launch is a controlled, instrumented release.",
    body: "Soft launch first — a private list, light press, founder posts. Two weeks of monitoring real-user data before the wider window opens. Press relationships are seeded earlier so coverage clusters around the public launch.",
    deliverables: [
      "Soft-launch checklist",
      "PR plan + outreach list",
      "Performance dashboard (Vercel + Plausible)",
      "Post-launch retro (week 14)",
    ],
  },
  {
    n: "06",
    label: "Hold",
    duration: "Months 4+",
    hed: "We stay long enough for the system to compound.",
    body: "Optional retainer: monthly creative cadence, performance optimisation, content engine, brand-system stewardship. We're honest about when the engagement no longer needs us — most clients move to a lighter retainer in year two.",
    deliverables: [
      "Monthly creative output (3–6 deliverables)",
      "Quarterly brand-system review",
      "Performance reporting + iteration",
    ],
  },
];

const PRINCIPLES = [
  {
    label: "One masthead",
    body: "Brand, web, and acquisition run under one creative director. No agency-stitching.",
  },
  {
    label: "Weekly tempo",
    body: "Demo every Friday. The brand answers one question a week, even mid-design.",
  },
  {
    label: "Documentation as deliverable",
    body: "Brand guide is shipped as the brand is built, not bolted on after launch.",
  },
  {
    label: "Senior on every call",
    body: "Whoever pitches the work runs the work. No hand-offs after kickoff.",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* HEADER */}
      <section className="relative border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Process — how we run a brief
              </p>
            </div>
            <div className="md:col-span-9">
              <Reveal as="h1" tone="editorial" className="text-balance font-display text-d-2 font-light leading-[1.05]">
                Six steps. Each one has an{" "}
                <span className="text-gradient-brand font-serif italic">
                  output a client can hold.
                </span>
              </Reveal>
              <p className="mt-8 max-w-2xl text-body-lg text-muted-foreground">
                Most studios sell their process as a slide. This is ours,
                written out. If you can&rsquo;t see how a step makes your brand
                better, we shouldn&rsquo;t be doing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="relative">
        {STEPS.map((s, i) => (
          <article
            key={s.n}
            className={`relative border-b border-border ${
              i % 2 === 1 ? "bg-gradient-wash" : ""
            }`}
          >
            <div className="container py-16 md:py-24">
              <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-3">
                  <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {s.n} · {s.label}
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60">
                      {s.duration}
                    </p>
                  </Reveal>
                </div>
                <div className="md:col-span-9">
                  <Reveal as="h2" tone="editorial" className="text-balance font-display text-h-1 font-light leading-tight">
                    {s.hed}
                  </Reveal>
                  <Reveal as="p" className="mt-6 max-w-3xl text-body-lg text-foreground/90">
                    {s.body}
                  </Reveal>
                  <Reveal>
                    <div className="mt-10 grid gap-4 border-t border-border pt-6 md:grid-cols-[160px_1fr] md:gap-10">
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        Deliverables
                      </p>
                      <ul className="space-y-2 text-sm md:text-base">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-baseline gap-3">
                            <span aria-hidden className="font-mono text-[10px] text-muted-foreground">
                              ✦
                            </span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* OPERATING PRINCIPLES */}
      <section className="relative border-b border-foreground/40 bg-ink py-20 text-bone md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
                Operating principles
              </p>
              <Reveal as="h2" tone="editorial" className="mt-4 text-balance font-display text-h-1 font-light">
                Things that{" "}
                <span className="text-gradient-brand font-serif italic">never</span>{" "}
                change.
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-bone/15 border-y border-bone/15">
                {PRINCIPLES.map((p, i) => (
                  <Reveal as="li" key={p.label} i={i} className="grid gap-3 py-6 md:grid-cols-[200px_1fr] md:gap-10 md:py-8">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
                      {p.label}
                    </span>
                    <span className="text-body-lg text-bone/90">{p.body}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOFT CTA */}
      <section className="relative py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Next
            </p>
            <h2 className="mt-4 text-balance font-display text-d-2 font-light">
              Send a brief.{" "}
              <span className="text-gradient-brand font-serif italic">
                We&rsquo;ll reply within four hours.
              </span>
            </h2>
            <Link
              href="/contact"
              className="focus-ring group mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
