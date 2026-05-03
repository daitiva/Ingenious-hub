"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 p-8 text-white shadow-[0_40px_120px_-40px_rgba(13,148,136,0.6)] md:p-14"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-xs uppercase tracking-[0.22em] text-teal-100/80">
                Ready when you are
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Ready to{" "}
                <span className="font-serif italic">grow your brand?</span>
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-teal-50/90 md:text-base">
                Book a free strategy call and walk away with actionable insights —
                whether we work together or not.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-white text-teal-900 shadow-none hover:bg-teal-50"
              >
                <Link href="/contact">
                  Book a Free Strategy Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
