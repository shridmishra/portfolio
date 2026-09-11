"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";

interface EmojiReactionPreviewProps {
  accent?: string;
}

const EMOJIS = [
  { id: "fire", char: "🔥", label: "Fire" },
  { id: "heart", char: "❤️", label: "Love" },
  { id: "rocket", char: "🚀", label: "Rocket" },
  { id: "clap", char: "👏", label: "Clap" },
  { id: "party", char: "🎉", label: "Party" },
];

interface FloatingParticle {
  id: number;
  char: string;
  x: number;
  y: number;
}

export function EmojiReactionPreview({}: EmojiReactionPreviewProps) {
  const [particles, setParticles] = React.useState<FloatingParticle[]>([]);
  const [counts, setCounts] = React.useState<Record<string, number>>({
    fire: 14,
    heart: 28,
    rocket: 9,
    clap: 42,
    party: 19,
  });

  const handleTrigger = (emoji: typeof EMOJIS[0], e: React.MouseEvent) => {
    setCounts((prev) => ({ ...prev, [emoji.id]: prev[emoji.id] + 1 }));

    const newParticle: FloatingParticle = {
      id: Date.now() + Math.random(),
      char: emoji.char,
      x: (Math.random() - 0.5) * 60,
      y: -60 - Math.random() * 40,
    };

    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 select-none relative gap-6">
      <div className="relative p-2 rounded-3xl bg-card border border-border/80 shadow-2xl flex items-center gap-2">
        {EMOJIS.map((emoji) => (
          <div key={emoji.id} className="relative flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleTrigger(emoji, e)}
              className="size-12 rounded-2xl bg-muted/40 hover:bg-muted text-xl flex items-center justify-center transition-transform active:scale-90 p-0 min-h-0 min-w-0"
            >
              {emoji.char}
            </Button>
            <span className="text-[10px] font-mono text-muted-foreground pt-1">
              {counts[emoji.id]}
            </span>
          </div>
        ))}

        {/* Floating Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: p.y, x: p.x * 1.5, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-1/2 top-0 pointer-events-none text-2xl"
            >
              {p.char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <span className="text-xs font-mono text-muted-foreground">
        Click any reaction to spawn interactive floating particles
      </span>
    </div>
  );
}
