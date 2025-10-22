import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/oauth", "/create-profile", "/@*/edit", "/likes"]
    },
    sitemap: "https://dokbaek.com/sitemap.xml"
  };
}
