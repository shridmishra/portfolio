"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Hero, ExperienceSection, ProjectsSection, BentoGrid } from "@/src/components/sections";
import { Footer } from "@/src/components/layout";
import { OnekoCat } from "@/src/components/common";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { PageSkeleton } from "@/src/components/ui/loading-skeleton";
import { Separator } from "../components/ui/separator";
import DisplacementText from "../components/ui/displacement-text";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Check if we are very close to the bottom (e.g., 99% scrolled)
    setIsAtBottom(latest >= 0.99);
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return <PageSkeleton />;

  return (
    <div className="min-h-screen min-w-full bg-background relative font-display antialiased selection:bg-pink-600 overflow-x-hidden selection:text-foreground">
      {/* Interactive Cat Component */}
      <OnekoCat />
      <div className="relative z-10 max-w-lg sm:max-w-3xl mx-auto">
        <div className="relative">
          {/* Vertical Separators for the main container */}
          <Separator
            orientation="vertical"
            className="absolute left-0 top-0 bottom-0 -translate-x-1/2 z-50"
          />
          <Separator
            orientation="vertical"
            className="absolute right-0 top-0 bottom-0 translate-x-1/2 z-50"
          />

          {/* Hero Section */}
          <Hero />

          {/* Bento Grid Section */}
          <div className="px-6 sm:px-8 ">
            <SeparatorLine />
            <BentoGrid />
          </div>

          {/* Projects Section */}
          <div className="px-6 sm:px-8 py-4 sm:py-8">
            <SeparatorLine />
            <ProjectsSection />
          </div>

          {/* Experience Section */}
          <div className="px-6 sm:px-8 ">
            <SeparatorLine />
            <ExperienceSection />
          </div>

          {/* Footer Section */}
          <div
            className="px-6 sm:px-8 py-10 sm:py-14 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                opacity: isAtBottom ? 1 : 0,
                filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-t from-indigo-500/30 via-purple-500/10 to-transparent blur-3xl -z-10 pointer-events-none"
            />
            <SeparatorLine />
            <Footer />
            <DisplacementText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
