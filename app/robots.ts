import type { MetadataRoute } from "next";

// @todo, generate
export default function robots(): MetadataRoute.Robots {
  return {
    host: "https://brianpatrickkemper.com",
    rules: [
      {
        allow: "/",
        userAgent: ["*"],
      },
    ],
    sitemap: "https://brianpatrickkemper.com/sitemap.xml",
  };
}
