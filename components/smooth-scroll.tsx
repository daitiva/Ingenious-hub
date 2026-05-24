"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Page-level smooth scroll. Lighter than GSAP; ~5 kB.
 * Gated by `prefers-reduced-motion` so accessibility users get native scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Gates — any of these disables Lenis and we fall back to native scroll.
    //   • prefers-reduced-motion: accessibility
    //   • touch primary input: mobile Safari and Android both have native
    //     momentum that competes with Lenis and causes janky inertia.
    //   • narrow viewport: pages are short enough on mobile that smoothing
    //     adds nothing while costing battery.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 1024;
    if (reduced || coarsePointer || narrow) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
