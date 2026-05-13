"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { cn } from "@/lib/utils";

type Case = {
  index: string;
  client: string;
  slug: string;
  sector: string;
  title: string;
  problem: string;
  thinking: string;
  execution: string;
  impact: string;
  metrics: { metric: string; label: string }[];
  /** Optional rich detail line under the logo (e.g., a campaign headline) */
  eyebrow?: string;
  accent: string;
};

const CASES: Case[] = [
  {
    index: "01",
    client: "Allegiance Education",
    slug: "allegiance-education",
    sector: "Edtech · Test Prep",
    title: "From a classroom to a national institute.",
    problem: "Strong faculty, generic brand.",
    thinking: "Reposition around outcomes, not subjects.",
    execution: "Brand strategy, identity, admissions print.",
    impact: "+62% admissions, rolled across 3 cities.",
    metrics: [
      { metric: "+62%", label: "admissions" },
      { metric: "3", label: "cities live" },
      { metric: "1", label: "system" },
    ],
    eyebrow: "Brand Re-Launch · 2024",
    accent:
      "bg-gradient-to-br from-amber-50 to-amber-200/50 dark:from-amber-950/40 dark:to-amber-900/20",
  },
  {
    index: "02",
    client: "Tax2Win",
    slug: "tax2win",
    sector: "Fintech · Tax Filing",
    title: "Owning filing season, end-to-end.",
    problem: "Commoditised category, lookalike ads.",
    thinking: "Hindi-first promise — file with a real CA.",
    execution: "OOH, performance ads, landing pages — synced.",
    impact: "3.2× leads, −34% CAC in eight weeks.",
    metrics: [
      { metric: "3.2×", label: "leads" },
      { metric: "−34%", label: "CAC" },
      { metric: "8 wks", label: "to result" },
    ],
    eyebrow: "Ab ki baar, real CA ke saath.",
    accent:
      "bg-gradient-to-br from-emerald-50 to-emerald-200/50 dark:from-emerald-950/40 dark:to-emerald-900/20",
  },
  {
    index: "03",
    client: "Yug Vaastra",
    slug: "yug-vaastra",
    sector: "D2C Fashion · Tolaram",
    title: "Heritage that ships.",
    problem: "75-year textile house going D2C — needed gravitas.",
    thinking: "Heritage-meets-modern wordmark + premium pack.",
    execution: "Circular monogram, stationery, retail packaging.",
    impact: "Day-1 wholesale-ready. +48% IG launch month.",
    metrics: [
      { metric: "Day-1", label: "wholesale" },
      { metric: "+48%", label: "IG" },
      { metric: "75 yrs", label: "lineage" },
    ],
    eyebrow: "Tolaram · since 1950",
    accent:
      "bg-gradient-to-br from-rose-50 to-rose-200/50 dark:from-rose-950/40 dark:to-rose-900/20",
  },
];

export function FeaturedCases() {
  return (
    <section className="relative">
      <div className="container pb-10 pt-20 md:pb-12 md:pt-28">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              004 — Selected work
            </p>
          </div>
          <div className="md:col-span-7">
            <h2 className="text-balance font-light text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              Cases, not a{" "}
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
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
  const yMark = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <article ref={ref} className="relative border-y border-border">
      <div className="container py-14 md:py-20">
        <div
          className={cn(
            "grid gap-8 md:grid-cols-12 md:gap-14",
            reverse && "md:[direction:rtl]"
          )}
        >
          {/* Cover */}
          <div className="md:col-span-7 [direction:ltr]">
            <motion.div style={{ y: yMark }} className="relative">
              <CaseCover c={c} />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/75 px-3 py-1 text-[11px] backdrop-blur z-10">
                <span className="font-mono">{c.index}</span>
                <span className="opacity-50">·</span>
                <span>{c.sector}</span>
              </div>
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 z-10">
                {c.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-foreground/10 bg-background/90 px-3 py-2 backdrop-blur"
                  >
                    <div className="text-base font-light tracking-tightest md:text-lg">
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
          <div className="md:col-span-5 [direction:ltr]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.client}
            </p>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="mt-3 text-balance font-light text-fluid-3xl leading-[1.1] tracking-tight md:text-fluid-4xl"
            >
              {c.title}
            </motion.h3>

            <dl className="mt-7 grid gap-5 border-t border-border pt-6">
              <Step label="Problem" body={c.problem} />
              <Step label="Thinking" body={c.thinking} />
              <Step label="Execution" body={c.execution} />
              <Step label="Impact" body={c.impact} />
            </dl>

            <Link
              href="/work"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium"
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

/* Cover: brand logo centered on accent gradient, with project eyebrow below. */
function CaseCover({ c }: { c: Case }) {
  return (
    <div
      className={cn(
        "relative aspect-[5/4] w-full overflow-hidden rounded-2xl",
        c.accent
      )}
    >
      {/* subtle vignette so light PNGs lift off the gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.45),transparent_75%)] dark:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.06),transparent_75%)]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pb-24 pt-16 text-center">
        <ClientLogo
          name={c.client}
          slug={c.slug}
          className="max-h-[44%] w-auto max-w-[70%] drop-shadow-sm"
          fallback={
            <span className="font-serif text-fluid-5xl italic text-foreground/85">
              {c.client}
            </span>
          }
        />
        {c.eyebrow && (
          <span className="mt-6 inline-flex max-w-[80%] items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70 backdrop-blur">
            {c.eyebrow}
          </span>
        )}
      </div>
    </div>
  );
}

function Step({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 md:gap-6">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-pretty text-sm leading-relaxed text-foreground/90 md:text-base">
        {body}
      </dd>
    </div>
  );
}
