import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { NewsEvent } from "@/types/database";

interface NewsCardProps {
  article: NewsEvent;
  featured?: boolean;
  className?: string;
}

export default function NewsCard({
  article,
  featured = false,
  className,
}: NewsCardProps) {
  return (
    <Link
      href={`/news-events/${article.slug}`}
      className={cn("group block break-inside-avoid", className)}
    >
      <Card
        className={cn(
          "h-full overflow-hidden border-white/7 bg-white/[0.015] backdrop-blur-xl card-interactive",
          featured && "border-purple-500/20 shadow-[0_0_30px_rgba(147,51,234,0.1)]"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-purple-500/5",
            featured ? "aspect-[16/9]" : "aspect-video"
          )}
        >
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-500/10 to-transparent">
              <Newspaper className="h-12 w-12 text-white/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          {featured && (
            <Badge
              className="absolute left-4 top-4 border-purple-500/40 bg-black/80 backdrop-blur-sm text-purple-300"
            >
              Featured
            </Badge>
          )}
        </div>

        <CardContent className={cn("p-5", featured && "sm:p-6")}>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-purple-400">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.date}>
              {format(new Date(article.date), "MMMM d, yyyy")}
            </time>
          </div>

          <h3
            className={cn(
              "mt-3 font-semibold leading-snug text-white transition-colors group-hover:text-purple-300 font-syne",
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              "mt-2 text-zinc-500 font-inter",
              featured ? "line-clamp-3 text-sm sm:text-base" : "line-clamp-3 text-sm"
            )}
          >
            {article.description}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
