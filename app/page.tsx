import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Manifesto } from "@/components/sections/manifesto";
import { ServicesEditorial } from "@/components/sections/services-editorial";
import { FeaturedCases } from "@/components/sections/featured-cases";
import { Metrics } from "@/components/sections/metrics";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { GlobalReach } from "@/components/sections/global";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Manifesto />
      <ServicesEditorial />
      <FeaturedCases />
      <Metrics />
      <Process />
      <Testimonials />
      <GlobalReach />
      <FinalCTA />
    </>
  );
}
