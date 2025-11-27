"use client";

import React from "react";

export const GlassCard = () => {
  return (
    <div className="relative w-72 h-40 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
        <div>
          <p className="text-foreground/60 text-sm">Glass Card</p>
          <p className="text-foreground font-medium">Beautiful glassmorphism</p>
        </div>
      </div>
    </div>
  );
};

export const glassCardCode = `const GlassCard = () => (
  <div className="relative w-72 h-40 rounded-2xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 
      to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl" />
    <div className="absolute inset-0 bg-gradient-to-br 
      from-purple-500/10 via-transparent to-pink-500/10" />
    <div className="relative p-6 h-full flex flex-col justify-between">
      <div className="w-10 h-10 rounded-full 
        bg-gradient-to-br from-purple-400 to-pink-400" />
      <div>
        <p className="text-sm opacity-60">Glass Card</p>
        <p className="font-medium">Beautiful glassmorphism</p>
      </div>
    </div>
  </div>
);`;
