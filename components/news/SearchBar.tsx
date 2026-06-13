"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  resultCount?: number;
  totalCount?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search news and events...",
  className,
  resultCount,
  totalCount,
}: SearchBarProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 border-white/10 bg-charcoal-light/80 pl-10 pr-10 text-base backdrop-blur-sm"
          aria-label="Search news and events"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-white/40 transition-colors hover:text-gold"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {totalCount !== undefined && resultCount !== undefined && (
        <p className="text-sm text-white/50">
          {value ? (
            <>
              Showing{" "}
              <span className="font-medium text-gold">{resultCount}</span> of{" "}
              {totalCount} {totalCount === 1 ? "article" : "articles"}
            </>
          ) : (
            <>
              {totalCount} {totalCount === 1 ? "article" : "articles"} available
            </>
          )}
        </p>
      )}
    </div>
  );
}
