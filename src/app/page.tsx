"use client";

import { useEffect, useState } from "react";
import { Hero, ExperienceSection, ProjectsSection, BentoGrid } from "@/src/components/sections";
import { Footer } from "@/src/components/layout";
import { OnekoCat } from "@/src/components/common";
import { Separator } from "@/src/components/ui/separator";
import { SeparatorLine } from "@/src/components/ui/separator-line";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen min-w-full bg-background relative font-display antialiased selection:bg-pink-600 overflow-x-hidden selection:text-foreground">
      <OnekoCat />
      <div className="relative z-10 max-w-xl sm:max-w-4xl mx-auto">
        <div className="border-x border-edge">

      
          
          <Hero />
          
          <Separator />
          
          <div className="px-6 sm:px-8 py-12 sm:py-16">
            <SeparatorLine />
            <ProjectsSection />
          </div>
          
        
          
          <div className="px-6 sm:px-8 py-12 sm:py-16">
           
            <BentoGrid />
          </div>
          
          <Separator />
          
          <div className="px-6 sm:px-8 py-12 sm:py-16">
            <SeparatorLine />
            <ExperienceSection />
          </div>
          
          <Separator />
          
          <div className="px-6 sm:px-8 py-10 sm:py-14">
            <SeparatorLine />
            <Footer />
          </div>
          
         
          <Separator />
        </div>
      
      </div>
    </div>
  );
};

export default Home;
