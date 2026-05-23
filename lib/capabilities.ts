/**
 * Capabilities — surfaces the studio's full disciplinary range.
 * Lives independently from the 5 packaged service pillars on /services
 * because the homepage Capabilities section is about breadth + posture,
 * while /services is about purchaseable scopes.
 */

export type Capability = {
  id: string;
  label: string;
  byline: string; // single line, max 8 words
};

export const CAPABILITIES: Capability[] = [
  { id: "branding", label: "Branding", byline: "Identity systems built to be remembered." },
  { id: "advertising", label: "Advertising", byline: "Campaigns that earn attention, not buy it." },
  { id: "marketing", label: "Marketing", byline: "Pipeline you can predict." },
  { id: "pr", label: "Public Relations", byline: "Reputation that arrives before you do." },
  { id: "digital", label: "Digital", byline: "Web, product, and platforms that ship." },
  { id: "strategy", label: "Strategy", byline: "Positioning, narrative, and the bet that compounds." },
  { id: "uiux", label: "UI / UX", byline: "Interfaces designed to convert." },
  { id: "campaigns", label: "Campaigns", byline: "Stories that scale across channels." },
  { id: "creative-direction", label: "Creative Direction", byline: "A studio mind on every brief." },
];
