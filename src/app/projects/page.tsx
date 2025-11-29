"use client";

import React, { useState, useEffect } from "react";
import { ProjectCard } from "@/src/components/ui/project-card";
import { ProjectModal } from "@/src/components/ui/project-modal";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { Separator } from "@/src/components/ui/separator";
// import { Skeleton } from "@/src/components/ui/skeleton";

const ProjectsPageSkeleton = () => (
  <div className="min-h-screen min-w-full bg-background flex items-center justify-center">
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-accent animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-1/2 bg-accent animate-pulse rounded" />
          <div className="h-4 w-1/3 bg-accent animate-pulse rounded" />
        </div>
      </div>
      <div className="h-10 w-full bg-accent animate-pulse rounded" />
      <div className="h-64 w-full bg-accent animate-pulse rounded" />
    </div>
  </div>
);

const ProjectsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [preloadVideo, setPreloadVideo] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted || loading) return <ProjectsPageSkeleton />;

  const displayedProjects = projects;

  return (
    <div className="min-h-screen min-w-full bg-background relative overflow-hidden font-display antialiased selection:bg-pink-600 selection:text-foreground">
      <div className="relative z-10 max-w-lg sm:max-w-3xl mx-auto">
        <div className="relative min-h-screen px-6 sm:px-8 py-12 ">
          <Separator orientation="vertical" className="absolute left-0 top-0 bottom-0 -translate-x-1/2 z-50" />
          <Separator orientation="vertical" className="absolute right-0 top-0 bottom-0 translate-x-1/2 z-50" />
          <SeparatorLine />
          {/* Section Header */}
          <Title title="My Projects" subtitle="A showcase of my work in full-stack & blockchain applications."/>
          
          <SeparatorLine />

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 my-8">
            {displayedProjects.map((project, index) => (
              <div
                key={project.title}
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
                  imageSrc={project.imageSrc}
                  link={project.link}
                  source={project.code}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div><Separator/>
        </div>
      
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
    </div>
  );
};

export default ProjectsPage;