"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";
import { Icons } from "@/src/components/ui/icons";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { cn } from "@/src/lib/utils";

import {
  COMPONENTS_REGISTRY,
} from "@/src/components/ui-showcase/registry";

import { MangoCardsPreview } from "@/src/components/ui-showcase/MangoCardsPreview";
import { MediaPlayerPreview } from "@/src/components/ui-showcase/MediaPlayerPreview";
import { ColorPalettePreview } from "@/src/components/ui-showcase/ColorPalettePreview";
import { GuitarStringPreview } from "@/src/components/ui-showcase/GuitarStringPreview";
import { StampCollectionPreview } from "@/src/components/ui-showcase/StampCollectionPreview";
import { CodeDrawer } from "@/src/components/ui-showcase/CodeDrawer";

const CATEGORIES = ["CARDS", "MEDIA", "INTERACTIVE"] as const;

const DEFAULT_COMPONENT = "stamp-collection";

const ZOOM_CONFIG: Record<string, { default: number; min: number; max: number; step: number }> = {
  "stamp-collection":       { default: 0.75, min: 0.4,  max: 1.2,  step: 0.1  },
  "color-palette-showcase": { default: 1.0,  min: 0.35, max: 1.25, step: 0.15 },
};

export default function ShowcasePage() {
  return (
    <React.Suspense fallback={<div className="h-screen w-screen bg-background" />}>
      <ShowcaseContent />
    </React.Suspense>
  );
}

function ShowcaseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const activeId = searchParams.get("c") ?? DEFAULT_COMPONENT;

  const setActiveId = React.useCallback(
    (id: string) => {
      router.replace(`/ui?c=${id}`, { scroll: false });
    },
    [router]
  );

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isCodeDrawerOpen, setIsCodeDrawerOpen] = React.useState(false);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  // Zoom state — shared action-island controls for zoomable components
  const [zoomScale, setZoomScale] = React.useState<number>(
    ZOOM_CONFIG[searchParams.get("c") ?? DEFAULT_COMPONENT]?.default ?? 1
  );

  const activeZoomConfig = ZOOM_CONFIG[activeId];
  const supportsZoom = !!activeZoomConfig;
  const canZoomOut = supportsZoom && zoomScale > (activeZoomConfig.min + 0.001);
  const canZoomIn  = supportsZoom && zoomScale < (activeZoomConfig.max - 0.001);

  // Reset zoom to per-component default when switching
  React.useEffect(() => {
    setZoomScale(ZOOM_CONFIG[activeId]?.default ?? 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const handleZoomOut = () => {
    if (!activeZoomConfig) return;
    setZoomScale((s) => Math.max(activeZoomConfig.min, +(s - activeZoomConfig.step).toFixed(2)));
  };
  const handleZoomIn = () => {
    if (!activeZoomConfig) return;
    setZoomScale((s) => Math.min(activeZoomConfig.max, +(s + activeZoomConfig.step).toFixed(2)));
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeComponent = React.useMemo(() => {
    return (
      COMPONENTS_REGISTRY.find((c) => c.id === activeId) ??
      COMPONENTS_REGISTRY[0]
    );
  }, [activeId]);

  const renderActivePreview = () => {
    switch (activeComponent.id) {
      case "mango-cards":
        return <MangoCardsPreview />;
      case "media-player":
        return <MediaPlayerPreview />;
      case "color-palette-showcase":
        return (
          <ColorPalettePreview
            isSidebarOpen={isSidebarOpen}
            scale={zoomScale}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onScaleChange={setZoomScale}
          />
        );
      case "guitar-string":
        return <GuitarStringPreview />;
      case "stamp-collection":
        return <StampCollectionPreview embedded />;
      default:
        return <MangoCardsPreview />;
    }
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground flex overflow-hidden font-sans select-none p-4 md:p-6 lg:p-7 relative">
      {/* 0. Persistent Sidebar Toggle Button - NEVER moves from its position */}
      <div className="absolute top-0 left-0 p-4 md:p-6 lg:p-7 pointer-events-none z-30">
        <div className="pt-2 pl-3">
          <div className="pt-0.5 pointer-events-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={cn(
                    "size-8 rounded-lg text-foreground p-0 transition-all duration-200 flex items-center justify-center cursor-pointer",
                    isSidebarOpen
                      ? "hover:bg-muted"
                      : "bg-card/90 backdrop-blur-md border border-border/40 shadow-xs hover:bg-muted"
                  )}
                  aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                  <Icons.Sidebar size={22} className="size-5.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* 1. Left Sidebar Navigation */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: 220, opacity: 1, marginRight: 28 }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="h-full flex flex-col shrink-0 select-none pt-2 pr-2 pb-2 pl-3 rounded-[20px] overflow-hidden z-20"
          >
            {/* Top Toggle Button Placeholder (preserves exact spacing for Components heading) */}
            <div className="pt-0.5 shrink-0">
              <div className="size-8" aria-hidden="true" />
            </div>

            {/* Components Heading & Navigation - Scrollable independently */}
            <div className="mt-6 space-y-6 flex-1 relative overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-[200px] shrink-0">
              <span className="text-[15px] font-semibold tracking-tight text-foreground block">
                Components
              </span>

              {CATEGORIES.map((category) => {
                const items = COMPONENTS_REGISTRY.filter(
                  (c) => c.category === category
                );
                if (items.length === 0) return null;

                const activeIndex = items.findIndex((item) => item.id === activeId);
                const hoveredIndex = items.findIndex((item) => item.id === hoveredId);
                const hasActiveItem = activeIndex !== -1;
                const hasHoveredItem = hoveredIndex !== -1 && hoveredIndex !== activeIndex;

                const activeY = hasActiveItem ? activeIndex * 28 + 14 : 0;
                const hoveredY = hasHoveredItem ? hoveredIndex * 28 + 14 : 0;

                const getHoveredPath = () => {
                  if (!hasHoveredItem) return "";
                  if (hasActiveItem && hoveredIndex > activeIndex) {
                    return `M 4 ${activeY} V ${Math.max(activeY, hoveredY - 5)} Q 4 ${hoveredY} 9 ${hoveredY} H 15`;
                  }
                  return `M 4 0 V ${Math.max(0, hoveredY - 5)} Q 4 ${hoveredY} 9 ${hoveredY} H 15`;
                };

                return (
                  <div key={category} className="space-y-1.5 relative">
                    <span className="text-[12.5px] tracking-wider text-muted-foreground uppercase block font-semibold">
                      {category}
                    </span>

                    <div className="relative">
                      {/* Dotted Tree Branch Indicators (Active Orange + Hover Grey) */}
                      {(hasActiveItem || hasHoveredItem) && (
                        <svg
                          className="absolute left-0 top-0 w-6 h-full pointer-events-none z-10 overflow-visible"
                          viewBox={`0 0 24 ${items.length * 28}`}
                          fill="none"
                        >
                          {/* Grey Dotted Hover Branch Indicator */}
                          <AnimatePresence>
                            {hasHoveredItem && (
                              <motion.path
                                key="hover-path"
                                d={getHoveredPath()}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, d: getHoveredPath() }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                stroke="currentColor"
                                className="text-muted-foreground/45 dark:text-muted-foreground/55"
                                strokeWidth="1.25"
                                strokeDasharray="2 2"
                                strokeLinecap="round"
                                fill="none"
                              />
                            )}
                          </AnimatePresence>

                          {/* Dotted App UI Active Tree Branch Indicator - Fixed to App UI Accent */}
                          {hasActiveItem && (
                            <motion.path
                              d={`M 4 0 V ${Math.max(0, activeY - 5)} Q 4 ${activeY} 9 ${activeY} H 15`}
                              stroke="var(--color-app-accent)"
                              strokeWidth="1.25"
                              strokeDasharray="2 2"
                              strokeLinecap="round"
                              fill="none"
                              initial={false}
                              animate={{
                                d: `M 4 0 V ${Math.max(0, activeY - 5)} Q 4 ${activeY} 9 ${activeY} H 15`,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 28,
                              }}
                            />
                          )}
                        </svg>
                      )}

                      <div
                        className="space-y-0"
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {items.map((item) => {
                          const isActive = item.id === activeId;
                          const isHovered = item.id === hoveredId;

                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                setActiveId(item.id);
                              }}
                              onMouseEnter={() => setHoveredId(item.id)}
                              className={cn(
                                "group relative flex items-center h-[28px] text-[13.5px] cursor-pointer transition-colors duration-150 pl-6 rounded-md",
                                isActive
                                  ? "text-foreground font-medium"
                                  : isHovered
                                  ? "text-foreground"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <span className="truncate">{item.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Subtle Gradient Fade */}
              <div className="pointer-events-none sticky bottom-0 inset-x-0 h-10 bg-gradient-to-t from-background to-transparent shrink-0" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. Center Stage: Full Height Rounded Slab */}
      <main className="flex-1 h-full flex items-center justify-center min-w-0 relative">
        <div
          className={cn(
            "relative w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl h-full rounded-[32px] md:rounded-[36px] bg-stage-slab flex flex-col items-center justify-center transition-all duration-300 overflow-hidden",
            activeComponent.id === "color-palette-showcase"
              ? "p-0"
              : "p-4 sm:p-6 md:p-8"
          )}
        >
            {/* Floating Action Island (Anchored inside the Center Stage) */}
          <div className="absolute top-5 right-5 z-30 select-none">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-stage-action-pill/95 backdrop-blur-md border border-border/50 shadow-xs">
              {/* Zoom Controls — only visible for zoomable components */}
              <AnimatePresence>
                {supportsZoom && (
                  <motion.div
                    key="zoom-controls"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center gap-0.5 overflow-hidden"
                  >
                    {/* Zoom Out */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={handleZoomOut}
                          disabled={!canZoomOut}
                          className="rounded-full size-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-35 disabled:cursor-not-allowed"
                          aria-label="Zoom out"
                        >
                          <Icons.Minus className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Zoom out
                      </TooltipContent>
                    </Tooltip>

                    {/* Zoom label */}
                    <span className="text-[11px] font-medium tabular-nums text-muted-foreground w-9 text-center">
                      {Math.round(zoomScale * 100)}%
                    </span>

                    {/* Zoom In */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={handleZoomIn}
                          disabled={!canZoomIn}
                          className="rounded-full size-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-35 disabled:cursor-not-allowed"
                          aria-label="Zoom in"
                        >
                          <Icons.Plus className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Zoom in
                      </TooltipContent>
                    </Tooltip>

                    {/* Divider */}
                    <div className="w-px h-4 bg-border/60 mx-0.5 shrink-0" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Home Link */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    asChild
                    className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted size-7 p-0 cursor-pointer"
                  >
                    <Link href="/" aria-label="Home">
                      <Icons.Home className="size-3.5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Home
                </TooltipContent>
              </Tooltip>

              {/* Code & Usage Drawer Toggle (in place of full screen icon) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setIsCodeDrawerOpen(!isCodeDrawerOpen)}
                    className={cn(
                      "rounded-full size-7 p-0 cursor-pointer transition-colors",
                      isCodeDrawerOpen
                        ? "text-foreground bg-muted/80"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    aria-label="Code and usage"
                  >
                    <Icons.Code className="size-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Code &amp; usage
                </TooltipContent>
              </Tooltip>

              {/* Theme Toggle Button */}
              <ThemeToggle
                size="icon-xs"
                iconSize={15}
                className="rounded-full text-foreground hover:text-foreground hover:bg-muted size-7 flex items-center justify-center p-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Live Component Preview Centered inside */}
          <div
            className={cn(
              "w-full h-full flex-1 flex items-center justify-center relative z-10",
              activeComponent.id === "color-palette-showcase" && "absolute inset-0"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComponent.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex items-center justify-center"
              >
                {/* Zoom wrapper — CSS scale for stamp-collection; color-palette manages its own GSAP scale */}
                <motion.div
                  animate={{ scale: activeId === "stamp-collection" ? zoomScale : 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {renderActivePreview()}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Right Code & Usage Drawer */}
      <CodeDrawer
        isOpen={isCodeDrawerOpen}
        onClose={() => setIsCodeDrawerOpen(false)}
        component={activeComponent}
      />
    </div>
  );
}
