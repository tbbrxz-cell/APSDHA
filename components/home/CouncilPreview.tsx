"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CouncilMember } from "@/types/database";

interface CouncilPreviewProps {
  members: CouncilMember[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function CouncilPreviewSkeleton() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mb-2 h-4 w-32" />
        <Skeleton className="mb-8 h-8 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CouncilPreview({ members }: CouncilPreviewProps) {
  return (
    <SectionWrapper className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Leadership
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              School Council
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/60 sm:text-base">
              Meet the student leaders who represent and serve our school
              community with dedication and integrity.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/council">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-16 text-center">
            <Users className="mb-3 h-10 w-10 text-white/30" />
            <p className="text-sm text-body-muted">
              No cap — council leaders will appear here soon. Stay tuned 👀
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {members.map((member) => (
              <motion.div key={member.id} variants={item}>
                <Card className="group overflow-hidden border-white/10 transition-all hover:-translate-y-1 hover:border-gold/20 hover:shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-army/20">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Users className="h-12 w-12 text-white/20" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-white">{member.name}</h3>
                      <Badge variant="gold" className="shrink-0">
                        {member.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
