import type { Metadata } from "next";
import { ComingSoon, comingSoonMetadata } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Blogs — the studio's writing",
  description:
    "Editorial notes from Ingenious Hub on branding, design, strategy, and growth. Publishing on a rolling basis.",
  alternates: { canonical: "/blogs" },
  ...comingSoonMetadata,
};

/**
 * /blogs — index page. Replaces /insights to match live ingenioushub.com
 * nav structure. Old /insights URLs redirect via next.config.mjs.
 *
 * Currently a ComingSoon shell — the homepage Insights section pulls
 * post metadata from /lib/insights.ts; this page becomes the full
 * list once the launch essays are drafted (Phase C).
 */
export default function BlogsIndexPage() {
  return (
    <ComingSoon
      eyebrow="Blogs — Editorial"
      title="Notes from inside the practice."
      note="We're slow to publish on purpose. The first set of essays — on positioning, restraint, and the studio's working method — is in editing. Subscribe via email if you'd like the first draft when it goes out."
      backHref="/about"
      backLabel="How we think"
    />
  );
}
