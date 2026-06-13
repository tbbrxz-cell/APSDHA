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
          "h-full overflow-hidden border-white/10 card-interactive",
          featured && "border-gold/20 bg-gradient-to-b from-army/20 to-charcoal-light"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-army/20",
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
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-army/30 to-charcoal">
              <Newspaper className="h-12 w-12 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60" />
          {featured && (
            <Badge
              variant="gold"
              className="absolute left-4 top-4 border-gold/40 bg-charcoal/80 backdrop-blur-sm"
            >
              Featured
            </Badge>
          )}
        </div>

        <CardContent className={cn("p-5", featured && "sm:p-6")}>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gold">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.date}>
              {format(new Date(article.date), "MMMM d, yyyy")}
            </time>
          </div>

          <h3
            className={cn(
              "mt-3 font-semibold leading-snug text-white transition-colors group-hover:text-gold",
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              "mt-2 text-white/60",
              featured ? "line-clamp-3 text-sm sm:text-base" : "line-clamp-3 text-sm"
            )}
          >
            {article.description}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
