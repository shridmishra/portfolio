"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Icons } from "@/src/components/ui/icons";

import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface GravityLettersPreviewProps {
  accent?: string;
}

const LETTERS = "GRAVITY LETTERS".split("");

export function GravityLettersPreview({ accent = DEFAULT_PRIMARY_SWATCH }: GravityLettersPreviewProps) {
  const [key, setKey] = React.useState(0);

  const getAccentColor = () => {
    switch (accent) {
      case "purple":
        return "hover:text-swatch-purple hover:border-swatch-purple";
      case "white":
        return "hover:text-foreground hover:border-foreground";
      case "rose":
        return "hover:text-swatch-rose hover:border-swatch-rose";
      case "blue":
        return "hover:text-swatch-blue hover:border-swatch-blue";
      case "red":
        return "hover:text-swatch-red hover:border-swatch-red";
      case "green":
        return "hover:text-swatch-green hover:border-swatch-green";
      case "orange":
        return "hover:text-swatch-orange hover:border-swatch-orange";
      default:
        return "hover:text-primary-accent hover:border-primary-accent";
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 select-none gap-8">
      <div key={key} className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
        {LETTERS.map((char, index) => {
          if (char === " ") {
            return <div key={index} className="w-4 md:w-6" />;
          }
          const randomRotate = (Math.sin(index * 99) * 20).toFixed(0);
          const randomY = 60 + (index % 3) * 20;

          return (
            <motion.div
              key={index}
              initial={{ y: -120, opacity: 0, rotate: Number(randomRotate) * 2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              whileHover={{
                y: -18,
                rotate: Number(randomRotate),
                scale: 1.15,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{
                y: randomY,
                rotate: Number(randomRotate) * 3,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 14,
                delay: index * 0.04,
              }}
              className={`size-10 md:size-14 rounded-xl md:rounded-2xl border border-border/80 bg-card/90 shadow-lg flex items-center justify-center text-lg md:text-2xl font-bold font-mono text-foreground cursor-pointer transition-colors duration-200 ${getAccentColor()}`}
            >
              {char}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setKey((k) => k + 1)}
          className="rounded-xl gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Icons.Rotate className="size-3.5" />
          <span>Trigger Gravity Drop</span>
        </Button>
      </div>
    </div>
  );
}
