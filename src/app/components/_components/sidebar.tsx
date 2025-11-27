"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { componentRegistry } from "@/src/app/components/_registry";

interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (id: string) => void;
  isOpen: boolean;
}

export const Sidebar = ({
  activeComponent,
  setActiveComponent,
  isOpen,
}: SidebarProps) => {
  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isOpen ? 280 : 0 }}
      className="h-screen border-r border-border overflow-hidden flex-shrink-0 sticky top-0"
    >
      <div className="w-[280px] h-full overflow-y-auto py-6 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg">Components</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          {componentRegistry.map((category) => (
            <div key={category.category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3 px-2">
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
                      {item.isFree && (
                        <span className="text-[10px] text-foreground/40">
                          free
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};
