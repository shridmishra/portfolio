"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ProjectCard } from "@/src/components/ui/project-card";
import { ProjectModal } from "@/src/components/ui/project-modal";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { ChevronRight } from "lucide-react";

import { cn } from "@/src/lib/utils";

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState<"fullstack" | "landing">("fullstack");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [preloadVideo, setPreloadVideo] = useState<string | null>(null);

  const filteredProjects = projects
    .filter((project) => project.category === activeTab)
    .sort((a, b) => (b.video ? 1 : 0) - (a.video ? 1 : 0));
  const displayedProjects = filteredProjects.slice(0, 6);

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <Title title="Proof Of Work" />

        {/* Premium Segmented Tab Switcher */}
        <div className="flex justify-center my-4">
          <div className="inline-flex p-1 rounded-full bg-muted/60 dark:bg-neutral-900/90 border border-border/60 dark:border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] backdrop-blur-md relative">
            <Button
              variant="ghost"
              size="default"
              onClick={() => setActiveTab("fullstack")}
              className={cn(
                "relative z-10 rounded-full transition-colors duration-200 cursor-pointer select-none",
                activeTab === "fullstack"
                  ? "text-foreground font-medium bg-transparent"
                  : "text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent"
              )}
            >
              {activeTab === "fullstack" && (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-background dark:bg-neutral-800 rounded-full z-[-1] border border-border/50 dark:border-white/15 shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Full Stack Apps
            </Button>
            <Button
              variant="ghost"
              size="default"
              onClick={() => setActiveTab("landing")}
              className={cn(
                "relative z-10 rounded-full transition-colors duration-200 cursor-pointer select-none",
                activeTab === "landing"
                  ? "text-foreground font-medium bg-transparent"
                  : "text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent"
              )}
            >
              {activeTab === "landing" && (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-background dark:bg-neutral-800 rounded-full z-[-1] border border-border/50 dark:border-white/15 shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Landing Pages
            </Button>
          </div>
        </div>

        <SeparatorLine />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-6 my-4">
          {displayedProjects.map((project, index) => (
            <div
              key={`${project.title}-${project.category}-${index}`}
              className="group h-full"
              style={{
                animationDelay: `${index * 120}ms`,
                animationFillMode: "both",
              }}
              onMouseEnter={() => {
                if (project.video) {
                  setPreloadVideo(project.video);
                }
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                link={project.link}
                source={project.code}
                imageSrc={project.imageSrc}
                video={project.video}
                isLandingPage={activeTab === "landing"}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* Hidden Video Preloader */}
        {preloadVideo && (
          <video
            src={preloadVideo}
            preload="auto"
            className="hidden"
            muted
            playsInline
          />
        )}

        <ProjectModal 
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />

        {/* Footer CTA */}
        <footer>
          <div className="flex justify-center py-2">
            <Button asChild variant="outline" className="group">
              <Link href="/projects">
                Explore More Projects
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </footer>
      </div>

    </section>
  );
};
