import type { MetadataRoute } from "next";

/**
 * Crawl policy for ingenioushub.com.
 *
 * Reading guide:
 *   1. SEARCH ENGINES (Google, Bing, DuckDuckGo) — explicitly welcomed. They
 *      drive 95% of organic traffic and have to crawl to rank us.
 *   2. SEARCH-ORIENTED AI (Perplexity, ChatGPT real-time, Anthropic real-time)
 *      — allowed. When a prospect asks an AI "best branding studio in Jaipur"
 *      we want the studio surfaced from a live read of the site, not stale
 *      training data.
 *   3. TRAINING CRAWLERS (GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider,
 *      Amazonbot) — disallowed by default. The studio's writing, case copy,
 *      and brand voice are commercial assets; we don't license them for model
 *      training. To flip any of these, move the agent block from the
 *      `disallowed` list to the `allowed` list below.
 *
 * Path policy:
 *   - /api/                          server endpoints, never indexed.
 *   - /clients/_unverified-archive/  unmatched assets, never indexed.
 *   - /industries/* (slug pages)     ComingSoon — handled via per-page
 *                                    noindex meta, not blocked here so
 *                                    visitors who follow a link still see
 *                                    a real page.
 *   - /services/[slug], /insights    same.
 *
 * Sitemap exposure: the sitemap URL is published for search engines.
 * It only lists production-ready URLs (see app/sitemap.ts) — ComingSoon
 * routes and the archive are excluded. AI training agents don't get the
 * sitemap line at all because their User-Agent blocks short-circuit the
 * rule before reaching it.
 */

const SHARED_DISALLOW = [
  "/api/",
  "/clients/_unverified-archive/",
];

// AI agents that crawl for model training. Blocked from the public site.
const TRAINING_BOTS = [
  "GPTBot",          // OpenAI training crawler
  "ClaudeBot",       // Anthropic training crawler
  "anthropic-ai",    // Anthropic (alternate UA)
  "Google-Extended", // Google's training crawler — separate from Googlebot
  "CCBot",           // Common Crawl — feeds many model training sets
  "Bytespider",      // ByteDance training crawler
  "Amazonbot",       // Amazon training-oriented crawler
  "Diffbot",         // Generic scrape-and-feed
  "FacebookBot",     // Meta training-oriented crawler
  "Applebot-Extended", // Apple's AI training crawler (separate from Applebot)
  "PerplexityBot",   // Perplexity training (real-time agent is PerplexityBot/User)
  "Omgilibot",       // Common Crawl–adjacent
  "YouBot",          // You.com training
  "AhrefsBot",       // SEO scraper, often misclassified — disallow to save bandwidth
  "SemrushBot",      // SEO scraper, same reason
];

// AI agents that fetch a single URL in response to a user's real-time query.
// Allowing these means when someone asks an AI about the studio, the agent
// can read the live page. None of these train on what they fetch.
const ALLOWED_AI_AGENTS = [
  "ChatGPT-User",      // Real-time browsing inside ChatGPT
  "Claude-User",       // Real-time fetch inside Claude apps
  "Perplexity-User",   // Real-time fetch inside Perplexity
  "OAI-SearchBot",     // OpenAI search index (separate from training)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — every UA not specifically listed below gets these rules.
      // Friendly to search engines, restrictive on paths.
      {
        userAgent: "*",
        allow: "/",
        disallow: SHARED_DISALLOW,
      },

      // Explicit allows for real-time AI agents — same path policy as above.
      ...ALLOWED_AI_AGENTS.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: SHARED_DISALLOW,
      })),

      // Explicit blocks for training crawlers. They get a hard `Disallow: /`.
      ...TRAINING_BOTS.map((ua) => ({
        userAgent: ua,
        disallow: "/",
      })),
    ],
    sitemap: "https://ingenioushub.com/sitemap.xml",
    host: "https://ingenioushub.com",
  };
}
