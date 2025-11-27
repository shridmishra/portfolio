import React from "react";
import { cn } from "@/src/lib/utils";

interface HoverIndicatorProps {
  className?: string;
  text?: string;
  variant?: "center" | "right";
}

export const HoverIndicator = ({
  className,
  text = "hover me",
  variant = "center",
}: HoverIndicatorProps) => {
  return (
    <div
      className={cn(
        "absolute flex flex-col text-foreground/50 pointer-events-none",
        variant === "center" && "-top-16 left-1/2 -translate-x-1/2 items-center",
        variant === "right" && "-top-16 -right-16 items-start",
        className
      )}
    >
      <span className="text-xs font-medium italic ml-4 -mb-0.5">{text}</span>
      <svg
        width={variant === "center" ? "36" : "40"}
        height={variant === "center" ? "36" : "40"}
        viewBox="0 0 50 50"
        fill="none"
      >
        {variant === "center" ? (
          <>
            <path
              d="M 25 5 Q 35 12 25 18 Q 15 24 25 30 L 25 35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 25 35 L 21 31 M 25 35 L 29 31"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              d="M 45 10 Q 25 15 30 25 Q 35 35 15 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 15 40 L 20 35 M 15 40 L 20 45"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
};
