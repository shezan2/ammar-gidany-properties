import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";
import { neighbourhoods } from "@/lib/neighbourhoods";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/properties", "/valuation", "/calculators", "/about", "/neighbourhoods", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return [
    ...staticPages,
    ...properties.map((p) => ({
      url: `${site.url}/properties/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...neighbourhoods.map((n) => ({
      url: `${site.url}/neighbourhoods/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
