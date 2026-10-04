import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PuppetMascotProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function PuppetMascot({ isOpen, onClick }: PuppetMascotProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Periodic automatic blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle AI Resume Assistant"
        className={`relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-bg-card border-2 transition-all duration-300 shadow-xl focus:outline-none ${
          isOpen
            ? 'border-accent ring-2 ring-accent/30 shadow-[0_0_20px_rgba(255,215,0,0.25)]'
            : 'border-border-main hover:border-accent hover:shadow-[0_0_15px_rgba(255,215,0,0.15)]'
        }`}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-accent/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Pixel Puppet Mascot Character (Claude Code inspired) */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Antenna / Spark */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent mb-0.5 shadow-[0_0_6px_var(--accent)]" />

          {/* Minimal Face Box */}
          <div className="w-7 h-6 sm:w-8 sm:h-7 bg-accent/15 border border-accent/40 rounded-md flex flex-col items-center justify-center relative">
            {/* Eyes */}
            <div className="flex items-center justify-between w-4 sm:w-5 mb-0.5">
              {/* Left Eye */}
              {isBlinking ? (
                <div className="w-1 h-0.5 bg-accent rounded" />
              ) : (
                <div className="w-1 h-1.5 bg-accent rounded-xs shadow-[0_0_3px_var(--accent)]" />
              )}

              {/* Right Eye */}
              {isBlinking ? (
                <div className="w-1 h-0.5 bg-accent rounded" />
              ) : (
                <div className="w-1 h-1.5 bg-accent rounded-xs shadow-[0_0_3px_var(--accent)]" />
              )}
            </div>

            {/* Prompt Dash */}
            <span className="text-[7px] font-mono leading-none text-accent font-bold">_</span>
          </div>
        </div>

        {/* Small Active Status Dot */}
        <span className="absolute top-1 right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
      </motion.button>
    </div>
  );
}
