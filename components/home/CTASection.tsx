"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <SectionWrapper className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-army via-army-dark to-charcoal p-8 sm:p-12 lg:p-16"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 10%, #D4AF37 0%, transparent 50%)",
            }}
          />

          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-widest text-gold-light">
                Join Our Community
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Apply to APS DHA
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">
                Admissions are now open. Start your education at a school that
                builds character, develops the mind, and prepares you for a
                successful future.
              </p>
            </div>

            <Button asChild size="lg" variant="gold" className="shrink-0">
              <Link href="/admissions">
                Explore Admissions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
