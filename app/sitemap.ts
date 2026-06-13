import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

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

  // Only try to fetch news if we have valid Supabase env vars
  const hasSupabaseVars =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0;

  if (hasSupabaseVars) {
    try {
      // Use dynamic import only when needed
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("news_and_events")
        .select("slug, created_at, date")
        .order("date", { ascending: false });

      if (!error && data) {
        const newsEntries = data.map((article) => ({
          url: `${SITE_URL}/news-events/${article.slug}`,
          lastModified: new Date(article.created_at ?? article.date),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
        return [...staticEntries, ...newsEntries];
      }
    } catch (err) {
      console.error("Failed to fetch news slugs for sitemap:", err);
    }
  }

  // Default: return only static entries
  return staticEntries;
}
