import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionWrapper from "@/components/shared/SectionWrapper";
import GalleryContent from "@/components/gallery/GalleryContent";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Browse photos and moments from Army Public School (APS) Girls & Boys DHA — assemblies, sports, labs, and campus life.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A look at life on campus — capturing assemblies, sports, labs, and student achievements."
      />

      <SectionWrapper className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryContent />
        </div>
      </SectionWrapper>
    </>
  );
}
