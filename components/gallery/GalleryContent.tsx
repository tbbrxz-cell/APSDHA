"use client";

import { useState } from "react";
import GalleryGrid, { type GalleryItem } from "@/components/gallery/GalleryGrid";
import Lightbox from "@/components/gallery/Lightbox";

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Morning Assembly",
    gradient: "from-army via-army-dark to-charcoal",
  },
  {
    id: "2",
    title: "Science Laboratory",
    gradient: "from-charcoal-light via-army/60 to-charcoal",
  },
  {
    id: "3",
    title: "Sports Day",
    gradient: "from-army-dark via-gold-muted/40 to-charcoal",
  },
  {
    id: "4",
    title: "Annual Prize Distribution",
    gradient: "from-charcoal via-army to-army-dark",
  },
  {
    id: "5",
    title: "Art & Culture Week",
    gradient: "from-gold-muted/30 via-army to-charcoal-light",
  },
  {
    id: "6",
    title: "Library & Reading Room",
    gradient: "from-army-light/40 via-charcoal to-army-dark",
  },
  {
    id: "7",
    title: "Computer Lab",
    gradient: "from-charcoal-light via-army-dark to-charcoal",
  },
  {
    id: "8",
    title: "Independence Day Celebration",
    gradient: "from-army via-charcoal-light to-gold-muted/20",
  },
  {
    id: "9",
    title: "Debating Society",
    gradient: "from-army-dark via-charcoal to-army",
  },
  {
    id: "10",
    title: "Campus Grounds",
    gradient: "from-charcoal via-gold-muted/25 to-army-dark",
  },
];

export default function GalleryContent() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleSelect = (item: GalleryItem) => {
    setSelected(item);
    setLightboxOpen(true);
  };

  return (
    <>
      <GalleryGrid items={galleryItems} onSelect={handleSelect} />
      <Lightbox
        item={selected}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </>
  );
}
