import { SITE_CONFIG } from "@/lib/config";

export const dynamic = "force-dynamic"; // 항상 최신 데이터 반영

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

  //
  // GET /profile/showcase에 res값에 handleName이 생긴다면 추가 예정

  // let page = 0;
  // const size = 20;

  // while (true) {
  //   const res = await fetch(
  //     `${baseUrl}/api/profile/showcase?page=${page}&size=${size}`
  //   );
  //   if (!res.ok) break;

  //   const data = await res.json();
  //   const content = data?.data?.content || [];
  //   const hasNext = data?.data?.hasNext;

  //   urls.push(
  //     ...content
  //       .filter((p: any) => p.status === "PUBLIC")
  //       .map((p: any) => ({
  //         loc: `${baseUrl}/@${p.handleName}`, // handleName 추가되면 변경 해야함
  //         lastmod: p.updatedAt || p.createdAt || new Date().toISOString(),
  //         changefreq: "weekly",
  //         priority: 0.8
  //       }))
  //   );

  //   if (!hasNext) break;
  //   page++;
  // }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600"
    }
  });
}
