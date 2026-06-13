import { supabase } from "@/lib/supabase";
import type { NewsEvent } from "@/types/database";
import NewsPreview from "./NewsPreview";

async function fetchLatestNews(): Promise<NewsEvent[]> {
  try {
    const { data, error } = await supabase
      .from("news_and_events")
      .select("*")
      .order("date", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Failed to fetch news:", error.message);
      return [];
    }

    return (data as NewsEvent[]) ?? [];
  } catch (err) {
    console.error("Failed to fetch news:", err);
    return [];
  }
}

export default async function NewsPreviewSection() {
  const articles = await fetchLatestNews();
  return <NewsPreview articles={articles} />;
}
