import { Hero } from "@/components/sections/hero";
import { Thesis } from "@/components/sections/thesis";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ServicesPosture } from "@/components/sections/services-posture";
import { Industries } from "@/components/sections/industries";
import { Proof } from "@/components/sections/proof";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thesis />
      <FeaturedWork />
      <ServicesPosture />
      <Industries />
      <Proof />
      <FinalCTA />
    </>
  );
}
