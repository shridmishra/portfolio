"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { TechBadge } from "@/src/components/ui/tech-badge";
import { TECH_ICONS } from "@/src/lib/constants";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    tech: string[];
    link?: string;
    code?: string;
    imageSrc: string;
    video?: string;
  } | null;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      setIsVideoLoading(true);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!project || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="
                w-full max-w-3xl max-h-[90vh] overflow-y-auto
                bg-card border border-border rounded-xl shadow-2xl
                pointer-events-auto flex flex-col
              "
            >
              {/* Header / Video Area */}
              <div className="relative w-full aspect-video bg-muted overflow-hidden rounded-t-xl">
                {project.video ? (
                  <>
                    {isVideoLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    )}
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedData={(e) => {
                        setIsVideoLoading(false);
                        e.currentTarget.playbackRate = project.title === "Practice JS" ? 1 : 5;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-white/80 text-sm font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-md">
                        No video preview available
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="
                    absolute top-4 right-4 p-2.5 
                    rounded-full bg-black/20 backdrop-blur-md
                    text-white/90 hover:bg-black/40 hover:text-white hover:scale-105
                    transition-all duration-200 z-20
                  "
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <h2 className="text-xl font-medium tracking-tight text-foreground">{project.title}</h2>
                    <div className="flex flex-wrap gap-3">
                      {project.link && (
                        <Button asChild size="sm" className="gap-2 h-9 px-4 bg-foreground text-background hover:bg-foreground/90 shadow-sm">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Visit Live Site
                          </a>
                        </Button>
                      )}
                      {project.code && (
                        <Button asChild variant="outline" size="sm" className="gap-2 h-9 px-4 hover:bg-muted">
                          <a href={project.code} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            View Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                    {project.description}
                  </p>
                </div>

                <div className="h-px w-full bg-border/50" />

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => {
                      const techIcon = TECH_ICONS[tech];
                      return (
                        <TechBadge
                          key={tech}
                          name={tech}
                          icon={techIcon?.icon}
                          color={techIcon?.color}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
