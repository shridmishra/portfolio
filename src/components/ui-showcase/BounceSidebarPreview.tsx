"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/src/components/ui/icons";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface BounceSidebarPreviewProps {
  accent?: string;
}

const NAV_ITEMS = [
  { id: "home", icon: Icons.Home, label: "Home" },
  { id: "explore", icon: Icons.Compass, label: "Explore" },
  { id: "projects", icon: Icons.Folder, label: "Projects" },
  { id: "search", icon: Icons.Search, label: "Search" },
  { id: "notifications", icon: Icons.Bell, label: "Alerts" },
  { id: "settings", icon: Icons.Settings, label: "Settings" },
];

const MotionButton = motion.create(Button);

export function BounceSidebarPreview({ accent = DEFAULT_PRIMARY_SWATCH }: BounceSidebarPreviewProps) {
  const [active, setActive] = React.useState("home");

  const getAccentBg = () => {
    switch (accent) {
      case "purple":
        return "bg-swatch-purple text-white";
      case "white":
        return "bg-swatch-white text-black dark:bg-white dark:text-black";
      case "rose":
        return "bg-swatch-rose text-white";
      case "blue":
        return "bg-swatch-blue text-white";
      case "red":
        return "bg-swatch-red text-white";
      case "green":
        return "bg-swatch-green text-white";
      case "orange":
        return "bg-swatch-orange text-white";
      default:
        return "bg-primary-accent text-white";
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-8 select-none">
      <div className="p-2 rounded-3xl bg-card border border-border/80 shadow-2xl flex flex-col gap-1.5 w-16 items-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <MotionButton
              key={item.id}
              variant="ghost"
              size="icon"
              onClick={() => setActive(item.id)}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className={cn(
                "relative size-11 rounded-2xl flex items-center justify-center transition-colors duration-200 cursor-pointer min-h-0 min-w-0 p-0",
                isActive ? getAccentBg() : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <Icon className="size-5" />

              {isActive && (
                <motion.div
                  layoutId="bounce-active-pill"
                  className="absolute -right-2 top-2 bottom-2 w-1 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </MotionButton>
          );
        })}
      </div>
    </div>
  );
}
