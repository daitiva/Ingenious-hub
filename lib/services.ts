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
    tagline: "Brands people remember.",
    description:
      "Strategic positioning and a visual identity that earns the price you want to charge.",
    includes: ["Logo", "Visual Identity", "Brand Strategy"],
    whoItsFor:
      "Founders launching, rebranding, or moving upmarket.",
    outcomeMetric: "Premium perception",
    icon: Sparkles,
  },
  {
    id: "web",
    title: "Website & UI/UX",
    tagline: "Sites built to convert.",
    description:
      "Conversion-led websites and product UI — fast, accessible, measurable.",
    includes: ["UI/UX", "Web Design", "Development"],
    whoItsFor:
      "Teams whose current site is leaking leads.",
    outcomeMetric: "Better conversion",
    icon: MonitorSmartphone,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    tagline: "Predictable growth, not vanity.",
    description:
      "Paid, SEO, and lead funnels engineered around CAC.",
    includes: ["SEO", "Paid Ads", "Lead Gen"],
    whoItsFor:
      "Founders scaling revenue, not guesswork.",
    outcomeMetric: "Consistent pipeline",
    icon: TrendingUp,
  },
  {
    id: "creative",
    title: "Creative & Content",
    tagline: "Content that earns action.",
    description:
      "Social, ad creatives, and campaigns shipping weekly — not quarterly.",
    includes: ["Social", "Creatives", "Campaigns"],
    whoItsFor: "Brands that need a creative engine, not another freelancer.",
    outcomeMetric: "Reach + recall",
    icon: PenTool,
  },
  {
    id: "pr",
    title: "PR & Growth",
    tagline: "Authority where it matters.",
    description:
      "Founder-led PR and earned media that stack credibility before the buyer says hello.",
    includes: ["PR", "Founder Branding"],
    whoItsFor:
      "Founders raising, hiring, or selling.",
    outcomeMetric: "Credibility + visibility",
    icon: Megaphone,
  },
];
