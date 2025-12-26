"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ProjectCard } from "@/src/components/ui/project-card";
import { ProjectModal } from "@/src/components/ui/project-modal";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { ChevronRight } from "lucide-react";

export const ProjectsSection = () => {
  // Limit to 6 projects
  const displayedProjects = projects.slice(0, 6);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [preloadVideo, setPreloadVideo] = useState<string | null>(null);

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <Title title="Proof Of Work" subtitle="A showcase of my work in full-stack & blockchain applications." />
        
   <SeparatorLine />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-8 mt-8">
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
                link={project.link}
                source={project.code}
                imageSrc={project.imageSrc}
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
