import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL } from "@/lib/metadata";
import { supabase } from "@/lib/supabase";
import type { NewsEvent } from "@/types/database";

interface ArticlePageProps {
  params: { slug: string };
}

async function fetchArticleBySlug(slug: string): Promise<NewsEvent | null> {
  try {
    const { data, error } = await supabase
      .from("news_and_events")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch article:", error.message);
      return null;
    }

    return data as NewsEvent | null;
  } catch (err) {
    console.error("Failed to fetch article:", err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from("news_and_events").select("slug");
    return data?.map(({ slug }) => ({ slug })) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const title = article.title;
  const description = article.description;
  const ogImage = article.image_url ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/news-events/${article.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/news-events/${article.slug}`,
      publishedTime: article.date,
      siteName: SITE_NAME,
      locale: "en_PK",
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function renderContent(content: string) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return <p className="text-white/60">No content available.</p>;
  }

  return paragraphs.map((paragraph, index) => (
    <p key={index} className="leading-relaxed text-white/80">
      {paragraph.split("\n").map((line, lineIndex, lines) => (
        <span key={lineIndex}>
          {line}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  ));
}

function buildJsonLd(article: NewsEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.created_at,
    image: article.image_url ? [article.image_url] : undefined,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/news-events/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLd = buildJsonLd(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <div className="relative min-h-[40vh] overflow-hidden border-b border-white/10 sm:min-h-[50vh]">
          {article.image_url ? (
            <>
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-army-dark via-charcoal to-charcoal-light" />
          )}

          <div className="relative mx-auto flex min-h-[40vh] max-w-4xl flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[50vh] sm:px-6 sm:pb-14 lg:px-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-6 w-fit text-white/70 hover:text-gold"
            >
              <Link href="/news-events">
                <ArrowLeft className="h-4 w-4" />
                Back to News & Events
              </Link>
            </Button>

            <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gold">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.date}>
                {format(new Date(article.date), "EEEE, MMMM d, yyyy")}
              </time>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              {article.description}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-6 text-base sm:text-lg">
            {renderContent(article.content)}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <Button asChild variant="outline">
              <Link href="/news-events">
                <Newspaper className="h-4 w-4" />
                More News & Events
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
