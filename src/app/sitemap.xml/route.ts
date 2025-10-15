import { SITE_CONFIG } from "@/lib/config";
import { fetchPublicProfiles } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = SITE_CONFIG.siteUrl;

  const staticPaths = ["", "login", "profiles"];
  const urls: {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: number;
  }[] = [];

  urls.push(
    ...staticPaths.map((path) => ({
      loc: `${baseUrl}/${path}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: path === "" ? 1.0 : 0.7
    }))
  );

  const profiles = await fetchPublicProfiles();

  urls.push(
    ...profiles.map((profile) => ({
      loc: `${baseUrl}/@${profile.handleId}`,
      lastmod:
        profile.updatedAt || profile.createdAt || new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8
    }))
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
