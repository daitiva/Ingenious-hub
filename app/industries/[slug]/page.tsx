import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/industries";
import { ComingSoon } from "@/components/coming-soon";

export const dynamic = "force-static";

export function generateStaticParams() {
  return INDUSTRIES.map(({ slug }) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const ind = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!ind) return {};
  return {
    title: `${ind.label} — Industry`,
    description: `How Ingenious Hub thinks about ${ind.label.toLowerCase()} brands.`,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!ind) notFound();
  return (
    <ComingSoon
      eyebrow={`Industries · ${ind.shortLabel}`}
      title={ind.label}
      note={`${ind.blurb} The dedicated essay for this industry is being written — until then, the selected work tells most of the story.`}
      backHref="/work"
      backLabel="See related work"
    />
  );
}
