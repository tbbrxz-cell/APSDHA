"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  title: string;
  gradient: string;
  imageUrl?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

export default function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className={cn(
            "group relative aspect-square overflow-hidden rounded-xl border border-white/10 card-interactive",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
            index === 0 && "col-span-2 row-span-2 aspect-auto min-h-[240px] md:min-h-[320px]"
          )}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className={cn("absolute inset-0 bg-gradient-to-br", item.gradient)} />
          )}
          <div className="absolute inset-0 bg-charcoal/20 transition-colors group-hover:bg-charcoal/10" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-3 sm:p-4">
            <p className="text-left text-xs font-medium text-white sm:text-sm">
              {item.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
