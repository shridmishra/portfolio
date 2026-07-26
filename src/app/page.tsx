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
import Link from "next/link";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import { CtaButton } from "@/src/components/ui/cta-button";

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

  return (
    <div className="min-h-screen min-w-full bg-background relative font-display antialiased selection:bg-pink-200 dark:selection:bg-pink-900/60 overflow-x-hidden selection:text-foreground">
      {/* Interactive Cat Component */}
      {mounted && <OnekoCat />}
      <main className="relative z-10 max-w-lg sm:max-w-3xl mx-auto">
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
          <div className="px-6 sm:px-8 py-2 sm:py-3">
            <SeparatorLine />
            <ProjectsSection />
          </div>

          {/* Experience Section */}
          <div className="px-6 sm:px-8 mb-4">
            <SeparatorLine />
            <ExperienceSection />
          </div>

          <SeparatorLine />

          {/* CTA Section */}
          <div className="pt-3 flex flex-col lg:flex-row items-center justify-center gap-4">
            <h2 className="text-foreground text-xl font-thin sm:text-2xl " style={{ fontFamily: '"Instrument Serif", serif' }}>
              Let&apos;s build something great together
            </h2>

            <div className="flex flex-wrap flex-col lg:flex-row items-center gap-3 sm:gap-4">
              <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=shridmishra00@gmail.com" target="_blank" rel="noopener noreferrer" className="group/btn">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="flex items-center gap-2 bg-background dark:bg-black text-foreground"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-200" />
                </HoverBorderGradient>
              </Link>

              <span className="text-muted-foreground text-lg" style={{ fontFamily: '"Instrument Serif", serif' }}>or</span>

              <CtaButton text="Book a 15 min call" href="https://cal.com/shridmishra" />
            </div>
          </div>
          {/* Footer Section */}
          <div
            className="px-6 sm:px-8 py-3 sm:py-4 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                opacity: isAtBottom ? 1 : 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-t from-indigo-500/30 via-purple-500/10 to-transparent blur-3xl -z-10 pointer-events-none"
            />
            <SeparatorLine />
            <Footer />
            <DisplacementText />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
