"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const QUOTES = [
  {
    body: "They got our positioning right in week one. The new identity made our admissions calls 60% smoother — parents arrive already trusting us.",
    name: "Saurabh Sharma",
    role: "Founder, Allegiance Education",
  },
  {
    body: "First agency we've worked with that talks revenue, not impressions. Our blended CAC dropped a third in two months.",
    name: "Aakash V.",
    role: "Growth Lead, Tax2Win",
  },
  {
    body: "From identity to packaging to the launch campaign — they ran it as one team. Felt like an in-house creative wing on day one.",
    name: "Yug Tolaram",
    role: "Director, Yug Vaastra",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-border bg-muted/20 py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            What founders say
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            We&rsquo;re measured by{" "}
            <span className="font-serif italic">what our clients ship</span> next.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7"
            >
              <Quote className="h-6 w-6 text-teal-500/60" />
              <blockquote className="mt-5 text-pretty text-base leading-relaxed text-foreground">
                &ldquo;{q.body}&rdquo;
              </blockquote>
              <figcaption className="mt-7 border-t border-border pt-4">
                <div className="text-sm font-semibold tracking-tight">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
