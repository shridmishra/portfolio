"use client";

import React, { type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  href?: string;
}

export function CtaButton({
  className,
  text = "Book a 15 min call",
  href = "https://cal.com/shridmishra",
  onClick,
  ...props
}: CtaButtonProps) {
  const content = (
    <div className={cn("relative inline-block rounded-full", className)}>
      <button
        className={cn(
          "group relative rounded-full cursor-pointer w-full text-left",
          "shadow-[0_8px_20px_-2px_rgba(0,0,0,0.12),0_3px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_28px_-2px_rgba(0,0,0,0.18),0_4px_10px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-all duration-200"
        )}
        onClick={onClick}
        {...props}
      >
        {/* Ambient Glow / Hover Border Background: visible in idle, blooms on hover */}
        <div
          className="absolute inset-[-1.5px] group-hover:inset-[-5px] opacity-30 group-hover:opacity-100 rounded-full overflow-hidden transition-all duration-300 z-0"
          style={{
            background:
              "linear-gradient(to top right, #60a5fa, #60a5fa 25%, #f472b6 60%, #ffccd5 75%, #ffba00)",
          }}
        >
          {/* Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Outer Border Wrapper */}
        <div className="absolute inset-[-1.5px] bg-neutral-200 dark:bg-neutral-800 rounded-full z-10 pointer-events-none" />

        {/* Button Content Container */}
        <div className="relative z-20 flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] py-2.5 px-5 bg-white text-neutral-900 dark:bg-black dark:text-white rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] dark:group-hover:brightness-125 transition-all duration-200">
          {/* Google Meet multicolor SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 87.5 72"
            className="w-5 h-5 shrink-0"
          >
            <path fill="#00832d" d="M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z" />
            <path fill="#0066da" d="M0 51.5V66 c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z" />
            <path fill="#e94235" d="M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z" />
            <path fill="#2684fc" d="M20.5 20.5H0v31h20.5z" />
            <path fill="#00ac47" d="M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.135 4.85-2.37V11c0-2.535-2.945-3.925-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z" />
            <path fill="#ffba00" d="M63.5 0h-43v20.5h29V36l20-16.57V6c0-3.315-2.685-6-6-6z" />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap">
            {text}
          </span>
        </div>
      </button>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}
