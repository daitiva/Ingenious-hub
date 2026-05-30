export type Insight = {
  slug: string;
  title: string;
  date: string; // ISO
  readMins: number;
  topic: "Design" | "Branding" | "Strategy" | "Marketing";
  excerpt: string;
  /** External href for posts not yet migrated to the new site.
   *  When the CMS migration lands (Phase C), this is dropped and the
   *  post renders at /blogs/<slug> instead. Slugs above match the
   *  WordPress URL exactly so migration is one-to-one.
   */
  externalHref?: string;
};

export const INSIGHTS: Insight[] = [
  {
    slug: "what-qualifies-a-good-design",
    title: "What qualifies a 'good design'?",
    date: "2023-11-04",
    readMins: 6,
    topic: "Design",
    excerpt:
      "Good design is felt before it's analysed. A short field guide to the principles we test our work against.",
    externalHref:
      "https://www.ingenioushub.com/2023/11/04/what-qualifies-a-good-design/",
  },
  {
    slug: "impact-of-lower-markets-on-designers-in-india",
    title: "Impact of lower markets on designers in India",
    date: "2023-07-25",
    readMins: 5,
    topic: "Strategy",
    excerpt:
      "Tier-2 and tier-3 audiences don't need louder ads — they need sharper insight. Notes from a year on the road.",
    externalHref:
      "https://www.ingenioushub.com/2023/07/25/impact-of-lower-markets-on-designers-in-india/",
  },
  {
    slug: "current-scenario-of-designing-its-future",
    title: "The current scenario of designing — and what's next.",
    date: "2023-04-11",
    readMins: 7,
    topic: "Design",
    excerpt:
      "From cave painting to interface to ambient computing — design is still the layer where culture and commerce meet.",
    externalHref:
      "https://www.ingenioushub.com/2023/04/11/current-scenario-of-designing-its-future/",
  },
  {
    slug: "smart-transitions-in-user-experience-design",
    title: "Smart transitions in user experience design",
    date: "2018-07-03",
    readMins: 8,
    topic: "Design",
    excerpt:
      "Why some products feel inevitable while others feel installed. A close read of the micro-interactions that decide.",
    externalHref:
      "https://www.ingenioushub.com/2018/07/03/smart-transitions-in-user-experience-design/",
  },
];
