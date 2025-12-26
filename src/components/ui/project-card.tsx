"use client";

import React from "react";
import Image from "next/image";
import BorderFrame from "./BorderFrame";
import { Play } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  source?: string;
  imageSrc: string;
  onClick?: () => void;
}

export const ProjectCard = ({
  title,
  description,
  tech,
  link,
  source,
  imageSrc,
  onClick,
}: ProjectCardProps) => {
  // Apply left alignment specifically for Practice JS and Paths
  const imageObjectPosition = (title === "Practice JS" || title === "Paths") ? "object-left" : "";

  return (
    <BorderFrame className="">
      <div
        className="
        group relative flex flex-col border border-edge 
         overflow-hidden bg-background 
        hover:border-border transition-colors
      "
      >
        {/* Image */}
        <div className="p-2 pb-0"> {/* padding around image */}
          <div
            onClick={onClick}
            className="cursor-pointer block overflow-hidden"
          >
            <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover ${imageObjectPosition} transition-all duration-300`}
              />

              {/* Overlay with play icon or view text could go here */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                  <Play className="w-6 h-6 text-foreground fill-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <header className="mb-2">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-border underline-offset-4"
              >
                <h3 className="text-lg font-normal tracking-tight text-foreground">
                  {title}
                </h3>
              </a>
            ) : (
              <h3 className="text-lg font-normal tracking-tight text-foreground">
                {title}
              </h3>
            )}
          </header>

          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5">
              {tech.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="
                  text-xs font-medium px-2 py-0.5 
                  text-accent-foreground/80 border border-border rounded
                "
                >
                  {item}
                </span>
              ))}
            </div>

            {/* GitHub Icon */}
            {source && (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </BorderFrame>

  );
};
