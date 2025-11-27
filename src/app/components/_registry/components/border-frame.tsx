"use client";

import React, { ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { HoverIndicator } from "./hover-indicator";

interface BorderFrameProps {
  children: ReactNode;
  className?: string;
}

export const BorderFrame = ({ children, className }: BorderFrameProps) => {
  return (
    <div className={cn("relative group p-1", className)}>
      {/* Content inside the frame - grayscale by default, color on hover */}
      <div className="w-full h-full overflow-hidden shadow-lg bg-card z-0 grayscale group-hover:grayscale-0 transition-all duration-300">
        {children}
      </div>

      {/* Dashed border - visible on hover with flicker */}
      <div
        className="absolute -inset-1 border-[1.5px] border-dashed z-10 border-flicker !border-accent-foreground/30"
        aria-hidden="true"
      />

      {/* Corner brackets - visible on hover with flicker */}
      <div className="absolute -inset-[2px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        {/* top-left */}
        <div className="absolute -top-0.5 -left-0.5 w-4 h-4">
          <div className="absolute top-0 left-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute top-0 left-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
        {/* top-right */}
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4">
          <div className="absolute top-0 right-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute top-0 right-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
        {/* bottom-left */}
        <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4">
          <div className="absolute bottom-0 left-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute bottom-0 left-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
        {/* bottom-right */}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4">
          <div className="absolute bottom-0 right-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute bottom-0 right-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
      </div>
    </div>
  );
};

// Demo component for preview
export const BorderFrameDemo = () => {
  return (
    <div className="relative">
      <HoverIndicator variant="right" />
      <BorderFrame className="w-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Mountain landscape"
          className="w-full h-48 object-cover"
        />
      </BorderFrame>
    </div>
  );
};

export const borderFrameCode = `import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BorderFrameProps {
  children: ReactNode;
  className?: string;
}

export function BorderFrame({ children, className }: BorderFrameProps) {
  return (
    <div className={cn("relative group p-1", className)}>
      {/* Content - grayscale by default, color on hover */}
      <div className="w-full h-full overflow-hidden shadow-lg bg-card z-0 grayscale group-hover:grayscale-0 transition-all duration-300">
        {children}
      </div>

      {/* Dashed border - visible on hover with flicker */}
      <div
        className="absolute -inset-1 border-[1.5px] border-dashed z-10 border-flicker !border-accent-foreground/30"
        aria-hidden="true"
      />

      {/* Corner brackets - visible on hover with flicker */}
      <div className="absolute -inset-[2px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        {/* top-left */}
        <div className="absolute -top-0.5 -left-0.5 w-4 h-4">
          <div className="absolute top-0 left-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute top-0 left-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
        {/* top-right */}
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4">
          <div className="absolute top-0 right-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute top-0 right-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
        {/* bottom-left */}
        <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4">
          <div className="absolute bottom-0 left-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute bottom-0 left-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
        {/* bottom-right */}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4">
          <div className="absolute bottom-0 right-0 w-2 h-[0.5px] bg-accent-foreground corner-flicker" />
          <div className="absolute bottom-0 right-0 w-[0.5px] h-2 bg-accent-foreground corner-flicker" />
        </div>
      </div>
    </div>
  );
}

/* Add this CSS for the flicker animation */
.border-flicker,
.corner-flicker {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.group:hover .border-flicker,
.group:hover .corner-flicker {
  opacity: 1;
  animation-name: flicker-once;
  animation-duration: 0.4s;
  animation-delay: 0.15s;
}

@keyframes flicker-once {
  0%, 100% { opacity: 1; }
  20% { opacity: 0.4; }
  40% { opacity: 0.9; }
  60% { opacity: 0.5; }
  80% { opacity: 0.85; }
}

// Usage with an image
<BorderFrame className="w-72">
  <img 
    src="/your-image.jpg" 
    alt="Description"
    className="w-full h-48 object-cover"
  />
</BorderFrame>`;

