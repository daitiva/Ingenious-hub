"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { WORK } from "@/lib/work";
import { ClientLogo } from "@/components/client-logo";
import { RegistrationCorners } from "@/components/registration-corners";
import { shuffleStable, getSessionSeed } from "@/lib/shuffle";
import { cn } from "@/lib/utils";

/**
 * WorkGrid — Section 3 of the homepage. Selected work, randomised.
 *
 * The studio's identity feature: order shuffles between sessions, so
 * a returning visitor never lands on the same wall twice. Within a
 * session the order is stable (no re-shuffle on re-render).
 *
 * Layout is asymmetric — matches Ogilvy's varied-tile grid rather
 * than a uniform spreadsheet. Tile heights pull from a deterministic
 * pattern keyed off the visual index, so the grid composition stays
 * coherent across shuffles.
 *
 * Drop-in path for real photography (no code change required):
 *   /public/cases/<slug>/cover.{jpg,png}
 * The probe in <WorkTile> picks up the file on hydration.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
// Show every project on the homepage — the studio's call.
// The shuffle still rotates per session so the order feels alive.
// Mobile gets a "Show more" pager below MOBILE_INITIAL to keep the
// fold tight.
const MOBILE_INITIAL = 6;

// Aspect rhythm — index N gets aspect TILE_ASPECTS[N % len]. Pre-tuned
// to feel composed at any shuffle: tall / wide / tall / square / wide …
const TILE_ASPECTS = [
  "aspect-[4/5]",  // tall
  "aspect-[5/4]",  // wide
  "aspect-[3/4]",  // taller
  "aspect-[1/1]",  // square
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[5/4]",
];

export function WorkGrid() {
  const [seed, setSeed] = useState(1);
  const [showAllMobile, setShowAllMobile] = useState(false);
  useEffect(() => {
    setSeed(getSessionSeed());
  }, []);

  // Shuffle every project stably per session — preserves the studio's
  // randomised-on-refresh identity feature without picking favourites.
  const projects = useMemo(() => shuffleStable(WORK, seed), [seed]);

  return (
    <section
      aria-labelledby="work-heading"
      className="relative border-t border-border"
    >
      <div className="container py-20 md:py-28">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              02 — Selected work
            </p>
          </div>
          <div className="md:col-span-7">
            <h2
              id="work-heading"
              className="text-balance font-display text-d-2 font-light leading-[1.04] tracking-tightest"
            >
              Brands that argued for{" "}
              <span className="font-serif text-gradient-brand">
                something specific
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              All work →
            </Link>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <WorkTile
            key={project.slug}
            project={project}
            index={i}
            hiddenOnMobile={!showAllMobile && i >= MOBILE_INITIAL}
          />
        ))}
      </ul>

      {/* Mobile "Show more" — only appears when there are still hidden
          projects below the initial slice. md+ shows everything. */}
      {!showAllMobile && projects.length > MOBILE_INITIAL && (
        <div className="container mt-10 flex flex-col items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setShowAllMobile(true)}
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium transition-colors hover:border-foreground"
          >
            Show more ({projects.length - MOBILE_INITIAL} more)
          </button>
          <Link
            href="/work"
            className="focus-ring text-sm font-medium underline-offset-4 hover:underline"
          >
            All work →
          </Link>
        </div>
      )}
    </section>
  );
}

function WorkTile({
  project,
  index,
  hiddenOnMobile,
}: {
  project: (typeof WORK)[number];
  index: number;
  hiddenOnMobile: boolean;
}) {
  const aspect = TILE_ASPECTS[index % TILE_ASPECTS.length];
  const [hasCover, setHasCover] = useState(false);
  const coverSrc = `/cases/${project.slug}/cover.jpg`;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasCover(true);
    img.onerror = () => setHasCover(false);
    img.src = coverSrc;
  }, [coverSrc]);

  return (
    <li className={cn("group relative bg-background", hiddenOnMobile && "hidden sm:block")}>
      <Link
        href={`/work/${project.slug}`}
        className="focus-ring block"
        aria-label={`${project.client} — ${project.title}`}
      >
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.05 }}
          className="relative"
        >
          <div className={cn("relative w-full overflow-hidden bg-muted/40", aspect)}>
            {hasCover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverSrc}
                alt={`${project.client} — ${project.title}`}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <PlaceholderCover project={project} />
            )}

            {/* Hover veil with category + 'View case' pill */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-7">
              <div className="flex items-end justify-between gap-4">
                <div className="text-white">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
                    {project.category} · {project.sector.split("·")[0]?.trim()}
                  </p>
                  <p className="mt-2 font-display text-h-3 font-light leading-tight">
                    {project.title}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-white/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                  View case
                </span>
              </div>
            </div>
          </div>

          {/* Meta sits below the tile, quiet */}
          <figcaption className="flex items-baseline justify-between gap-6 px-5 py-5 md:px-6 md:py-6">
            <div className="min-w-0">
              <p className="truncate font-display text-h-3 font-light tracking-tight">
                {project.client}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {project.sector.split("·")[0]?.trim()}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {project.category}
            </span>
          </figcaption>
        </motion.figure>
      </Link>
    </li>
  );
}

function PlaceholderCover({ project }: { project: (typeof WORK)[number] }) {
  return (
    <div className="absolute inset-0 bg-background">
      <RegistrationCorners inset="inset-4" />
      <div className="absolute inset-x-10 inset-y-12 flex items-center justify-center">
        <ClientLogo
          name={project.client}
          slug={project.slug}
          className="max-h-[55%] w-auto max-w-full"
          fallback={
            <span className="text-center font-serif text-3xl text-foreground/85 md:text-4xl">
              {project.client}
            </span>
          }
        />
      </div>
    </div>
  );
}
