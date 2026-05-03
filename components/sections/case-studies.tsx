"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_WORK } from "@/lib/work";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  return (
    <section className="border-t border-border bg-muted/20 py-20 md:py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Selected work
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Work that{" "}
              <span className="font-serif italic">delivers results.</span>
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/work">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
          {FEATURED_WORK.map((w, i) => (
            <motion.article
              key={w.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-30px_rgba(13,148,136,0.45)]"
            >
              <div
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br",
                  w.accent
                )}
              >
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-serif text-5xl italic text-foreground/80 md:text-6xl">
                    {w.client.split(" ")[0]}
                  </span>
                </div>
                <div className="absolute left-3 top-3 inline-flex items-center rounded-full border border-foreground/10 bg-background/70 px-2.5 py-1 text-xs backdrop-blur">
                  {w.category}
                </div>
                <div className="absolute bottom-3 right-3 grid grid-cols-2 gap-2">
                  {w.result.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-lg border border-foreground/10 bg-background/80 px-2.5 py-1.5 text-right backdrop-blur"
                    >
                      <div className="text-xs font-semibold tracking-tight">
                        {r.metric}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {w.client} · {w.sector}
                </p>
                <h3 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">
                  {w.title}
                </h3>
                <p className="text-sm text-muted-foreground">{w.summary}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-sm">
                  <span className="text-muted-foreground">{w.scope.join(" · ")}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-teal-600 dark:text-teal-400">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
