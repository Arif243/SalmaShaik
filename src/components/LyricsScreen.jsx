"use client";

export const dynamic = "force-static";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextAnimate } from "./ui/text-animate";

const lyrics = [
  { text: "When all I dream of is your eyes", duration: 4800, anim: 2.5 },
  { text: "All I long for is your touch", duration: 3800, anim: 1.5 },
  {
    text: "And, darlin', something tells me that's enough",
    duration: 6300,
    anim: 2.2,
  },
  { text: "You can say that I'm a fool", duration: 3600, anim: 1.8 },
  { text: "And I don't know very much", duration: 3400, anim: 1.8 },
  { text: "But I think they call this love", duration: 6000, anim: 2.2 },
];

export default function LyricsScreen({ onComplete }) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  useEffect(() => {
    const currentDuration = lyrics[currentLyricIndex].duration;

    const timer = setTimeout(() => {
      if (currentLyricIndex < lyrics.length - 1) {
        setCurrentLyricIndex((prev) => prev + 1);
      } else {
        // when lyrics finish -> go to outro screen
        if (onComplete) onComplete();
      }
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentLyricIndex, onComplete]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* FULL IMAGE BACKGROUND */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Image
          src="/publiceyes-bg.png"      // <-- the file in /public
          alt="Salma"
          fill
          className="object-contain bg-black"
          priority
        />
        {/* If the image appears sideways, try adding: className="object-contain bg-black rotate-90"
            or className="object-contain bg-black -rotate-90" */}
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/35 -z-10" />

      {/* LYRICS */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          {currentLyricIndex < lyrics.length && (
            <motion.div
              key={currentLyricIndex}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <TextAnimate
                by="word"
                duration={lyrics[currentLyricIndex].anim}
                animation="blurInUp"
                className="text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.7)] leading-normal"
              >
                {lyrics[currentLyricIndex].text}
              </TextAnimate>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
