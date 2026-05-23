export type Industry = {
  slug: string;
  label: string;
  shortLabel: string;
  blurb: string;
};

export const INDUSTRIES: Industry[] = [
  { slug: "edtech", label: "Education & Edtech", shortLabel: "Edtech", blurb: "We've learned the difference between *edtech-trying-to-look-like-fintech* and edtech that sounds like itself." },
  { slug: "d2c", label: "D2C & Lifestyle", shortLabel: "D2C", blurb: "Heritage labels, new launches, packaging-first identities. We design for the shelf and the scroll." },
  { slug: "fintech", label: "Fintech & Advisory", shortLabel: "Fintech", blurb: "Categories where trust is the product. Identity systems that earn the second look." },
  { slug: "healthcare", label: "Healthcare & Wellness", shortLabel: "Healthcare", blurb: "Clinical, public-facing, community-led. We design for the gravitas the category demands." },
  { slug: "public-good", label: "Public-good & Mission", shortLabel: "Public good", blurb: "Foundations, festivals, edtech for the underserved. We bring the discipline of premium brands to mission work." },
  { slug: "b2b-saas", label: "B2B & SaaS", shortLabel: "B2B / SaaS", blurb: "Products with technical buyers and storytelling problems. We make the case the product can't make alone." },
];
