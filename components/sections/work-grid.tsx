"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WORK } from "@/lib/work";
import { ClientLogo } from "@/components/client-logo";
import { RegistrationCorners } from "@/components/registration-corners";
import { cn } from "@/lib/utils";

/**
 * WorkGrid — Pentagram-shape index of selected work.
 *
 * The page is the grid. No hero, no marketing sections — the work IS
 * the entry experience. Each tile is a large editorial card carrying
 * the brand mark; meta sits beneath, mono and quiet.
 *
 * Layout: single column on mobile, two columns at md+, with mildly
 * varied tile aspect ratios to break the rhythm (matches Pentagram's
 * deliberate density). Tiles alternate aspect 4:5 / 5:4 every other
 * row so the page doesn't feel like a tiled spreadsheet.
 *
 * Drop-in path for real photography (no code change required):
 *   /public/cases/<slug>/cover.{jpg,png}
 * When present, the renderer prefers the photograph; otherwise it
 * falls through to the typographic / placeholder composition via
 * <ClientLogo>. Documented in /public/cases/README.md.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function WorkGrid() {
  return (
    <section
      aria-labelledby="work-grid-heading"
      className="relative border-t border-border"
    >
      {/* Page header — deliberately spare. One line of meta, one title. */}
      <div className="container pb-6 pt-12 md:pb-10 md:pt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Selected work · {WORK.length} projects
            </p>
            <h1
              id="work-grid-heading"
              className="mt-4 font-display text-d-2 font-light tracking-tightest"
            >
              Ingenious Hub
            </h1>
          </div>
          <Link
            href="/about"
            className="focus-ring hidden text-sm font-medium underline-offset-4 hover:underline md:inline-block"
          >
            About
          </Link>
        </div>
      </div>

      {/* The grid */}
      <div className="border-t border-border">
        <ul className="grid grid-cols-1 md:grid-cols-2">
          {WORK.map((w, i) => (
            <WorkTile key={w.slug} project={w} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkTile({
  project,
  index,
}: {
  project: (typeof WORK)[number];
  index: number;
}) {
  // Mildly varied aspect ratios so the grid reads as composed, not tiled.
  // Even-row tiles taller; odd-row tiles wider. The pattern is gentle
  // enough that scanning still feels even.
  const tall = index % 4 === 0 || index % 4 === 3;
  const aspect = tall ? "aspect-[4/5]" : "aspect-[5/4]";

  // CoverImage path convention. When real photography lands at this
  // path, swap the placeholder card for the photograph.
  const [hasCover, setHasCover] = useState(false);
  const coverSrc = `/cases/${project.slug}/cover.jpg`;

  useEffect(() => {
    // Probe for the real cover. HEAD request would be cleaner, but Next's
    // static asset routing serves a 404 HTML for missing files which we'd
    // need to filter. An <Image> onError pattern is simpler at the cost
    // of a single dropped request.
    const img = new Image();
    img.onload = () => setHasCover(true);
    img.onerror = () => setHasCover(false);
    img.src = coverSrc;
  }, [coverSrc]);

  return (
    <li className="group relative border-b border-border md:border-r md:[&:nth-child(even)]:border-r-0">
      <Link
        href={`/work/${project.slug}`}
        className="focus-ring block"
        aria-label={`${project.client} — ${project.title}`}
      >
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE, delay: (index % 4) * 0.05 }}
          className="relative overflow-hidden"
        >
          <div className={cn("relative w-full bg-muted/40", aspect)}>
            {hasCover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverSrc}
                alt={`${project.client} — ${project.title}`}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <PlaceholderCover project={project} />
            )}
          </div>

          {/* Meta strip — sits beneath the tile, generously padded. */}
          <figcaption className="px-6 py-6 md:px-10 md:py-8">
            <div className="flex items-baseline justify-between gap-6">
              <div className="min-w-0">
                <p className="truncate font-display text-h-3 font-light tracking-tight">
                  {project.client}
                </p>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {project.title}
                </p>
              </div>
              <div className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <div>{project.category}</div>
                <div className="mt-1">{project.sector.split("·")[0]?.trim()}</div>
              </div>
            </div>
          </figcaption>
        </motion.figure>
      </Link>
    </li>
  );
}

/**
 * Placeholder cover — used until /public/cases/<slug>/cover.jpg lands.
 * Reuses the registration-card composition from the previous hero.
 */
function PlaceholderCover({ project }: { project: (typeof WORK)[number] }) {
  return (
    <div className="absolute inset-0 bg-background">
      <RegistrationCorners inset="inset-4" />
      <div className="absolute inset-x-12 inset-y-16 flex items-center justify-center">
        <ClientLogo
          name={project.client}
          slug={project.slug}
          className="max-h-[55%] w-auto max-w-full"
          fallback={
            <span className="text-center font-serif text-4xl italic text-foreground/85 md:text-5xl">
              {project.client}
            </span>
          }
        />
      </div>
    </div>
  );
}
