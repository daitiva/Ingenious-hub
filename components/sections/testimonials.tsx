"use client";

import { motion } from "framer-motion";

const QUOTES = [
  {
    body: "They understood our business before designing anything. The results spoke for themselves.",
    name: "Saurabh Sharma",
    role: "Founder, Allegiance Education",
  },
  {
    body: "First agency we've worked with that talks revenue, not impressions. CAC dropped a third in two months.",
    name: "Aakash V.",
    role: "Growth Lead, Tax2Win",
  },
  {
    body: "Identity, packaging, launch campaign — they ran it as one team. Felt like an in-house creative wing on day one.",
    name: "Yug Tolaram",
    role: "Director, Yug Vaastra",
  },
];

export function Testimonials() {
  return (
    <section className="relative">
      <div className="container py-24 md:py-32">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              What founders say
            </p>
          </div>
          <div className="md:col-span-9">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              Measured by what our clients{" "}
              <span className="font-serif italic text-muted-foreground">
                ship next.
              </span>
            </h2>
          </div>
        </header>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex h-full flex-col justify-between border-t border-border pt-6"
            >
              <span aria-hidden className="font-serif text-5xl leading-none text-teal-500/50">
                &ldquo;
              </span>
              <blockquote className="mt-4 text-pretty text-fluid-lg font-medium leading-snug">
                {q.body}
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    {q.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
