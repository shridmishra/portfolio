"use client";

import React from "react";
import { motion } from "framer-motion";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { cn } from "@/src/lib/utils";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isOpen, onClick }: ToggleButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed top-4 z-50 p-3 rounded-full bg-background border border-border shadow-lg",
        "hover:bg-foreground/5 transition-colors"
      )}
      animate={{ left: isOpen ? 296 : 16 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <TbLayoutSidebarFilled className={cn("w-5 h-5 transition-transform", !isOpen && "rotate-180")} />
    </motion.button>
  );
};
