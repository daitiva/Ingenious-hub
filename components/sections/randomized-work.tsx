"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Shuffle } from "lucide-react";
import { WORK, type CaseStudy } from "@/lib/work";
import { cn } from "@/lib/utils";

/* Fisher-Yates with a seed-stable first paint to avoid hydration warnings */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function RandomizedWork() {
  // Deterministic on SSR; randomized after mount
  const [tiles, setTiles] = React.useState<CaseStudy[]>(WORK);
  const [seed, setSeed] = React.useState(0);

  React.useEffect(() => {
    setTiles(shuffle(WORK));
  }, [seed]);

  return (
    <section id="work" className="relative">
      <div className="container pb-10 pt-20 md:pb-12 md:pt-28">
        <header className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Selected work
            </p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              Order shuffles every visit — like the studio.
            </p>
          </div>
          <div className="md:col-span-6">
            <h2 className="text-balance font-semibold text-fluid-4xl leading-[1.05] tracking-tightest md:text-fluid-5xl">
              A living{" "}
              <span className="font-serif italic text-muted-foreground">
                portfolio.
              </span>
            </h2>
          </div>
          <div className="md:col-span-2 md:text-right">
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="group inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              <Shuffle className="h-4 w-4 transition-transform group-hover:rotate-90" />
              Reshuffle
            </button>
          </div>
        </header>
      </div>

      <div className="container">
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:grid-cols-6 xl:auto-rows-[220px]">
          {tiles.map((w, i) => (
            <Tile key={`${seed}-${w.slug}`} w={w} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm font-medium hover:border-teal-500/50"
          >
            View the full archive
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tile({ w, index }: { w: CaseStudy; index: number }) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  // Pseudo-random tile spans driven by index + tile size, so layout
  // looks editorial without any single tile being huge on small screens.
  const span = (() => {
    if (w.tile === "lg") return "col-span-2 row-span-2 lg:col-span-3 lg:row-span-2";
    if (w.tile === "md") return "col-span-2 lg:col-span-2";
    return "col-span-1 lg:col-span-2";
  })();

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <Link
      ref={ref}
      href="/work"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border",
        span
      )}
    >
      {/* Tile artwork — programmatic editorial composition */}
      <TileArt w={w} index={index} />

      {/* Permanent meta */}
      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
        {w.category}
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 bg-foreground/85 text-background"
      >
        <motion.div
          animate={{
            x: pos.x,
            y: pos.y,
          }}
          transition={{ type: "tween", duration: 0.18, ease: "linear" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 px-3"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-background/70">
            {w.client}
          </div>
          <div className="mt-1 text-balance text-base font-medium leading-tight md:text-lg">
            {w.title}
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs">
            View case <ArrowUpRight className="h-3 w-3" />
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

function TileArt({ w, index }: { w: CaseStudy; index: number }) {
  // Pick a deterministic-but-varied background gradient from the project's accent
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br",
        w.accent || "from-stone-300/40 to-teal-400/30"
      )}
    >
      {/* Treatments — alternate by index for editorial variety */}
      {index % 4 === 0 && (
        <div className="absolute inset-0 grid place-items-center px-3 text-center">
          <span className="font-serif text-3xl italic leading-none text-foreground/85 md:text-5xl">
            {w.client.split(" ")[0]}
          </span>
        </div>
      )}
      {index % 4 === 1 && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-semibold leading-none tracking-tightest text-foreground/85 text-[clamp(2.4rem,8vw,5rem)]">
            {w.result?.[0]?.metric ?? "↗"}
          </span>
        </div>
      )}
      {index % 4 === 2 && (
        <div className="absolute inset-x-3 bottom-3 top-3 flex flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
            {String(index + 1).padStart(2, "0")} ·{" "}
            {w.scope?.[0] ?? w.category}
          </span>
          <span className="text-balance font-medium leading-tight text-foreground/90 text-fluid-base">
            {w.client}
          </span>
        </div>
      )}
      {index % 4 === 3 && (
        <>
          <div className="absolute -right-6 -top-6 h-20 w-20 rotate-12 rounded-md bg-foreground/15" />
          <div className="absolute inset-x-3 bottom-3 font-serif text-xl italic leading-none text-foreground/85 md:text-2xl">
            {w.client}
          </div>
        </>
      )}
    </div>
  );
}
