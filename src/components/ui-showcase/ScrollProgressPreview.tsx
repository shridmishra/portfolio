"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/src/components/ui/icons";
import { Button } from "@/src/components/ui/button";

import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface ScrollProgressPreviewProps {
  accent?: string;
}

export function ScrollProgressPreview({ accent = DEFAULT_PRIMARY_SWATCH }: ScrollProgressPreviewProps) {
  const [progress, setProgress] = React.useState(45);

  const getAccentBg = () => {
    switch (accent) {
      case "purple":
        return "bg-swatch-purple";
      case "white":
        return "bg-foreground";
      case "rose":
        return "bg-swatch-rose";
      case "blue":
        return "bg-swatch-blue";
      case "red":
        return "bg-swatch-red";
      case "green":
        return "bg-swatch-green";
      case "orange":
        return "bg-swatch-orange";
      default:
        return "bg-primary-accent";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center p-6 select-none gap-6">
      {/* Visual Scroll Track Pill */}
      <div className="w-full p-4 rounded-2xl bg-card border border-border/80 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground">Reading Progress</span>
          <span className="font-semibold text-foreground">{progress}%</span>
        </div>

        <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`h-full rounded-full ${getAccentBg()}`}
          />
        </div>

        {/* Dynamic Chapter Indicators */}
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/40">
          <span>Intro</span>
          <span>Architecture</span>
          <span>Tokens</span>
          <span>Summary</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setProgress((p) => Math.max(0, p - 15))}
          className="rounded-xl gap-1 text-xs"
        >
          <Icons.ChevronDown className="size-3.5" />
          <span>Scroll Up</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setProgress((p) => Math.min(100, p + 15))}
          className="rounded-xl gap-1 text-xs"
        >
          <Icons.ChevronUp className="size-3.5" />
          <span>Scroll Down</span>
        </Button>
      </div>
    </div>
  );
}
