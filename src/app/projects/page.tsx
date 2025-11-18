"use client";

import React from "react";
import { ProjectCard } from "@/src/components/ui/project-card";
import { projects } from "@/src/lib/constants";
import Title from "@/src/components/ui/title";


 const page = () => {
  const displayedProjects = projects;

  return (
    <div className="min-h-screen min-w-full bg-background relative overflow-hidden font-display antialiased selection:bg-pink-600 selection:text-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="text-center my-14 lg:my-20">
          <Title title="My Projects" subtitle="A showcase of my work in full-stack & blockchain applications."/>
         
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
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
        </div>

       
      </div>
    </div>
  );
};

export default page;