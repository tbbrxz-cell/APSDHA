"use client";

import { motion } from "framer-motion";
import SchoolCrest from "@/components/shared/SchoolCrest";
import { SITE_NAME, SIGNATURE_LINE } from "@/lib/constants";

export default function LoadingScreen() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-army-dark/40 via-charcoal to-charcoal" />
        <motion.div
          className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-army/30 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-5 px-4 text-center"
      >
        <SchoolCrest className="h-24 w-24 sm:h-28 sm:w-28" />
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-light">
            Loading
          </p>
          <p className="mt-2 max-w-xs text-sm font-medium text-white/80 sm:max-w-sm sm:text-base">
            {SITE_NAME}
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-gold"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-4 py-8 text-center">
        <p className="text-xs text-gold-light/90 sm:text-sm">{SIGNATURE_LINE}</p>
      </div>
    </div>
  );
}
