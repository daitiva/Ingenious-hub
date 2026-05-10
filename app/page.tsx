import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { RandomizedWork } from "@/components/sections/randomized-work";
import { FeaturedCases } from "@/components/sections/featured-cases";
import { Accreditations } from "@/components/sections/accreditations";
import { ClientEcosystem } from "@/components/sections/client-ecosystem";
import { Insights } from "@/components/sections/insights";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <RandomizedWork />
      <FeaturedCases />
      <Accreditations />
      <ClientEcosystem />
      <Insights />
      <FinalCTA />
    </>
  );
}
