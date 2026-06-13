"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Flame, PartyPopper, Coffee, Skull, Cpu, Ghost, Music } from "lucide-react";

export default function GenZLoungePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 overflow-hidden">
      {/* Floating animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 text-yellow-300"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-20 text-red-400"
        >
          <Flame className="w-14 h-14" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 30, 0],
            rotate: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-20 text-cyan-300"
        >
          <PartyPopper className="w-12 h-12" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 text-green-300"
        >
          <Skull className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Hero section */}
        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-6xl sm:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] mb-4">
              GEN Z LOUNGE 🎉
            </h1>
            <p className="text-2xl sm:text-4xl text-yellow-200 font-bold">
              FR, THIS PAGE SLAPS HARD 🔥
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Zap className="w-16 h-16 mx-auto text-yellow-300 animate-pulse" />
          </motion.div>
        </section>

        {/* Vibe Check section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
              VIBE CHECK ✨
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl border-2 border-white/30 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Flame className="w-8 h-8 text-orange-400" />
                  <h3 className="text-2xl font-black text-white">THIS COOKS</h3>
                </div>
                <p className="text-white/90 text-lg">
                  Our academics SLAY so hard, you'll be cooking up A's in no time FR FR.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="bg-purple-400/30 backdrop-blur-lg p-6 rounded-2xl border-2 border-purple-200/40 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Ghost className="w-8 h-8 text-purple-200" />
                  <h3 className="text-2xl font-black text-white">NO CAP</h3>
                </div>
                <p className="text-white/90 text-lg">
                  No cap, this school is PEAK. The teachers actually care, lowkey insane.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-pink-400/30 backdrop-blur-lg p-6 rounded-2xl border-2 border-pink-200/40 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <PartyPopper className="w-8 h-8 text-pink-200" />
                  <h3 className="text-2xl font-black text-white">SYBAU</h3>
                </div>
                <p className="text-white/90 text-lg">
                  SYBAU squad where you at? The campus hits different, fr.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="bg-cyan-400/30 backdrop-blur-lg p-6 rounded-2xl border-2 border-cyan-200/40 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Coffee className="w-8 h-8 text-cyan-200" />
                  <h3 className="text-2xl font-black text-white">SLAY QUEEN/KING</h3>
                </div>
                <p className="text-white/90 text-lg">
                  You think you can slay here? ABSOLUTELY. This is your era, bestie.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-green-400/30 backdrop-blur-lg p-6 rounded-2xl border-2 border-green-200/40 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-8 h-8 text-green-200" />
                  <h3 className="text-2xl font-black text-white">THE RIZZ</h3>
                </div>
                <p className="text-white/90 text-lg">
                  Our admin panel got that RIZZ, no cap. Easy to use, peak design.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="bg-orange-400/30 backdrop-blur-lg p-6 rounded-2xl border-2 border-orange-200/40 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Music className="w-8 h-8 text-orange-200" />
                  <h3 className="text-2xl font-black text-white">IT HITS</h3>
                </div>
                <p className="text-white/90 text-lg">
                  The school hits different, lowkey. Events, sports, everything slaps.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meme/Joke section */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
              CHAOS CORNER 🌀
            </h2>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-6 rounded-2xl"
              >
                <p className="text-2xl font-black text-gray-900">
                  "Why did the student bring a ladder to school? Because they heard the grades were through the roof! 📈"
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: -10 }}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 p-6 rounded-2xl"
              >
                <p className="text-2xl font-black text-white">
                  "Me at 7 AM: I'm never waking up early again. Me at 7:01 AM: This is PEAK productivity ☕"
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-6 rounded-2xl"
              >
                <p className="text-2xl font-black text-white">
                  "School is just a side quest to the main character arc called 'summer break' 🏖️"
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block"
            >
              <h2 className="text-5xl sm:text-7xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,0,0.7)] mb-6">
                READY TO SLAY?
              </h2>
              <p className="text-2xl text-white/90 mb-8">
                Join our squad, no cap. Admissions open, fr fr.
              </p>
              <a
                href="/admissions"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all"
              >
                COOK WITH US 🔥
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center">
          <p className="text-white/80 text-lg">
            Made with 💖 by <span className="font-black text-yellow-300">TABRAIZ</span>
          </p>
        </footer>
      </div>
    </div>
  );
}