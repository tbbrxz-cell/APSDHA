"use client";

import { GraduationCap, Home, Calendar, Users } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { StaggerGrid, StaggerItem } from "@/components/shared/StaggerGrid";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: GraduationCap,
    value: "2,500+",
    label: "Students",
    description: "Bright minds across all grade levels",
    hint: undefined,
  },
  {
    icon: Users,
    value: "150+",
    label: "Staff",
    description: "Dedicated educators and mentors",
    hint: undefined,
  },
  {
    icon: Calendar,
    value: "25+",
    label: "Years of Service",
    description: "A long history of academic success",
    hint: undefined,
  },
  {
    icon: Home,
    value: "4",
    label: "Houses",
    description: "Spirit, competition, and teamwork",
    hint: undefined,
  },
];

export default function StatsSection() {
  return (
    <SectionWrapper className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-light">
            About at a Glance
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Building futures with purpose
          </h2>
          <p className="mt-3 text-caption sm:text-base">
            Army Public School Girls & Boys DHA stands as a beacon of quality
            education, combining military discipline with modern pedagogy to
            shape well-rounded citizens.
          </p>
        </div>

        <StaggerGrid className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <Card
                title={stat.hint}
                className="card-interactive h-full border-white/10 bg-charcoal-light/80"
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-army/50">
                    <stat.icon className="h-5 w-5 text-gold-light" />
                  </div>
                  <p className="text-2xl font-bold text-gold-light sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-medium text-white">{stat.label}</p>
                  <p className="mt-2 text-xs text-body-muted sm:text-sm">
                    {stat.description}
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
