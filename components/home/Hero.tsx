"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 80]);
  const y2 = useTransform(scrollY, [0, 400], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  return (
    <section className="relative flex min-h-[85vh] min-h-[85dvh] items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-army-dark via-charcoal to-charcoal-light" />

      <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(45,122,74,0.45) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <motion.div
        className="animate-float-slow absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-gold/10 blur-2xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="animate-float-slower absolute right-[12%] top-[35%] h-40 w-40 rounded-full bg-army-light/20 blur-3xl"
        style={{ y: y1 }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 1px, transparent 28px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 shadow-glow-gold-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold-light" />
            <span className="text-xs font-medium uppercase tracking-widest text-gold-light">
              Official Website — DHA Lahore
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {SITE_NAME}
          </h1>

          <p className="mt-4 text-lg font-medium text-gold-light sm:text-xl md:text-2xl">
            {SITE_TAGLINE}
          </p>

          <p className="mt-6 max-w-xl text-sm text-body-muted sm:text-base">
            A premier institution in DHA fostering academic rigor, character
            building, and leadership among the leaders of tomorrow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <Button asChild size="lg" variant="gold">
              <Link href="/admissions">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Discover Our School</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
