import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionWrapper from "@/components/shared/SectionWrapper";
import AdmissionsTimeline from "@/components/admissions/AdmissionsTimeline";
import InquiryForm from "@/components/admissions/InquiryForm";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Admissions",
  description:
    "Apply to Army Public School (APS) Girls & Boys DHA. View the admissions process, eligibility requirements, and submit an inquiry.",
  path: "/admissions",
});

const eligibility = [
  "Age-appropriate for the grade level applied (as per school policy)",
  "Successful completion of previous grade with passing marks",
  "Valid birth certificate and school leaving certificate (if applicable)",
  "Medical fitness certificate from a registered practitioner",
  "Parent/guardian CNIC and recent passport-size photographs",
  "Completion of entrance assessment and interview process",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Join the APS DHA community — where we combine discipline with strong academic standards to help every student succeed."
      />

      <SectionWrapper className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
              How to Apply
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-syne">
              Admissions Process
            </h2>
            <p className="mt-4 text-base text-zinc-500 sm:text-lg leading-relaxed font-inter">
              Follow these steps to enroll your child at Army Public School
              Girls & Boys DHA. Our admissions team is here to guide you at
              every stage.
            </p>
          </div>

          <AdmissionsTimeline />
        </div>
      </SectionWrapper>

      <SectionWrapper className="border-y border-white/5 bg-[#030305]/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
                Requirements
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-syne">
                Eligibility
              </h2>
              <p className="mt-4 text-base text-zinc-500 font-inter leading-relaxed">
                Applicants must meet the following criteria. Additional
                requirements may apply for specific grade levels.
              </p>

              <ul className="mt-8 space-y-4">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-500/50" />
                    <span className="text-sm text-zinc-400 font-inter leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bento-card border-white/5">
              <CardContent className="p-6 sm:p-10">
                <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
                  Get in Touch
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white font-syne tracking-tight">
                  Inquiry Form
                </h3>
                <p className="mt-3 text-sm text-zinc-500 font-inter leading-relaxed mb-8">
                  Submit your details and our admissions office will respond
                  within 2–3 working days.
                </p>
                <InquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
