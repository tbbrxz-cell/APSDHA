import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";
import {
  Beaker,
  BookOpen,
  Building2,
  Computer,
  Dumbbell,
  Library,
  Microscope,
  Palette,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Academics",
  description:
    "Explore the curriculum, grade levels, and world-class facilities at Army Public School (APS) Girls & Boys DHA.",
  path: "/academics",
});

const gradeLevels = [
  {
    level: "Primary (Class I–V)",
    description:
      "Foundation years focused on literacy, numeracy, creativity, and social skills in a caring environment.",
  },
  {
    level: "Middle (Class VI–VIII)",
    description:
      "Broadening horizons with subject specialization, critical thinking, and introduction to co-curricular activities.",
  },
  {
    level: "Secondary (Class IX–X)",
    description:
      "Rigorous preparation for board examinations with emphasis on conceptual understanding and exam technique.",
  },
  {
    level: "Higher Secondary (Class XI–XII)",
    description:
      "Advanced studies in Science, Commerce, and Humanities streams with career counseling and university prep.",
  },
];

const facilities = [
  { icon: Library, name: "Library", detail: "Extensive collection of books and digital resources" },
  { icon: Microscope, name: "Science Labs", detail: "Fully equipped physics, chemistry, and biology labs" },
  { icon: Computer, name: "Computer Labs", detail: "Modern ICT facilities with high-speed connectivity" },
  { icon: Beaker, name: "STEM Programs", detail: "Robotics, coding, and science fair initiatives" },
  { icon: Dumbbell, name: "Sports Complex", detail: "Cricket, football, basketball, and athletics facilities" },
  { icon: Palette, name: "Arts & Culture", detail: "Music, fine arts, and drama studios" },
  { icon: Building2, name: "Auditorium", detail: "500-seat hall for assemblies and performances" },
  { icon: BookOpen, name: "Smart Classrooms", detail: "Interactive boards and multimedia learning tools" },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics"
        subtitle="A challenging, well-rounded curriculum designed to provide a high standard of learning at every grade level."
      />

      <SectionWrapper className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Curriculum
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Curriculum Overview
            </h2>
            <p className="mt-3 text-sm text-white/60 sm:text-base">
              APS DHA follows the national curriculum framework aligned with
              Federal Board standards, enriched with co-curricular programs,
              character education, and 21st-century skills development.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "English, Urdu, Mathematics, and Science at all levels",
              "Islamiyat, Pakistan Studies, and Social Studies",
              "Computer Science and Information Technology",
              "Physical Education, Arts, and Music",
              "Character building and leadership programs",
              "Regular assessments and parent-teacher engagement",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-charcoal-light/60 p-4"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <p className="text-sm text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="border-y border-white/5 bg-charcoal-light/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Grade Levels
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Learning Pathways
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {gradeLevels.map((grade) => (
              <Card key={grade.level} className="border-white/10">
                <CardHeader>
                  <CardTitle className="text-gold">{grade.level}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-white/70">{grade.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Campus
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Facilities
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => (
              <Card
                key={facility.name}
                className="border-white/10 transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-army/50">
                    <facility.icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-semibold text-white">{facility.name}</h3>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    {facility.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
