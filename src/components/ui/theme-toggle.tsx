"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { Button } from "@/src/components/ui/button";
import { ThemeToggleIcon } from "@/src/components/ui/icons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";

export function useThemeTransition() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(
    async (
      customOrigin?: { x: number; y: number } | React.MouseEvent<HTMLElement> | null
    ) => {
      // Play tactile click sound
      try {
        const audio = new Audio("/click.wav");
        audio.play().catch(() => {});
      } catch {
        // Audio error ignored
      }

      const current = resolvedTheme ?? theme;
      const nextTheme = current === "dark" ? "light" : "dark";

      // If View Transitions API is not supported or reduced motion is preferred
      if (
        typeof document === "undefined" ||
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(nextTheme);
        return;
      }

      // Origin precisely from the top right corner (window width - 40px, 40px)
      let x = typeof window !== "undefined" ? window.innerWidth - 40 : 0;
      let y = typeof window !== "undefined" ? 40 : 0;

      if (
        customOrigin &&
        "x" in customOrigin &&
        typeof customOrigin.x === "number" &&
        typeof customOrigin.y === "number"
      ) {
        x = customOrigin.x;
        y = customOrigin.y;
      }

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
        // Synchronously toggle the 'dark' class on root so the snapshot immediately reflects the new theme
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
      });

      try {
        await transition.ready;
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
      } catch {
        // Animation fallback
      }
    },
    [theme, setTheme, resolvedTheme]
  );

  return { toggleTheme, theme, resolvedTheme };
}

export interface ThemeToggleProps extends React.ComponentProps<typeof Button> {
  iconSize?: number;
  showTooltip?: boolean;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}

export function ThemeToggle({
  className,
  size = "icon",
  variant = "ghost",
  iconSize,
  showTooltip = true,
  tooltipSide = "bottom",
  onClick,
  ...props
}: ThemeToggleProps) {
  const { toggleTheme } = useThemeTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Triggers circular transition cleanly from the top right corner
    toggleTheme();
    onClick?.(e);
  };

  const calculatedIconSize =
    iconSize ?? (size === "icon-xs" ? 16 : size === "icon-sm" ? 16 : 18);

  const buttonElement = (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      data-slot="theme-toggle"
      className={cn("rounded-full cursor-pointer", className)}
      {...props}
    >
      <ThemeToggleIcon
        size={calculatedIconSize}
        className="text-foreground shrink-0 transition-transform duration-300 active:scale-90"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  if (!showTooltip) {
    return buttonElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
      <TooltipContent side={tooltipSide} className="text-xs">
        Toggle theme
      </TooltipContent>
    </Tooltip>
  );
}
