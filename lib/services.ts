import {
  Sparkles,
  MonitorSmartphone,
  TrendingUp,
  PenTool,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

export type ServicePillar = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  whoItsFor: string;
  outcomeMetric: string;
  icon: LucideIcon;
};

export const SERVICES: ServicePillar[] = [
  {
    id: "branding",
    title: "Branding & Identity",
    tagline: "Build a brand people remember — and trust enough to choose.",
    description:
      "Strategic positioning and a visual identity that earns the price you want to charge.",
    includes: ["Logo", "Visual Identity", "Brand Strategy"],
    whoItsFor:
      "Founders launching, rebranding, or moving upmarket and ready to look the part.",
    outcomeMetric: "Strong positioning + premium perception",
    icon: Sparkles,
  },
  {
    id: "web",
    title: "Website & UI/UX",
    tagline: "Websites designed to convert, not just impress.",
    description:
      "Conversion-led websites and product UI built fast, accessible, and measurable.",
    includes: ["UI/UX", "Web Design", "Development"],
    whoItsFor:
      "Teams whose current site is leaking leads or can't keep up with the brand.",
    outcomeMetric: "Higher engagement + better conversion",
    icon: MonitorSmartphone,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    tagline: "Turn attention into predictable growth.",
    description:
      "Paid acquisition, SEO, and lead funnels engineered around CAC — not vanity metrics.",
    includes: ["SEO", "Paid Ads", "Lead Generation"],
    whoItsFor:
      "Founders who want to grow revenue without scaling guesswork.",
    outcomeMetric: "Consistent inbound pipeline",
    icon: TrendingUp,
  },
  {
    id: "creative",
    title: "Creative & Content",
    tagline: "Content that actually drives action.",
    description:
      "On-brand social, ad creatives, and campaigns shipping weekly — not once a quarter.",
    includes: ["Social Media", "Creatives", "Campaigns"],
    whoItsFor: "Brands that need a creative engine, not another freelancer with a backlog.",
    outcomeMetric: "Higher reach + stronger recall",
    icon: PenTool,
  },
  {
    id: "pr",
    title: "PR & Growth",
    tagline: "Build authority where it matters.",
    description:
      "Founder-led PR and earned media that stack credibility before your buyer says hello.",
    includes: ["PR", "Founder Branding"],
    whoItsFor:
      "Founders raising, hiring, or selling into rooms where reputation enters first.",
    outcomeMetric: "Credibility + visibility",
    icon: Megaphone,
  },
];
