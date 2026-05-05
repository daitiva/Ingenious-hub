"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Case = {
  index: string;
  client: string;
  sector: string;
  title: string;
  problem: string;
  strategy: string;
  result: string;
  metrics: { metric: string; label: string }[];
  accent: string;
  brand: string;
};

const CASES: Case[] = [
  {
    index: "01",
    client: "Allegiance Education",
    sector: "Edtech · Test Prep",
    title: "From local classroom to a national-level institute.",
    problem:
      "Strong faculty, weak brand. The market couldn't tell Allegiance apart from a dozen local coaching centers.",
    strategy:
      "Repositioned around outcomes, not subjects. New wordmark, color system, admissions narrative, and city-launch playbook.",
    result:
      "Brand ran across three cities without a single redesign — and lifted admissions by 62% the following quarter.",
    metrics: [
      { metric: "+62%", label: "admissions" },
      { metric: "3 cities", label: "rolled out" },
      { metric: "1 system", label: "no rework" },
    ],
    accent: "bg-amber-100 dark:bg-amber-950/40",
    brand: "Allegiance",
  },
  {
    index: "02",
    client: "Tax2Win",
    sector: "Fintech · Tax Filing",
    title: "An outdoor + digital campaign that owned filing season.",
    problem:
      "Tax filing is a commodity category. Tax2Win was getting buried under bigger ad budgets and lookalike messaging.",
    strategy:
      "Hindi-first creative system anchored on one promise — file with a real CA. Synced billboards, paid ads, and landing pages so the story compounded.",
    result:
      "3.2× lead volume in eight weeks while blended CAC dropped a third — entirely on the back of campaign coherence.",
    metrics: [
      { metric: "3.2×", label: "lead volume" },
      { metric: "−34%", label: "blended CAC" },
      { metric: "8 wks", label: "time to result" },
    ],
    accent: "bg-emerald-100 dark:bg-emerald-950/40",
    brand: "Tax2Win",
  },
  {
    index: "03",
    client: "Yug Vaastra",
    sector: "D2C · Fashion (Tolaram Group)",
    title: "Heritage that ships.",
    problem:
      "A 75-year-old textile house launching its first D2C label needed a brand that felt premium without losing its lineage.",
    strategy:
      "Circular monogram, modern serif wordmark, and a stationery + packaging system designed to feel as deliberate as the product.",
    result:
      "Wholesale-ready brand book on day one. Organic IG growth of 48% in launch month — purely off design + content.",
    metrics: [
      { metric: "Day-1", label: "wholesale ready" },
      { metric: "+48%", label: "IG launch month" },
      { metric: "75 yrs", label: "of heritage, intact" },
    ],
    accent: "bg-rose-100 dark:bg-rose-950/40",
    brand: "Yug Vaastra",
  },
];

export function FeaturedCases() {
  return (
    <section className="relative">
      <div className="container pb-12 pt-24 md:pb-16 md:pt-32">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              004 — Selected work
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              Cases, not a{" "}
              <span className="font-serif italic text-muted-foreground">
                gallery.
              </span>
            </h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              All work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </header>
      </div>

      <div className="space-y-0">
        {CASES.map((c, i) => (
          <CaseSlab key={c.index} c={c} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function CaseSlab({ c, reverse }: { c: Case; reverse: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yMark = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <article
      ref={ref}
      className="relative border-y border-border"
    >
      <div className="container py-16 md:py-24">
        <div
          className={cn(
            "grid gap-10 md:grid-cols-12 md:gap-12",
            reverse && "md:[direction:rtl]"
          )}
        >
          {/* Cover */}
          <div className="md:col-span-6 [direction:ltr]">
            <motion.div
              style={{ y: yMark }}
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden rounded-2xl",
                c.accent
              )}
            >
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <span className="font-serif text-fluid-5xl italic leading-none text-foreground/80">
                  {c.brand}
                </span>
              </div>
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-[11px] backdrop-blur">
                <span className="font-mono">{c.index}</span>
                <span className="opacity-50">·</span>
                <span>{c.sector}</span>
              </div>
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
                {c.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-foreground/10 bg-background/80 px-3 py-2 text-left backdrop-blur"
                  >
                    <div className="text-sm font-semibold tracking-tight">
                      {m.metric}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Story */}
          <div className="md:col-span-6 [direction:ltr]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.client}
            </p>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="mt-3 text-balance font-semibold text-fluid-3xl leading-[1.1] tracking-tight md:text-fluid-4xl"
            >
              {c.title}
            </motion.h3>

            <dl className="mt-8 grid gap-5 border-t border-border pt-6 md:grid-cols-3 md:gap-6">
              <Step label="Problem" body={c.problem} />
              <Step label="Strategy" body={c.strategy} />
              <Step label="Result" body={c.result} />
            </dl>

            <Link
              href="/work"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              <span className="underline-offset-4 group-hover:underline">
                Read the case
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Step({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-pretty text-sm leading-relaxed text-foreground/90">
        {body}
      </dd>
    </div>
  );
}
