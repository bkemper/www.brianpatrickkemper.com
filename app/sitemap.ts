import type { MetadataRoute } from "next";

// @todo, generate the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 1,
      url: "https://brianpatrickkemper.com/",
    },
  ];
}
