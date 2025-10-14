import { SITE_CONFIG } from "@/lib/config";
import RSS from "rss";

export const dynamic = "force-dynamic"; // 항상 최신 데이터 반영

export async function GET() {
  const feed = new RSS({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    feed_url: `${SITE_CONFIG.siteUrl}/feed.xml`,
    site_url: SITE_CONFIG.siteUrl,
    language: SITE_CONFIG.language
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600"
    }
  });
}
