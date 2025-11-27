"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { componentRegistry } from "@/src/app/components/_registry";

interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({
  activeComponent,
  setActiveComponent,
  isOpen,
  onToggle,
}: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed z-40",
            "bg-background/95 lg:bg-background/80 backdrop-blur-xl",
            "border-r lg:border border-border lg:rounded-2xl shadow-2xl",
            "overflow-hidden",
            // Mobile: full screen overlay
            "inset-0 w-full h-full",
            // Desktop: floating centered sidebar
            "lg:inset-auto lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:w-[280px] lg:min-h-[calc(100vh-10rem)] lg:h-auto"
          )}
        >
          <div className="w-full h-full overflow-y-auto py-6 px-4 pt-20 lg:pt-6">
            {/* Mobile Close Button */}
            <button
              onClick={onToggle}
              className="lg:hidden absolute top-6 right-4 p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
        
            {/* Navigation */}
        <nav className="space-y-6">
          {componentRegistry.map((category) => (
            <div key={category.category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3 px-2">
                {category.category}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveComponent(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all",
                        activeComponent === item.id
                          ? "bg-foreground/10 text-foreground font-medium"
                          : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {activeComponent === item.id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-1 h-4 bg-pink-500 rounded-full"
                          />
                        )}
                        {item.name}
                      </span>
                      {/* {item.isFree && (
                        <span className="text-[10px] text-foreground/40">
                          free
                        </span>
                      )} */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </motion.aside>
      )}
    </AnimatePresence>
  );
};
