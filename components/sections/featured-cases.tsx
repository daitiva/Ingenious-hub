"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Visual =
  | "allegiance"
  | "tax2win"
  | "yug";

type Case = {
  index: string;
  client: string;
  sector: string;
  title: string;
  problem: string;
  strategy: string;
  result: string;
  metrics: { metric: string; label: string }[];
  visual: Visual;
};

const CASES: Case[] = [
  {
    index: "01",
    client: "Allegiance Education",
    sector: "Edtech · Test Prep",
    title: "From a classroom to a national institute.",
    problem: "Strong faculty, generic brand.",
    strategy: "Reposition around outcomes, not subjects.",
    result: "+62% admissions, rolled across 3 cities.",
    metrics: [
      { metric: "+62%", label: "admissions" },
      { metric: "3", label: "cities live" },
      { metric: "1", label: "system" },
    ],
    visual: "allegiance",
  },
  {
    index: "02",
    client: "Tax2Win",
    sector: "Fintech · Tax Filing",
    title: "Owning filing season, end-to-end.",
    problem: "Commoditised category, lookalike ads.",
    strategy: "Hindi-first promise, synced OOH + paid + LP.",
    result: "3.2× leads, −34% CAC in eight weeks.",
    metrics: [
      { metric: "3.2×", label: "leads" },
      { metric: "−34%", label: "CAC" },
      { metric: "8 wks", label: "to result" },
    ],
    visual: "tax2win",
  },
  {
    index: "03",
    client: "Yug Vaastra",
    sector: "D2C Fashion · Tolaram",
    title: "Heritage that ships.",
    problem: "75-year textile house going D2C — needed gravitas.",
    strategy: "Circular monogram + serif wordmark + premium pack.",
    result: "Day-1 wholesale-ready. +48% IG launch month.",
    metrics: [
      { metric: "Day-1", label: "wholesale" },
      { metric: "+48%", label: "IG" },
      { metric: "75 yrs", label: "lineage" },
    ],
    visual: "yug",
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
          <div className="md:col-span-7 [direction:ltr]">
            <motion.div style={{ y: yMark }} className="relative">
              <CoverVisual visual={c.visual} />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/75 px-3 py-1 text-[11px] backdrop-blur">
                <span className="font-mono">{c.index}</span>
                <span className="opacity-50">·</span>
                <span>{c.sector}</span>
              </div>
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
                {c.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-foreground/10 bg-background/90 px-3 py-2 backdrop-blur"
                  >
                    <div className="text-base font-semibold tracking-tight md:text-lg">
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

          <div className="md:col-span-5 [direction:ltr]">
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

            <dl className="mt-7 grid gap-5 border-t border-border pt-6">
              <Step label="Problem" body={c.problem} />
              <Step label="Strategy" body={c.strategy} />
              <Step label="Result" body={c.result} />
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

/* — Editorial cover visuals —
   Each cover is a layered composition (no flat italic stamp) to feel
   like an actual project artefact, not a placeholder. */
function CoverVisual({ visual }: { visual: Visual }) {
  if (visual === "allegiance") return <AllegianceCover />;
  if (visual === "tax2win") return <Tax2WinCover />;
  return <YugCover />;
}

/* 01 · Allegiance Education — admissions brochure aesthetic */
function AllegianceCover() {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-[#F1E8D6] dark:bg-[#1c1611]">
      {/* Big number */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <span className="block font-semibold leading-[0.78] tracking-tightest text-foreground/90 text-[clamp(8rem,18vw,18rem)]">
            62
          </span>
          <span className="absolute -right-6 top-3 font-serif text-fluid-4xl italic text-teal-600 dark:text-teal-300">
            %
          </span>
        </div>
      </div>
      {/* Vertical line + label like a brochure spine */}
      <div className="absolute inset-y-6 left-6 flex flex-col items-center justify-between text-[10px] uppercase tracking-[0.2em] text-foreground/60">
        <span className="font-mono">A · 01</span>
        <span className="rotate-180 [writing-mode:vertical-rl]">
          Allegiance Education — Admissions
        </span>
        <span className="font-mono">2024</span>
      </div>
      {/* Card stack mockup */}
      <div className="absolute -right-4 top-10 hidden w-32 rotate-6 rounded-md bg-foreground/95 p-3 text-background shadow-lg md:block">
        <div className="text-[10px] tracking-wide opacity-70">Admit Card</div>
        <div className="mt-2 h-1 w-12 rounded bg-teal-300" />
        <div className="mt-1 h-1 w-16 rounded bg-background/30" />
        <div className="mt-1 h-1 w-10 rounded bg-background/30" />
      </div>
      <div className="absolute right-6 bottom-20 hidden w-24 -rotate-3 rounded-md bg-background/90 p-2 shadow-md md:block">
        <div className="h-1 w-10 rounded bg-foreground/80" />
        <div className="mt-1 h-1 w-14 rounded bg-foreground/40" />
      </div>
    </div>
  );
}

/* 02 · Tax2Win — billboard / OOH composition */
function Tax2WinCover() {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-emerald-50 dark:bg-emerald-950/30">
      {/* Top bar headline */}
      <div className="absolute inset-x-6 top-6">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Filing Season · 2024
        </div>
        <div className="mt-2 font-semibold leading-[0.95] tracking-tightest text-foreground text-[clamp(2.2rem,5.5vw,4.5rem)]">
          Ab ki baar,<br />
          <span className="font-serif italic text-teal-600 dark:text-teal-300">
            real CA
          </span>{" "}
          ke saath.
        </div>
      </div>
      {/* Performance bars */}
      <div className="absolute inset-x-6 bottom-20 flex h-24 items-end gap-2">
        {[35, 55, 28, 70, 48, 82, 64, 92, 78, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-b from-teal-500 to-teal-700"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      {/* Phone mockup pill */}
      <div className="absolute right-6 top-6 hidden h-32 w-16 rotate-6 rounded-2xl border-2 border-foreground/80 bg-background p-1.5 md:block">
        <div className="h-full w-full rounded-lg bg-gradient-to-b from-emerald-200 to-emerald-500" />
      </div>
    </div>
  );
}

/* 03 · Yug Vaastra — packaging / monogram aesthetic */
function YugCover() {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-rose-50 dark:bg-rose-950/30">
      {/* Monogram disc */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-56 w-56 rounded-full border border-foreground/30 md:h-72 md:w-72">
          <div className="absolute inset-2 rounded-full border border-foreground/15" />
          <div className="absolute inset-0 grid place-items-center text-center font-serif italic">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-foreground/60">
                Tolaram · since 1950
              </div>
              <div className="mt-2 text-fluid-5xl leading-none">
                yu
                <span className="text-teal-600 dark:text-teal-300">g</span>
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-foreground/60">
                fashion · attitude · forever
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tag swatch */}
      <div className="absolute left-6 top-6 h-16 w-2 rounded bg-rose-400" aria-hidden />
      <div className="absolute left-12 top-6 hidden md:block">
        <div className="h-2 w-10 rounded bg-foreground/70" />
        <div className="mt-1 h-2 w-16 rounded bg-foreground/40" />
        <div className="mt-1 h-2 w-8 rounded bg-foreground/40" />
      </div>
      {/* Card mockup */}
      <div className="absolute -bottom-6 right-6 hidden h-24 w-40 rotate-[-4deg] rounded-md bg-background/95 p-3 shadow-lg md:block">
        <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
          Lookbook · SS25
        </div>
        <div className="mt-2 h-1 w-16 rounded bg-foreground/80" />
        <div className="mt-1 h-1 w-20 rounded bg-foreground/40" />
        <div className="mt-1 h-1 w-12 rounded bg-foreground/40" />
      </div>
    </div>
  );
}
