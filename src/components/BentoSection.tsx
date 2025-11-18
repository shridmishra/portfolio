"use client"

import React from "react";
import GitHubContributionGraph from "./bento/Github";
import { SkillsCarousel } from "./bento/Skills";
import { RecentBlogs } from "./bento/RecentBlogs";

export default function BentoGrid() {


  return (
    <div className="w-full max-w-3xl mx-auto">
       <div className="text-muted-foreground py-6 text-base sm:text-lg leading-relaxed">
         Still not sure? Check out my{" "}
         <a
              href={"https://github.com/shridmishra"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Github
            </a>
            {" "}&{" "}
            <span className="text-foreground font-medium">Blogs</span>.
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {/* Top Left */}
        <div className="bg-card rounded-xl shadow-md border border-edge flex items-center justify-center min-h-[120px] md:min-h-[180px]">
          <RecentBlogs/>
        </div>

        {/* Top Right */}
        <div className="bg-card rounded-xl shadow-md border border-edge overflow-hidden flex items-center justify-center min-h-[120px] md:min-h-[180px]">
          <SkillsCarousel/>
        </div>

        {/* Bottom Large Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-edge md:flex items-center justify-center min-h-[160px] md:min-h-[220px] md:col-span-2 hidden ">
          <GitHubContributionGraph />
        </div>
      </div>
    </div>
  );
}
