"use client";

import {
  BookOpen,
  Globe,
  Heart,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { StaggerGrid, StaggerItem } from "@/components/shared/StaggerGrid";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Discipline & Character",
    description:
      "Military-inspired values instil responsibility, respect, and resilience in every student.",
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description:
      "Rigorous curriculum and dedicated faculty ensure outstanding board results year after year.",
  },
  {
    icon: Users,
    title: "Inclusive Community",
    description:
      "A vibrant, diverse student body united by shared goals and school spirit.",
  },
  {
    icon: Trophy,
    title: "Co-curricular Success",
    description:
      "Championships in sports, debates, science fairs, and cultural competitions.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "Programs and activities that prepare students for an interconnected world.",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description:
      "Nurturing mind, body, and spirit through academics, athletics, and the arts.",
  },
];

export default function FeaturesSection() {
  return (
    <SectionWrapper className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-light">
            Why APS DHA
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Why Choose APS DHA
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-caption sm:text-base">
            Discover what sets Army Public School apart — a tradition of
            excellence rooted in truth, honor, and service.
          </p>
        </div>

        <StaggerGrid className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Card className="card-interactive h-full border-white/10 bg-charcoal-light/60">
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-army/50">
                    <feature.icon className="h-5 w-5 text-gold-light" />
                  </div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-body-muted">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </SectionWrapper>
  );
}
