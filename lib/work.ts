export type WorkCategory = "Branding" | "Web" | "Marketing" | "PR";

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  category: WorkCategory;
  title: string;
  summary: string;
  scope: string[];
  result: { metric: string; label: string }[];
  accent: string;
  featured?: boolean;
};

export const WORK: CaseStudy[] = [
  {
    slug: "allegiance-education",
    client: "Allegiance Education",
    sector: "Edtech · Test Prep",
    category: "Branding",
    title: "From local classroom to national-level institute.",
    summary:
      "We repositioned the brand through identity design, messaging, and admissions assets that look the part of a top-tier institute.",
    scope: ["Brand Strategy", "Identity", "Print"],
    result: [
      { metric: "+62%", label: "increase in admissions" },
      { metric: "3 cities", label: "rolled out clean" },
    ],
    accent: "from-amber-400/30 to-teal-500/20",
    featured: true,
  },
  {
    slug: "tax2win",
    client: "Tax2Win",
    sector: "Fintech · Tax Filing",
    category: "Marketing",
    title: "An outdoor + digital campaign that owned filing season.",
    summary:
      "Hindi-first creative for billboards, performance ads, and landing pages, built around one promise: file with a real CA.",
    scope: ["Campaign", "OOH", "Performance"],
    result: [
      { metric: "3.2×", label: "lead volume in 8 weeks" },
      { metric: "−34%", label: "blended CAC" },
    ],
    accent: "from-emerald-400/30 to-teal-500/20",
    featured: true,
  },
  {
    slug: "yug-vaastra",
    client: "Yug Vaastra",
    sector: "D2C · Fashion (Tolaram Group)",
    category: "Branding",
    title: "Fashion. Attitude. Forever.",
    summary:
      "A heritage-meets-modern identity for Tolaram Group's flagship label — circular monogram, premium stationery, and packaging.",
    scope: ["Identity", "Stationery", "Packaging"],
    result: [
      { metric: "Day-1", label: "wholesale-ready brand book" },
      { metric: "+48%", label: "IG growth at launch" },
    ],
    accent: "from-rose-400/30 to-teal-500/20",
    featured: true,
  },
  {
    slug: "unlock-career",
    client: "Unlock Career",
    sector: "Career · Coaching",
    category: "Web",
    title: "A site that books discovery calls on autopilot.",
    summary:
      "Replaced a templated build with a custom Next.js site, sharper offer page, and calendar-led booking flow.",
    scope: ["UI/UX", "Development", "CRO"],
    result: [
      { metric: "5.4%", label: "visitor-to-call rate" },
      { metric: "−1.8s", label: "LCP improvement" },
    ],
    accent: "from-sky-400/30 to-teal-500/20",
  },
  {
    slug: "jaipur-health-festival",
    client: "Jaipur Health Festival",
    sector: "Events · Healthcare",
    category: "PR",
    title: "Owned media that sold out a city-scale festival.",
    summary:
      "Press launch with Dainik Bhaskar and Dainik Jagran, founder bylines, and a unified visual system across stage, OOH, and social.",
    scope: ["PR Strategy", "Press", "Event Identity"],
    result: [
      { metric: "12+", label: "tier-1 features" },
      { metric: "Sold out", label: "first-edition partnerships" },
    ],
    accent: "from-orange-400/30 to-teal-500/20",
  },
  {
    slug: "dns-pointers",
    client: "DNS Pointers",
    sector: "B2B · Consulting",
    category: "Branding",
    title: "A precise mark for a precise consultancy.",
    summary:
      "Wordmark, target-arrow monogram, and LinkedIn-first founder branding that helped close two enterprise pilots.",
    scope: ["Identity", "Founder Branding", "LinkedIn"],
    result: [
      { metric: "2", label: "enterprise pilots closed" },
      { metric: "+5.7k", label: "founder followers in 90 days" },
    ],
    accent: "from-amber-400/30 to-teal-500/20",
  },
];

export const FEATURED_WORK = WORK.filter((w) => w.featured);
