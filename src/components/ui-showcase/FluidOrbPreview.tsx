"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface FluidOrbPreviewProps {
  accent?: string;
}

export function FluidOrbPreview({ accent = DEFAULT_PRIMARY_SWATCH }: FluidOrbPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(springY, [-100, 100], [25, -25]);
  const rotateY = useTransform(springX, [-100, 100], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getGradientClass = () => {
    switch (accent) {
      case "purple":
        return "from-purple-500 via-violet-600 to-indigo-700 shadow-purple-500/30";
      case "white":
        return "from-neutral-200 via-neutral-300 to-neutral-500 shadow-white/20";
      case "rose":
        return "from-rose-400 via-rose-500 to-red-600 shadow-rose-500/30";
      case "pink":
        return "from-pink-400 via-rose-500 to-fuchsia-600 shadow-pink-500/30";
      case "blue":
        return "from-sky-500 via-indigo-500 to-purple-600 shadow-sky-500/30";
      case "red":
        return "from-rose-500 via-pink-500 to-amber-600 shadow-rose-500/30";
      case "green":
        return "from-emerald-400 via-teal-500 to-cyan-600 shadow-emerald-500/30";
      case "orange":
        return "from-amber-400 via-orange-500 to-rose-600 shadow-orange-500/30";
      default:
        return "from-purple-500 via-violet-600 to-indigo-700 shadow-purple-500/30";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex flex-col items-center justify-center p-8 select-none perspective-[1000px] cursor-grab active:cursor-grabbing"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: springX,
          y: springY,
        }}
        className="relative size-44 md:size-56 flex items-center justify-center"
      >
        {/* Ambient Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-full blur-2xl bg-gradient-to-tr ${getGradientClass()} pointer-events-none`}
        />

        {/* Main Fluid Sphere */}
        <motion.div
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`size-full bg-gradient-to-tr ${getGradientClass()} shadow-2xl backdrop-blur-xl border border-white/20 relative overflow-hidden`}
        >
          {/* Inner Light Reflection */}
          <div className="absolute inset-x-4 top-2 h-16 rounded-full bg-gradient-to-b from-white/40 to-transparent blur-xs pointer-events-none" />
        </motion.div>
      </motion.div>

      <span className="text-xs font-mono text-muted-foreground pt-6">
        Move cursor over the orb to steer physical momentum
      </span>
    </div>
  );
}
