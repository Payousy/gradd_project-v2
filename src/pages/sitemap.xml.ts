export const prerender = true;

const SITE_URL = "https://gradd.sn";

const pages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/qui-sommes-nous", priority: "0.9", changefreq: "monthly" },
  { url: "/domaines-competences", priority: "0.9", changefreq: "monthly" },
  { url: "/methodologie", priority: "0.8", changefreq: "monthly" },
  { url: "/actions", priority: "0.8", changefreq: "weekly" },
  { url: "/ressources", priority: "0.7", changefreq: "monthly" },
  { url: "/actualites", priority: "0.7", changefreq: "weekly" },
  { url: "/contact", priority: "0.8", changefreq: "yearly" },
];

const today = new Date().toISOString().split("T")[0];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=86400",
    },
  });
}
