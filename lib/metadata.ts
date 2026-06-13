import type { Metadata } from "next";
import { SITE_NAME } from "./constants";

const DEFAULT_SITE_URL = "https://apsdha.netlify.app";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
).replace(/\/$/, "");

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: SITE_NAME,
      locale: "en_PK",
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
