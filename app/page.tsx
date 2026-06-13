import { Suspense } from "react";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import { CouncilPreviewSkeleton } from "@/components/home/CouncilPreview";
import CouncilPreviewSection from "@/components/home/CouncilPreviewSection";
import { NewsPreviewSkeleton } from "@/components/home/NewsPreview";
import NewsPreviewSection from "@/components/home/NewsPreviewSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: SITE_NAME,
  description: `${SITE_DESCRIPTION} ${SITE_TAGLINE}.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <Suspense fallback={<CouncilPreviewSkeleton />}>
        <CouncilPreviewSection />
      </Suspense>
      <Suspense fallback={<NewsPreviewSkeleton />}>
        <NewsPreviewSection />
      </Suspense>
      <FeaturesSection />
      <CTASection />
    </>
  );
}
