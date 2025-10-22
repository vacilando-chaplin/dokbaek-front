import { SITE_CONFIG } from "@/lib/config";
import { fetchPublicProfiles } from "@/lib/utils";
import RSS from "rss";

export const dynamic = "force-dynamic";

export async function GET() {
  const feed = new RSS({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    feed_url: `${SITE_CONFIG.siteUrl}/feed.xml`,
    site_url: SITE_CONFIG.siteUrl,
    language: SITE_CONFIG.language
  });

  const profiles = await fetchPublicProfiles();

  profiles
    .filter((profile) => profile.handleId)
    .forEach((profile) => {
      const displayName =
        profile.name || profile.handleId || `프로필 #${profile.id}`;

      feed.item({
        title: `${profile.name || `프로필 #${profile.id}`} (@${profile.handleId})`,
        description: `${displayName}님의 프로필`,
        url: `${SITE_CONFIG.siteUrl}/@${profile.handleId}`,
        date:
          profile.updatedAt || profile.createdAt || new Date().toISOString(),
        guid: `profile-${profile.id}`,
        enclosure: profile.mainPhotoPath
          ? {
              url: profile.mainPhotoPath,
              type: "image/jpeg"
            }
          : undefined
      });
    });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
