"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/src/components/ui/icons";
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";

interface GithubActivityPreviewProps {
  accent?: string;
}

const MONTHS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TOP_REPOS = [
  { name: "antigravity-ui", count: 482, percent: 85, color: "bg-primary-accent" },
  { name: "framer-motion-kit", count: 341, percent: 68, color: "bg-swatch-blue" },
  { name: "next-portfolio", count: 215, percent: 45, color: "bg-swatch-green" },
  { name: "design-system-tokens", count: 174, percent: 34, color: "bg-swatch-red" },
];

export function GithubActivityPreview({}: GithubActivityPreviewProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Generate 24 weeks x 7 days grid with realistic density
  const gridData = React.useMemo(() => {
    const weeks = [];
    for (let w = 0; w < 24; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const factor = Math.sin(w * 0.4) * Math.cos(d * 0.5);
        const rand = (Math.sin(w * 13 + d * 7) + 1) / 2;
        let count = 0;
        if (rand > 0.4) count = Math.floor(rand * 5);
        if (rand > 0.75) count = Math.floor(rand * 12);
        if (w > 18 && rand > 0.3) count += 3;
        days.push({
          dayIndex: d,
          count,
          date: `2025-${String((w % 7) + 6).padStart(2, "0")}-${String(d * 4 + 1).padStart(2, "0")}`,
        });
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const getCellColor = (count: number) => {
    if (count === 0) return "bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-700";
    if (count < 3) return "bg-emerald-200 dark:bg-emerald-900/90";
    if (count < 6) return "bg-emerald-300 dark:bg-emerald-700";
    if (count < 9) return "bg-emerald-400 dark:bg-emerald-500";
    return "bg-emerald-500 dark:bg-emerald-400";
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 select-none">
      <div className="relative rounded-[28px] bg-white dark:bg-neutral-950 p-6 shadow-xl overflow-hidden border-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <span className="text-sm font-semibold tracking-tight text-foreground font-mono">
            1863 contributions in 2025
          </span>
        </div>

        {/* Month labels */}
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono px-1 pb-1.5">
          {MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* Contribution Matrix */}
        <div className="flex gap-1 justify-between pb-4 overflow-x-hidden">
          {gridData.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((day, dIdx) => (
                <Tooltip key={dIdx}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "size-2.5 rounded-[3px] border border-transparent transition-transform duration-150 hover:scale-125 hover:z-10 cursor-pointer",
                        getCellColor(day.count)
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs font-mono">
                    <span>
                      {day.count === 0 ? "No contributions" : `${day.count} contributions`} on {day.date}
                    </span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Top Contributions Strip & Expandable Panel */}
        <div className="rounded-xl bg-muted/40 border border-border/60 p-3 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              Top contributions in:
            </span>

            <div className="flex items-center gap-2">
              {/* Technology Icon Chips */}
              <div className="flex -space-x-1.5 items-center">
                <div className="size-5 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold ring-2 ring-card">
                  <Icons.Terminal className="size-2.5" />
                </div>
                <div className="size-5 rounded-full bg-swatch-blue text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-card">
                  <Icons.Layers className="size-2.5" />
                </div>
                <div className="size-5 rounded-full bg-primary-accent text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-card">
                  <Icons.GitBranch className="size-2.5" />
                </div>
              </div>

              {/* Expand Toggle Button */}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icons.ChevronDown className="size-3.5" />
                </motion.div>
              </Button>
            </div>
          </div>

          {/* Expandable Repository Leaderboard */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="pt-3 space-y-2 border-t border-border/40 mt-3"
              >
                {TOP_REPOS.map((repo) => (
                  <div key={repo.name} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-foreground font-medium">{repo.name}</span>
                      <span className="text-muted-foreground">{repo.count} commits</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${repo.percent}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={cn("h-full rounded-full", repo.color)}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
