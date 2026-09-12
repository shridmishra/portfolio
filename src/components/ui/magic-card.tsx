"use client";

import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useTheme } from "next-themes";

export interface MagicCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}


export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  gradientSize = 200,
  gradientColor,
  gradientOpacity = 0.8,
  ...props
}) => {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const {theme} = useTheme();
   const finalGradientColor =
    gradientColor ??
    (theme === "dark"
      ? "rgba(38, 38, 38, 0.6)" // dark mode default
      : "rgba(252, 252, 252, 0.6)"); // light mode default


  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex size-full flex-col overflow-hidden border border-border/50 bg-card text-foreground shadow-sm transition-all duration-300 hover:border-border/40 hover:shadow-lg",
        "min-h-[80px]", 
        className
      )}
      {...props}
    >
      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col flex-1">{children}</div>

      {/* Gradient Hover Effect */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px  opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${finalGradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
};