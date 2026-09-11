"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Icons } from "@/src/components/ui/icons";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface ProximitySidebarPreviewProps {
  accent?: string;
}

const ICONS = [
  { id: 1, icon: Icons.Compass, label: "Explore" },
  { id: 2, icon: Icons.Folder, label: "Files" },
  { id: 3, icon: Icons.Terminal, label: "Console" },
  { id: 4, icon: Icons.Layers, label: "Layers" },
  { id: 5, icon: Icons.Settings, label: "Settings" },
  { id: 6, icon: Icons.ShieldCheck, label: "Security" },
];

function DockItem({
  icon: Icon,
  mouseX,
  accent,
}: {
  icon: any;
  mouseX: any;
  accent: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 68, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const getAccentBg = () => {
    switch (accent) {
      case "purple":
        return "hover:bg-swatch-purple hover:text-white";
      case "white":
        return "hover:bg-swatch-white hover:text-black dark:hover:bg-white dark:hover:text-black";
      case "rose":
        return "hover:bg-swatch-rose hover:text-white";
      case "blue":
        return "hover:bg-swatch-blue hover:text-white";
      case "red":
        return "hover:bg-swatch-red hover:text-white";
      case "green":
        return "hover:bg-swatch-green hover:text-white";
      case "orange":
        return "hover:bg-swatch-orange hover:text-white";
      default:
        return "hover:bg-primary-accent hover:text-white";
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="aspect-square flex items-center justify-center"
    >
      <Button
        variant="ghost"
        className={cn(
          "size-full rounded-2xl bg-muted/60 border border-border/60 shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-150 p-0 min-h-0 min-w-0",
          getAccentBg()
        )}
      >
        <Icon className="size-5 shrink-0" />
      </Button>
    </motion.div>
  );
}

export function ProximitySidebarPreview({ accent = DEFAULT_PRIMARY_SWATCH }: ProximitySidebarPreviewProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 select-none gap-6">
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-20 items-end gap-3 rounded-3xl bg-card border border-border/80 px-4 pb-3 shadow-2xl"
      >
        {ICONS.map((item) => (
          <DockItem key={item.id} icon={item.icon} mouseX={mouseX} accent={accent} />
        ))}
      </div>

      <span className="text-xs font-mono text-muted-foreground">
        Move cursor horizontally across the dock to experience magnetic proximity scaling
      </span>
    </div>
  );
}
