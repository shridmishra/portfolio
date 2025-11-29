"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Expand, Minimize } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Separator } from "@/src/components/ui/separator";
import { componentRegistry, componentMap, codeMap } from "@/src/app/components/_registry";
import { cn } from "@/src/lib/utils";

interface PreviewAreaProps {
  activeComponent: string;
  sidebarOpen: boolean;
}

export const PreviewArea = ({ activeComponent, sidebarOpen }: PreviewAreaProps) => {
  const [copied, setCopied] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeMap[activeComponent] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ActiveComponentRender = componentMap[activeComponent];
  const activeItem = componentRegistry
    .flatMap((c) => c.items)
    .find((item) => item.id === activeComponent);

  return (
    <div 
      className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 transition-all duration-300 ease-out"
      style={{ marginLeft: sidebarOpen && isDesktop ? 300 : 0 }}
    >
      <div className={cn("max-w-5xl mx-auto transition-all duration-300", isFullscreen ? "max-w-full" : "")}>
        {/* Component Preview */}
        <div className={cn("relative rounded-xl sm:rounded-2xl border border-border bg-foreground/[0.02] flex items-center justify-center overflow-hidden transition-all duration-300", isFullscreen ? "h-screen" : "h-[250px] sm:h-[300px] lg:h-[400px]")}>
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                                linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {ActiveComponentRender && <ActiveComponentRender />}
            </motion.div>
          </AnimatePresence>
            <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/40 transition-colors"
                >
                {isFullscreen ? <Minimize size={18} /> : <Expand size={18} />}
            </button>
        </div>

        {/* Component Info */}
        <div className="mt-8 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {activeItem?.name || "Component"}
            </h1>
            <p className="text-sm sm:text-base text-foreground/60">
              A beautiful {activeItem?.name.toLowerCase()} component with smooth
              animations.
            </p>
          </div>

          <Separator />

          {/* Code Block */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Source Code</h2>
            <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-zinc-900/50 border-b border-zinc-800">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-zinc-500 font-mono hidden sm:inline">{activeItem?.id || "component"}.tsx</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all text-[10px] sm:text-xs font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Copy code</span>
                    </>
                  )}
                </button>
              </div>
              {/* Code Content */}
              <div className="relative">
                <SyntaxHighlighter
                  language="tsx"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: "0.75rem",
                    background: "transparent",
                    fontSize: "0.75rem",
                    lineHeight: "1.5",
                    maxHeight: "350px",
                    overflow: "auto",
                  }}
                  codeTagProps={{
                    style: {
                      background: "transparent",
                    },
                  }}
                  showLineNumbers={false}
                >
                  {codeMap[activeComponent] || "// No code available"}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Dependencies</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-foreground/5 text-xs sm:text-sm text-foreground/70">
                framer-motion
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-foreground/5 text-xs sm:text-sm text-foreground/70">
                tailwindcss
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-foreground/5 text-xs sm:text-sm text-foreground/70">
                gsap
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
