import type { Metadata } from "next";
import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Insights — the studio's writing",
  description:
    "Editorial notes from the studio on branding, design, and growth. Publishing on rolling basis.",
  alternates: { canonical: "/insights" },
  ...comingSoonMetadata,
};

export default function InsightsIndexPage() {
  return (
    <ComingSoon
      eyebrow="Insights — Editorial"
      title="Notes from inside the practice."
      note="We're slow to publish on purpose. The first set of essays — on positioning, restraint, and the studio's working method — is in editing. Subscribe via email if you'd like the first draft when it goes out."
      backHref="/about"
      backLabel="How we think"
    />
  );
}
