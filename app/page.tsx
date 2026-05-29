import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { WorkGrid } from "@/components/sections/work-grid";
import { FeaturedCase } from "@/components/sections/featured-case";
import { Proof } from "@/components/sections/proof";
import { ClientsWall } from "@/components/sections/clients-wall";
import { Insights } from "@/components/sections/insights";
import { FinalCTA } from "@/components/sections/final-cta";

/**
 * Homepage — 8-section experience flow.
 *
 *  1. Hero               — full-bleed brand wash + thesis statement
 *  2. Capabilities       — nine disciplines as an editorial list
 *  3. WorkGrid           — randomised selected work (shuffles per session)
 *  4. FeaturedCase       — one immersive case (Allegiance) embedded
 *  5. Proof              — accreditation wall + two testimonials
 *  6. ClientsWall        — 86-brand roster with sector filters
 *  7. Insights           — magazine 3-up of recent writing
 *  8. FinalCTA           — closing brand-wash with two CTAs
 *
 * Each section is a leaf component in /components/sections so the
 * homepage stays composable. Order matters and is referenced by the
 * section eyebrows (01, 02, 03, …) — don't reorder without updating
 * those.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <WorkGrid />
      <FeaturedCase />
      <Proof />
      <ClientsWall />
      <Insights />
      <FinalCTA />
    </>
  );
}
