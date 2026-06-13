import PageHero from "@/components/shared/PageHero";
import { CouncilGridSkeleton } from "@/components/council/CouncilGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function CouncilLoading() {
  return (
    <>
      <PageHero title="School Council" subtitle="Loading council members..." />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-lg" />
            ))}
          </div>
          <CouncilGridSkeleton count={8} />
        </div>
      </section>
    </>
  );
}
