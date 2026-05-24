"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { Reveal } from "@/components/motion-reveal";
import { RegistrationCorners } from "@/components/registration-corners";
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
  eyebrow: string;
  tone: "bone" | "ink" | "rust" | "teal";
};

/**
 * Four hand-picked cases. Order is editorial, not randomised on home.
 */
const CASES: Case[] = [
  {
    index: "01",
    client: "Allegiance Education",
    slug: "allegiance-education",
    sector: "Edtech · Test Prep",
    title: "From a classroom to a national institute.",
    problem:
      "Strong faculty. Generic brand. Admissions teams kept losing parents to bigger names with smaller faculty rosters.",
    thinking:
      "Reposition around outcomes, not subjects. Tell the parent — not the student — the story first.",
    execution: "Brand strategy, identity, admissions print system, city-launch playbook.",
    impact: "+62% admissions in the next intake. Rolled across three cities without a redesign.",
    metrics: [
      { metric: "+62%", label: "admissions" },
      { metric: "3", label: "cities live" },
      { metric: "1", label: "system" },
    ],
    eyebrow: "Brand Re-launch · 2024",
    tone: "bone",
  },
  {
    index: "02",
    client: "Tax2Win",
    slug: "tax2win",
    sector: "Fintech · Tax Filing",
    title: "Owning filing season, end-to-end.",
    problem: "A commoditised category. Lookalike ads. Every competitor saying the same things.",
    thinking:
      "One Hindi-first promise — *file with a real CA* — synced across OOH, paid, and landing pages so the story compounds with each impression.",
    execution: "Campaign system, OOH, performance ads, landing page architecture.",
    impact: "3.2× more leads. CAC down 34%. Eight weeks to result.",
    metrics: [
      { metric: "3.2×", label: "leads" },
      { metric: "−34%", label: "CAC" },
      { metric: "8 wks", label: "to result" },
    ],
    eyebrow: "Filing Season · 2024",
    tone: "teal",
  },
  {
    index: "03",
    client: "Yug Vaastra",
    slug: "yug-vaastra",
    sector: "D2C Fashion · Tolaram",
    title: "Heritage that ships.",
    problem:
      "A 75-year textile house launching D2C. The new brand had to carry the lineage — not run from it.",
    thinking:
      "Heritage-meets-modern wordmark. Premium packaging. A system designed to feel as deliberate as the product itself.",
    execution: "Circular monogram, full identity system, stationery, retail packaging.",
    impact: "Wholesale-ready on day one. +48% IG growth in launch month.",
    metrics: [
      { metric: "Day-1", label: "wholesale" },
      { metric: "+48%", label: "IG" },
      { metric: "75 yrs", label: "lineage" },
    ],
    eyebrow: "Tolaram · since 1950",
    tone: "rust",
  },
  {
    index: "04",
    client: "Jaipur Health Festival",
    slug: "jaipur-health-festival",
    sector: "Events · Healthcare",
    title: "An owned-media event that sold itself out.",
    problem:
      "A first-edition city festival with no precedent. The brand had to argue why a busy Jaipur should show up.",
    thinking:
      "Treat the festival like a publication. Press relationships first; the stage, the OOH, and the social cuts all follow one masthead.",
    execution: "Identity, PR strategy, press outreach, on-ground signage, social cuts.",
    impact: "12+ tier-1 features. All first-edition partnerships sold out.",
    metrics: [
      { metric: "12+", label: "tier-1 features" },
      { metric: "Sold", label: "partnerships" },
      { metric: "Edition 1", label: "delivered" },
    ],
    eyebrow: "Inaugural edition · 2023",
    tone: "ink",
  },
];

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-heading" className="relative">
      <div className="container pb-10 pt-24 md:pb-14 md:pt-32">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                003 — Featured work
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal>
              <h2
                id="work-heading"
                className="text-balance font-display text-h-1 font-light"
              >
                Strategy is{" "}
                <span className="font-serif italic text-teal-600 dark:text-teal-300">
                  upstream
                </span>{" "}
                of design.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-2 md:text-right">
            <Reveal>
              <Link
                href="/work"
                className="focus-ring group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                All work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        {CASES.map((c, i) => (
          <CaseSlab key={c.slug} c={c} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

const TONE_BG: Record<Case["tone"], string> = {
  bone: "bg-bone dark:bg-muted/30",
  ink: "bg-ink text-bone dark:bg-foreground/95 dark:text-background",
  rust: "bg-rust-500/10 dark:bg-rust-500/15",
  teal: "bg-teal-600/[0.06] dark:bg-teal-600/[0.12]",
};

function CaseSlab({ c, reverse }: { c: Case; reverse: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yArt = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const isInverted = c.tone === "ink";

  return (
    <article
      ref={ref}
      className={cn("relative border-b border-border last:border-b-0", TONE_BG[c.tone])}
    >
      <div className="container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Cover — visual order driven by grid `order`, NOT direction:rtl.
              Avoids reversing screen-reader read-order while keeping the
              alternating editorial layout on md+ screens. */}
          <div className={cn("md:col-span-7", reverse && "md:order-2")}>
            <motion.div style={{ y: yArt }} className="relative">
              {/* Editorial registration card */}
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-hairline bg-background">
                <RegistrationCorners />

                <div className="absolute inset-x-12 inset-y-16 flex items-center justify-center">
                  <ClientLogo
                    name={c.client}
                    slug={c.slug}
                    className="max-h-[55%] w-auto max-w-full"
                    fallback={
                      <span className="text-center font-serif text-5xl italic text-foreground/85">
                        {c.client}
                      </span>
                    }
                  />
                </div>

                {/* Eyebrow tag — top-left */}
                <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.eyebrow}
                </span>

                {/* Metrics — anchored bottom, hairline-divided */}
                <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 divide-x divide-hairline border-t border-hairline pt-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                      <div className="font-display text-h-3 font-light tabular-nums">{m.metric}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Story */}
          <div className={cn("md:col-span-5", reverse && "md:order-1")}>
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", isInverted ? "text-background/60" : "text-muted-foreground")}>
              {c.index} · {c.sector}
            </p>
            <Reveal as="h3" tone="editorial" className="mt-4 text-balance font-display text-h-2 font-light">
              {c.title}
            </Reveal>

            <dl className="mt-7 space-y-5 border-t border-hairline pt-6">
              <Step label="Problem" body={c.problem} inverted={isInverted} />
              <Step label="Thinking" body={c.thinking} inverted={isInverted} />
              <Step label="Execution" body={c.execution} inverted={isInverted} />
              <Step label="Impact" body={c.impact} inverted={isInverted} accent />
            </dl>

            <Link
              href="/work"
              className="focus-ring group mt-8 inline-flex items-center gap-3 text-sm font-medium"
            >
              <span className="underline-offset-4 group-hover:underline">Read the case</span>
              <span className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all",
                isInverted
                  ? "border-background/30 group-hover:border-background group-hover:bg-background group-hover:text-foreground"
                  : "border-border group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
              )}>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function Step({ label, body, inverted, accent }: { label: string; body: string; inverted?: boolean; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-4 md:grid-cols-[110px_1fr] md:gap-6">
      <dt className={cn("font-mono text-[10px] uppercase tracking-[0.22em] pt-1", inverted ? "text-background/60" : "text-muted-foreground")}>
        {label}
      </dt>
      <dd className={cn(
        "text-pretty text-sm leading-relaxed md:text-base",
        accent && !inverted && "font-medium text-foreground",
        accent && inverted && "font-medium text-background",
      )}>
        {body}
      </dd>
    </div>
  );
}
