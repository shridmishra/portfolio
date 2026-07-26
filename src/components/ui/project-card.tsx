"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import BorderFrame from "./BorderFrame";
import { Play, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  source?: string;
  imageSrc: string;
  video?: string;
  isLandingPage?: boolean;
  onClick?: () => void;
}

export const ProjectCard = ({
  title,
  description,
  tech,
  link,
  source,
  imageSrc,
  video,
  isLandingPage = false,
  onClick,
}: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Apply left alignment specifically for Practice JS and Paths
  const imageObjectPosition = (title === "Practice JS" || title === "Paths") ? "object-left" : "";

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = (title === "Practice JS" && isLandingPage) ? 1 : 5;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const targetLink = link || source;

  return (
    <BorderFrame className="">
      <div
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          group relative flex flex-col 
          overflow-hidden bg-background cursor-pointer h-full rounded-xl
        "
      >
        {/* Image / Video Container */}
        <div className="p-1 pb-0">
          <div className="block overflow-hidden">
            <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover ${imageObjectPosition} transition-all duration-300 ${video && isHovered ? "opacity-0" : "opacity-100"}`}
              />

              {video && (
                <video
                  ref={videoRef}
                  src={video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                />
              )}

              {/* Overlay with play icon */}
              {!video && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                    <Play className="w-6 h-6 text-foreground fill-foreground" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 pt-2.5 pb-1 px-3 sm:pt-3 sm:pb-1.5 sm:px-3.5">
          <header className="mb-0 flex items-center justify-between">
            <h3 className="text-lg font-normal tracking-tight text-foreground">
              {title}
            </h3>

            {targetLink && (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-foreground/80 hover:text-foreground transition-colors p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full hover:bg-muted/60"
                aria-label={`Live preview for ${title}`}
              >
                <ArrowUpRight className="w-5 h-5 text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </header>
        </div>
      </div>
    </BorderFrame>
  );
};
