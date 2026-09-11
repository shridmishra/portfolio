'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/button';
import { Icons } from '@/src/components/ui/icons';
import { DEFAULT_PRIMARY_SWATCH } from '@/src/lib/ui-theme';

interface NotificationBellProps {
  color?: string;
}

export function NotificationBellPreview({ color = DEFAULT_PRIMARY_SWATCH }: NotificationBellProps) {
  const [count, setCount] = useState<number>(8);
  const [swing, setSwing] = useState<number>(0);
  const clickHistory = useRef<number[]>([]);

  // Color mapping from swatches to Apple system palette
  const getBadgeColor = () => {
    switch (color) {
      case 'white':
        return 'bg-white text-black border border-neutral-200';
      case 'purple':
      case 'violet':
        return 'bg-[#AF52DE] text-white';
      case 'rose':
        return 'bg-[#F43F5E] text-white';
      case 'pink':
        return 'bg-[#EC4899] text-white';
      case 'orange':
        return 'bg-[#FF9500] text-white';
      case 'green':
        return 'bg-[#34C759] text-white';
      case 'blue':
        return 'bg-[#007AFF] text-white';
      case 'red':
        return 'bg-[#FF3B30] text-white';
      default:
        return 'bg-[#AF52DE] text-white';
    }
  };

  const handleIncrement = () => {
    const now = Date.now();
    clickHistory.current = clickHistory.current.filter((t) => now - t < 1000);
    clickHistory.current.push(now);
    setSwing((prev) => prev + 1);
    setCount((c) => Math.min(99, c + 1));
  };

  const handleDecrement = () => {
    setCount((c) => Math.max(0, c - 1));
  };

  const swingIntensity = Math.min(
    28,
    14 + (clickHistory.current.length > 1 ? clickHistory.current.length * 4 : 0)
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 select-none">
      {/* iOS Style Bell Trigger Button */}
      <div className="relative flex items-center justify-center">
        <motion.div
          key={swing}
          animate={{
            rotate: [
              0,
              -swingIntensity,
              swingIntensity * 0.8,
              -swingIntensity * 0.5,
              swingIntensity * 0.25,
              0,
            ],
          }}
          transition={{
            duration: 0.65,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ transformOrigin: 'top center' }}
          className="relative cursor-pointer"
          onClick={handleIncrement}
        >
          <div className="size-16 rounded-2xl bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center transition-colors">
            {/* iOS Bell SVG Icon */}
            <svg
              className="size-8 text-neutral-800 dark:text-neutral-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
        </motion.div>

        {/* Unread Count Badge */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className={`absolute -top-2 -right-2 min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center font-semibold text-xs shadow-md pointer-events-none ${getBadgeColor()}`}
            >
              {/* Rolling Number */}
              <div className="relative h-4 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={count}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="block leading-none"
                  >
                    {count > 99 ? '99+' : count}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Plus / Minus Controls */}
      <div className="flex items-center gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xs">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleDecrement}
          disabled={count === 0}
          className="size-8 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 text-foreground disabled:opacity-30 p-0"
        >
          <Icons.Minus className="size-4" />
        </Button>

        <span className="text-xs font-semibold px-2 text-foreground min-w-8 text-center">
          {count}
        </span>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleIncrement}
          className="size-8 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 text-foreground p-0"
        >
          <Icons.Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
