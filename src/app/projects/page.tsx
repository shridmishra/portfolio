"use client";

import React, { useState, useEffect } from "react";
import { ProjectCard } from "@/src/components/ui/project-card";
import { ProjectModal } from "@/src/components/ui/project-modal";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";

const ProjectsPageSkeleton = () => (
  <div className="min-h-screen min-w-full bg-background relative overflow-hidden">
    <div className="relative z-10 max-w-lg sm:max-w-3xl mx-auto">
      <div className="relative min-h-screen px-6 sm:px-8 py-12 sm:py-16">
        <Separator orientation="vertical" className="absolute left-0 top-0 bottom-0 -translate-x-1/2 z-50" />
        <Separator orientation="vertical" className="absolute right-0 top-0 bottom-0 translate-x-1/2 z-50" />
        <Skeleton className="h-1 w-full mb-8" />
        <div className="space-y-4 mb-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
        <Skeleton className="h-1 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [preloadVideo, setPreloadVideo] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <ProjectsPageSkeleton />;
  
  const displayedProjects = projects;

  return (
    <div className="min-h-screen min-w-full bg-background relative overflow-hidden font-display antialiased selection:bg-pink-600 selection:text-foreground">
      <div className="relative z-10 max-w-lg sm:max-w-3xl mx-auto">
        <div className="relative min-h-screen px-6 sm:px-8 py-12 sm:py-16">
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