"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Star, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST = [
  { icon: Star, label: "4.6 on Google" },
  { icon: Rocket, label: "60+ brands scaled" },
  { icon: Zap, label: "Replies in 4 hrs" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(20,184,166,0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <div className="container grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Branding · Web · Performance · PR
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-balance text-[44px] font-semibold leading-[1.05] tracking-tight md:text-7xl"
          >
            We turn brands into{" "}
            <span className="font-serif italic text-teal-600 dark:text-teal-400">
              growth engines.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
          >
            Branding, websites, and performance marketing — built to win attention,
            earn trust, and drive measurable revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Book a Free Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/work">View our work</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {TRUST.map((t) => (
              <li key={t.label} className="inline-flex items-center gap-2">
                <t.icon className="h-4 w-4 text-teal-500" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative md:col-span-5">
          <HeroMark />
        </div>
      </div>
    </section>
  );
}

function HeroMark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-teal-500/20 via-teal-300/10 to-transparent blur-2xl" />
      <div className="relative h-full w-full rounded-[2rem] border border-teal-500/20 bg-card/60 p-8 shadow-[0_30px_80px_-30px_rgba(13,148,136,0.45)] backdrop-blur-sm md:p-10">
        <div className="flex h-full w-full items-center justify-center">
          <motion.svg
            viewBox="0 0 200 240"
            className="h-full w-auto"
            initial={{ rotate: -2 }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <defs>
              <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="100"
              cy="40"
              r="22"
              fill="url(#tealGrad)"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <rect
              x="80"
              y="78"
              width="40"
              height="140"
              rx="6"
              fill="url(#tealGrad)"
            />
          </motion.svg>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-background/70 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur">
          <span className="font-mono uppercase tracking-widest">Mark · 2025</span>
          <span className="text-teal-600 dark:text-teal-400">energize your brand</span>
        </div>
      </div>
    </motion.div>
  );
}
