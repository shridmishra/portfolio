"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/src/components/Hero";
import { ExperienceSection } from "@/src/components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import BentoGrid from "../components/BentoSection";
import Footer from "../components/Footer";
import OnekoCat from "../components/OnekoCat";
import { Separator } from "../components/ui/separator";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen min-w-full bg-background relative font-display antialiased selection:bg-pink-600 overflow-x-hidden selection:text-foreground">
      <div className="relative z-10 max-w-xl sm:max-w-4xl mx-auto lg:mx-96">
        <div className="border-x border-edge">

      
          
          <Hero />
          
          <Separator />
          
          <div className="px-4 sm:px-10 py-16 sm:py-20">
            <OnekoCat />
            <ProjectsSection />
          </div>
          
          <Separator />
          
          <div className="px-4 sm:px-10 py-16 sm:py-20">
            <BentoGrid />
          </div>
          
          <Separator />
          
          <div className="px-4 sm:px-10 py-16 sm:py-20">
            <ExperienceSection />
          </div>
          
          <Separator />
          
          <div className="px-4 sm:px-10 py-12 sm:py-16">
            <Footer />
          </div>
          
         
          <Separator />
        </div>
      
      </div>
    </div>
  );
};

export default Home;
