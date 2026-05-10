"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const SHOWCASE = [
  {
    client: "Allegiance Education",
    sector: "Edtech · Test Prep",
    metric: "+62%",
    metricLabel: "admissions",
    visual: "allegiance",
    accent: "bg-amber-100 dark:bg-amber-950/40",
  },
  {
    client: "Tax2Win",
    sector: "Fintech · Tax Filing",
    metric: "3.2×",
    metricLabel: "leads",
    visual: "tax2win",
    accent: "bg-emerald-100 dark:bg-emerald-950/40",
  },
  {
    client: "Yug Vaastra",
    sector: "D2C · Tolaram",
    metric: "+48%",
    metricLabel: "IG growth",
    visual: "yug",
    accent: "bg-rose-100 dark:bg-rose-950/40",
  },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-cycle through showcase tiles
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SHOWCASE.length),
      3800
    );
    return () => clearInterval(id);
  }, []);
  const current = SHOWCASE[active];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100vh-104px)] items-center overflow-hidden py-12 md:py-0"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_75%_50%,rgba(20,184,166,0.16),transparent_70%)]"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <motion.div style={{ y, opacity }} className="relative w-full">
        <div className="container pt-12 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            {/* LEFT — statement */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                The Studio · Est. 2016
              </div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-7 display-tight font-semibold text-fluid-7xl"
              >
                <SplitLine delay={0.05}>Brands aren&rsquo;t built.</SplitLine>
                <SplitLine delay={0.22}>
                  <span className="font-serif italic text-teal-600 dark:text-teal-400">
                    They&rsquo;re remembered.
                  </span>
                </SplitLine>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 max-w-md text-fluid-base text-muted-foreground"
              >
                A creative &amp; growth studio for ambitious brands. Strategy,
                design, and performance — run as one engine.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
                <a
                  href="#work"
                  className="group inline-flex h-12 items-center gap-3 rounded-full border border-border px-5 text-sm font-medium hover:border-teal-500/50"
                >
                  See the work
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </motion.div>

              {/* Inline meta */}
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5 text-sm md:max-w-md md:grid-cols-3">
                <Meta label="Brands" value="60+" />
                <Meta label="Rating" value="4.6 ★" />
                <Meta label="Reply" value="< 4 hrs" />
              </div>
            </div>

            {/* RIGHT — auto-rotating live work tile */}
            <div className="md:col-span-5">
              <ShowcaseTile current={current} active={active} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ShowcaseTile({
  current,
  active,
}: {
  current: (typeof SHOWCASE)[number];
  active: number;
}) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:max-w-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.client}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 overflow-hidden rounded-2xl border border-border ${current.accent}`}
        >
          <ShowcaseArt visual={current.visual} />

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500/60" />
              <span className="relative inline-flex h-full w-full rounded-full bg-teal-500" />
            </span>
            Now showing
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 rounded-xl border border-foreground/10 bg-background/85 px-4 py-3 backdrop-blur">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {current.sector}
              </div>
              <div className="mt-0.5 text-sm font-semibold tracking-tight">
                {current.client}
              </div>
            </div>
            <div className="text-right">
              <div className="text-fluid-xl font-semibold tracking-tightest">
                {current.metric}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {current.metricLabel}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Index dots */}
      <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {SHOWCASE.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              i === active
                ? "bg-foreground scale-125"
                : "bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ShowcaseArt({ visual }: { visual: string }) {
  if (visual === "allegiance") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <span className="block font-semibold leading-[0.78] tracking-tightest text-foreground/90 text-[clamp(7rem,16vw,15rem)]">
            62
          </span>
          <span className="absolute -right-5 top-2 font-serif text-fluid-3xl italic text-teal-600 dark:text-teal-300">
            %
          </span>
        </div>
      </div>
    );
  }
  if (visual === "tax2win") {
    return (
      <>
        <div className="absolute inset-x-6 top-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Filing Season · 2024
          </div>
          <div className="mt-2 font-semibold leading-[0.95] tracking-tightest text-foreground text-[clamp(1.6rem,4.5vw,3rem)]">
            Ab ki baar,
            <br />
            <span className="font-serif italic text-teal-600 dark:text-teal-300">
              real CA
            </span>{" "}
            ke saath.
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-24 flex h-20 items-end gap-2">
          {[35, 55, 28, 70, 48, 82, 64, 92, 78, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-b from-teal-500 to-teal-700"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </>
    );
  }
  // yug
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-56 w-56 rounded-full border border-foreground/30 md:h-64 md:w-64">
        <div className="absolute inset-2 rounded-full border border-foreground/15" />
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-foreground/60">
              Tolaram · since 1950
            </div>
            <div className="mt-2 font-serif text-fluid-5xl italic leading-none">
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
  );
}

function SplitLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-medium tracking-tight">{value}</div>
    </div>
  );
}
