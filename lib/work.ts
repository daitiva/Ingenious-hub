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
    title: "A challenger identity for a serious-test-prep brand",
    summary:
      "Repositioned from a classroom to a national brand — wordmark, color system, and admissions collateral that look the part of a top-tier institute.",
    scope: ["Brand Strategy", "Logo & Wordmark", "Print Collateral"],
    result: [
      { metric: "+62%", label: "admission inquiries (Q1 vs Q4)" },
      { metric: "3 cities", label: "rolled out without a redesign" },
    ],
    accent: "from-amber-400/30 to-teal-500/20",
    featured: true,
  },
  {
    slug: "tax2win",
    client: "Tax2Win",
    sector: "Fintech · Tax Filing",
    category: "Marketing",
    title: "Outdoor + digital campaign that owned filing season",
    summary:
      "Hindi-first creative system for billboards, performance ads, and landing pages, built around a single promise: file with a real CA.",
    scope: ["Campaign Design", "Outdoor Creative", "Performance Ads"],
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
    scope: ["Identity System", "Stationery", "Packaging"],
    result: [
      { metric: "Day-1", label: "wholesale-ready brand book" },
      { metric: "+48%", label: "organic IG growth in launch month" },
    ],
    accent: "from-rose-400/30 to-teal-500/20",
    featured: true,
  },
  {
    slug: "unlock-career",
    client: "Unlock Career",
    sector: "Career · Coaching",
    category: "Web",
    title: "A conversion-first site that books discovery calls on autopilot",
    summary:
      "Replaced a templated WordPress build with a custom Next.js site, sharper offer page, and a calendar-led booking flow.",
    scope: ["UI/UX", "Web Development", "CRO"],
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
    title: "Owned media that sold out a city-scale festival",
    summary:
      "Press-led launch with Dainik Bhaskar and Dainik Jagran, founder bylines, and a unified visual system across stage, OOH, and social.",
    scope: ["PR Strategy", "Press Outreach", "Event Identity"],
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
    title: "A precise mark for a precise consultancy",
    summary:
      "Wordmark, target-arrow monogram, and Linkedin-first founder branding system that helped close two enterprise pilots.",
    scope: ["Brand Identity", "Founder Branding", "LinkedIn System"],
    result: [
      { metric: "2", label: "enterprise pilots closed" },
      { metric: "+5.7k", label: "founder followers in 90 days" },
    ],
    accent: "from-amber-400/30 to-teal-500/20",
  },
];

export const FEATURED_WORK = WORK.filter((w) => w.featured);
