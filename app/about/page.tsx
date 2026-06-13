import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { Award, Eye, Target } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description: `Learn about the history, mission, and vision of ${SITE_NAME} — committed to ${SITE_TAGLINE}.`,
  path: "/about",
});

const milestones = [
  { year: "1998", event: "Army Public School DHA established with a commitment to high standards." },
  { year: "2005", event: "Expanded facilities to support more students and new programs." },
  { year: "2012", event: "Opened modern science labs and added digital learning tools." },
  { year: "2020", event: "Achieved top results in board exams and co-curricular events." },
  { year: "Today", event: "Continuing our tradition of truth, honor, and academic success." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle={`Discover the story, values, and vision behind ${SITE_NAME}.`}
      />

      <SectionWrapper className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gold">
                Our Story
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                A legacy of leadership and learning
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
                <p>
                  {SITE_NAME} has been a cornerstone of quality education in
                  Defence Housing Authority, Karachi. Rooted in military
                  traditions of discipline and integrity, our school provides a
                  nurturing environment where every child is encouraged to reach
                  their full potential.
                </p>
                <p>
                  From the classroom to the sports field, from science fairs to
                  cultural events, APS DHA fosters holistic development. Our
                  motto — <span className="text-gold">{SITE_TAGLINE}</span> —
                  guides everything we do.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-army/30 to-charcoal-light p-8">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
              <blockquote className="relative text-lg font-medium italic text-white/90">
                &ldquo;Education is not the filling of a pail, but the lighting
                of a fire.&rdquo;
              </blockquote>
              <p className="relative mt-4 text-sm text-gold">— W.B. Yeats</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="border-y border-white/5 bg-charcoal-light/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Purpose
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Mission & Vision
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-white/10 bg-charcoal-light">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-army/50">
                  <Target className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  To provide a comprehensive, values-based education that
                  develops intellectual curiosity, moral character, and civic
                  responsibility — preparing students to excel academically and
                  lead with integrity in an ever-changing world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-charcoal-light">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-army/50">
                  <Eye className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  To be the leading school in DHA, known nationwide for
                  academic success, strong character, and developing
                  responsible students who contribute to their communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-army/50">
              <Award className="h-6 w-6 text-gold" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Our History
            </h2>
          </div>

          <div className="relative space-y-0">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gold/30 sm:left-1/2 sm:-translate-x-px" />
            {milestones.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-6 pb-10 sm:gap-0 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="hidden w-1/2 sm:block" />
                <div className="absolute left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-gold sm:left-1/2" />
                <div
                  className={`ml-10 w-full sm:ml-0 sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"
                  }`}
                >
                  <span className="text-sm font-bold text-gold">{item.year}</span>
                  <p className="mt-1 text-sm text-white/70">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
