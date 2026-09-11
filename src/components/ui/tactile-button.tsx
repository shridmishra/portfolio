"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { ArrowRight } from "lucide-react";

export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "framer" | "primary" | "glass" | "dark" | "outline";
  size?: "default" | "sm" | "lg" | "framer";
  shape?: "pill" | "rounded";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export function TactileButton({
  children = "Explore Agents",
  variant = "framer",
  size = "framer",
  shape = "pill",
  icon,
  isLoading = false,
  className,
  disabled,
  ...props
}: TactileButtonProps) {
  const variantStyles = {
    framer:
      "btn-framer-gradient text-white font-medium shadow-cta-framer hover:shadow-cta-framer-hover hover:brightness-105 active:scale-[0.99] border-none",
    primary:
      "bg-primary text-primary-foreground font-medium shadow-[0_10px_25px_-4px_rgba(0,0,0,0.22),0_4px_10px_-2px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_16px_34px_-4px_rgba(0,0,0,0.30),0_6px_14px_-2px_rgba(0,0,0,0.18)] active:scale-[0.99]",
    glass:
      "bg-white/80 dark:bg-black/60 text-foreground border border-neutral-200 dark:border-neutral-800 shadow-[0_10px_25px_-4px_rgba(0,0,0,0.08),0_4px_10px_-2px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.8)] dark:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.15)] hover:shadow-[0_16px_34px_-4px_rgba(0,0,0,0.14),0_6px_14px_rgba(0,0,0,0.08)] hover:bg-white dark:hover:bg-neutral-900 backdrop-blur-md",
    dark:
      "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium shadow-[0_10px_25px_-4px_rgba(0,0,0,0.32),0_4px_10px_-2px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_16px_34px_-4px_rgba(0,0,0,0.42),0_6px_14px_-2px_rgba(0,0,0,0.22)] hover:bg-neutral-800 dark:hover:bg-neutral-100",
    outline:
      "bg-transparent text-blue-600 dark:text-blue-400 border border-blue-600/30 dark:border-blue-400/40 shadow-[0_6px_16px_-2px_rgba(53,87,255,0.16),0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_24px_-2px_rgba(53,87,255,0.26),0_3px_8px_rgba(0,0,0,0.08)] hover:bg-blue-50/50 dark:hover:bg-blue-950/30",
  };

  const sizeStyles = {
    framer: "h-[48px] min-w-[180px] ps-6 pe-2.5 py-0 text-sm font-medium gap-3.5",
    default: "h-11 px-5 py-2.5 text-sm gap-2.5",
    sm: "h-9 px-3.5 py-1 text-xs gap-2",
    lg: "h-13 px-6 py-3 text-base gap-3",
  };

  const shapeStyles = {
    pill: "rounded-full",
    rounded: "rounded-2xl",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-between whitespace-nowrap select-none outline-none transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        shapeStyles[shape],
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {icon !== undefined ? (
        icon
      ) : (
        <div
          className={cn(
            "size-7.5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
            variant === "framer"
              ? "bg-white text-blue-600 dark:text-blue-500 shadow-xs"
              : variant === "primary"
              ? "bg-white/20 text-white"
              : variant === "dark"
              ? "bg-white/20 dark:bg-black/20 text-current"
              : "bg-neutral-100 dark:bg-neutral-800 text-current"
          )}
        >
          <ArrowRight className="size-3.5" strokeWidth={2.2} />
        </div>
      )}
    </button>
  );
}
