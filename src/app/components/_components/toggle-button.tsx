"use client";

import React from "react";
import { motion } from "framer-motion";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { Home, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isOpen, onClick }: ToggleButtonProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "light" ? "dark" : "light";

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(newTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div className="fixed top-4 sm:top-6 left-3 sm:left-4 z-50 flex items-center gap-1.5 sm:gap-2">
      {/* Island with Home and Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-background/80 backdrop-blur-xl border border-border shadow-lg h-9 sm:h-10"
      >
        <Link
          href="/"
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg hover:bg-foreground/10 transition-colors"
        >
          <Home className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </Link>
        <div className="w-px h-4 sm:h-5 bg-border" />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg hover:bg-foreground/10 transition-colors relative"
        >
          <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </button>
      </motion.div>

      {/* Sidebar Toggle Button */}
      <motion.button
        onClick={onClick}
        className={cn(
          "flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background/80 backdrop-blur-xl border border-border shadow-lg",
          "hover:bg-foreground/5 transition-colors"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <TbLayoutSidebarFilled className={cn("w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300", isOpen && "rotate-180")} />
      </motion.button>
    </div>
  );
};
