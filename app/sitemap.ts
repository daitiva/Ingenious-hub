import type { MetadataRoute } from "next";
import { getAllCaseSlugs } from "@/lib/cases";
import { INDUSTRIES } from "@/lib/industries";
import { SERVICES } from "@/lib/services";

const BASE = "https://ingenioushub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,           lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/work`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/process`,    lastModified: now, changeFrequency: "yearly",  priority: 0.8 },
    { url: `${BASE}/insights`,   lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/about`,      lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/clients`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,    lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];

  const cases: MetadataRoute.Sitemap = getAllCaseSlugs().map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.85,
  }));

  const industries: MetadataRoute.Sitemap = INDUSTRIES.map(({ slug }) => ({
    url: `${BASE}/industries/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const services: MetadataRoute.Sitemap = SERVICES.map(({ id }) => ({
    url: `${BASE}/services/${id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...cases, ...industries, ...services];
}
