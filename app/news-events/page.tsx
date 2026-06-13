import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import NewsListing from "@/components/news/NewsListing";
import { createPageMetadata } from "@/lib/metadata";
import { supabase } from "@/lib/supabase";
import type { NewsEvent } from "@/types/database";

export const metadata: Metadata = createPageMetadata({
  title: "News & Events",
  description:
    "Latest news, announcements, and campus events from Army Public School (APS) Girls & Boys DHA.",
  path: "/news-events",
});

async function fetchAllNews(): Promise<NewsEvent[]> {
  try {
    const { data, error } = await supabase
      .from("news_and_events")
      .select("*")
      .order("date", { ascending: false });

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

export default async function NewsEventsPage() {
  const articles = await fetchAllNews();

  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay connected with the latest announcements, achievements, and campus happenings at APS DHA."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsListing articles={articles} />
        </div>
      </section>
    </>
  );
}
