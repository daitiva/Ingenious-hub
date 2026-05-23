export type Accreditation = {
  org: string;
  byline: string;
  metric: string;
  metricLabel: string;
  href?: string;
};

export const ACCREDITATIONS: Accreditation[] = [
  {
    org: "DesignRush",
    byline: "Accredited Agency, 2023",
    metric: "Top",
    metricLabel: "Design Agency · India",
    href: "https://www.designrush.com/",
  },
  {
    org: "Clutch",
    byline: "Verified client reviews",
    metric: "5.0★",
    metricLabel: "average client review",
    href: "https://clutch.co/",
  },
  {
    org: "Trustpilot",
    byline: "Independent reputation index",
    metric: "Trusted",
    metricLabel: "across 60+ engagements",
    href: "https://www.trustpilot.com/",
  },
  {
    org: "50Pros",
    byline: "Best in Industry · 2025",
    metric: "Top Firm",
    metricLabel: "Spring 2025 cohort",
    href: "https://50pros.com/",
  },
  {
    org: "Google",
    byline: "Verified studio listing",
    metric: "4.6★",
    metricLabel: "11 reviews",
  },
];
