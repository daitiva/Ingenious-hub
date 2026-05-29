import type { MetadataRoute } from "next";
import { getAllCaseSlugs } from "@/lib/cases";

const BASE = "https://ingenioushub.com";

/**
 * Sitemap only lists URLs we want indexed today.
 *
 * Explicitly excluded:
 *   - /services/<slug>    — ComingSoon, marked noindex.
 *   - /blogs/<slug>       — content not yet published.
 *
 * Redirected (excluded so we don't compete with the canonical):
 *   - /insights → /blogs
 *   - /industries → /work
 *
 * As content lands for the new routes, add the relevant slugs back here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,         lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/work`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/process`,  lastModified: now, changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE}/about`,    lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/clients`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blogs`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,  lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];

  const cases: MetadataRoute.Sitemap = getAllCaseSlugs().map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.85,
  }));

  return [...staticPages, ...cases];
}
