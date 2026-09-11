"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface FolderPreviewProps {
  color?: "blue" | "black" | "white";
}

export function FolderPreview({ color = "blue" }: FolderPreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const getFolderColorStyles = () => {
    switch (color) {
      case "black":
        return {
          back: "bg-neutral-900 dark:bg-neutral-800 border-neutral-700",
          front: "bg-neutral-800/90 dark:bg-neutral-900/90 border-neutral-700 text-neutral-300",
          gradient: "from-neutral-700/30 to-neutral-900/40",
          shadow: "shadow-2xl shadow-neutral-950/50",
        };
      case "white":
        return {
          back: "bg-neutral-200 dark:bg-neutral-300 border-neutral-300",
          front: "bg-white/95 dark:bg-neutral-100/95 border-neutral-200 text-neutral-800",
          gradient: "from-white/40 to-neutral-200/40",
          shadow: "shadow-2xl shadow-neutral-900/10",
        };
      case "blue":
      default:
        return {
          back: "bg-sky-600 dark:bg-sky-500 border-sky-400",
          front: "bg-sky-400/95 dark:bg-sky-400/95 border-sky-300 text-white",
          gradient: "from-sky-300/40 to-sky-600/40",
          shadow: "shadow-2xl shadow-sky-900/30",
        };
    }
  };

  const styleConfig = getFolderColorStyles();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 select-none">
      <div
        className="relative cursor-pointer group py-12 px-8 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-48 h-36 md:w-56 md:h-40 perspective-[1000px]">
          {/* Back Folder Flap */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl border transition-all duration-300",
              styleConfig.back,
              styleConfig.shadow
            )}
            style={{
              clipPath:
                "polygon(0% 0%, 35% 0%, 42% 15%, 100% 15%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Fanning Documents */}
          <div className="absolute inset-x-4 top-2 bottom-6 pointer-events-none">
            {/* Card 1 - Left Fan */}
            <motion.div
              animate={{
                y: isHovered || isOpen ? -28 : 0,
                x: isHovered || isOpen ? -18 : 0,
                rotate: isHovered || isOpen ? -12 : 0,
                scale: isHovered || isOpen ? 1.02 : 0.95,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute inset-x-2 top-0 h-32 rounded-xl bg-card border border-border shadow-md p-3 flex flex-col gap-2 origin-bottom"
            >
              <div className="w-12 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-full h-1.5 rounded-full bg-muted-foreground/15" />
              <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/15" />
              <div className="w-2/3 h-1.5 rounded-full bg-muted-foreground/15" />
            </motion.div>

            {/* Card 2 - Center Fan */}
            <motion.div
              animate={{
                y: isHovered || isOpen ? -38 : 0,
                x: 0,
                rotate: 0,
                scale: isHovered || isOpen ? 1.05 : 0.98,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute inset-x-2 top-0 h-32 rounded-xl bg-card border border-border shadow-lg p-3 flex flex-col gap-2 origin-bottom z-10"
            >
              <div className="w-16 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-full h-1.5 rounded-full bg-muted-foreground/20" />
              <div className="w-5/6 h-1.5 rounded-full bg-muted-foreground/20" />
              <div className="w-3/4 h-1.5 rounded-full bg-muted-foreground/20" />
            </motion.div>

            {/* Card 3 - Right Fan */}
            <motion.div
              animate={{
                y: isHovered || isOpen ? -26 : 0,
                x: isHovered || isOpen ? 18 : 0,
                rotate: isHovered || isOpen ? 12 : 0,
                scale: isHovered || isOpen ? 1.02 : 0.95,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute inset-x-2 top-0 h-32 rounded-xl bg-card border border-border shadow-md p-3 flex flex-col gap-2 origin-bottom"
            >
              <div className="w-10 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-full h-1.5 rounded-full bg-muted-foreground/15" />
              <div className="w-3/4 h-1.5 rounded-full bg-muted-foreground/15" />
            </motion.div>
          </div>

          {/* Front Folder Flap (3D Lift on Open/Hover) */}
          <motion.div
            animate={{
              rotateX: isOpen ? -36 : isHovered ? -12 : 0,
              y: isOpen ? 12 : 0,
              scaleY: isOpen ? 0.9 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className={cn(
              "absolute inset-x-0 bottom-0 top-6 rounded-2xl border backdrop-blur-md origin-bottom z-20 overflow-hidden shadow-lg",
              styleConfig.front
            )}
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t opacity-40 pointer-events-none",
                styleConfig.gradient
              )}
            />
            {/* Glossy top edge highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/40 dark:bg-white/20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
