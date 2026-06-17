import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/5 bg-[#030305]/50 backdrop-blur-sm",
        className
      )}
    >
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0f] via-transparent to-[#030305]" />
      )}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-4 h-1 w-12 rounded-full bg-purple-500/50" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-syne">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base text-zinc-500 sm:text-lg font-inter">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
