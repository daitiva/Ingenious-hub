import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/clients/_unverified-archive/",
        ],
      },
    ],
    sitemap: "https://ingenioushub.com/sitemap.xml",
    host: "https://ingenioushub.com",
  };
}
