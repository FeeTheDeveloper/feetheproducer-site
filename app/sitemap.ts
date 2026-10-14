import type { MetadataRoute } from "next";
import { releases } from "@/lib/data/releases";
import { SITE } from "@/lib/site";
import { merch } from "@/lib/data/merch";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/beats",
    "/streaming",
    "/about",
    "/contact",
    "/licensing",
    "/merch",
    ...merch.map((product) => `/merch/${product.slug}`),
    ...releases.map((release) => `/streaming/${release.slug}`),
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
