import type { MetadataRoute } from "next";

/**
 * Google will not use a favicon it cannot crawl, and an absent robots.txt
 * leaves that to inference. This states it: everything is allowed, the icons
 * explicitly so, and the sitemap points at the www host Google already indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/favicon.ico", "/icon.svg", "/apple-icon"],
        disallow: ["/style/"],
      },
    ],
    sitemap: "https://www.talentdiary.in/sitemap.xml",
    host: "https://www.talentdiary.in",
  };
}
