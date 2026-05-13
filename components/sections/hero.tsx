"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";

const SHOWCASE = [
  {
    client: "Allegiance Education",
    slug: "allegiance-education",
    sector: "Edtech · Test Prep",
    metric: "+62%",
    metricLabel: "admissions",
    eyebrow: "Brand Re-Launch · 2024",
    accent:
      "bg-gradient-to-br from-amber-50 to-amber-200/40 dark:from-amber-950/40 dark:to-amber-900/20",
  },
  {
    client: "Tax2Win",
    slug: "tax2win",
    sector: "Fintech · Tax Filing",
    metric: "3.2×",
    metricLabel: "leads",
    eyebrow: "Filing Season · 2024",
    accent:
      "bg-gradient-to-br from-emerald-50 to-emerald-200/40 dark:from-emerald-950/40 dark:to-emerald-900/20",
  },
  {
    client: "Yug Vaastra",
    slug: "yug-vaastra",
    sector: "D2C · Tolaram",
    metric: "+48%",
    metricLabel: "IG growth",
    eyebrow: "Heritage that ships",
    accent:
      "bg-gradient-to-br from-rose-50 to-rose-200/40 dark:from-rose-950/40 dark:to-rose-900/20",
  },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax + fade only on screens >= md to avoid mobile readability issues
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const yDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityDesktop = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

      <motion.div
        style={isDesktop ? { y: yDesktop, opacity: opacityDesktop } : undefined}
        className="relative w-full"
      >
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
                className="mt-7 display-tight font-normal text-fluid-7xl"
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
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 overflow-hidden rounded-2xl border border-border ${current.accent}`}
        >
          {/* "Now showing" pill */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur z-10">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500/60" />
              <span className="relative inline-flex h-full w-full rounded-full bg-teal-500" />
            </span>
            Now showing
          </div>

          {/* Eyebrow tag */}
          <div className="absolute inset-x-4 top-16 flex justify-end">
            <span className="rounded-full border border-foreground/10 bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/70 backdrop-blur">
              {current.eyebrow}
            </span>
          </div>

          {/* Centered brand logo */}
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mx-auto flex h-32 max-w-[260px] items-center justify-center md:h-44 md:max-w-[300px]"
            >
              <ClientLogo
                name={current.client}
                slug={current.slug}
                className="drop-shadow-sm"
                fallback={
                  <span className="text-center font-serif text-3xl italic text-foreground/85 md:text-5xl">
                    {current.client}
                  </span>
                }
              />
            </motion.div>
          </div>

          {/* Bottom info card */}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 rounded-xl border border-foreground/10 bg-background/85 px-4 py-3 backdrop-blur">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {current.sector}
              </div>
              <div className="mt-0.5 text-sm font-medium tracking-tight">
                {current.client}
              </div>
            </div>
            <div className="text-right">
              <div className="text-fluid-xl font-light tracking-tightest">
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
