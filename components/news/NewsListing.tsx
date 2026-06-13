"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Newspaper, SearchX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { NewsEvent } from "@/types/database";
import NewsCard from "./NewsCard";
import SearchBar from "./SearchBar";

interface NewsListingProps {
  articles: NewsEvent[];
}

export function NewsListingSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-full max-w-xl rounded-xl" />
      <Skeleton className="h-96 w-full rounded-2xl" />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="mb-4 h-72 break-inside-avoid" />
        ))}
      </div>
    </div>
  );
}

export default function NewsListing({ articles }: NewsListingProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return articles;

    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(normalized) ||
        article.description.toLowerCase().includes(normalized)
    );
  }, [articles, query]);

  const isSearching = query.trim().length > 0;
  const featured = !isSearching && filtered.length > 0 ? filtered[0] : null;
  const rest = !isSearching ? filtered.slice(1) : filtered;

  return (
    <div className="space-y-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        resultCount={filtered.length}
        totalCount={articles.length}
      />

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
          <Newspaper className="mb-4 h-12 w-12 text-white/25" />
          <h3 className="text-lg font-medium text-white">No articles yet</h3>
          <p className="mt-2 max-w-sm text-caption">
            News and events from APS DHA will appear here soon.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-charcoal-light/40 py-24 text-center"
        >
          <SearchX className="mb-4 h-12 w-12 text-white/25" />
          <h3 className="text-lg font-medium text-white">No results found</h3>
          <p className="mt-2 max-w-sm text-sm text-white/50">
            No articles match &ldquo;{query}&rdquo;. Please try different keywords.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={query || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <NewsCard article={featured} featured />
              </motion.div>
            )}

            {rest.length > 0 && (
              <div
                className={cn(
                  "columns-1 gap-4 sm:columns-2 lg:columns-3",
                  featured && "pt-2"
                )}
              >
                {rest.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="mb-4 break-inside-avoid"
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
