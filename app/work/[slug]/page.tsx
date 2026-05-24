import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getCase, getAllCaseSlugs, getAdjacentCases } from "@/lib/cases";
import { ClientLogo } from "@/components/client-logo";
import { Reveal } from "@/components/motion-reveal";
import { RegistrationCorners } from "@/components/registration-corners";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const work = getCase(params.slug);
  if (!work) return {};
  return {
    title: `${work.client} — ${work.title}`,
    description: work.detail.problemEssay.slice(0, 160),
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: {
      title: `${work.client} — ${work.title}`,
      description: work.detail.impactEssay,
      type: "article",
    },
  };
}

const TONE_BG: Record<string, string> = {
  bone: "bg-bone dark:bg-muted/30",
  ink: "bg-ink text-bone dark:bg-foreground/95 dark:text-background",
  rust: "bg-rust-500/10 dark:bg-rust-500/15",
  teal: "bg-teal-600/[0.06] dark:bg-teal-600/[0.12]",
};

export default function CasePage({ params }: { params: { slug: string } }) {
  const work = getCase(params.slug);
  if (!work) notFound();
  const { detail } = work;
  const { prev, next } = getAdjacentCases(work.slug);
  const inverted = detail.tone === "ink";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${work.client} — ${work.title}`,
    about: work.sector,
    creator: { "@type": "Organization", name: "Ingenious Hub" },
    description: detail.problemEssay,
    url: `https://ingenioushub.com/work/${work.slug}`,
  };

  return (
    <article className="relative">
      {/* HERO — registration card composition */}
      <header className={cn("relative border-b border-border", TONE_BG[detail.tone])}>
        <div className="container py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <p
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.22em]",
                  inverted ? "text-bone/60" : "text-muted-foreground"
                )}
              >
                {work.client} · {work.sector}
              </p>
              <h1 className="mt-4 text-balance font-display text-d-2 font-light">
                {work.title}
              </h1>
              <p
                className={cn(
                  "mt-6 max-w-xl text-body-lg",
                  inverted ? "text-bone/80" : "text-muted-foreground"
                )}
              >
                {detail.eyebrow}
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-2xl border border-hairline bg-background/95">
                <RegistrationCorners />

                <div className="absolute inset-x-12 inset-y-14 flex items-center justify-center">
                  <ClientLogo
                    name={work.client}
                    slug={work.slug}
                    className="max-h-[60%] w-auto max-w-full"
                    fallback={
                      <span className="text-center font-serif text-5xl italic text-foreground/85">
                        {work.client}
                      </span>
                    }
                  />
                </div>

                <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 divide-x divide-hairline border-t border-hairline pt-4">
                  {detail.metrics.map((m) => (
                    <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                      <div className="font-display text-h-3 font-light tabular-nums">
                        {m.metric}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-20">
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All work
            </Link>
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <Section eyebrow="01 — Problem">
        <Reveal as="p" className="text-balance font-display text-h-2 font-light leading-snug">
          {detail.problemEssay}
        </Reveal>
      </Section>

      {/* THINKING */}
      <Section eyebrow="02 — Thinking" tone="bone">
        <div className="space-y-6 text-body-lg text-foreground/90">
          {detail.thinkingEssay.map((para, i) => (
            <Reveal as="p" key={i} i={i} tone="quiet">
              {para}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EXECUTION */}
      <Section eyebrow="03 — Execution">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <Reveal as="p" className="text-body-lg text-foreground/90">
              {detail.executionEssay}
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Deliverables
              </p>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {detail.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-baseline gap-3 py-3 text-sm md:text-base"
                  >
                    <span aria-hidden className="font-mono text-[10px] text-muted-foreground">
                      ✦
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* IMPACT — inverted slab */}
      <section className="relative border-y border-foreground/40 bg-ink py-20 text-bone md:py-28">
        <div className="container">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">
            04 — Impact
          </p>
          <Reveal
            as="p"
            tone="editorial"
            className="mt-6 max-w-3xl text-balance font-display text-h-1 font-light text-bone"
          >
            {detail.impactEssay}
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-y-8 border-t border-bone/15 pt-10 sm:grid-cols-3">
            {detail.metrics.map((m) => (
              <li key={m.label}>
                <div className="font-display text-d-2 font-light leading-none tabular-nums">
                  {m.metric}
                </div>
                <div className="mt-3 max-w-[180px] text-xs text-bone/55">
                  {m.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PULL QUOTE */}
      {detail.pullQuote && (
        <Section>
          <figure className="mx-auto max-w-3xl text-center">
            <Reveal as="div" tone="editorial">
              <blockquote className="font-display text-h-1 font-light leading-[1.1]">
                <span className="font-serif italic text-teal-600 dark:text-teal-300">“</span>
                {detail.pullQuote.body}
                <span className="font-serif italic text-teal-600 dark:text-teal-300">”</span>
              </blockquote>
              <figcaption className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                — {detail.pullQuote.name}, {detail.pullQuote.role}
              </figcaption>
            </Reveal>
          </figure>
        </Section>
      )}

      {/* PREV / NEXT */}
      <nav
        aria-label="More case studies"
        className="relative border-t border-border"
      >
        <ul className="grid grid-cols-1 divide-y divide-border border-t border-transparent md:grid-cols-2 md:divide-x md:divide-y-0">
          {prev && (
            <li>
              <Link
                href={`/work/${prev.slug}`}
                className="focus-ring group flex h-full flex-col gap-3 p-8 transition-colors hover:bg-muted/40 md:p-12"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="font-display text-h-3 font-light">{prev.client}</span>
                <span className="text-sm text-muted-foreground">{prev.title}</span>
              </Link>
            </li>
          )}
          {next && (
            <li>
              <Link
                href={`/work/${next.slug}`}
                className="focus-ring group flex h-full flex-col gap-3 p-8 transition-colors hover:bg-muted/40 md:items-end md:p-12 md:text-right"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Next
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-display text-h-3 font-light">{next.client}</span>
                <span className="text-sm text-muted-foreground">{next.title}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* SOFT CTA */}
      <section className="relative border-t border-border py-20 md:py-28">
        <div className="container text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Next
          </p>
          <h2 className="mt-4 text-balance font-display text-d-2 font-light">
            Have a brief like{" "}
            <span className="font-serif italic text-teal-600 dark:text-teal-300">
              {work.client}&rsquo;s?
            </span>
          </h2>
          <Link
            href="/contact"
            className="focus-ring group mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}

function Section({
  eyebrow,
  children,
  tone,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  tone?: "bone";
}) {
  return (
    <section
      className={cn(
        "relative border-t border-border py-20 md:py-28",
        tone === "bone" && "bg-bone/40 dark:bg-muted/20"
      )}
    >
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {eyebrow && (
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {eyebrow}
              </p>
            </div>
          )}
          <div className={cn(eyebrow ? "md:col-span-9" : "md:col-span-12")}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
