"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const TICKER = ["Brand", "Story", "System", "Engine", "Outcome"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(20,184,166,0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <motion.div style={{ y, opacity }} className="relative">
        <div className="container pb-12 pt-16 md:pb-20 md:pt-28">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              Index 001 / The Studio
            </span>
            <span className="hidden md:inline-flex items-center gap-3">
              <span className="font-mono">26.92° N · 75.78° E</span>
              <span className="opacity-40">·</span>
              <span>Jaipur — Worldwide</span>
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-10 display-tight font-semibold text-fluid-display"
          >
            <SplitLine delay={0.05}>We don&rsquo;t build</SplitLine>
            <SplitLine delay={0.18}>
              <span className="text-muted-foreground">websites.</span>{" "}
              <span>We build</span>
            </SplitLine>
            <SplitLine delay={0.32}>
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
                growth engines
              </span>
              <span className="text-foreground">.</span>
            </SplitLine>
          </motion.h1>

          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <p className="text-fluid-base text-muted-foreground">
                A creative &amp; growth partner for ambitious brands.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex h-12 flex-1 items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Book a Call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex h-12 flex-1 items-center justify-between rounded-full border border-border px-5 text-sm font-medium hover:border-teal-500/50"
              >
                See work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Ticker strip */}
          <div className="relative mt-14 overflow-hidden md:mt-20">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max gap-12 animate-marquee-slow">
              {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((w, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-12 whitespace-nowrap text-fluid-3xl font-medium tracking-tight"
                >
                  {w}
                  <span className="font-serif italic text-teal-600 dark:text-teal-400">
                    energized
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-border pt-6 text-sm md:mt-14 md:grid-cols-4">
            <Meta label="Est." value="2016 · Jaipur" />
            <Meta label="Brands shipped" value="60+" />
            <Meta label="Avg. response" value="< 4 working hrs" />
            <Meta label="Rating" value="4.6 ★ on Google" />
          </div>
        </div>
      </motion.div>
    </section>
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
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
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
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-medium tracking-tight">{value}</div>
    </div>
  );
}
