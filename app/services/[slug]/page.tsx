import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/services";
import { ComingSoon } from "@/components/coming-soon";

export const dynamic = "force-static";

export function generateStaticParams() {
  return SERVICES.map(({ id }) => ({ slug: id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const s = SERVICES.find((x) => x.id === params.slug);
  if (!s) return {};
  return {
    title: `${s.title} — Service`,
    description: s.description,
    alternates: { canonical: `/services/${s.id}` },
  };
}

export default function ServiceDeepPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = SERVICES.find((x) => x.id === params.slug);
  if (!s) notFound();
  return (
    <ComingSoon
      eyebrow={`Services · ${s.title}`}
      title={s.title}
      note={`${s.description} The deep page covering deliverables, who-it&rsquo;s-for, sample work, and FAQ for this pillar is in writing — published on rolling basis.`}
      backHref="/services"
      backLabel="All services"
    />
  );
}
