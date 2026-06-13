"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "./GalleryGrid";

interface LightboxProps {
  item: GalleryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Lightbox({ item, open, onOpenChange }: LightboxProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden border-white/10 bg-charcoal-light p-0">
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <div className="relative aspect-video w-full overflow-hidden bg-army/20">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                item.gradient
              )}
            />
          )}
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-white/60">
            Army Public School (APS) Girls & Boys DHA
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
