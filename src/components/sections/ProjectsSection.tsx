"use client";

import React from "react";
import Link from "next/link";
import { ProjectCard } from "@/src/components/ui/project-card";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { Separator } from "../ui/separator";

export const ProjectsSection = () => {
  // Limit to 6 projects
  const displayedProjects = projects.slice(0, 6);

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
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                
                link={project.link}
                source={project.code}
                imageSrc={project.imageSrc}
              />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <footer >
             <SeparatorLine />

          <div className="text-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-md lg:text-lg font-normal text-foreground hover:text-foreground/80 transition-all duration-300 hover:gap-4"
            >
              <span>Explore More Projects</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-border/30 group-hover:border-border/60 group-hover:bg-muted/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </Link>
          </div>
             <SeparatorLine />

        </footer>
      </div>

    </section>
  );
};
