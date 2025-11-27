"use client";

import React from "react";

export const GradientText = () => {
  return (
    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient bg-[length:200%_auto]">
      Gradient Text
    </h1>
  );
};

export const gradientTextCode = `const GradientText = () => (
  <h1 className="text-5xl font-bold bg-clip-text text-transparent 
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
    animate-gradient bg-[length:200%_auto]">
    Gradient Text
  </h1>
);`;
