import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCase, getAllCaseSlugs, getAdjacentCases } from "@/lib/cases";
import { ClientLogo } from "@/components/client-logo";
import { Reveal } from "@/components/motion-reveal";
import { RegistrationCorners } from "@/components/registration-corners";

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

/**
 * Case study — Pentagram-shape scrolling sequence.
 *
 * The page is a long, single-column vertical scroll alternating image
 * panels with short caption blocks. No metric-grid hero, no impact
 * slab, no eyebrow rituals — the work and a thin layer of editorial
 * copy carry the page.
 *
 * Drop-in path for real photography (no code change required):
 *   /public/cases/<slug>/cover.jpg     ← top panel
 *   /public/cases/<slug>/gallery-01.jpg ← mid panel #1
 *   /public/cases/<slug>/gallery-02.jpg ← mid panel #2
 *   /public/cases/<slug>/gallery-03.jpg ← closing panel
 * Until the files land, each panel renders the typographic placeholder
 * composition (RegistrationCorners + brand mark).
 */
export default function CasePage({ params }: { params: { slug: string } }) {
  const work = getCase(params.slug);
  if (!work) notFound();
  const { detail } = work;
  const { next } = getAdjacentCases(work.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `https://ingenioushub.com/work/${work.slug}#case`,
      name: `${work.client} — ${work.title}`,
      headline: work.title,
      about: work.sector,
      creator: { "@id": "https://ingenioushub.com#organization" },
      publisher: { "@id": "https://ingenioushub.com#organization" },
      description: detail.problemEssay,
      url: `https://ingenioushub.com/work/${work.slug}`,
      inLanguage: "en-IN",
      keywords: [work.category, work.sector, work.client].join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://ingenioushub.com/" },
        { "@type": "ListItem", position: 2, name: "Work", item: "https://ingenioushub.com/work" },
        { "@type": "ListItem", position: 3, name: work.client, item: `https://ingenioushub.com/work/${work.slug}` },
      ],
    },
  ];

  // Two-paragraph thinking essay → break into separate body blocks
  // between panels so the page alternates image-text-image-text.
  const thinking = detail.thinkingEssay;

  return (
    <article className="relative">
      {/* TITLE BLOCK — quiet, minimal, no eyebrow ritual */}
      <header className="border-b border-border">
        <div className="container py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {work.client} — {work.sector}
          </p>
          <h1 className="mt-6 max-w-4xl text-balance font-display text-d-1 font-light leading-[0.95] tracking-tightest">
            {work.title}
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-muted-foreground">
            {detail.eyebrow}
          </p>
        </div>
      </header>

      {/* PANEL 1 — cover */}
      <CasePanel slug={work.slug} name={work.client} />

      {/* COPY — problem */}
      <CaseCopy>
        <p className="text-balance font-display text-h-2 font-light leading-snug">
          {detail.problemEssay}
        </p>
      </CaseCopy>

      {/* PANEL 2 */}
      <CasePanel slug={work.slug} name={work.client} variant="wide" />

      {/* COPY — thinking */}
      <CaseCopy>
        <div className="space-y-6 text-body-lg text-foreground/90">
          {thinking.map((para, i) => (
            <Reveal as="p" key={i} i={i} tone="quiet">
              {para}
            </Reveal>
          ))}
        </div>
      </CaseCopy>

      {/* PANEL 3 */}
      <CasePanel slug={work.slug} name={work.client} />

      {/* COPY — execution */}
      <CaseCopy>
        <p className="text-body-lg text-foreground/90">{detail.executionEssay}</p>
        <ul className="mt-12 grid grid-cols-1 gap-1 text-sm md:grid-cols-2 md:gap-x-10">
          {detail.deliverables.map((d) => (
            <li key={d} className="flex items-baseline gap-3 border-b border-border py-3 last:border-b-0">
              <span aria-hidden className="font-mono text-[10px] text-muted-foreground">✦</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </CaseCopy>

      {/* PANEL 4 */}
      <CasePanel slug={work.slug} name={work.client} variant="wide" />

      {/* PULL QUOTE — single editorial moment */}
      {detail.pullQuote && (
        <section className="border-t border-border">
          <div className="container py-24 md:py-32">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="font-display text-h-1 font-light leading-[1.1]">
                <span className="text-gradient-brand font-serif">&ldquo;</span>
                {detail.pullQuote.body}
                <span className="text-gradient-brand font-serif">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                — {detail.pullQuote.name}, {detail.pullQuote.role}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* CLOSING IMPACT — one sentence, no slab */}
      <section className="border-t border-border">
        <div className="container py-20 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Impact
          </p>
          <p className="mt-6 max-w-3xl text-balance font-display text-h-1 font-light">
            {detail.impactEssay}
          </p>
        </div>
      </section>

      {/* NEXT PROJECT — tiny, single link, no card chrome */}
      {next && (
        <nav aria-label="Next project" className="border-t border-border">
          <Link
            href={`/work/${next.slug}`}
            className="focus-ring group block py-16 transition-colors hover:bg-muted/30 md:py-24"
          >
            <div className="container flex items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Next project
                </p>
                <p className="mt-3 font-display text-h-1 font-light leading-tight">
                  {next.client}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{next.title}</p>
              </div>
              <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 md:h-8 md:w-8" />
            </div>
          </Link>
        </nav>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}

/**
 * A single panel in the scrolling sequence.
 *
 * `wide` variant uses 16:9; default is 4:5 (vertical phone-shot
 * proportion which suits brand artefacts photographed on a desk).
 *
 * Today: renders the typographic placeholder (RegistrationCorners +
 * brand mark via ClientLogo). When the studio drops real photography
 * at /public/cases/<slug>/<file>.jpg, replace this function with a
 * straight <Image> render against that path — no other surgery needed.
 */
function CasePanel({
  slug,
  name,
  variant = "tall",
}: {
  slug: string;
  name: string;
  variant?: "tall" | "wide";
}) {
  const aspect = variant === "wide" ? "aspect-[16/9]" : "aspect-[4/5]";

  return (
    <section className="relative border-t border-border bg-muted/30">
      <div className="container py-12 md:py-20">
        <div className={`relative mx-auto w-full max-w-5xl ${aspect} overflow-hidden bg-background`}>
          <RegistrationCorners inset="inset-4" />
          <div className="absolute inset-x-12 inset-y-16 flex items-center justify-center">
            <ClientLogo
              name={name}
              slug={slug}
              className="max-h-[55%] w-auto max-w-full"
              fallback={
                <span className="text-center font-serif text-5xl text-foreground/80">
                  {name}
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Caption block between panels. Narrow column, generous vertical
 * rhythm. Body text only — no eyebrows, no labels.
 */
function CaseCopy({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-border">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </section>
  );
}
