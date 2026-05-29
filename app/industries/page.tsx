import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { Reveal } from "@/components/motion-reveal";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Categories we've learned to listen to — edtech, D2C, fintech, healthcare, public-good, and B2B SaaS.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <>
      <section className="relative border-b border-border py-20 md:py-28">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Industries — {INDUSTRIES.length} categories
              </p>
            </div>
            <div className="md:col-span-9">
              <Reveal
                as="h1"
                tone="editorial"
                className="text-balance font-display text-d-2 font-light leading-[1.05]"
              >
                Each category has its own{" "}
                <span className="text-gradient-brand font-serif italic">
                  grammar.
                </span>
              </Reveal>
              <p className="mt-7 max-w-2xl text-body-lg text-muted-foreground">
                Trust signals, regulatory edges, buyer psychology — they
                don&rsquo;t translate between industries. The discipline does.
                Detailed essays per industry land on a rolling basis; for now,
                each card opens a coming-soon page with a clear back-link to
                the related work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal as="li" key={ind.slug} i={i} tone="editorial">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="focus-ring group flex h-full flex-col justify-between gap-10 bg-background p-7 transition-colors hover:bg-card md:p-9"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      0{i + 1}
                    </p>
                    <p className="mt-4 font-display text-h-2 font-light leading-tight">
                      {ind.label}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Essay in development
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
