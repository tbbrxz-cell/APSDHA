import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { supabase } from "@/lib/supabase";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/council", changeFrequency: "weekly", priority: 0.8 },
  { path: "/news-events", changeFrequency: "daily", priority: 0.9 },
  { path: "/academics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/admissions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  let newsEntries: MetadataRoute.Sitemap = [];

  try {
    const { data, error } = await supabase
      .from("news_and_events")
      .select("slug, created_at, date")
      .order("date", { ascending: false });

    if (!error && data) {
      newsEntries = data.map((article) => ({
        url: `${SITE_URL}/news-events/${article.slug}`,
        lastModified: new Date(article.created_at ?? article.date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch news slugs for sitemap:", err);
  }

  return [...staticEntries, ...newsEntries];
}
