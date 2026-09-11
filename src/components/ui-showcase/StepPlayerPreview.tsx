"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/src/components/ui/icons";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface StepPlayerPreviewProps {
  accent?: string;
}

const STEPS = [
  { id: 1, title: "Initialize Setup", duration: "0:45" },
  { id: 2, title: "Configure Tokens", duration: "1:12" },
  { id: 3, title: "Deploy MicroVM", duration: "0:30" },
  { id: 4, title: "Run Validation", duration: "2:05" },
];

export function StepPlayerPreview({ accent = DEFAULT_PRIMARY_SWATCH }: StepPlayerPreviewProps) {
  const [activeStep, setActiveStep] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= STEPS.length ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying]);

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
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-6 select-none gap-6">
      <div className="w-full p-6 rounded-3xl bg-card border border-border/80 shadow-xl space-y-5">
        {/* Step Progress Indicators */}
        <div className="flex gap-2">
          {STEPS.map((step) => (
            <div key={step.id} className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={false}
                animate={{
                  width: step.id < activeStep ? "100%" : step.id === activeStep ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-full rounded-full",
                  step.id <= activeStep ? getAccentBg() : "bg-muted"
                )}
              />
            </div>
          ))}
        </div>

        {/* Current Active Step */}
        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-xs font-mono text-muted-foreground">Step {activeStep} of {STEPS.length}</span>
            <h4 className="text-base font-bold text-foreground">
              {STEPS[activeStep - 1]?.title}
            </h4>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {STEPS[activeStep - 1]?.duration}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-border/40">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <Icons.Previous className="size-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className={cn("rounded-full size-11 shadow-md", getAccentBg())}
          >
            {isPlaying ? <Icons.Pause className="size-5" /> : <Icons.Play className="size-5 ml-0.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setActiveStep((s) => Math.min(STEPS.length, s + 1))}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <Icons.Next className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
