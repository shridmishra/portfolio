"use client";

import React, { useState, useRef, useEffect } from "react";
import { StepForward, ListMusic } from "lucide-react";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

interface MediaPlayerPreviewProps {
  className?: string;
}

export function MediaPlayerPreview({ className }: MediaPlayerPreviewProps) {
  const videos = [
    { src: "/assets/showcase/cards/vhs.mp4", title: "Retro VHS", duration: "0:15" },
    { src: "/assets/showcase/cards/rose.mp4", title: "Rose Garden", duration: "0:12" },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaylistOpen(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.load();
        if (isPlaying) {
          await video.play();
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Video playback error:", error);
        }
      }
    };

    playVideo();
  }, [currentVideoIndex]);

  // Separate effect for play/pause toggling to avoid reloading the video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <div className={cn("relative group select-none py-10", className)}>
      {/* Device Body */}
      <div className="relative w-80 h-80 bg-white dark:bg-[#1e1e21] rounded-[4rem] p-6 flex flex-col gap-5 shadow-2xl overflow-hidden mx-auto ring-1 ring-black/5 dark:ring-white/10 z-10 transition-colors duration-300">
        {/* Matte Texture Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            filter: "contrast(120%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

        {/* Screen Area */}
        <div className="relative w-full h-44 -mt-1 bg-black rounded-t-[2.5rem] rounded-b-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] ring-1 ring-white/5 border border-white/5 mx-auto shrink-0 group/screen">
          {/* Screen Content */}
          <div className="absolute inset-0 bg-sky-500/20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#374151,#111827)] opacity-70" />

            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              autoPlay={isPlaying}
              loop
              muted
              playsInline
              onEnded={handleNext}
            >
              <source src={videos[currentVideoIndex].src} type="video/mp4" />
            </video>

            {/* Playlist Overlay */}
            <div
              className={cn(
                "absolute inset-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-xl shadow-2xl transition-all duration-300 z-20 flex flex-col p-3 overflow-y-auto",
                isPlaylistOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              )}
            >
              <h3 className="text-zinc-500 dark:text-white/60 text-xs font-medium uppercase tracking-wider mb-3">
                Playlist
              </h3>
              <div className="space-y-2">
                {videos.map((video, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    onClick={() => selectVideo(idx)}
                    className={cn(
                      "w-full h-auto flex items-center justify-between p-2 rounded-lg text-left transition-all border-0",
                      currentVideoIndex === idx
                        ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                        : "text-zinc-500 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-800 dark:hover:text-white/80"
                    )}
                  >
                    <span className="text-sm font-medium truncate">
                      {video.title}
                    </span>
                    <span className="text-xs opacity-50">{video.duration}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Area - The "Island" */}
        <div className="flex-1 bg-zinc-200 dark:bg-[#18181b] rounded-md rounded-b-[2.5rem] border border-black/5 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] p-1 grid grid-cols-3 gap-1">
          <ControlButton
            onClick={togglePlaylist}
            className="rounded-md rounded-bl-[2.25rem]"
            icon={<ListMusic className="w-6 h-6" />}
            aria-label="Playlist"
            isActive={isPlaylistOpen}
          />
          <ControlButton
            onClick={togglePlay}
            className="rounded-md"
            icon={
              isPlaying ? (
                <HiOutlinePause className="w-8 h-8" />
              ) : (
                <HiOutlinePlay className="w-8 h-8" />
              )
            }
            aria-label={isPlaying ? "Pause" : "Play"}
            isActive={isPlaying}
          />
          <ControlButton
            onClick={handleNext}
            className="rounded-md rounded-br-[2.25rem]"
            icon={<StepForward className="w-7 h-7" />}
            aria-label="Next Video"
          />
        </div>
      </div>

      {/* Soft shadow underneath */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-black/50 blur-3xl rounded-full -z-10" />
    </div>
  );
}

function ControlButton({
  icon,
  isActive,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  icon: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "group/btn relative w-full h-full flex items-center justify-center transition-all cursor-pointer rounded-none p-0 border-0",
        "bg-zinc-100 dark:bg-[#27272a] shadow-[0_4px_6px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]",
        "border-t border-b border-black/10 dark:border-black/40",
        "active:translate-y-[2px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]",
        "hover:bg-zinc-200 dark:hover:bg-[#27272a]",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "relative z-10 transition-all text-zinc-900 dark:text-gray-200",
          isActive
            ? "opacity-100 text-zinc-600 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
            : "opacity-60 drop-shadow-sm group-hover/btn:opacity-90"
        )}
      >
        {icon}
      </span>
    </Button>
  );
}
