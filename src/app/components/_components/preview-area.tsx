"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { componentRegistry, componentMap, codeMap } from "@/src/app/components/_registry";

interface PreviewAreaProps {
  activeComponent: string;
}

// Simple syntax highlighting for JSX/TSX
const highlightCode = (code: string) => {
  // Keywords
  const keywords = /(\b(const|let|var|function|return|import|export|from|if|else|for|while|class|extends|new|this|typeof|instanceof)\b)/g;
  // Strings
  const strings = /("[^"]*"|'[^']*'|`[^`]*`)/g;
  // Comments
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  // Numbers
  const numbers = /(\b\d+\.?\d*\b)/g;

  const highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(comments, '<span class="text-gray-500">$1</span>')
    .replace(strings, '<span class="text-green-400">$1</span>')
    .replace(keywords, '<span class="text-purple-400">$1</span>')
    .replace(/&lt;\/?([a-zA-Z][a-zA-Z0-9.]*)/g, '<span class="text-pink-400">&lt;$1</span>')
    .replace(numbers, '<span class="text-orange-400">$1</span>')
    .replace(/className=/g, '<span class="text-cyan-400">className</span>=')
    .replace(/onClick=/g, '<span class="text-cyan-400">onClick</span>=')
    .replace(/onMouseMove=/g, '<span class="text-cyan-400">onMouseMove</span>=')
    .replace(/onMouseLeave=/g, '<span class="text-cyan-400">onMouseLeave</span>=');

  return highlighted;
};

export const PreviewArea = ({ activeComponent }: PreviewAreaProps) => {
  const [copied, setCopied] = useState(false);

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
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Component Preview */}
        <div className="relative rounded-2xl border border-border bg-foreground/[0.02] min-h-[400px] flex items-center justify-center overflow-hidden">
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
        </div>

        {/* Component Info */}
        <div className="mt-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {activeItem?.name || "Component"}
            </h1>
            <p className="text-foreground/60">
              A beautiful {activeItem?.name.toLowerCase()} component with smooth
              animations.
            </p>
          </div>

          <Separator />

          {/* Code Block */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Source Code</h2>
            <div className="relative rounded-xl bg-[#0d0d0d] border border-border overflow-hidden group">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-white/50 ml-2">component.tsx</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                <code 
                  className="text-white/90"
                  dangerouslySetInnerHTML={{ __html: highlightCode(codeMap[activeComponent] || "") }}
                />
              </pre>
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Dependencies</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-foreground/5 text-sm text-foreground/70">
                framer-motion
              </span>
              <span className="px-3 py-1 rounded-full bg-foreground/5 text-sm text-foreground/70">
                tailwindcss
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
