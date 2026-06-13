"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Newspaper } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsEvent } from "@/types/database";

interface NewsPreviewProps {
  articles: NewsEvent[];
}

export function NewsPreviewSkeleton() {
  return (
    <section className="bg-charcoal-light/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mb-2 h-4 w-32" />
        <Skeleton className="mb-8 h-8 w-72" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NewsPreview({ articles }: NewsPreviewProps) {
  return (
    <SectionWrapper className="section-y bg-charcoal-light/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gold-light">
              Latest Updates
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Latest News & Events
            </h2>
            <p className="mt-2 max-w-xl text-caption sm:text-base">
              Highlights from campus life, achievements, and upcoming events at
              APS DHA.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/news-events">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-16 text-center">
            <Newspaper className="mb-3 h-10 w-10 text-white/30" />
            <p className="text-sm text-white/50">
              News and events will be posted here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/news-events/${article.slug}`}
                className="group"
              >
                <Card className="card-interactive h-full overflow-hidden border-white/10">
                  <div className="relative aspect-video overflow-hidden bg-army/20">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Newspaper className="h-10 w-10 text-white/20" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <time className="text-xs font-medium uppercase tracking-wider text-gold">
                      {format(new Date(article.date), "MMMM d, yyyy")}
                    </time>
                    <h3 className="mt-2 line-clamp-2 text-base font-semibold text-white group-hover:text-gold">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-white/60">
                      {article.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                      Read more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
