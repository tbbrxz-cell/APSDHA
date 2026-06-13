import PageHero from "@/components/shared/PageHero";
import { NewsListingSkeleton } from "@/components/news/NewsListing";

export default function NewsEventsLoading() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Stay connected with the latest announcements, achievements, and campus happenings at APS DHA."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsListingSkeleton />
        </div>
      </section>
    </>
  );
}
