import type { MetadataRoute } from "next";

const SITE = "https://www.talentdiary.in";

/**
 * A sitemap is the fastest honest way to ask Google to recrawl the home page,
 * which is the only page whose favicon it reads.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/jobs", priority: 0.9, freq: "daily" as const },
    { path: "/diaries", priority: 0.7, freq: "weekly" as const },
    { path: "/coaching", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.6, freq: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
