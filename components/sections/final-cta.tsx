"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-background">
      <div className="container py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-background/55">
              Let&rsquo;s build
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mt-5 text-balance display-tight font-semibold text-fluid-7xl"
            >
              Let&rsquo;s build the brand{" "}
              <span className="font-serif italic text-teal-300">
                people remember.
              </span>
            </motion.h2>
            <p className="mt-6 max-w-xl text-background/75">
              60-min call. Free. No deck. Two or three things to fix this week —
              whether we work together or not.
            </p>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center justify-between gap-6 rounded-full bg-background px-6 text-foreground transition-transform hover:-translate-y-0.5"
              >
                <span className="text-base font-medium">
                  Schedule a consultation
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </span>
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi%20Ingenious%20Hub%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-14 items-center justify-between gap-6 rounded-full border border-background/20 px-6 transition-colors hover:bg-background/5"
              >
                <span className="text-base font-medium">WhatsApp the studio</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-background/30">
                  <MessageCircle className="h-4 w-4" />
                </span>
              </a>
              <a
                href="mailto:hello@ingenioushub.com"
                className="mt-1 inline-flex items-center gap-2 text-sm text-background/60 hover:text-background"
              >
                <span className="font-mono">→</span>
                hello@ingenioushub.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-background/15 pt-6 text-sm md:mt-24 md:grid-cols-4">
          <Cell label="Studio" value="Jaipur · Worldwide" />
          <Cell label="Hours" value="Mon–Sat · 10am – 7pm IST" />
          <Cell label="Phone" value="+91 99999 99999" />
          <Cell label="Reply window" value="< 4 working hours" />
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-background/50">
        {label}
      </div>
      <div className="mt-1">{value}</div>
    </div>
  );
}
