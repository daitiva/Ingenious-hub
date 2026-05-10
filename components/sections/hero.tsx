"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[88vh] items-end overflow-hidden md:min-h-screen"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_120%,rgba(20,184,166,0.18),transparent_70%)]"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <motion.div style={{ y, opacity }} className="relative w-full">
        <div className="container pb-12 pt-20 md:pb-16 md:pt-32">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="display-tight font-semibold text-fluid-display"
          >
            <SplitLine delay={0.05}>Brands aren&rsquo;t built.</SplitLine>
            <SplitLine delay={0.22}>
              <span className="font-serif italic text-teal-600 dark:text-teal-400">
                They&rsquo;re remembered.
              </span>
            </SplitLine>
          </motion.h1>

          <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <p className="text-fluid-base text-muted-foreground">
                A creative &amp; growth studio for ambitious brands.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex h-12 flex-1 items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <a
                href="#work"
                className="group inline-flex h-12 flex-1 items-center justify-between rounded-full border border-border px-5 text-sm font-medium hover:border-teal-500/50"
              >
                See the work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tiny scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden items-center justify-center md:flex">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll to enter
          <span className="h-px w-10 bg-current opacity-50" />
        </span>
      </div>
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
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
