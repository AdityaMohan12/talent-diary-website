import type { MetadataRoute } from "next";
import { ROLES } from "@/lib/roles";

const SITE = "https://talentdiary.in";

/**
 * A sitemap is the fastest honest way to ask Google to recrawl the home page,
 * which is the only page whose favicon it reads.
 *
 * Job pages are generated from the same source the routes are, so a new role
 * appears here the moment it is added rather than waiting for someone to
 * remember. For a recruiting site those are the pages worth indexing: they
 * carry the actual searchable content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    // Trailing slash so this matches the canonical exactly and Google is not
    // left normalising two spellings of the same URL.
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/diaries`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/coaching`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const roles: MetadataRoute.Sitemap = ROLES.map((r) => ({
    url: `${SITE}/jobs/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...pages, ...roles];
}
