"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/src/components/ui/icons";
import { Button } from "@/src/components/ui/button";

import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface DurationPickerPreviewProps {
  accent?: string;
}

export function DurationPickerPreview({ accent = DEFAULT_PRIMARY_SWATCH }: DurationPickerPreviewProps) {
  const [seconds, setSeconds] = React.useState(45);

  const getAccentText = () => {
    switch (accent) {
      case "purple":
        return "text-swatch-purple";
      case "white":
        return "text-foreground";
      case "rose":
        return "text-swatch-rose";
      case "blue":
        return "text-swatch-blue";
      case "red":
        return "text-swatch-red";
      case "green":
        return "text-swatch-green";
      case "orange":
        return "text-swatch-orange";
      default:
        return "text-primary-accent";
    }
  };

  const getAccentBg = () => {
    switch (accent) {
      case "purple":
        return "bg-swatch-purple text-white";
      case "white":
        return "bg-swatch-white text-black dark:bg-white dark:text-black";
      case "rose":
        return "bg-swatch-rose text-white";
      case "blue":
        return "bg-swatch-blue text-white";
      case "red":
        return "bg-swatch-red text-white";
      case "green":
        return "bg-swatch-green text-white";
      case "orange":
        return "bg-swatch-orange text-white";
      default:
        return "bg-primary-accent text-white";
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center p-6 select-none gap-6">
      <div className="w-full p-6 rounded-3xl bg-card border border-border/80 shadow-xl flex flex-col items-center gap-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Icons.Clock className="size-3.5" />
          <span>Set Duration</span>
        </div>

        {/* Circular Duration Dial */}
        <div className="relative size-36 rounded-full border-4 border-muted/80 flex flex-col items-center justify-center p-4">
          <motion.span
            key={seconds}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold font-mono ${getAccentText()}`}
          >
            {seconds}s
          </motion.span>
          <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
            Duration
          </span>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSeconds((s) => Math.max(5, s - 5))}
            className="flex-1 rounded-2xl gap-1 text-xs"
          >
            <Icons.Minus className="size-3.5" />
            <span>-5s</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSeconds((s) => Math.min(300, s + 5))}
            className="flex-1 rounded-2xl gap-1 text-xs"
          >
            <Icons.Plus className="size-3.5" />
            <span>+5s</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
