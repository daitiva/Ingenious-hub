"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { INSIGHTS } from "@/lib/insights";

/**
 * Insights — Section 7 of the homepage.
 *
 * Magazine 3-up: one large featured post left, two smaller stacked
 * right. No "blog cards" with gradients — pure editorial layout, the
 * post titles do the work.
 *
 * Dates are stable (ISO strings in /lib/insights.ts). Routes to /blogs
 * — which is the live ingenioushub.com path; the prior /insights
 * route remains as a 301 redirect so any old links survive.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Insights() {
  // Newest first.
  const sorted = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;
  const secondary = rest.slice(0, 2);

  return (
    <section
      aria-labelledby="insights-heading"
      className="relative border-t border-border bg-muted/30"
    >
      <div className="container py-20 md:py-28">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              06 — Reading
            </p>
          </div>
          <div className="md:col-span-7">
            <h2
              id="insights-heading"
              className="text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest"
            >
              Where the{" "}
              <span className="text-gradient-brand font-serif italic">
                argument
              </span>{" "}
              is written down.
            </h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <Link
              href="/blogs"
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              All writing →
            </Link>
          </div>
        </div>

        {/* 1 featured + 2 stacked — magazine standard */}
        <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-12 md:gap-12">
          {/* Featured */}
          <article className="md:col-span-7">
            <Link
              href={`/blogs/${featured.slug}`}
              className="focus-ring group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {featured.topic} · {formatDate(featured.date)} · {featured.readMins} min read
                </p>
                <h3 className="mt-6 text-balance font-display text-h-1 font-light leading-tight tracking-tightest transition-colors group-hover:text-gradient-brand">
                  {featured.title}
                </h3>
                <p className="mt-5 max-w-2xl text-body-lg text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-block text-sm font-medium underline-offset-4 group-hover:underline">
                  Read essay →
                </span>
              </motion.div>
            </Link>
          </article>

          {/* Two smaller, stacked */}
          <div className="md:col-span-5 md:border-l md:border-border md:pl-12">
            <ul className="grid gap-10">
              {secondary.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="focus-ring group block border-t border-border pt-8 first:border-t-0 first:pt-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.7,
                        ease: EASE,
                        delay: 0.1 + i * 0.08,
                      }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {post.topic} · {formatDate(post.date)}
                      </p>
                      <h4 className="mt-4 text-balance font-display text-h-2 font-light leading-tight">
                        {post.title}
                      </h4>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
