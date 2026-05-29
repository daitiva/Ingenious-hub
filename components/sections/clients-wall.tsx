import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CLIENTS } from "@/lib/clients";
import { ClientLogo } from "@/components/client-logo";
import { Reveal } from "@/components/motion-reveal";

/**
 * ClientsWall — editorial trust strip for the homepage.
 *
 * Treatment: a 6-column grid of monochrome marks at consistent dimensions.
 * Each cell holds either a verified asset or a tasteful typographic
 * placeholder. Hover reveals colour. No marquee, no auto-scroll, no
 * "100+ clients" energy — just a curated reading of who's on the list.
 */
export function ClientsWall() {
  // Hand-curated headline list. Order is editorial, not alphabetical.
  // These are the most recognisable + emblematic engagements; the full
  // 86-strong list lives on /clients.
  const headlineSlugs = [
    "Allegiance Education",
    "Tax2Win",
    "Yug Vaastra",
    "Jaipur Health Festival",
    "Tolaram Group",
    "Unlock Career",
    "DNS Pointers",
    "CRM Pointers",
    "WooCom Pro",
    "MasterChef Rajasthan",
    "Reliable Media",
    "Apex Bank Co-op",
    "Trueline Technologies",
    "PureEarth",
    "Brands Inc.",
    "Wealth Wisdom Consultants",
    "Tagore Engineering College",
    "Anand Niketan Group of Schools",
  ];

  const headline = headlineSlugs
    .map((name) => CLIENTS.find((c) => c.name === name))
    .filter((c): c is (typeof CLIENTS)[number] => Boolean(c));

  return (
    <section
      aria-labelledby="trust-heading"
      className="relative border-t border-border py-20 md:py-28"
    >
      <div className="container">
        {/* Header — editorial split */}
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                003 — Selected clients
              </p>
              <h2
                id="trust-heading"
                className="mt-4 text-balance font-display text-h-1 font-light leading-[1.1]"
              >
                {CLIENTS.length}+ organisations have asked us to{" "}
                <span className="text-gradient-brand font-serif italic">
                  argue their case.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <Reveal>
              <p className="text-body text-muted-foreground">
                A reading of the list — startups, public-good missions, family
                enterprises, and one of India&rsquo;s largest textile houses.
                The full roster lives on the{" "}
                <Link
                  href="/clients"
                  className="focus-ring underline-offset-4 hover:underline"
                >
                  clients page
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>

        {/* The wall — 6 cols on lg, 3 on md, 2 on mobile */}
        <ul
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/80 md:mt-20 md:grid-cols-3 lg:grid-cols-6"
          aria-label="Selected clients"
        >
          {headline.map((c, i) => (
            <Reveal
              as="li"
              key={c.name}
              i={Math.min(i, 8)}
              tone={i < 6 ? "quiet" : "quiet"}
              className="bg-background"
            >
              <div className="group relative flex aspect-[4/3] items-center justify-center p-5 transition-colors hover:bg-card md:p-7">
                <div className="flex h-full max-h-16 w-full max-w-[150px] items-center justify-center md:max-h-20">
                  <ClientLogo
                    name={c.name}
                    tone="mono"
                    className="transition-[filter,opacity] duration-500"
                  />
                </div>
                {/* Category reveal — only on hover, no clutter */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {c.category}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Footer link */}
        <Reveal>
          <div className="mt-10 flex items-center justify-between gap-6 border-t border-border pt-6 md:mt-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {CLIENTS.length}+ engagements · 6 industries
            </p>
            <Link
              href="/clients"
              className="focus-ring group inline-flex items-center gap-2 text-sm font-medium"
            >
              <span className="underline-offset-4 group-hover:underline">
                Read the full list
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
