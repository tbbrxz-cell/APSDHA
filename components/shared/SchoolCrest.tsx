"use client";

import { motion } from "framer-motion";

const crestPath =
  "M32 6 L52 18 V38 C52 50 42 58 32 62 C22 58 12 50 12 38 V18 Z M32 14 L20 22 V36 C20 44 26 50 32 52 C38 50 44 44 44 36 V22 Z M32 22 L26 26 V34 C26 38 29 41 32 42 C35 41 38 38 38 34 V26 Z";

export default function SchoolCrest({
  className = "h-20 w-20",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={crestPath}
        className="crest-stroke"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M32 28 L32 38 M28 32 L36 32"
        stroke="#2D7A4A"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
