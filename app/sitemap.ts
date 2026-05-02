import type { MetadataRoute } from "next";

import { BEATS } from "@/lib/data/beats";
import { SITE } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/beats",
  "/releases",
  "/licensing",
  "/about",
  "/contact"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency:
      path === "/beats" || path === "/releases"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority: path === "" ? 1 : 0.7
  }));

  const beatEntries = BEATS.map((beat) => ({
    url: `${SITE.url}/beats/${beat.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...staticEntries, ...beatEntries];
}
