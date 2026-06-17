"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function CTASection() {
  return (
    <SectionWrapper className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bento-card relative overflow-hidden p-8 sm:p-12 lg:p-16 border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.1)]"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: "radial-gradient(circle at 90% 10%, rgba(147, 51, 234, 0.4) 0%, transparent 50%)",
            }}
          />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
                Join Our Community
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl font-syne">
                Apply to APS DHA
              </h2>
              <p className="mt-4 text-base text-zinc-500 sm:text-lg leading-relaxed">
                Admissions are now open. Start your education at a school that
                builds character, develops the mind, and prepares you for a
                successful future.
              </p>
            </div>

            <LiquidButton asChild size="xl" className="shrink-0 font-bold tracking-tight">
              <Link href="/admissions" className="flex items-center gap-2">
                Explore Admissions
                <ArrowRight className="h-5 w-5" />
              </Link>
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
