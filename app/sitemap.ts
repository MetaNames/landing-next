import { MetadataRoute } from "next";

import { config } from "@/lib/config";

const SECTIONS = ["features", "recent", "generator", "sdk"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: config.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SECTIONS.map((section) => ({
      url: `${config.siteUrl}/#${section}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
