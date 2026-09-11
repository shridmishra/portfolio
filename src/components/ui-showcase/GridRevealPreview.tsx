"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface GridRevealPreviewProps {
  accent?: string;
}

export function GridRevealPreview({ accent = "orange" }: GridRevealPreviewProps) {
  const [mousePos, setMousePos] = React.useState({ x: 120, y: 80 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getAccentColor = () => {
    switch (accent) {
      case "blue":
        return "rgba(59, 130, 246, 0.35)";
      case "red":
        return "rgba(239, 68, 68, 0.35)";
      case "green":
        return "rgba(16, 185, 129, 0.35)";
      case "orange":
      default:
        return "rgba(249, 115, 22, 0.35)";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 select-none">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full rounded-[28px] bg-white dark:bg-neutral-950 shadow-xl overflow-hidden flex flex-col items-center justify-center p-6 border-none"
      >
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35"
        />

        {/* Dynamic Cursor Spotlight Reveal */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, ${getAccentColor()}, transparent 80%)`,
          }}
        />

        {/* Interactive Card Elements Inside Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 w-full">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className="h-20 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/70 dark:border-neutral-800/70 flex flex-col items-center justify-center gap-1 shadow-xs transition-colors duration-200"
            >
              <div className="size-5 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-mono text-muted-foreground font-semibold">
                0{idx}
              </div>
              <span className="text-[11px] font-medium text-foreground">Node #{idx}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
