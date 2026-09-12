"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState(0);

  // Measure the height of the entire section
  useEffect(() => {
    if (containerRef.current) {
      setFullHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, []);

  // Tie scroll progress to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animate height and opacity of the fill line
  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, fullHeight]);
  const fillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="relative" ref={containerRef}>
      {/* Top hollow circle */}
      <div className="absolute left-0 top-0 flex items-center">
        <div className="w-5 h-5 rounded-full border-2 border-neutral-500 dark:border-neutral-400 bg-[var(--background)] dark:bg-[var(--foreground)]" />
      </div>

      {/* Static gray track */}
      <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-neutral-300 dark:bg-neutral-700" />

      {/* Animated gradient fill */}
      <motion.div
        className="absolute left-2 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent rounded-full"
        style={{
          height: fillHeight,
          opacity: fillOpacity,
        }}
      />
    </div>
  );
};
