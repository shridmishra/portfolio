"use client";

import React from "react";
import { ProjectCard } from "@/src/components/ui/project-card";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import { Separator } from "@/src/components/ui/separator";


 const page = () => {
  const displayedProjects = projects;

  return (
    <div className="min-h-screen min-w-full bg-background relative overflow-hidden font-display antialiased selection:bg-pink-600 selection:text-foreground">
      <div className="relative z-10 max-w-xl sm:max-w-4xl mx-auto">
        <div className="border-x border-edge min-h-screen px-6 sm:px-8 py-12 sm:py-16">
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
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  imageSrc={project.imageSrc}
                  link={project.link}
                  source={project.code}
                />
              </div>
            ))}
          </div><Separator/>
        </div>
      
      </div>
      
    </div>
  );
};

export default page;