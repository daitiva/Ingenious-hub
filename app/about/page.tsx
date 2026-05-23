"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  PenLine,
  Palette,
  Code2,
  TestTube2,
  Zap,
  Target,
  Gauge,
  Users,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { FinalCTA } from "@/components/sections/final-cta";

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

const PROCESS_STEPS = [
  {
    icon: Lightbulb,
    label: "Idea",
    body: "We start by listening — to your audience, your numbers, and what your category is failing at.",
  },
  {
    icon: PenLine,
    label: "Sketch",
    body: "Concept directions on paper before pixels. Cheap to throw away, expensive to fall in love with.",
  },
  {
    icon: Palette,
    label: "Design",
    body: "Identity, web, or campaign — built as a system, not a single screen.",
  },
  {
    icon: Code2,
    label: "Develop",
    body: "Engineered for speed, accessibility, and SEO. Production-grade Next.js, no page-builder bloat.",
  },
  {
    icon: TestTube2,
    label: "Test",
    body: "Before launch and after. We measure conversion, time-to-meaning, and brand recall.",
  },
  {
    icon: Zap,
    label: "Energize",
    body: "We don't disappear at handoff. Sprint cadence, dashboards, monthly compounding.",
  },
];

const SERVICES_DETAILED = [
  {
    eyebrow: "Find out more",
    title: "Design Consultancy",
    body: "When you don't know whether to scale, rebrand, rebuild, or rework — our consultants give you a sharp diagnosis and the next three moves. No marketing dump. No fake gurus.",
    accent: "from-teal-200/40 to-emerald-300/30",
  },
  {
    eyebrow: "Innovative & out-of-the-box",
    title: "IT Services",
    body: "E-commerce, payment gateways, custom web development, plugins, mobile apps, portals. Engineered to stand out, not just stand up.",
    accent: "from-sky-200/40 to-teal-300/30",
  },
  {
    eyebrow: "Results, leads, audience",
    title: "Digital Marketing",
    body: "Not a vanity-metrics agency. A team built around CAC, LTV, and pipeline — the people you call when ads should pay for themselves.",
    accent: "from-amber-200/40 to-rose-300/30",
  },
];

const STATS = [
  { metric: "60+", label: "Brands shipped" },
  { metric: "4.6★", label: "Google · 11 reviews" },
  { metric: "9 yrs", label: "Operating since 2016" },
  { metric: "5 / 5", label: "Clutch verified" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-cream/40 py-16 dark:bg-muted/20 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(20,184,166,0.14),transparent_70%)]"
        />
        <div className="container max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
            About — The Studio
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-3 text-balance font-light text-fluid-5xl leading-[1.05] tracking-tightest md:text-fluid-6xl"
          >
            We build brands{" "}
            <span className="font-serif italic text-teal-600 dark:text-teal-400">
              that perform.
            </span>
          </motion.h1>
          <div className="mt-6 max-w-2xl space-y-4 text-pretty text-base text-muted-foreground md:text-lg">
            <p>
              Ingenious Hub is a Jaipur-based branding and growth studio
              helping startups, SMEs, and mission-driven teams turn ideas into
              impact.
            </p>
            <p>
              We combine strategy, design, and marketing into one cohesive
              system — so your brand doesn&rsquo;t just look good, it grows.
            </p>
          </div>
        </div>
      </section>

      {/* A unique way of creating */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
              Get to know our process
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="mt-4 text-balance font-light text-fluid-3xl leading-[1.1] tracking-tightest md:text-fluid-4xl"
            >
              A unique way of{" "}
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
                creating.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Building a brand isn&rsquo;t a regular job — it asks for a
              specific blend of skills, experience, and patience.
              That&rsquo;s why we follow a process worth its name. When our
              clients are delighted, we are too. That&rsquo;s why our motto is
              simple: <span className="font-medium text-foreground">energize your brand.</span>
            </p>
          </div>
        </div>
      </section>

      {/* How we do what we do — six steps */}
      <section className="bg-cream/40 py-20 dark:bg-muted/20 md:py-28">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
                How we do what we do
              </p>
            </div>
            <div className="md:col-span-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="text-balance font-light text-fluid-3xl leading-[1.05] tracking-tightest md:text-fluid-4xl"
              >
                Six steps. No{" "}
                <span className="font-serif italic text-teal-600 dark:text-teal-400">
                  filler.
                </span>
              </motion.h2>
            </div>
          </div>

          <ol className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-[0_20px_60px_-30px_rgba(13,148,136,0.45)] md:p-7"
                >
                  <div
                    aria-hidden
                    className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-500/10 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/15 to-teal-500/5 text-teal-600 dark:text-teal-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-fluid-xl font-light tracking-tight">
                    {s.label}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-foreground py-14 text-background md:py-16">
        <div className="container">
          <ul className="grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="px-4 py-2"
              >
                <div className="font-light tracking-tightest text-fluid-4xl md:text-fluid-5xl">
                  {s.metric}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-background/60">
                  {s.label}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we offer beyond the 5 pillars */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
                What else we offer
              </p>
            </div>
            <div className="md:col-span-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="text-balance font-light text-fluid-3xl leading-[1.05] tracking-tightest md:text-fluid-4xl"
              >
                Consultancy, IT, &amp;{" "}
                <span className="font-serif italic text-teal-600 dark:text-teal-400">
                  digital firepower.
                </span>
              </motion.h2>
            </div>
            <div className="md:col-span-2 md:text-right">
              <Link
                href="/services"
                className="group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                All services
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>

          <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
            {SERVICES_DETAILED.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${s.accent} p-7 md:p-8`}
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                  {s.eyebrow}
                </p>
                <h3 className="mt-4 font-light tracking-tight text-fluid-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* The list goes on... — full capability dump */}
      <section className="border-y border-border bg-cream/40 py-16 dark:bg-muted/20 md:py-20">
        <div className="container">
          <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
            And the list goes on
          </p>
          <p className="mt-5 text-balance font-light leading-snug tracking-tight text-fluid-2xl md:text-fluid-3xl">
            Branding · Logo Design · Stationery · Product Design · Packaging ·
            Billboards · Hoardings · Bus Advertising · Print Campaigns · Outdoor ·{" "}
            Web Design · Web Development · Mobile App Design · UI/UX · Content
            Development · Image Processing · Turnkey Projects · Design
            Consultancy · IT Services · E-commerce · Payment Gateways · Custom
            Web Development · <span className="font-serif italic text-teal-600 dark:text-teal-400">and more.</span>
          </p>
        </div>
      </section>

      {/* Why founders choose us */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
              Why founders choose us
            </p>
            <h2 className="mt-3 text-balance text-3xl font-light leading-[1.1] tracking-tightest md:text-5xl">
              Four reasons —{" "}
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
                zero of them fluff.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
            {REASONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 + i * 0.06,
                  }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {r.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
