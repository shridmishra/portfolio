"use client"

import React from "react";
import GitHubContributionGraph from "@/src/components/bento/Github";
import { SkillsCarousel } from "@/src/components/bento/Skills";
import { FolderIcon } from "@/src/components/bento/FolderIcon";
import { Separator } from "../ui/separator";

export default function BentoGrid() {


  return (
    <div className="w-full max-w-3xl mx-auto">
    



      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 pt-4 lg:pt-8">
        {/* Top Left - Folder */}
        <div className="bg-card rounded-xl shadow-md border border-edge flex items-center justify-center min-h-[120px] md:min-h-[180px] overflow-hidden relative group md:col-span-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <FolderIcon />
        </div>

        {/* Top Right - Skills */}
        <div className="bg-card rounded-xl shadow-md border border-edge overflow-hidden flex items-center justify-center min-h-[140px] md:min-h-[180px] md:col-span-2">
          <SkillsCarousel />
        </div>

        {/* Bottom Large Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-edge md:flex items-center justify-center min-h-[160px] md:min-h-[220px] md:col-span-3 hidden ">
          <GitHubContributionGraph />
        </div>
      </div>
    </div>
  );
}
