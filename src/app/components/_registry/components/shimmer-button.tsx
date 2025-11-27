"use client";

import React from "react";

export const ShimmerButton = () => {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-6 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
        Shimmer Effect
      </span>
    </button>
  );
};

export const shimmerButtonCode = `const ShimmerButton = () => (
  <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
      bg-[conic-gradient(from_90deg,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full items-center justify-center 
      rounded-full bg-background px-6 py-3 backdrop-blur-3xl">
      Shimmer Effect
    </span>
  </button>
);`;
