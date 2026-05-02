import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

const PATHS = ["", "/beats", "/releases", "/licensing", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: path === "/beats" || path === "/releases" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
