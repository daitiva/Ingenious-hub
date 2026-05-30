import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { INSIGHTS, type Insight } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Blogs — the studio's writing",
  description:
    "Editorial notes from Ingenious Hub on branding, design, strategy, and growth. Essays on the practice — what makes a good design, how lower markets are reshaping creativity in India, where design is going next.",
  alternates: { canonical: "/blogs" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * /blogs — editorial index of every essay published by the studio.
 *
 * Until the CMS migration lands (Phase C / Sanity), posts link out to
 * their live WordPress URLs. The slugs in lib/insights.ts already
 * match the WordPress paths, so when migration happens, dropping
 * `externalHref` from each entry is the only change — the routes
 * /blogs/<slug> take over without touching this index.
 */
export default function BlogsIndexPage() {
  const sorted = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      {/* HEADER */}
      <section className="relative border-b border-border bg-gradient-wash py-20 md:py-28">
        <div className="container">
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Writing — the practice on record
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest">
                Where the{" "}
                <span className="text-gradient-brand font-serif italic">
                  argument
                </span>{" "}
                is written down.
              </h1>
              <p className="mt-8 max-w-2xl text-body-lg text-muted-foreground">
                Essays from inside the practice — on design, strategy, lower
                markets, and what shifts when you take coherence seriously.
                We publish slowly, on purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIST — full-width editorial entries, hairline-separated */}
      <section className="relative">
        <ul className="divide-y divide-border border-b border-border">
          {sorted.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>

        {/* Closing note about Phase C */}
        <div className="container py-16 md:py-24">
          <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
            More essays in editing. Subscribe at{" "}
            <a
              href="mailto:hello@ingenioushub.com"
              className="focus-ring underline-offset-4 hover:underline"
            >
              hello@ingenioushub.com
            </a>{" "}
            if you&rsquo;d like the next one when it goes out.
          </p>
        </div>
      </section>
    </>
  );
}

function PostRow({ post }: { post: Insight }) {
  const external = Boolean(post.externalHref);
  const href = post.externalHref ?? `/blogs/${post.slug}`;

  const inner = (
    <article className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
      {/* Meta column */}
      <div className="md:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {post.topic} · {formatDate(post.date)}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          {post.readMins} min read
        </p>
      </div>

      {/* Title + excerpt column */}
      <div className="md:col-span-9">
        <h2 className="text-balance font-display text-h-1 font-light leading-tight tracking-tightest">
          {post.title}
        </h2>
        <p className="mt-4 max-w-3xl text-body-lg text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 group-hover:underline">
          Read essay
          {external && (
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          )}
        </p>
      </div>
    </article>
  );

  return (
    <li className="group transition-colors hover:bg-muted/30">
      <div className="container">
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring block"
            aria-label={`${post.title} (opens in a new tab)`}
          >
            {inner}
          </a>
        ) : (
          <Link href={href} className="focus-ring block">
            {inner}
          </Link>
        )}
      </div>
    </li>
  );
}
