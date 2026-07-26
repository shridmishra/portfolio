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

  const filteredProjects = projects.filter((project) => project.category === activeTab);
  const displayedProjects = filteredProjects.slice(0, 6);

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <Title title="Proof Of Work" />

        {/* Inset Shadow Tab Switcher */}
        <div className="flex justify-center my-3">
          <div className="inline-flex p-1 rounded-lg bg-card border border-edge/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] backdrop-blur-md relative">
            <button
              onClick={() => setActiveTab("fullstack")}
              className={cn(
                "relative z-10 px-3 py-1 text-xs sm:text-xs md:text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer",
                activeTab === "fullstack"
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "fullstack" && (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-foreground rounded-md z-[-1] shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Full Stack Apps
            </button>
            <button
              onClick={() => setActiveTab("landing")}
              className={cn(
                "relative z-10 px-3 py-1 text-xs sm:text-xs md:text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer",
                activeTab === "landing"
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "landing" && (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-foreground rounded-md z-[-1] shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Landing Pages
            </button>
          </div>
        </div>

        <SeparatorLine />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-6 mb-8 mt-8">
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
          

          <div className="flex justify-center py-6">
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
