export type Insight = {
  slug: string;
  title: string;
  date: string; // ISO
  readMins: number;
  topic: "Design" | "Branding" | "Strategy" | "Marketing";
  excerpt: string;
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
  },
  {
    slug: "creativity-and-the-lower-markets",
    title: "Unleashing creativity in lower markets",
    date: "2023-07-25",
    readMins: 5,
    topic: "Strategy",
    excerpt:
      "Tier-2 and tier-3 audiences don't need louder ads — they need sharper insight. Notes from a year on the road.",
  },
  {
    slug: "designing-and-its-future",
    title: "The current scenario of designing — and what's next.",
    date: "2023-04-11",
    readMins: 7,
    topic: "Design",
    excerpt:
      "From cave painting to interface to ambient computing — design is still the layer where culture and commerce meet.",
  },
  {
    slug: "smart-transitions-in-ux",
    title: "Smart transitions in user experience design",
    date: "2018-07-03",
    readMins: 8,
    topic: "Design",
    excerpt:
      "Why some products feel inevitable while others feel installed. A close read of the micro-interactions that decide.",
  },
];
