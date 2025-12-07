"use client";

export const dynamic = "force-static";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextAnimate } from "./ui/text-animate";

const lyrics = [
  { text: "When all I dream of is your eyes", duration: 4800, anim: 2.5 },
  { text: "All I long for is your touch", duration: 3800, anim: 1.5 },
  { text: "And, darlin', something tells me that's enough", duration: 6300, anim: 2.2 },
  { text: "You can say that I'm a fool", duration: 3600, anim: 1.8 },
  { text: "And I don't know very much", duration: 3400, anim: 1.8 },
  { text: "But I think they call this love", duration: 6000, anim: 2.2 },
];

export default function LyricsScreen() {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  useEffect(() => {
    const currentDuration = lyrics[currentLyricIndex].duration;

    const timer = setTimeout(() => {
      if (currentLyricIndex < lyrics.length - 1) {
        setCurrentLyricIndex((prev) => prev + 1);
      } else {
        // last line reached – stay on screen, do nothing
      }
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentLyricIndex]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* FULL-SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/eyes-bg.png"   // <-- your image name in /public
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* LYRICS ON TOP */}
      <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative px-4">
        <AnimatePresence mode="wait">
          {currentLyricIndex < lyrics.length && (
            <motion.div
              key={currentLyricIndex}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center"
            >
              {currentLyricIndex === 0 ? (
                <div className="flex flex-wrap justify-center items-center gap-x-3">
                  <TextAnimate
                    by="word"
                    duration={2.4}
                    animation="blurInUp"
                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)]"
                  >
                    When
                  </TextAnimate>

                  <TextAnimate
                    by="word"
                    duration={2.2}
                    delay={1.8}
                    animation="blurInUp"
                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] text-balance leading-normal"
                  >
                    all I dream of is your eyes
                  </TextAnimate>
                </div>
              ) : (
                <TextAnimate
                  by="word"
                  duration={lyrics[currentLyricIndex].anim}
                  animation="blurInUp"
                  className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] text-balance leading-normal"
                >
                  {lyrics[currentLyricIndex].text}
                </TextAnimate>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

