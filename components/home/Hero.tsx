"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 80]);
  const y2 = useTransform(scrollY, [0, 400], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  return (
    <section className="relative flex min-h-[85vh] min-h-[85dvh] items-center overflow-hidden">
      {/* Background is now handled globally by layout.tsx, but we keep a local subtle gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-30" />

      <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <motion.div
        className="animate-float-slow absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-purple-500/5 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="animate-float-slower absolute right-[12%] top-[35%] h-40 w-40 rounded-full bg-indigo-500/8 blur-[100px]"
        style={{ y: y1 }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0, rgba(147, 51, 234, 0.2) 1px, transparent 1px, transparent 28px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 shadow-[0_0_20px_rgba(147,51,234,0.15)] backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-purple-300/80">
              Official Website — DHA Lahore
            </span>
          </div>

          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl font-syne tracking-tighter">
            {SITE_NAME}
          </h1>

          <p className="mt-4 text-lg font-medium text-zinc-400 sm:text-xl md:text-2xl font-space-grotesk tracking-tight">
            {SITE_TAGLINE}
          </p>

          <p className="mt-6 max-w-xl text-sm text-zinc-500 sm:text-base leading-relaxed">
            A premier institution in DHA fostering academic rigor, character
            building, and leadership among the leaders of tomorrow.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <LiquidButton asChild size="xl" className="text-white font-bold tracking-tight">
              <Link href="/admissions" className="flex items-center gap-2">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </LiquidButton>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center rounded-md px-8 text-sm font-bold text-zinc-400 hover:text-white transition-colors border border-white/5 hover:border-white/20 bg-white/[0.02] backdrop-blur-sm"
            >
              Discover Our School
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
