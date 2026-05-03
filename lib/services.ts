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
    tagline: "A brand that is felt, not just seen.",
    description:
      "Strategic positioning, naming systems, and a visual identity that makes your audience choose you on instinct.",
    includes: ["Logo Design", "Brand Strategy", "Visual Identity"],
    whoItsFor:
      "Founders launching a new venture or rebranding an existing one to look the part of where they're headed.",
    outcomeMetric: "Brand recall worth charging more for",
    icon: Sparkles,
  },
  {
    id: "web",
    title: "Website & UI/UX",
    tagline: "Sites that convert, not just impress.",
    description:
      "Conversion-led websites and product UI built on Next.js, Webflow, or WordPress — fast, accessible, measurable.",
    includes: ["Website Design", "UI/UX", "Web Development"],
    whoItsFor:
      "Teams whose current site is leaking leads, looks dated, or can't keep up with the brand.",
    outcomeMetric: "2–4× lift in qualified inbound",
    icon: MonitorSmartphone,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    tagline: "Pipeline you can predict.",
    description:
      "Paid acquisition, SEO, and lead funnels engineered around CAC and lifetime value — not vanity metrics.",
    includes: ["SEO", "Paid Ads (Meta + Google)", "Lead Generation"],
    whoItsFor:
      "Founders who want to grow revenue without scaling guesswork or babysitting freelancers.",
    outcomeMetric: "Lower CAC, sharper attribution",
    icon: TrendingUp,
  },
  {
    id: "creative",
    title: "Creative & Content",
    tagline: "Scroll-stopping creative, on tempo.",
    description:
      "On-brand social, ad creatives, and campaign systems that ship weekly — not once a quarter.",
    includes: ["Social Media", "Ad Creatives", "Campaign Design"],
    whoItsFor:
      "Brands that need a creative engine — not another freelancer with a backlog.",
    outcomeMetric: "+40–80% engagement on average",
    icon: PenTool,
  },
  {
    id: "pr",
    title: "PR & Growth",
    tagline: "Tell the story that gets you trusted.",
    description:
      "Founder-led PR, thought leadership, and earned media that stack credibility before your buyer says hello.",
    includes: ["Public Relations", "Founder Branding"],
    whoItsFor:
      "Founders raising, hiring, or selling into rooms where reputation enters before you do.",
    outcomeMetric: "Tier-1 features and a sharper personal narrative",
    icon: Megaphone,
  },
];
