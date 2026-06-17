"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Flame, PartyPopper, Coffee, Skull, Cpu, Ghost, Music, AlertTriangle, ThermometerSun, Brain, Utensils, X, Minus } from "lucide-react";
import { useState, useEffect } from "react";

export default function GenZLoungePage() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [stickers, setStickers] = useState<{ id: number, x: number, y: number, emoji: string, rotation: number }[]>([]);
  const [windows, setWindows] = useState({
    survival: true,
    vibe: true,
    chaos: true
  });

  const quotes = [
    "Bro thinks he's the main character 💀",
    "Me calculating how many assignments I can skip and still pass 😭",
    "The cafeteria food today was mid, no cap."
  ];

  const emojis = ["🔥", "💀", "🚀", "💎", "🤡", "👑", "🫦", "💅", "🗿", "🧿"];

  const handleNextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const addSticker = (e: React.MouseEvent) => {
    const newSticker = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 360
    };
    setStickers([...stickers, newSticker]);
  };

  return (
    <div 
      className="min-h-screen bg-[#00FF00] overflow-hidden cursor-crosshair relative selection:bg-black selection:text-[#00FF00]"
      onClick={addSticker}
    >
      {/* Liquid Acid Gradient Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-[#FF007F] via-[#FFDE00] to-[#00FF00] blur-[120px]" />
      </div>

      {/* Stickers Wall */}
      {stickers.map(sticker => (
        <motion.div
          key={sticker.id}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1.5, rotate: sticker.rotation }}
          className="fixed z-50 pointer-events-none text-4xl"
          style={{ left: sticker.x - 20, top: sticker.y - 20 }}
        >
          {sticker.emoji}
        </motion.div>
      ))}

      {/* Chaotic Ticker Strips */}
      <div className="fixed top-20 -left-10 right-0 h-16 bg-black text-[#00FF00] flex items-center overflow-hidden rotate-[-2deg] z-20 border-y-4 border-[#FFDE00]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-4xl font-black uppercase italic"
        >
          SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU SYBAU
        </motion.div>
      </div>

      <div className="fixed bottom-20 -right-10 left-0 h-16 bg-[#FF007F] text-black flex items-center overflow-hidden rotate-[3deg] z-20 border-y-4 border-black">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-4xl font-black uppercase"
        >
          SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY SLAY
        </motion.div>
      </div>

      <div className="relative z-30 pt-32 pb-20 px-4">
        {/* Retro Window - Hero */}
        <motion.div 
          drag
          className="max-w-4xl mx-auto bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black p-1 mb-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-sm">
            <span>GEN_Z_LOUNGE.EXE</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-[#c0c0c0] border border-black flex items-center justify-center text-black">_</div>
              <div className="w-4 h-4 bg-[#c0c0c0] border border-black flex items-center justify-center text-black">X</div>
            </div>
          </div>
          <div className="p-10 text-center bg-white border-2 border-black m-1">
            <h1 className="text-6xl sm:text-8xl font-black text-black mb-4 uppercase italic tracking-tighter">
              GEN Z LOUNGE
            </h1>
            <p className="text-2xl sm:text-4xl text-[#FF007F] font-black underline decoration-4 decoration-black">
              FR, THIS PAGE SLAPS HARD 🔥
            </p>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
          {/* Bento Grid Item 1 - Vibe Check */}
          {windows.vibe && (
            <motion.div 
              drag
              className="bg-[#FFDE00] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
            >
              <button onClick={() => setWindows({...windows, vibe: false})} className="absolute top-2 right-2 border-2 border-black p-1 hover:bg-black hover:text-[#FFDE00]">
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-4xl font-black text-black mb-8 uppercase tracking-tighter">VIBE CHECK ✨</h2>
              <div className="grid gap-4">
                <div className="bg-white border-2 border-black p-4 rotate-[-1deg] hover:rotate-0 transition-transform">
                  <h3 className="text-xl font-black mb-2">THIS COOKS</h3>
                  <p className="font-bold">Our academics SLAY so hard, you'll be cooking up A's in no time FR FR.</p>
                </div>
                <div className="bg-[#00FF00] border-2 border-black p-4 rotate-[1.5deg] hover:rotate-0 transition-transform">
                  <h3 className="text-xl font-black mb-2">NO CAP</h3>
                  <p className="font-bold text-black">No cap, this school is PEAK. The teachers actually care, lowkey insane.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bento Grid Item 2 - Survival Guide */}
          {windows.survival && (
            <motion.div 
              drag
              className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
            >
              <button onClick={() => setWindows({...windows, survival: false})} className="absolute top-2 right-2 border-2 border-black p-1 hover:bg-black hover:text-white">
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-4xl font-black text-black mb-8 uppercase italic underline decoration-8 decoration-[#00FF00]">SURVIVAL GUIDE 🎮</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-black text-[#00FF00] p-2 font-black text-xl">-1000</div>
                  <p className="font-bold text-lg">"When the coordinator walks into the classroom with a ruler to check your hair 👁️👄👁️"</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-[#FF007F] text-white p-2 font-black text-xl">DIABOLICAL</div>
                  <p className="font-bold text-lg">"Doing PT drills in the Lahore heat while teachers watch from the shade 💀"</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Micro-card - Main Character Quote */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="lg:col-span-2 bg-black border-4 border-[#00FF00] p-8 text-center shadow-[12px_12px_0px_0px_rgba(0,255,0,0.3)]"
          >
            <p className="text-3xl font-black text-[#00FF00] mb-6 italic">
              "{quotes[currentQuote]}"
            </p>
            <button
              onClick={handleNextQuote}
              className="bg-[#00FF00] text-black font-black py-4 px-10 text-2xl uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_white] transition-all"
            >
              next quote
            </button>
          </motion.div>
        </div>

        {/* Canteen Review */}
        <section className="mt-20 max-w-4xl mx-auto bg-[#FF007F] border-4 border-black p-10 rotate-[-1deg] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
           <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-widest">CANTEEN REVIEW ✨🍟</h2>
           <p className="text-2xl font-bold text-black bg-white p-4 border-2 border-black">
             "The canteen fries are lowkey carrying my entire mental health this semester, no cap."
           </p>
        </section>
      </div>

      {/* Floating Retro Icons */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden z-0">
         {[...Array(20)].map((_, i) => (
           <div 
            key={i}
            className="absolute text-8xl font-black text-black select-none"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
           >
             ?
           </div>
         ))}
      </div>
    </div>
  );
}
