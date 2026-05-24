import { WORK as ROSTER, type CaseStudy } from "@/lib/work";

/**
 * Cinematic case study content for /work/[slug]. Augments the lean roster
 * data in lib/work.ts with long-form essays, gallery slots, and a pull quote.
 *
 * Real photography lands under /public/cases/<slug>/. Until those files exist,
 * the layout uses brand-logo composition + accent gradient as a fallback.
 */

export type CaseDetail = {
  slug: string;
  /** Eyebrow shown above the title — campaign window or edition */
  eyebrow: string;
  /** Long-form problem essay (one paragraph) */
  problemEssay: string;
  /** Strategic thinking — usually two short paragraphs */
  thinkingEssay: string[];
  /** Execution narrative + deliverables list */
  executionEssay: string;
  deliverables: string[];
  /** Impact — measurable + qualitative */
  impactEssay: string;
  metrics: { metric: string; label: string }[];
  /** Pull quote with attribution */
  pullQuote?: { body: string; name: string; role: string };
  /** Optional gallery image slots (relative to /public/cases/<slug>/) */
  gallery?: { filename: string; caption: string }[];
  /** Brand surface — tonal break for the slab */
  tone: "bone" | "ink" | "rust" | "teal";
};

export const CASE_DETAILS: Record<string, CaseDetail> = {
  "allegiance-education": {
    slug: "allegiance-education",
    eyebrow: "Brand re-launch · 2024",
    problemEssay:
      "Allegiance had the strongest faculty in its bracket and the weakest brand. Parents arrived knowing the cohort produced ranks; they left unsure why this was the institute their child should join. Admissions teams were spending the first ten minutes of every conversation undoing first impressions.",
    thinkingEssay: [
      "We argued the wrong audience was being addressed. The student isn't the buyer in test-prep — the parent is. So we shifted the entire brand axis from achievement language to outcome language: cohorts, college pipelines, mentor-to-student ratios, the things a parent is actually scoring you on.",
      "From there, the rebrand designed itself. The wordmark needed to feel institutional, not a coaching-centre. The colour system needed to read as legitimate at scale. The admissions print system needed to do the work the conversation kept failing at.",
    ],
    executionEssay:
      "We led with strategy, then ran the system across every touchpoint a parent meets before signing — wordmark, prospectus, admissions counsellor decks, city-launch playbook. Everything carried the same argument.",
    deliverables: [
      "Brand strategy & positioning brief",
      "Wordmark & identity system",
      "Admissions prospectus (76 pp)",
      "Counsellor sales decks",
      "City-launch operations playbook",
      "Print collateral suite (banners, brochures, danglers)",
    ],
    impactEssay:
      "62% more admissions in the next intake — same faculty, same fee structure, sharper brand. The system rolled into three new cities without a single piece of net-new design.",
    metrics: [
      { metric: "+62%", label: "admissions, next intake" },
      { metric: "3", label: "cities, no redesign" },
      { metric: "10×", label: "counsellor-meeting → close" },
    ],
    pullQuote: {
      body: "They understood our business before designing anything. The results spoke for themselves.",
      name: "Saurabh Sharma",
      role: "Founder, Allegiance Education",
    },
    tone: "bone",
  },

  "tax2win": {
    slug: "tax2win",
    eyebrow: "Filing season · 2024",
    problemEssay:
      "Tax filing is a category where every competitor sells the same things in the same way. Tax2Win had the technology and the CA network; what it didn't have was a coherent argument that compounded across formats. Each ad fought the last ad.",
    thinkingEssay: [
      "We refused to add to the noise. Instead, the season was structured around one promise — Ab ki baar, real CA ke saath — that a Hindi-speaking household could parse on a billboard, in a 6-second reel, and on a landing page without translation.",
      "Once the promise was set, the channels stopped competing. Outdoor created reach; performance created repetition; landing pages caught the converted. The story compounded with each impression instead of resetting.",
    ],
    executionEssay:
      "Synchronised campaign system across OOH, Meta + Google performance, and landing page architecture. One creative language, three pacing modes — billboard, reel, hero-LP.",
    deliverables: [
      "Campaign platform & promise",
      "OOH creative (3 sizes, 8 routes)",
      "Performance ad system (45 creatives, 6 weeks)",
      "Landing page architecture (5 cohorts)",
      "Hindi-first copy system",
    ],
    impactEssay:
      "3.2× lead volume in eight weeks. Blended CAC fell 34% — not because we spent less, but because the creative did more of the work.",
    metrics: [
      { metric: "3.2×", label: "lead volume" },
      { metric: "−34%", label: "blended CAC" },
      { metric: "8 wks", label: "time to result" },
    ],
    pullQuote: {
      body: "First studio we've worked with that talks revenue, not impressions. CAC dropped a third in two months.",
      name: "Aakash V.",
      role: "Growth Lead, Tax2Win",
    },
    tone: "teal",
  },

  "yug-vaastra": {
    slug: "yug-vaastra",
    eyebrow: "Tolaram · since 1950 · launching D2C",
    problemEssay:
      "A 75-year textile lineage launching its first D2C label. The brief on the table called for a 'modern young brand'. We pushed back. The lineage was the moat — Generation 4 launching a label that pretended to be a startup would have squandered it.",
    thinkingEssay: [
      "We designed the wordmark to carry the lineage without antiquing — a circular monogram with breath, a serif that could sit on premium packaging and on a phone-screen swatch.",
      "The packaging system was the proof of seriousness: tissue paper, hangtags, dispatch boxes, retailer collateral — everything signaling that the same family that wholesale-served India for three generations was now selling to her directly.",
    ],
    executionEssay:
      "Full identity system, premium packaging (3 SKUs), retailer dispatch system, and a launch IG content engine. Built day-1 wholesale-ready so the network could move on schedule.",
    deliverables: [
      "Identity system & monogram",
      "Packaging system (3 SKUs, 4 components each)",
      "Retailer hangtag & dispatch collateral",
      "Launch IG content engine (8 weeks)",
      "Founder & catalogue photography direction",
    ],
    impactEssay:
      "Wholesale-ready on day one. Organic IG growth of 48% in launch month — purely off design + content, no paid layer yet.",
    metrics: [
      { metric: "Day-1", label: "wholesale-ready" },
      { metric: "+48%", label: "IG, launch month" },
      { metric: "75 yrs", label: "lineage, intact" },
    ],
    pullQuote: {
      body: "Identity, packaging, launch campaign — they ran it as one team. Felt like an in-house creative wing on day one.",
      name: "Yug Tolaram",
      role: "Director, Yug Vaastra",
    },
    tone: "rust",
  },

  "jaipur-health-festival": {
    slug: "jaipur-health-festival",
    eyebrow: "Inaugural edition · 2023",
    problemEssay:
      "Jaipur had never had a city-scale health festival. There was no precedent for what audiences should expect, no anchor sponsor to lean on, no existing PR relationships. We had to build the brand and the credibility in the same eight weeks.",
    thinkingEssay: [
      "We treated the festival like a publication, not an event. Press relationships first — the cover story before the stage. Once that was secured, the rest of the system (OOH, signage, social) followed one masthead.",
      "Brand restraint was the unlock. A first-edition festival that tries to look established overstates its case. We let the system look quietly authoritative and let the press coverage do the credentialing.",
    ],
    executionEssay:
      "Identity, PR strategy, press outreach, on-ground signage, and social cut-down system. We ran point on partner outreach and provisioned a tier-1 media kit that newsrooms could lift directly.",
    deliverables: [
      "Festival identity & masthead system",
      "Press kit & masthead release",
      "On-ground signage (12 zones)",
      "Stage backdrop & speaker reels",
      "Partner pitch deck",
    ],
    impactEssay:
      "12+ tier-1 features. All inaugural-edition partnership slots sold out. The festival is now a recurring fixture on the city calendar.",
    metrics: [
      { metric: "12+", label: "tier-1 features" },
      { metric: "Sold", label: "first-edition slots" },
      { metric: "Annual", label: "fixture earned" },
    ],
    tone: "ink",
  },

  "unlock-career": {
    slug: "unlock-career",
    eyebrow: "Site rebuild · 2024",
    problemEssay:
      "A templated WordPress site was leaking the right kind of leads. Counsellors were chasing form-submits that never showed up to discovery calls. The problem wasn't traffic; it was the gap between intent and action.",
    thinkingEssay: [
      "We rebuilt the site around a single decision: book the discovery call. Everything else — programmes, mentors, fees — got demoted to inputs that justify the decision.",
      "The booking flow was the design challenge: calendar-led, transparent on price, with an honest 'is this for you?' qualifier built into the funnel.",
    ],
    executionEssay:
      "Custom Next.js build, Cal.com-integrated booking, sharper offer page, conversion-led IA, and a CRO audit baked into the launch sprint.",
    deliverables: [
      "Information architecture",
      "Custom site build (Next.js)",
      "Cal.com booking integration",
      "Programme & mentor pages",
      "Performance audit (LCP, CLS)",
    ],
    impactEssay:
      "Visitor-to-call rate moved from <1% to 5.4%. LCP improved by 1.8 seconds. The team finally stopped chasing dead form-submits.",
    metrics: [
      { metric: "5.4%", label: "visit-to-call" },
      { metric: "−1.8s", label: "LCP improvement" },
      { metric: "Cal.com", label: "booking-led funnel" },
    ],
    tone: "teal",
  },

  "dns-pointers": {
    slug: "dns-pointers",
    eyebrow: "Identity + founder branding · 2024",
    problemEssay:
      "A precise consultancy with a generic brand. DNS Pointers was winning interviews on LinkedIn referrals but losing the room when prospects landed on a brand that looked like a freelancer's portfolio.",
    thinkingEssay: [
      "We treated the founder and the consultancy as one ecosystem. The wordmark needed to carry to a LinkedIn header, an email signature, and an enterprise pitch deck without code-switching.",
      "The target-arrow monogram became the through-line — a quiet, technical mark that pairs with strict typography and a clean LinkedIn-first founder presence.",
    ],
    executionEssay:
      "Identity, founder branding system (LinkedIn header, content templates, pitch deck), email & document templates. Lightweight, durable, ready for the next decade.",
    deliverables: [
      "Wordmark & monogram",
      "LinkedIn founder branding kit",
      "Pitch deck template (Keynote + Google Slides)",
      "Email signature & document system",
    ],
    impactEssay:
      "Two enterprise pilots closed in the launch quarter. The founder's LinkedIn followers grew by 5,700 in 90 days — without paid promotion.",
    metrics: [
      { metric: "2", label: "enterprise pilots closed" },
      { metric: "+5.7k", label: "founder followers / 90d" },
      { metric: "0", label: "paid promotion" },
    ],
    tone: "bone",
  },
};

/** Helper: combined card data + detail for a slug. Returns null if no match. */
export function getCase(slug: string): (CaseStudy & { detail: CaseDetail }) | null {
  const card = ROSTER.find((w) => w.slug === slug);
  const detail = CASE_DETAILS[slug];
  if (!card || !detail) return null;
  return { ...card, detail };
}

export function getAllCaseSlugs(): string[] {
  return Object.keys(CASE_DETAILS);
}

export function getAdjacentCases(slug: string) {
  const slugs = getAllCaseSlugs();
  const idx = slugs.indexOf(slug);
  if (idx < 0) return { prev: null, next: null };
  const prev = slugs[idx - 1] ?? slugs[slugs.length - 1];
  const next = slugs[idx + 1] ?? slugs[0];
  return {
    prev: getCase(prev),
    next: getCase(next),
  };
}
