"use client"

import React from "react";
import GitHubContributionGraph from "@/src/components/bento/Github";
import { SkillsCarousel } from "@/src/components/bento/Skills";
import { RecentBlogs } from "@/src/components/bento/RecentBlogs";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { Separator } from "../ui/separator";

export default function BentoGrid() {


  return (
    <div className="w-full max-w-3xl mx-auto">
      <Separator />
       <div className="text-muted-foreground py-6 text-base sm:text-lg leading-relaxed">
         Still not sure? Check out my{" "}
         <a
              href={"https://github.com/shridmishra"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:text-muted-foreground transition-colors"
            >
              Github
            </a>
            {" "}&{" "}
            <span className="text-foreground font-medium">Blogs</span>.
       </div>
       
       <SeparatorLine />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-8">
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
