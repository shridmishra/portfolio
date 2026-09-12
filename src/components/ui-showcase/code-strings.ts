// Auto-generated code strings for UI Showcase components

export const mangoCardsCode = `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/button";

const mango = "/assets/showcase/cards/mango.jpg";
const images = [mango, mango, mango];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

function Carousel({
  setIndex,
  className,
  imageClassName,
}: {
  setIndex: (index: number) => void;
  className?: string;
  imageClassName?: string;
}) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    setPage([newPage, newDirection]);
    setIndex(wrap(0, images.length, newPage));
  };

  return (
    <div className={\`relative w-full h-full overflow-hidden \${className ?? ""}\`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className={\`absolute inset-0 w-full h-full object-cover \${imageClassName ?? ""}\`}
          alt="Alphonso Mango"
        />
      </AnimatePresence>
    </div>
  );
}

export interface MangoCardsPreviewProps {
  accent?: string;
}

export function MangoCardsPreview({ accent }: MangoCardsPreviewProps = {}) {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center justify-center p-2 sm:p-4 w-full max-w-5xl mx-auto select-none">
      {/* Card 1: Compact Version */}
      <div className="relative w-[320px] h-[480px] bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 rounded-[32px] shadow-xl overflow-hidden flex flex-col group transition-transform hover:scale-[1.02] duration-300">
        {/* Image Section */}
        <div className="relative h-[320px] w-full overflow-hidden p-2">
          <Carousel
            setIndex={setIndex1}
            imageClassName="rounded-[28px]"
          />
          <div className="absolute top-6 left-6 bg-black/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full z-10">
            20% off
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={\`w-1.5 h-1.5 rounded-full transition-colors \${
                i === index1 ? "bg-white" : "bg-white/50"
              }\`}
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="flex-1 px-5 pt-2 pb-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-50">
                Alphonso
              </h3>
              <span className="bg-gray-950 text-white dark:bg-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
                ₹270
              </span>
            </div>
            <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed mb-3">
              Loved worldwide for their sweetness our Alphonso mangoes are a
              delicious delight wherever you are.
            </p>
            <div className="flex gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                Best Seller
              </span>
              <span className="bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                9 left
              </span>
            </div>
          </div>

          <Button className="w-full bg-mango-brown hover:bg-mango-brown-hover text-white text-sm font-semibold py-3 h-auto rounded-2xl transition-colors flex items-center justify-center gap-2">
            Add to cart
          </Button>
        </div>
      </div>

      {/* Card 2: Expanded/Immersive Version */}
      <div className="relative w-[320px] h-[480px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col group transition-transform hover:scale-[1.02] duration-300">
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <Carousel setIndex={setIndex2} />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-mango-gold via-mango-gold/80 to-transparent pt-40 pointer-events-none z-10" />
        </div>

        <div className="absolute top-4 right-4 bg-black/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full z-20">
          20% off
        </div>

        {/* Pagination Dots */}
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <div
              key={i}
              className={\`w-1.5 h-1.5 rounded-full transition-colors \${
                i === index2 ? "bg-white" : "bg-white/50"
              }\`}
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="relative z-20 mt-auto px-6 pb-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold">Alphonso</h3>
            <span className="bg-black/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full ">
              ₹270
            </span>
          </div>

          <p className="text-white/90 text-sm leading-relaxed mb-4 font-medium">
            Loved worldwide for their sweetness our Alphonso mangoes are a
            delicious delight wherever you are.
          </p>

          <div className="flex gap-2 mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full ">
              Best Seller
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full ">
              9 left
            </span>
          </div>

          <Button className="w-full bg-white text-black hover:bg-gray-50 text-sm font-bold py-4 h-auto rounded-full transition-colors shadow-lg ">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
`;

export const mediaPlayerCode = `"use client";

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
            backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")\`,
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
`;

export const colorPaletteCode = `"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Icons } from "@/src/components/ui/icons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";

const COLOR_PALETTE_SHOWCASE_HTML = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Palette Showcase</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet">
    <style>
        /* Light mode (default) */
        :root {
            --bg-primary: transparent;
            --bg-secondary: #f5f5f5;
            --text-primary: #1a1a1a;
            --text-secondary: #666666;
            --border-color: #e0e0e0;
            --accent-color: #3b82f6;
        }

        /* Dark mode via data-theme attribute */
        :root[data-theme="dark"],
        html[data-theme="dark"] {
            --bg-primary: transparent;
            --bg-secondary: #1a1a1a;
            --text-primary: #f5f5f5;
            --text-secondary: #a0a0a0;
            --border-color: #333333;
            --accent-color: #60a5fa;
        }

        /* Fallback: Dark mode via system preference */
        @media (prefers-color-scheme: dark) {
            :root:not([data-theme="light"]) {
                --bg-primary: transparent;
                --bg-secondary: #1a1a1a;
                --text-primary: #f5f5f5;
                --text-secondary: #a0a0a0;
                --border-color: #333333;
                --accent-color: #60a5fa;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        body {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-family: 'Inter', sans-serif;
            background: transparent;
            color: var(--text-primary);
            transition: background-color 0.3s, color 0.3s;
            cursor: grab;
            user-select: none;
            -webkit-user-select: none;
        }

        body.is-dragging {
            cursor: grabbing !important;
        }

        .card-container {
            position: relative;
            width: 0px;
            height: 300px;
            perspective: 1000px;
            perspective-origin: 50% -229%;
            cursor: pointer;
            padding-bottom: 100px;
        }

        .card {
            --card-rgb: 255, 255, 255;
            height: 300px;
            width: 300px;
            border-radius: 20px;
            overflow: hidden;

            /* Vivid glass: keep the true color while still feeling frosted/glassy */
            background:
                radial-gradient(140% 120% at 15% 10%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%),
                linear-gradient(
                    180deg,
                    rgba(var(--card-rgb), 0.98),
                    rgba(var(--card-rgb), 0.88)
                );
            backdrop-filter: blur(18px) saturate(200%);
            -webkit-backdrop-filter: blur(18px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.28);
            box-shadow:
                0 18px 48px rgba(0, 0, 0, 0.55),
                inset 0 1px 0 rgba(255, 255, 255, 0.35);

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            padding: 25px;
            position: relative;
            isolation: isolate;
        }

        .card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
                120deg,
                rgba(255,255,255,0.55),
                rgba(255,255,255,0.10) 45%,
                rgba(255,255,255,0.32)
            );
            opacity: 0.6;
            mix-blend-mode: soft-light;
            pointer-events: none;
        }

        .card::after {
            content: '';
            position: absolute;
            inset: 0;
            background:
                radial-gradient(90% 70% at 80% 0%, rgba(255,255,255,0.38), rgba(255,255,255,0) 60%),
                radial-gradient(110% 90% at 90% 12%, rgba(0,0,0,0.26), rgba(0,0,0,0) 55%);
            opacity: 0.9;
            pointer-events: none;
        }

        .color-name {
            color: #fff;
            font-size: 18px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
            margin-bottom: 8px;
            text-align: right;
            text-shadow: 0 1px 14px rgba(0,0,0,0.6);
        }

        .color-hex {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            position: relative;
            z-index: 1;
            letter-spacing: 0.5px;
            text-align: right;
            text-shadow: 0 1px 14px rgba(0,0,0,0.6);
        }

        .container {
            display: flex;
            gap: 30px;
            transform-origin: left center;
            will-change: transform;
        }
    </style>
</head> 
<body>
    <div class="container"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        const container = document.querySelector('.container');
        const cards = [];
        const colorPalette = [
            // ===== RED SHADES =====
            { hex: '#880808', name: 'Blood Red' },
            { hex: '#DC143C', name: 'Crimson Red' },
            { hex: '#8B0000', name: 'Dark Red' },
            { hex: '#800020', name: 'Burgundy' },
            { hex: '#FF2400', name: 'Scarlet' },
            { hex: '#CC0000', name: 'Fire Engine Red' },
            { hex: '#E0115F', name: 'Ruby Red' },
            { hex: '#800000', name: 'Maroon' },
            { hex: '#AA4A44', name: 'Brick Red' },
            { hex: '#FF6347', name: 'Tomato Red' },
            { hex: '#FF3131', name: 'Neon Red' },
            { hex: '#D2042D', name: 'Cherry Red' },
            { hex: '#722F37', name: 'Wine Red' },
            { hex: '#ED2939', name: 'Imperial Red' },
            { hex: '#FF4040', name: 'Coral Red' },

            // ===== ORANGE SHADES =====
            { hex: '#FF7F00', name: 'Orange' },
            { hex: '#FFA500', name: 'Pure Orange' },
            { hex: '#FF8C00', name: 'Dark Orange' },
            { hex: '#FF4500', name: 'Orange Red' },
            { hex: '#FFB347', name: 'Pastel Orange' },
            { hex: '#FF5E0E', name: 'Vivid Orange' },
            { hex: '#E25822', name: 'Flame Orange' },
            { hex: '#FF9F00', name: 'Amber Orange' },
            { hex: '#D2691E', name: 'Chocolate Orange' },
            { hex: '#F28500', name: 'Tangerine' },

            // ===== GREEN SHADES =====
            { hex: '#00FF00', name: 'Lime Green' },
            { hex: '#32CD32', name: 'Leaf Green' },
            { hex: '#228B22', name: 'Forest Green' },
            { hex: '#006400', name: 'Dark Green' },
            { hex: '#2E8B57', name: 'Sea Green' },
            { hex: '#66CDAA', name: 'Medium Aquamarine' },
            { hex: '#7FFF00', name: 'Chartreuse' },
            { hex: '#00FA9A', name: 'Medium Spring Green' },
            { hex: '#00FF7F', name: 'Spring Green' },
            { hex: '#98FB98', name: 'Pale Green' },

            // ===== BLUE SHADES =====
            { hex: '#0000FF', name: 'Blue' },
            { hex: '#0000CD', name: 'Medium Blue' },
            { hex: '#4169E1', name: 'Royal Blue' },
            { hex: '#1E90FF', name: 'Dodger Blue' },
            { hex: '#4682B4', name: 'Steel Blue' },
            { hex: '#5F9EA0', name: 'Cadet Blue' },
            { hex: '#00BFFF', name: 'Deep Sky Blue' },
            { hex: '#87CEEB', name: 'Sky Blue' },
            { hex: '#6495ED', name: 'Cornflower Blue' },
            { hex: '#7DF9FF', name: 'Electric Blue' },
            { hex: '#191970', name: 'Midnight Blue' },
            { hex: '#003366', name: 'Dark Navy' },

            // ===== PURPLE / VIOLET SHADES =====
            { hex: '#800080', name: 'Purple' },
            { hex: '#8A2BE2', name: 'Blue Violet' },
            { hex: '#9370DB', name: 'Medium Purple' },
            { hex: '#DA70D6', name: 'Orchid' },
            { hex: '#BA55D3', name: 'Medium Orchid' },
            { hex: '#9400D3', name: 'Dark Violet' },
            { hex: '#9932CC', name: 'Dark Orchid' },
            { hex: '#D8BFD8', name: 'Thistle' },
            { hex: '#E6E6FA', name: 'Lavender' },
            { hex: '#4B0082', name: 'Indigo' },

            // ===== PINK SHADES =====
            { hex: '#FFC0CB', name: 'Pink' },
            { hex: '#FF69B4', name: 'Hot Pink' },
            { hex: '#FF1493', name: 'Deep Pink' },
            { hex: '#DB7093', name: 'Pale Violet Red' },
            { hex: '#FFB6C1', name: 'Light Pink' },
            { hex: '#C71585', name: 'Medium Violet Red' },
            { hex: '#F08080', name: 'Light Coral' },
            { hex: '#E75480', name: 'Dark Pink' },
            { hex: '#FF007F', name: 'Bright Pink' },
            { hex: '#FC0FC0', name: 'Neon Pink' },

            // ===== BROWN SHADES =====
            { hex: '#A52A2A', name: 'Brown' },
            { hex: '#8B4513', name: 'Saddle Brown' },
            { hex: '#D2691E', name: 'Chocolate' },
            { hex: '#CD853F', name: 'Peru' },
            { hex: '#F4A460', name: 'Sandy Brown' },
            { hex: '#DEB887', name: 'Burly Wood' },
            { hex: '#C19A6B', name: 'Camel' },
            { hex: '#704214', name: 'Sepia' },
            { hex: '#8B0000', name: 'Rust Brown' },
            { hex: '#FFE4C4', name: 'Bisque' },

            // ===== GREY / BLACK / WHITE =====
            { hex: '#000000', name: 'Black' },
            { hex: '#1C1C1C', name: 'Very Dark Grey' },
            { hex: '#2F4F4F', name: 'Dark Slate Grey' },
            { hex: '#696969', name: 'Dim Grey' },
            { hex: '#808080', name: 'Grey' },
            { hex: '#A9A9A9', name: 'Dark Grey' },
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#D3D3D3', name: 'Light Grey' },
            { hex: '#F5F5F5', name: 'White Smoke' },
            { hex: '#FFFFFF', name: 'White' },
        ];
 
         const cardCount = colorPalette.length;

         let currentScale = 1.0;
         let currentPanX = 20;
         let currentPanY = 0;
         let isDragging = false;
         let startX = 0;
         let startPanX = currentPanX;

         const getTransform = (index, yOffset = 0) => {
          return "rotateY(25deg) translateY(" + (index * 10 + yOffset) + "px) translateZ(" + (index * 0.5) + "px) skewY(-1deg)";
         };

         const animateCards = (index, yOffset, ease="power2.out") =>{
            const positions = [index - 1, index, index + 1];
            positions.forEach((pos,i)=>{
                if(cards[pos]){
                     gsap.to(cards[pos],{
                        duration:0.3,
                        ease:ease,
                        transform: getTransform(pos,yOffset[i])
                     });
                }
            });
         };

         function clampPan() {
            const minPanX = Math.min(-100, window.innerWidth - ((cardCount * 30 + 360) * currentScale) - 80);
            const maxPanX = 80;
            if (currentPanX < minPanX) currentPanX = minPanX;
            if (currentPanX > maxPanX) currentPanX = maxPanX;
         }

         function updateContainerTransform() {
            container.style.transform = "translate3d(" + currentPanX + "px, " + currentPanY + "px, 0) scale(" + currentScale + ")";
         }

         for(let i = 0; i < cardCount; i++){
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.transform = getTransform(i);
            const r = parseInt(colorPalette[i].hex.slice(1,3), 16);
            const g = parseInt(colorPalette[i].hex.slice(3,5), 16);
            const b = parseInt(colorPalette[i].hex.slice(5,7), 16);
            card.style.setProperty('--card-rgb', r + ', ' + g + ', ' + b);

            const colorName = document.createElement('div');
            colorName.className = 'color-name'; 
            colorName.textContent = colorPalette[i].hex.toUpperCase();

            const colorHex = document.createElement('div');
            colorHex.className = 'color-hex';
            colorHex.textContent = colorPalette[i].name;

            card.appendChild(colorName);
            card.appendChild(colorHex);
            cardContainer.appendChild(card);
            container.appendChild(cardContainer);
            cards.push(card);

            cardContainer.addEventListener('mouseenter',()=> {
                if (!isDragging) animateCards(i,[-80,-150,-80]);
            });
            cardContainer.addEventListener('mouseleave',()=> {
                animateCards(i,[0,0,0],"back.out(1.5)");
            });
         }

         // Panning via wheel / trackpad swipe or pinch-to-zoom
         window.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const factor = e.deltaY < 0 ? 1.05 : 0.95;
                const nextScale = Math.max(0.35, Math.min(1.25, currentScale * factor));
                currentScale = Math.round(nextScale * 100) / 100;
                clampPan();
                updateContainerTransform();
                try {
                    window.parent.postMessage({ type: 'SCALE_CHANGED', scale: currentScale }, '*');
                } catch(err) {}
                return;
            }

            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            currentPanX -= delta * 0.9;
            clampPan();
            updateContainerTransform();
         }, { passive: false });

         // Pointer dragging to pan
         window.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startPanX = currentPanX;
            document.body.classList.add('is-dragging');
         });

         window.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const deltaX = (e.clientX - startX);
            currentPanX = startPanX + deltaX;
            clampPan();
            updateContainerTransform();
         });

         const stopDrag = () => {
            if (isDragging) {
                isDragging = false;
                document.body.classList.remove('is-dragging');
            }
         };
         window.addEventListener('pointerup', stopDrag);
         window.addEventListener('pointercancel', stopDrag);
         window.addEventListener('resize', () => {
            clampPan();
            updateContainerTransform();
         });

         // Communication with parent React component
         window.addEventListener('message', (event) => {
            if (!event.data) return;
            if (event.data.type === 'SET_SCALE') {
                const targetScale = event.data.scale;
                gsap.to({ s: currentScale }, {
                    s: targetScale,
                    duration: 0.35,
                    ease: 'power2.out',
                    onUpdate: function() {
                        currentScale = this.targets()[0].s;
                        clampPan();
                        updateContainerTransform();
                    }
                });
            }
         });

         clampPan();
         updateContainerTransform();

         try {
            window.parent.postMessage({ type: 'READY' }, '*');
         } catch(err) {}
    </script>
</body>
</html>
\`;

interface ColorPalettePreviewProps {
  isFullscreen?: boolean;
  isSidebarOpen?: boolean;
}

export function ColorPalettePreview({
  isFullscreen = false,
  isSidebarOpen = true,
}: ColorPalettePreviewProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scale, setScale] = React.useState(1.0);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const MIN_SCALE = 0.35;
  const MAX_SCALE = 1.25;
  const SCALE_STEP = 0.15;
  const DEFAULT_SCALE = 1.0;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sendScaleToIframe = React.useCallback((newScale: number) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "SET_SCALE", scale: newScale },
        "*"
      );
    }
  }, []);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "READY") {
        sendScaleToIframe(scale);
      } else if (event.data?.type === "SCALE_CHANGED" && typeof event.data.scale === "number") {
        setScale(event.data.scale);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [scale, sendScaleToIframe]);

  const handleZoomOut = () => {
    const newScale = Math.max(MIN_SCALE, Math.round((scale - SCALE_STEP) * 100) / 100);
    setScale(newScale);
    sendScaleToIframe(newScale);
  };

  const handleZoomIn = () => {
    const newScale = Math.min(MAX_SCALE, Math.round((scale + SCALE_STEP) * 100) / 100);
    setScale(newScale);
    sendScaleToIframe(newScale);
  };

  const handleResetZoom = () => {
    setScale(DEFAULT_SCALE);
    sendScaleToIframe(DEFAULT_SCALE);
  };

  const htmlCode = React.useMemo(() => {
    const isDark = resolvedTheme === "dark";
    const themeScript = \`
      <script>
        (function() {
          const isDark = \${isDark};
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
          document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        })();
      </script>
    \`;

    return COLOR_PALETTE_SHOWCASE_HTML.replace("<head>", "<head>" + themeScript);
  }, [resolvedTheme]);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center select-none">
      {/* Top Left Controls: Minus & Plus icons to decrease and increase zoom scale */}
      <div
        className={cn(
          "absolute top-5 z-30 flex items-center gap-1 p-1 rounded-full bg-stage-action-pill/95 backdrop-blur-md border border-border/50 shadow-xs transition-all duration-200",
          !isSidebarOpen && !isFullscreen ? "left-14 md:left-16" : "left-5"
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleZoomOut}
              disabled={scale <= MIN_SCALE}
              className="size-7 rounded-full hover:bg-muted text-foreground p-0 cursor-pointer disabled:opacity-30 transition-opacity"
              aria-label="Decrease zoom"
            >
              <Icons.Minus className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Decrease scale (Zoom out)
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleResetZoom}
              className="h-7 px-1.5 rounded-full hover:bg-muted text-[11px] font-mono font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              aria-label="Reset zoom"
            >
              {Math.round(scale * 100)}%
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Reset zoom ({Math.round(DEFAULT_SCALE * 100)}%)
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleZoomIn}
              disabled={scale >= MAX_SCALE}
              className="size-7 rounded-full hover:bg-muted text-foreground p-0 cursor-pointer disabled:opacity-30 transition-opacity"
              aria-label="Increase zoom"
            >
              <Icons.Plus className="size-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            Increase scale (Zoom in)
          </TooltipContent>
        </Tooltip>
      </div>

      <iframe
        ref={iframeRef}
        key={resolvedTheme}
        srcDoc={htmlCode}
        title="Color Palette Showcase"
        className="w-full h-full border-0 bg-transparent block rounded-[32px] md:rounded-[36px]"
        sandbox="allow-scripts allow-same-origin"
        style={{ colorScheme: resolvedTheme === "dark" ? "dark" : "light" }}
        onLoad={() => sendScaleToIframe(scale)}
      />
    </div>
  );
}
`;

export const guitarStringCode = `"use client";

import * as React from "react";
import gsap from "gsap";
import { cn } from "@/src/lib/utils";
import { DEFAULT_PRIMARY_SWATCH, SWATCH_HEX_MAP } from "@/src/lib/ui-theme";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Icons } from "@/src/components/ui/icons";

interface GuitarStringPreviewProps {
  accent?: string;
  className?: string;
}

interface GuitarStringConfig {
  id: number;
  name: string;
  note: string;
  freq: number;
  thickness: number;
  yBase: number;
  isWound: boolean;
}

// Standard 6-String Guitar Tuning (Low to High: E2, A2, D3, G3, B3, E4)
const STRINGS_CONFIG: GuitarStringConfig[] = [
  { id: 1, name: "1st String", note: "E4", freq: 329.63, thickness: 1.4, yBase: 65, isWound: false },
  { id: 2, name: "2nd String", note: "B3", freq: 246.94, thickness: 1.8, yBase: 115, isWound: false },
  { id: 3, name: "3rd String", note: "G3", freq: 196.0, thickness: 2.3, yBase: 165, isWound: false },
  { id: 4, name: "4th String", note: "D3", freq: 146.83, thickness: 3.1, yBase: 215, isWound: true },
  { id: 5, name: "5th String", note: "A2", freq: 110.0, thickness: 3.9, yBase: 265, isWound: true },
  { id: 6, name: "6th String", note: "E2", freq: 82.41, thickness: 4.8, yBase: 315, isWound: true },
];

// 21 Fret positions across the roasted maple neck (wire X coordinates)
const FRETS = [
  { fret: 1, x: 108 },
  { fret: 2, x: 164 },
  { fret: 3, x: 216 },
  { fret: 4, x: 265 },
  { fret: 5, x: 312 },
  { fret: 6, x: 356 },
  { fret: 7, x: 398 },
  { fret: 8, x: 437 },
  { fret: 9, x: 474 },
  { fret: 10, x: 509 },
  { fret: 11, x: 542 },
  { fret: 12, x: 573 },
  { fret: 13, x: 602 },
  { fret: 14, x: 630 },
  { fret: 15, x: 656 },
  { fret: 16, x: 681 },
  { fret: 17, x: 704 },
  { fret: 18, x: 726 },
  { fret: 19, x: 747 },
  { fret: 20, x: 767 },
  { fret: 21, x: 786 },
  { fret: 22, x: 804 },
  { fret: 23, x: 821 },
  { fret: 24, x: 837 },
];

// Iridescent Abalone paua shell position inlays (frets 3, 5, 7, 9, 12 double-dot, 15, 17, 19, 21, 24 double-dot)
const INLAYS = [
  { x: 190, y: 190, r: 7.2, isDouble: false }, // Fret 3
  { x: 288, y: 190, r: 7.2, isDouble: false }, // Fret 5
  { x: 377, y: 190, r: 7.2, isDouble: false }, // Fret 7
  { x: 455, y: 190, r: 7.2, isDouble: false }, // Fret 9
  { x: 557, y: 135, r: 6.2, isDouble: true },  // Fret 12 top
  { x: 557, y: 245, r: 6.2, isDouble: true },  // Fret 12 bottom
  { x: 643, y: 190, r: 6.5, isDouble: false }, // Fret 15
  { x: 692, y: 190, r: 6.5, isDouble: false }, // Fret 17
  { x: 736, y: 190, r: 5.8, isDouble: false }, // Fret 19
  { x: 776, y: 190, r: 5.2, isDouble: false }, // Fret 21
  { x: 829, y: 135, r: 4.8, isDouble: true },  // Fret 24 top
  { x: 829, y: 245, r: 4.8, isDouble: true },  // Fret 24 bottom
];

export function GuitarStringPreview({
  accent = DEFAULT_PRIMARY_SWATCH,
  className,
}: GuitarStringPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pathRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const specularRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const shadowRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const woundRefs = React.useRef<(SVGPathElement | null)[]>([]);
  const glowRefs = React.useRef<(SVGPathElement | null)[]>([]);

  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [lastPlucked, setLastPlucked] = React.useState<string | null>(null);
  const lastPluckTimer = React.useRef<NodeJS.Timeout | null>(null);

  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const activeHex = SWATCH_HEX_MAP[accent] || "var(--color-primary-accent)";

  // Enhanced Acoustic Guitar Web Audio synthesis
  const playPluckSound = React.useCallback(
    (freq: number, velocity: number = 0.5) => {
      if (!soundEnabled) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        const safeVel = Math.min(Math.max(velocity, 0.15), 0.85);

        // 1. Primary fundamental oscillator
        const osc1 = ctx.createOscillator();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(freq, now);

        // 2. Harmonic attack oscillator (crisp metallic pluck overtone)
        const osc2 = ctx.createOscillator();
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(freq * 2, now);

        // 3. Wood body resonance filter (simulates acoustic guitar soundbox)
        const bodyFilter = ctx.createBiquadFilter();
        bodyFilter.type = "bandpass";
        bodyFilter.frequency.setValueAtTime(210, now);
        bodyFilter.Q.setValueAtTime(1.4, now);

        // 4. Lowpass string dissipation filter
        const stringFilter = ctx.createBiquadFilter();
        stringFilter.type = "lowpass";
        stringFilter.frequency.setValueAtTime(Math.min(freq * 6.5, 4200), now);
        stringFilter.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 1.2);

        // 5. Gain envelopes
        const gain1 = ctx.createGain();
        gain1.gain.setValueAtTime(safeVel * 0.7, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(safeVel * 0.25, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

        // Routing
        osc1.connect(stringFilter);
        stringFilter.connect(gain1);
        gain1.connect(ctx.destination);

        osc2.connect(bodyFilter);
        bodyFilter.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.85);
        osc2.stop(now + 0.3);
      } catch {
        // Fallback gracefully on audio limitations
      }
    },
    [soundEnabled]
  );

  const handlePluckVisual = React.useCallback((str: GuitarStringConfig, note: string) => {
    setLastPlucked(note);
    if (lastPluckTimer.current) clearTimeout(lastPluckTimer.current);
    lastPluckTimer.current = setTimeout(() => {
      setLastPlucked(null);
    }, 2000);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normX = (clientX / rect.width) * 1000;
    const normY = (clientY / rect.height) * 380;

    STRINGS_CONFIG.forEach((str, index) => {
      const pathEl = pathRefs.current[index];
      const specularEl = specularRefs.current[index];
      const shadowEl = shadowRefs.current[index];
      const woundEl = woundRefs.current[index];
      const glowEl = glowRefs.current[index];
      if (!pathEl) return;

      const yBase = str.yBase;
      const distanceY = Math.abs(normY - yBase);

      // Trigger displacement when cursor passes near string
      if (distanceY < 38) {
        const pull = (normY - yBase) * 1.5;
        // Clamp pull position between left steel bar (x=40) and right steel bar (x=960)
        const clampedX = Math.max(60, Math.min(940, normX));
        const currentPath = \`M 40 \${yBase} Q \${clampedX} \${yBase + pull} 960 \${yBase}\`;
        const currentShadow = \`M 40 \${yBase + 2.5} Q \${clampedX} \${yBase + 2.5 + pull * 0.65} 960 \${yBase + 2.5}\`;

        const elements = [pathEl, specularEl, woundEl, glowEl].filter(Boolean);
        gsap.to(elements, {
          attr: { d: currentPath },
          duration: 0.16,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (shadowEl) {
          gsap.to(shadowEl, {
            attr: { d: currentShadow },
            duration: 0.16,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (distanceY < 16) {
          handlePluckVisual(str, str.note);
          playPluckSound(str.freq, Math.min(Math.abs(pull) / 36, 0.7));
        }
      }
    });
  };

  const handleMouseLeave = () => {
    STRINGS_CONFIG.forEach((str, index) => {
      const pathEl = pathRefs.current[index];
      const specularEl = specularRefs.current[index];
      const shadowEl = shadowRefs.current[index];
      const woundEl = woundRefs.current[index];
      const glowEl = glowRefs.current[index];
      if (!pathEl) return;

      const yBase = str.yBase;
      const restingPath = \`M 40 \${yBase} Q 500 \${yBase} 960 \${yBase}\`;
      const restingShadow = \`M 40 \${yBase + 2.5} Q 500 \${yBase + 2.5} 960 \${yBase + 2.5}\`;

      const elements = [pathEl, specularEl, woundEl, glowEl].filter(Boolean);
      gsap.to(elements, {
        attr: { d: restingPath },
        duration: 1.4,
        ease: "elastic.out(1, 0.22)",
        overwrite: "auto",
      });

      if (shadowEl) {
        gsap.to(shadowEl, {
          attr: { d: restingShadow },
          duration: 1.4,
          ease: "elastic.out(1, 0.22)",
          overwrite: "auto",
        });
      }
    });
  };

  const strumAll = () => {
    STRINGS_CONFIG.forEach((str, index) => {
      const pathEl = pathRefs.current[index];
      const specularEl = specularRefs.current[index];
      const shadowEl = shadowRefs.current[index];
      const woundEl = woundRefs.current[index];
      const glowEl = glowRefs.current[index];
      if (!pathEl) return;

      const yBase = str.yBase;
      const restingPath = \`M 40 \${yBase} Q 500 \${yBase} 960 \${yBase}\`;
      const pulledPath = \`M 40 \${yBase} Q 500 \${yBase + 26} 960 \${yBase}\`;
      const restingShadow = \`M 40 \${yBase + 2.5} Q 500 \${yBase + 2.5} 960 \${yBase + 2.5}\`;
      const pulledShadow = \`M 40 \${yBase + 2.5} Q 500 \${yBase + 2.5 + 16} 960 \${yBase + 2.5}\`;

      setTimeout(() => {
        playPluckSound(str.freq, 0.55);
        handlePluckVisual(str, str.note);

        const elements = [pathEl, specularEl, woundEl, glowEl].filter(Boolean);
        gsap.set(elements, { attr: { d: pulledPath } });
        gsap.to(elements, {
          attr: { d: restingPath },
          duration: 1.5,
          ease: "elastic.out(1, 0.2)",
        });

        if (shadowEl) {
          gsap.set(shadowEl, { attr: { d: pulledShadow } });
          gsap.to(shadowEl, {
            attr: { d: restingShadow },
            duration: 1.5,
            ease: "elastic.out(1, 0.2)",
          });
        }
      }, (STRINGS_CONFIG.length - 1 - index) * 48); // Natural downward acoustic strum
    });
  };

  return (
    <div className={cn("w-full flex flex-col items-center justify-center p-2 sm:p-4 select-none gap-3", className)}>
      {/* Minimal Top Control Bar (Steps completely removed) */}
      <div className="w-full max-w-4xl flex items-center justify-between px-2 min-h-8">
        <div className="flex items-center gap-2">
          {lastPlucked ? (
            <Badge
              variant="outline"
              className="text-xs font-normal px-2.5 py-0.5 border-border bg-card/70 backdrop-blur-xs transition-opacity"
            >
              Note: {lastPlucked}
            </Badge>
          ) : (
            <span className="text-xs font-normal text-muted-foreground">
              Roasted Maple Neck
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-card/60 backdrop-blur-md p-1 rounded-full border border-border/60 shadow-xs">
          <Button
            variant="ghost"
            size="xs"
            onClick={strumAll}
            className="rounded-full px-3 h-7 text-xs font-normal text-foreground hover:bg-muted cursor-pointer"
          >
            Strum
          </Button>

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="rounded-full size-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
            aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
          >
            {soundEnabled ? <Icons.Volume size={14} /> : <Icons.VolumeMute size={14} />}
          </Button>
        </div>
      </div>

      {/* Main Guitar Fretboard & Stage Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-4xl h-[340px] sm:h-[390px] relative rounded-3xl border border-border/70 overflow-hidden flex items-center justify-center cursor-guitar-pick shadow-2xl transition-all"
        style={{
          boxShadow: \`0 24px 60px -20px var(--color-guitar-maple-bevel, rgba(110, 57, 22, 0.45))\`,
          cursor: \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='28' viewBox='0 0 24 28' fill='none'%3E%3Cpath d='M12 26 C9 22 2 13 2 8 C2 3.5 6.5 1 12 1 C17.5 1 22 3.5 22 8 C22 13 15 22 12 26 Z' fill='%23000000' fill-opacity='0.35' transform='translate(0.5, 1)'/%3E%3Cpath d='M12 26 C9 22 2 13 2 8 C2 3.5 6.5 1 12 1 C17.5 1 22 3.5 22 8 C22 13 15 22 12 26 Z' fill='%23034ead' stroke='%23ffffff' stroke-width='1.2' stroke-linejoin='round'/%3E%3Cpath d='M6 7 C6 4.5 8.5 2.5 12 2.5' stroke='%23ffffff' stroke-width='0.8' stroke-linecap='round' stroke-opacity='0.6'/%3E%3Ccircle cx='12' cy='9' r='1.5' fill='%23ffffff' fill-opacity='0.6'/%3E%3C/svg%3E") 12 26, crosshair\`,
        }}
      >
        <svg
          viewBox="0 0 1000 380"
          className="w-full h-full overflow-hidden pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* 1. Roasted Maple Longitudinal Fretboard Gradient (Direct photo hexes) */}
            <linearGradient id="roasted-maple" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-maple-bevel, #6e3916)" />
              <stop offset="5%" stopColor="var(--color-guitar-maple-light, #cb8452)" />
              <stop offset="22%" stopColor="var(--color-guitar-maple-base, #bf7644)" />
              <stop offset="50%" stopColor="var(--color-guitar-wood-warm, #c88251)" />
              <stop offset="76%" stopColor="var(--color-guitar-maple-base, #bf7644)" />
              <stop offset="95%" stopColor="var(--color-guitar-maple-dark, #9e5b2e)" />
              <stop offset="100%" stopColor="var(--color-guitar-maple-bevel, #6e3916)" />
            </linearGradient>

            {/* 2. Roasted Maple Subtle Flame/Chatoyancy Sheen Overlay */}
            <linearGradient id="maple-chatoyancy" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-guitar-maple-light, #cb8452)" stopOpacity="0.12" />
              <stop offset="14%" stopColor="var(--color-guitar-maple-dark, #9e5b2e)" stopOpacity="0.08" />
              <stop offset="28%" stopColor="var(--color-guitar-maple-light, #cb8452)" stopOpacity="0.14" />
              <stop offset="42%" stopColor="var(--color-guitar-maple-dark, #9e5b2e)" stopOpacity="0.07" />
              <stop offset="58%" stopColor="var(--color-guitar-maple-light, #cb8452)" stopOpacity="0.15" />
              <stop offset="74%" stopColor="var(--color-guitar-maple-dark, #9e5b2e)" stopOpacity="0.09" />
              <stop offset="88%" stopColor="var(--color-guitar-maple-light, #cb8452)" stopOpacity="0.13" />
              <stop offset="100%" stopColor="var(--color-guitar-maple-dark, #9e5b2e)" stopOpacity="0.08" />
            </linearGradient>

            {/* 3. Iridescent Abalone Paua Shell Radial Gradient (Exact Reference Colors) */}
            <radialGradient id="abalone-paua" cx="36%" cy="34%" r="66%">
              <stop offset="0%" stopColor="var(--color-guitar-abalone-3, #8eada1)" />
              <stop offset="26%" stopColor="var(--color-guitar-abalone-2, #488b80)" />
              <stop offset="52%" stopColor="var(--color-guitar-abalone-copper, #c7885b)" />
              <stop offset="78%" stopColor="var(--color-guitar-abalone-1, #28635c)" />
              <stop offset="100%" stopColor="var(--color-guitar-abalone-ring, #1f4743)" />
            </radialGradient>

            {/* 4. Abalone Swirl Secondary Reflection Pattern */}
            <linearGradient id="abalone-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-abalone-3, #8eada1)" stopOpacity="0.85" />
              <stop offset="42%" stopColor="var(--color-guitar-abalone-2, #488b80)" stopOpacity="0.65" />
              <stop offset="72%" stopColor="var(--color-guitar-abalone-copper, #c7885b)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-guitar-abalone-1, #28635c)" stopOpacity="0.9" />
            </linearGradient>

            {/* 5. Metallic Fret Wire Longitudinal Polish Gradient */}
            <linearGradient id="fret-wire-shine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
              <stop offset="10%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="25%" stopColor="var(--color-guitar-fret-wire, #b4bec7)" />
              <stop offset="45%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="65%" stopColor="var(--color-guitar-fret-wire, #b4bec7)" />
              <stop offset="85%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="100%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
            </linearGradient>

            {/* 6. 3D Hemispherical Chrome/Nickel Ball-End Gradient */}
            <radialGradient id="ball-end-metal" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="38%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="78%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
              <stop offset="100%" stopColor="var(--color-guitar-fret-shadow, #5c351b)" />
            </radialGradient>

            {/* 7. Plain Steel String Longitudinal Metallic Luster Gradient (Strings 1-3) */}
            <linearGradient id="plain-steel-luster" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="10%" stopColor="var(--color-guitar-string-steel, #f8fafc)" />
              <stop offset="22%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="36%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="50%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="65%" stopColor="var(--color-guitar-string-core, #e2e8f0)" />
              <stop offset="80%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="92%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="100%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
            </linearGradient>

            {/* 8. Nickel-Wound String Longitudinal Metallic Luster Gradient (Strings 4-6) */}
            <linearGradient id="nickel-wound-luster" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="15%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="32%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="48%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="64%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
              <stop offset="80%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="92%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="100%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
            </linearGradient>

            {/* 9. Authentic Roundwound Metallic Coil Micro-texture Pattern */}
            <pattern id="wound-coil" width="2.8" height="10" patternUnits="userSpaceOnUse">
              {/* Dark crevice groove between coil wraps */}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="var(--color-guitar-wound-crevice, #334155)"
                strokeWidth="0.8"
                strokeOpacity="0.85"
              />
              {/* Rounded coil wire body */}
              <line
                x1="1.4"
                y1="0"
                x2="1.4"
                y2="10"
                stroke="var(--color-guitar-chrome-mid, #cbd5e1)"
                strokeWidth="1.6"
              />
              {/* Metallic specular reflection ridge on wire crest */}
              <line
                x1="1.4"
                y1="0"
                x2="1.4"
                y2="10"
                stroke="var(--color-guitar-chrome-bright, #ffffff)"
                strokeWidth="0.9"
                strokeOpacity="0.95"
              />
            </pattern>

            {/* 9. Bone Nut Gradient */}
            <linearGradient id="bone-nut-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-guitar-nut-bone, #f4efe2)" />
              <stop offset="50%" stopColor="var(--color-guitar-binding, #eae3d2)" />
              <stop offset="100%" stopColor="var(--color-guitar-nut-bone, #f4efe2)" />
            </linearGradient>

            {/* 10. String Glow Bloom Filter */}
            <filter id="string-shimmer" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
          </defs>

          {/* ================= 1. FULL-BLEED ROASTED MAPLE FRETBOARD NECK ================= */}
          {/* Fretboard Slab */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="380"
            fill="url(#roasted-maple)"
          />

          {/* Flame Maple Chatoyancy Sheen Overlay */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="380"
            fill="url(#maple-chatoyancy)"
          />

          {/* Roasted Maple Longitudinal Grain Strands */}
          <g opacity="0.32">
            {[24, 48, 74, 98, 122, 146, 172, 198, 222, 248, 272, 298, 322, 346, 364].map((y, i) => (
              <path
                key={\`maple-grain-\${i}\`}
                d={\`M 0 \${y} Q 260 \${y + (i % 2 === 0 ? 1.8 : -1.5)} 640 \${y + (i % 3 === 0 ? -1.4 : 1.6)} T 1000 \${y + (i % 2 === 0 ? 1.1 : -0.9)}\`}
                fill="none"
                stroke="var(--color-guitar-maple-grain, #8d4d23)"
                strokeWidth={i % 3 === 0 ? "1.4" : "0.95"}
                strokeDasharray={i % 2 === 0 ? "70 16 110 14 50 10" : "90 20 70 15 120 12"}
              />
            ))}
          </g>

          {/* Fretboard Rolled Top Edge Bevel (Warm roasted highlight) */}
          <line
            x1="0"
            y1="2"
            x2="1000"
            y2="2"
            stroke="var(--color-guitar-maple-light, #cb8452)"
            strokeWidth="2.4"
            strokeOpacity="0.85"
          />
          {/* Fretboard Rolled Bottom Edge Bevel (Caramel shadow) */}
          <line
            x1="0"
            y1="378"
            x2="1000"
            y2="378"
            stroke="var(--color-guitar-maple-bevel, #6e3916)"
            strokeWidth="2.8"
            strokeOpacity="0.9"
          />

          {/* ================= 2. REFINED NICKEL-SILVER FRETS (METALLIC LUSTER) ================= */}
          {FRETS.map(({ fret, x }) => (
            <g key={\`fret-\${fret}\`}>
              {/* Subtle Fret Tang Slot Shadow on Wood */}
              <line
                x1={x + 0.8}
                y1="22"
                x2={x + 0.8}
                y2="358"
                stroke="var(--color-guitar-fret-shadow, #5c351b)"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              {/* Cylindrical Metallic Polished Nickel Fret Wire */}
              <line
                x1={x}
                y1="22"
                x2={x}
                y2="358"
                stroke="url(#fret-wire-shine)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Delicate Specular Crown Highlight Hairline */}
              <line
                x1={x}
                y1="24"
                x2={x}
                y2="356"
                stroke="var(--color-guitar-chrome-bright, #ffffff)"
                strokeWidth="0.5"
                strokeOpacity="0.65"
              />
              {/* 3D Chrome Ball-End Dressing at Top Edge */}
              <circle
                cx={x}
                cy="22"
                r="1.4"
                fill="url(#ball-end-metal)"
              />
              {/* 3D Chrome Ball-End Dressing at Bottom Edge */}
              <circle
                cx={x}
                cy="358"
                r="1.4"
                fill="url(#ball-end-metal)"
              />
            </g>
          ))}

          {/* ================= 3. IRIDESCENT ABALONE PAUA SHELL INLAYS ("PROPER COLOUR RING") ================= */}
          {INLAYS.map((inlay, i) => (
            <g key={\`abalone-inlay-\${i}\`}>
              {/* Outer Paua Shell Dark Border Ring */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r + 0.9}
                fill="var(--color-guitar-abalone-ring, #1f4743)"
                opacity="0.9"
              />

              {/* Primary Iridescent Abalone Core */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r}
                fill="url(#abalone-paua)"
              />

              {/* Concentric Swirling Color Ring Overlay */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r * 0.72}
                fill="url(#abalone-sheen)"
                opacity="0.88"
              />

              {/* Proper Paua Iridescent Teal Ring */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r * 0.48}
                fill="none"
                stroke="var(--color-guitar-abalone-2, #488b80)"
                strokeWidth="1.2"
                opacity="0.75"
              />

              {/* Pearl Specular White Glint */}
              <circle
                cx={inlay.x - inlay.r * 0.28}
                cy={inlay.y - inlay.r * 0.28}
                r={inlay.r * 0.26}
                fill="var(--color-guitar-fret-highlight, #f8f6f4)"
                opacity="0.8"
              />
            </g>
          ))}

          {/* ================= 4. LEFT STEEL NUT BAR ================= */}
          <g id="left-steel-bar">
            <rect
              x="34"
              y="16"
              width="12"
              height="348"
              rx="3"
              fill="url(#bone-nut-grad)"
              style={{ filter: "drop-shadow(2px 0 4px rgba(30,15,5,0.45))" }}
            />
            {/* Polished Specular Highlight Hairline */}
            <line
              x1="37"
              y1="19"
              x2="37"
              y2="361"
              stroke="var(--color-guitar-chrome-bright, #ffffff)"
              strokeWidth="0.8"
              strokeOpacity="0.8"
            />
            {/* Left Nut String Notches */}
            {STRINGS_CONFIG.map((str) => (
              <circle
                key={\`left-nut-notch-\${str.id}\`}
                cx="40"
                cy={str.yBase}
                r={str.thickness * 0.65}
                fill="var(--color-guitar-maple-bevel, #6e3916)"
                opacity="0.85"
              />
            ))}
          </g>

          {/* ================= 5. RIGHT STEEL BAR (MATCHING SYMMETRIC TWIN) ================= */}
          <g id="right-steel-bar">
            <rect
              x="954"
              y="16"
              width="12"
              height="348"
              rx="3"
              fill="url(#bone-nut-grad)"
              style={{ filter: "drop-shadow(-2px 0 4px rgba(30,15,5,0.45))" }}
            />
            {/* Polished Specular Highlight Hairline */}
            <line
              x1="957"
              y1="19"
              x2="957"
              y2="361"
              stroke="var(--color-guitar-chrome-bright, #ffffff)"
              strokeWidth="0.8"
              strokeOpacity="0.8"
            />
            {/* Right String Notches */}
            {STRINGS_CONFIG.map((str) => (
              <circle
                key={\`right-nut-notch-\${str.id}\`}
                cx="960"
                cy={str.yBase}
                r={str.thickness * 0.65}
                fill="var(--color-guitar-maple-bevel, #6e3916)"
                opacity="0.85"
              />
            ))}
          </g>

          {/* ================= 6. GUITAR STRINGS (GLEAMING METALLIC STEEL & NICKEL-WOUND) ================= */}
          {STRINGS_CONFIG.map((str, index) => {
            const initialD = \`M 40 \${str.yBase} Q 500 \${str.yBase} 960 \${str.yBase}\`;
            const initialShadowD = \`M 40 \${str.yBase + 2.5} Q 500 \${str.yBase + 2.5} 960 \${str.yBase + 2.5}\`;

            return (
              <g key={\`string-\${str.id}\`}>
                {/* 1. Cast String Shadow on Roasted Maple Neck */}
                <path
                  ref={(el) => {
                    shadowRefs.current[index] = el;
                  }}
                  d={initialShadowD}
                  fill="none"
                  stroke="var(--color-guitar-maple-bevel, #6e3916)"
                  strokeWidth={str.thickness * 0.75}
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                />

                {/* 2. Pluck Ambient Shimmer Glow */}
                <path
                  ref={(el) => {
                    glowRefs.current[index] = el;
                  }}
                  d={initialD}
                  fill="none"
                  stroke={activeHex}
                  strokeWidth={str.thickness + 3}
                  strokeOpacity="0.15"
                  filter="url(#string-shimmer)"
                />

                {/* 3. Primary Physical Metallic String Body (Longitudinal Luster Gradient) */}
                <path
                  ref={(el) => {
                    pathRefs.current[index] = el;
                  }}
                  d={initialD}
                  fill="none"
                  stroke={
                    str.isWound
                      ? "url(#nickel-wound-luster)"
                      : "url(#plain-steel-luster)"
                  }
                  strokeWidth={str.thickness}
                  strokeLinecap="round"
                />

                {/* 4. Real Roundwound Coil Metallic Texture (Strings 4-6) */}
                {str.isWound && (
                  <path
                    ref={(el) => {
                      woundRefs.current[index] = el;
                    }}
                    d={initialD}
                    fill="none"
                    stroke="url(#wound-coil)"
                    strokeWidth={str.thickness}
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                )}

                {/* 5. Center Specular White Metallic Reflection Line */}
                <path
                  ref={(el) => {
                    specularRefs.current[index] = el;
                  }}
                  d={initialD}
                  fill="none"
                  stroke="var(--color-guitar-chrome-bright, #ffffff)"
                  strokeWidth={Math.max(0.65, str.thickness * 0.32)}
                  strokeLinecap="round"
                  opacity="0.92"
                />

                {/* Left & Right 3D Chrome String Anchors */}
                <circle
                  cx="40"
                  cy={str.yBase}
                  r={str.thickness * 0.75 + 0.6}
                  fill="url(#ball-end-metal)"
                />
                <circle
                  cx="960"
                  cy={str.yBase}
                  r={str.thickness * 0.75 + 0.6}
                  fill="url(#ball-end-metal)"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Minimal Footer Instruction (Cleanly placed below stage) */}
      <p className="text-[11px] font-normal tracking-widest uppercase text-muted-foreground/60 text-center select-none pt-0.5">
        Hover or drag across strings to pluck • Click Strum to play chord
      </p>
    </div>
  );
}
`;


export const stampCollectionCode = `"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"
import { Chivo_Mono } from "next/font/google"
import { cn } from "@/src/lib/utils"

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

// ============================================================================
// Stamp Collection
// An archival postage stamp folder with 3D flap physics and presentation modes.
//
// Concept and interaction design by Aditya Sur (@AdityaSur11)
// https://x.com/AdityaSur11/status/2098328193660833874
// ============================================================================
// Palette — hardcoded light-theme values so the artifact never reacts to the
// host app's color scheme.
// ============================================================================
const GREEN = {
  faceTop: "#1C6350",
  faceBottom: "#124A3B",
  faceEdge: "#0C3B2F",
  interior: "#0B342A",
  interiorTop: "#0E3F32",
  pocketTop: "#1A5A48",
  pocketBottom: "#134232",
  seam: "#08281F",
  grommetRing: "#0A2E24",
  grommetHole: "#061E18",
} as const

// ============================================================================
// Brand mark — organic six-petal floral logo
// ============================================================================
function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 983"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 331.6 124.54 C 330.75 125.39, 325.49 135.18, 319.9 146.29 C 308.94 168.11, 304.48 176.62, 293.87 196.06 C 290.1 202.96, 285.91 211.86, 284.56 215.83 C 275.55 242.31, 280.68 271.98, 298.76 298 C 301.24 301.57, 310.95 314.4, 320.32 326.5 C 351.17 366.31, 358.26 375.46, 360.98 379 C 362.45 380.93, 370.62 391.5, 379.12 402.5 C 387.63 413.5, 402.86 433.3, 412.98 446.5 C 423.09 459.7, 433.45 473.2, 436 476.5 C 438.54 479.8, 444.38 487.68, 448.96 494 C 453.55 500.32, 457.5 505.73, 457.75 506 C 458.9 507.28, 465.43 497.68, 470.91 486.66 C 490.98 446.3, 496.87 405.31, 489.55 357 C 487.75 345.11, 482.38 326.56, 476.97 313.5 C 467.2 289.93, 453.37 268.74, 421.48 228.5 C 375.55 170.54, 341.09 127.73, 338.37 125.25 C 335.45 122.61, 333.72 122.42, 331.6 124.54 M 683.4 127.25 C 679.48 131.39, 670.04 142.79, 665 149.46 C 663.62 151.28, 648.9 169.69, 632.28 190.37 C 573.35 263.68, 560.81 281.45, 548.08 309.7 C 541.88 323.46, 536.55 340.77, 533.82 356 C 530.86 372.48, 530.18 406.05, 532.46 422.5 C 535.23 442.5, 540.5 461.05, 548.61 479.37 C 552.9 489.06, 562.76 506, 564.12 506 C 564.47 506, 569.61 499.42, 575.53 491.39 C 586.09 477.06, 633.62 415.13, 659.86 381.5 C 667.16 372.15, 677.26 359.17, 682.31 352.66 C 687.37 346.15, 698.37 332, 706.77 321.23 C 724.03 299.1, 727.55 294.03, 732.44 284.33 C 741.62 266.14, 744.93 246.51, 741.94 228.06 C 740.28 217.83, 737.67 211.37, 727.92 193.37 C 722.89 184.09, 713.62 166.21, 707.32 153.62 C 694.01 127.05, 691.62 123, 689.2 123 C 688.22 123, 685.61 124.91, 683.4 127.25 M 164.75 507.12 C 134.32 511.04, 110.73 525.73, 89.45 554 C 68.44 581.91, 46 613.48, 46 615.12 C 46 618.94, 49.65 619.76, 72 620.92 C 83.83 621.54, 104.3 622.7, 117.5 623.5 C 218.43 629.63, 235.82 630.33, 254.44 628.99 C 292.79 626.22, 328.47 616.81, 360.5 601.01 C 383.32 589.75, 399.51 578.38, 417.33 561.09 C 430.15 548.65, 445.32 529.32, 450.82 518.4 L 452.89 514.3 439.19 513.68 C 431.66 513.33, 413.35 512.38, 398.5 511.56 C 324.38 507.46, 182.95 504.78, 164.75 507.12 M 751.5 507.67 C 681.68 509.08, 575.61 513.12, 571.22 514.55 C 567.49 515.76, 584.91 540.64, 601.89 558.35 C 628.13 585.7, 669.72 608.68, 712.75 619.59 C 739.64 626.41, 750.18 627.47, 790.5 627.39 C 810.3 627.35, 841.35 626.57, 859.5 625.66 C 877.65 624.75, 910.5 623.12, 932.5 622.03 C 970.6 620.17, 972.58 619.97, 974.2 617.99 C 975.14 616.83, 975.63 615.14, 975.29 614.2 C 974.64 612.42, 968.69 603.67, 959.49 591 C 956.5 586.88, 952.15 580.8, 949.84 577.5 C 947.53 574.2, 944.44 569.92, 942.99 568 C 941.53 566.08, 937.3 560.45, 933.6 555.5 C 923.32 541.78, 916.6 534.54, 908.17 528.16 C 898.38 520.73, 893.62 518.04, 882.5 513.67 C 866.71 507.46, 861.32 506.98, 809.5 507.22 C 784.2 507.33, 758.1 507.54, 751.5 507.67 M 489 581.68 C 441.08 586.59, 396.66 607.39, 353.39 645.17 C 331.74 664.07, 307.57 693.56, 295.34 716 C 293.69 719.02, 281.41 740.85, 268.05 764.5 C 209.97 867.35, 212.13 863.33, 213.62 865.71 C 214.66 867.38, 217.14 867.49, 251.62 867.27 C 271.9 867.15, 292.4 866.58, 297.16 866.01 C 330.81 862, 360.38 845.3, 379.82 819.35 C 385.29 812.05, 396.11 792.54, 427.72 733 C 460.82 670.64, 467.35 658.27, 476.49 640.5 C 487.3 619.49, 495.01 604.71, 501.63 592.31 C 507.58 581.17, 507.53 580.96, 499.25 581.16 C 495.54 581.25, 490.93 581.48, 489 581.68 M 515 581.39 C 515 584.68, 616.8 779.71, 632.53 806.56 C 641.65 822.12, 649.75 831.56, 662.14 841.06 C 672.25 848.82, 678.64 852.53, 689.5 856.97 C 710.39 865.52, 719.39 866.75, 767.54 867.64 C 806.17 868.36, 807 868.28, 807 863.72 C 807 861.93, 804.86 857.63, 797.66 845 C 796.56 843.08, 794.54 839.48, 793.17 837 C 791.8 834.52, 785.74 823.73, 779.71 813 C 765.79 788.27, 757.32 773.13, 747.51 755.5 C 743.23 747.8, 738.27 739.02, 736.48 736 C 734.7 732.98, 732.22 728.48, 730.98 726 C 727.72 719.52, 717.41 702.58, 712.11 695 C 692.38 666.75, 663.87 638.67, 635.85 619.9 C 607.71 601.05, 577.36 588.5, 548 583.56 C 537.39 581.78, 515 580.31, 515 581.39"
      />
    </svg>
  )
}

const HexafoilMark = BrandLogo

// ============================================================================
// Postage stamp scalloped perforation path (200x300 viewBox)
// Authentic rounded cutout teeth on all 4 edges with crisp square corner teeth.
// ============================================================================
const STAMP_PATH_200_300 =
  "M 0 0 L 3.89 0 A 3.8 3.8 0 0 1 11.49 0 L 19.28 0 A 3.8 3.8 0 0 1 26.88 0 L 34.66 0 A 3.8 3.8 0 0 1 42.26 0 L 50.05 0 A 3.8 3.8 0 0 1 57.65 0 L 65.43 0 A 3.8 3.8 0 0 1 73.03 0 L 80.82 0 A 3.8 3.8 0 0 1 88.42 0 L 96.20 0 A 3.8 3.8 0 0 1 103.80 0 L 111.58 0 A 3.8 3.8 0 0 1 119.18 0 L 126.97 0 A 3.8 3.8 0 0 1 134.57 0 L 142.35 0 A 3.8 3.8 0 0 1 149.95 0 L 157.74 0 A 3.8 3.8 0 0 1 165.34 0 L 173.12 0 A 3.8 3.8 0 0 1 180.72 0 L 188.51 0 A 3.8 3.8 0 0 1 196.11 0 L 200 0 L 200 3.70 A 3.8 3.8 0 0 1 200 11.30 L 200 18.70 A 3.8 3.8 0 0 1 200 26.30 L 200 33.70 A 3.8 3.8 0 0 1 200 41.30 L 200 48.70 A 3.8 3.8 0 0 1 200 56.30 L 200 63.70 A 3.8 3.8 0 0 1 200 71.30 L 200 78.70 A 3.8 3.8 0 0 1 200 86.30 L 200 93.70 A 3.8 3.8 0 0 1 200 101.30 L 200 108.70 A 3.8 3.8 0 0 1 200 116.30 L 200 123.70 A 3.8 3.8 0 0 1 200 131.30 L 200 138.70 A 3.8 3.8 0 0 1 200 146.30 L 200 153.70 A 3.8 3.8 0 0 1 200 161.30 L 200 168.70 A 3.8 3.8 0 0 1 200 176.30 L 200 183.70 A 3.8 3.8 0 0 1 200 191.30 L 200 198.70 A 3.8 3.8 0 0 1 200 206.30 L 200 213.70 A 3.8 3.8 0 0 1 200 221.30 L 200 228.70 A 3.8 3.8 0 0 1 200 236.30 L 200 243.70 A 3.8 3.8 0 0 1 200 251.30 L 200 258.70 A 3.8 3.8 0 0 1 200 266.30 L 200 273.70 A 3.8 3.8 0 0 1 200 281.30 L 200 288.70 A 3.8 3.8 0 0 1 200 296.30 L 200 300 L 196.11 300 A 3.8 3.8 0 0 1 188.51 300 L 180.72 300 A 3.8 3.8 0 0 1 173.12 300 L 165.34 300 A 3.8 3.8 0 0 1 157.74 300 L 149.95 300 A 3.8 3.8 0 0 1 142.35 300 L 134.57 300 A 3.8 3.8 0 0 1 126.97 300 L 119.18 300 A 3.8 3.8 0 0 1 111.58 300 L 103.80 300 A 3.8 3.8 0 0 1 96.20 300 L 88.42 300 A 3.8 3.8 0 0 1 80.82 300 L 73.03 300 A 3.8 3.8 0 0 1 65.43 300 L 57.65 300 A 3.8 3.8 0 0 1 50.05 300 L 42.26 300 A 3.8 3.8 0 0 1 34.66 300 L 26.88 300 A 3.8 3.8 0 0 1 19.28 300 L 11.49 300 A 3.8 3.8 0 0 1 3.89 300 L 0 300 L 0 296.30 A 3.8 3.8 0 0 1 0 288.70 L 0 281.30 A 3.8 3.8 0 0 1 0 273.70 L 0 266.30 A 3.8 3.8 0 0 1 0 258.70 L 0 251.30 A 3.8 3.8 0 0 1 0 243.70 L 0 236.30 A 3.8 3.8 0 0 1 0 228.70 L 0 221.30 A 3.8 3.8 0 0 1 0 213.70 L 0 206.30 A 3.8 3.8 0 0 1 0 198.70 L 0 191.30 A 3.8 3.8 0 0 1 0 183.70 L 0 176.30 A 3.8 3.8 0 0 1 0 168.70 L 0 161.30 A 3.8 3.8 0 0 1 0 153.70 L 0 146.30 A 3.8 3.8 0 0 1 0 138.70 L 0 131.30 A 3.8 3.8 0 0 1 0 123.70 L 0 116.30 A 3.8 3.8 0 0 1 0 108.70 L 0 101.30 A 3.8 3.8 0 0 1 0 93.70 L 0 86.30 A 3.8 3.8 0 0 1 0 78.70 L 0 71.30 A 3.8 3.8 0 0 1 0 63.70 L 0 56.30 A 3.8 3.8 0 0 1 0 48.70 L 0 41.30 A 3.8 3.8 0 0 1 0 33.70 L 0 26.30 A 3.8 3.8 0 0 1 0 18.70 L 0 11.30 A 3.8 3.8 0 0 1 0 3.70 Z"

// ============================================================================
// Authentic Japanese postage stamps
// ============================================================================
export const SPARROW_STAMP_SRC = "data:image/webp;base64,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"
export const WAVE_STAMP_SRC = "data:image/webp;base64,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"

function BirdStamp() {
  return (
    <img
      src={SPARROW_STAMP_SRC}
      alt="Japanese postage stamp — sparrow on a branch, 63 yen"
      draggable={false}
      className="block h-full w-full object-contain pointer-events-none select-none"
    />
  )
}

function WaveBirdStamp() {
  return (
    <img
      src={WAVE_STAMP_SRC}
      alt="Japanese postage stamp — ocean waves and swallow, 63 yen"
      draggable={false}
      className="block h-full w-full object-contain pointer-events-none select-none"
    />
  )
}


// ============================================================================
// Grommet closure eyelet (subtle halo, metal rim, dark circular hole)
// ============================================================================
function Grommet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-5 w-5 items-center justify-center rounded-full select-none pointer-events-none",
        className
      )}
    >
      {/* Outer halo shadow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,64,50,0.95) 0%, rgba(10,46,36,0.5) 60%, transparent 100%)",
        }}
      />
      {/* Metal grommet eyelet */}
      <div
        className="relative h-[11px] w-[11px] rounded-full border border-[#488270] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
        style={{
          background: "linear-gradient(135deg, #245747 0%, #10382D 100%)",
        }}
      >
        {/* Dark aperture hole */}
        <div
          className="absolute inset-[2px] rounded-full bg-[#051C15] shadow-[inset_0_1px_2px_rgba(0,0,0,0.85)]"
        />
      </div>
    </div>
  )
}

// ============================================================================
// Door face — the outward-facing green panel. Logo + label live on the left door.
// ============================================================================
function DoorFrontFace({
  side,
}: {
  side: "left" | "right"
}) {
  const isLeft = side === "left"
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        background: \`linear-gradient(168deg, \${GREEN.faceTop} 0%, \${GREEN.faceBottom} 82%, \${GREEN.faceEdge} 100%)\`,
        borderTopLeftRadius: isLeft ? 22 : 4,
        borderBottomLeftRadius: isLeft ? 22 : 4,
        borderTopRightRadius: isLeft ? 0 : 22,
        borderBottomRightRadius: isLeft ? 0 : 22,
      }}
    >
      {/* soft top sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0))",
        }}
      />
      {/* inner seam shading toward the center gap */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-16"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: isLeft
            ? "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 100%)"
            : "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 100%)",
        } as React.CSSProperties}
      />

      {/* Paper edge highlight along the inner meeting edge */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: isLeft
            ? "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.24) 50%, rgba(0,0,0,0.2) 100%)",
        } as React.CSSProperties}
      />

      {/* logo + label live only on the left face */}
      {isLeft && (
        <>
          <BrandLogo className="absolute left-[26px] top-[24px] h-[30px] w-[31px] text-white" />
          <div className="absolute bottom-[26px] left-[26px] leading-tight select-none">
            <div className="text-[15px] font-medium tracking-normal text-[#EAF3EE]">
              Stamp collection
            </div>
            <div className="mt-1 text-[15px] font-medium tracking-normal text-[#EAF3EE]">
              02 total
            </div>
          </div>
        </>
      )}

      {/* Grommet on the free outer edge (center seam when closed) */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          isLeft ? "right-[5px]" : "left-[7px]"
        )}
      >
        <Grommet />
      </div>
    </div>
  )
}

// ============================================================================
// Door back face — revealed when the doors swing open.
// Seamlessly attached at the hinge, curved on the outer free edge, and with grommet.
// ============================================================================
function DoorBackFace({
  side,
}: {
  side: "left" | "right"
}) {
  const isLeft = side === "left"
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        background: \`linear-gradient(180deg, \${GREEN.interiorTop} 0%, \${GREEN.interior} 100%)\`,
        borderRadius: 22,
      }}
    >
      {/* Subtle interior lighting / depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.32)",
        }}
      />
      {/* Shadow along the hinge seam */}
      <div
        className="pointer-events-none absolute inset-y-0 w-8"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: isLeft
            ? "linear-gradient(270deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 100%)",
        } as React.CSSProperties}
      />
      {/* Grommet on the outer free edge */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2",
          isLeft ? "left-[5px]" : "right-[7px]"
        )}
      >
        <Grommet />
      </div>
    </div>
  )
}

// ============================================================================
// Main component: 3-State Animation Sequence + Fluid Reverse Return
//   1. "closed": Card is closed, stamps tucked inside the pocket behind doors.
//   2. "open": Hover opens doors to 114°, revealing stamps in the curved pocket.
//   3. "presented": Click lifts stamps to the center on top of the closed cover.
//   4. "closing": Reverse animation: cards launch up, doors open, cards dive into pocket,
//      flaps close with an inward gap settle, and gap closes flush back to "closed".
// ============================================================================
export type CardState = "closed" | "open" | "presented" | "closing"

export interface StampCollectionCardProps {
  className?: string
  embedded?: boolean
  defaultScale?: number
}

export function StampCollectionPreview({
  className,
  embedded = false,
  defaultScale,
}: StampCollectionCardProps) {
  const shouldReduceMotion = useReducedMotion()

  // Interactive states: "closed" -> "open" -> "presented" -> "closing" -> "closed"
  const [state, setState] = React.useState<CardState>("closed")
  const [isHoverClosing, setIsHoverClosing] = React.useState(false)
  const [closingPhase, setClosingPhase] = React.useState<"up" | "down" | null>(null)
  const [secondaryPeeked, setSecondaryPeeked] = React.useState(false)
  const hasEnteredPresented = React.useRef(false)
  const timerRefs = React.useRef<NodeJS.Timeout[]>([])
  const openTimestampRef = React.useRef(0)

  React.useEffect(() => {
    return () => {
      timerRefs.current.forEach(clearTimeout)
    }
  }, [])

  const handleOpen = () => {
    timerRefs.current.forEach(clearTimeout)
    setIsHoverClosing(false)
    setClosingPhase(null)
    setSecondaryPeeked(false)
    hasEnteredPresented.current = false
    openTimestampRef.current = Date.now()
    setState("open")
  }

  const handlePresent = () => {
    timerRefs.current.forEach(clearTimeout)
    setIsHoverClosing(false)
    setClosingPhase(null)
    hasEnteredPresented.current = false
    setTimeout(() => {
      hasEnteredPresented.current = true
    }, 900)
    setState("presented")
  }

  const handleClose = (from?: "open" | "presented") => {
    const source = from ?? (state === "presented" ? "presented" : "open")
    if (source === "presented") {
      timerRefs.current.forEach(clearTimeout)
      setIsHoverClosing(false)
      setSecondaryPeeked(false)
      hasEnteredPresented.current = false
      setState("closing")
      setClosingPhase("up")
      const t1 = setTimeout(() => {
        setClosingPhase("down")
      }, 400)
      const t2 = setTimeout(() => {
        setState("closed")
        setClosingPhase(null)
      }, 1370)
      timerRefs.current.push(t1, t2)
    } else {
      timerRefs.current.forEach(clearTimeout)
      setClosingPhase(null)
      setSecondaryPeeked(false)
      hasEnteredPresented.current = false
      setIsHoverClosing(true)
      const t = setTimeout(() => {
        setState("closed")
        setIsHoverClosing(false)
      }, 420)
      timerRefs.current.push(t)
    }
  }

  const handleMouseEnter = () => {
    if (state === "closed" || isHoverClosing) {
      handleOpen()
    }
  }

  const handleMouseLeave = () => {
    if (state === "open") {
      handleClose("open")
    }
  }

  const handleNextState = () => {
    if (state === "closing" || isHoverClosing) return
    if (state === "closed") {
      handleOpen()
    } else if (state === "open") {
      // Guard against instantaneous mobile tap or rapid hover-click double-firing (< 200ms)
      if (Date.now() - openTimestampRef.current < 200) {
        return
      }
      handlePresent()
    } else if (state === "presented") {
      handleClose("presented")
    }
  }

  const doorsOpen = state === "open"
  const isPresented = state === "presented"
  const isClosing = state === "closing"
  const areDoorsOpen = doorsOpen || (isClosing && closingPhase === "up")
  const openAngle = 114

  // Door rotation values:
  // Forward (closed -> open): doors swing open to ±114° in 3D perspective.
  // Forward (open -> presented): doors close smoothly in one continuous easeInOut arc.
  // Reverse (presented -> closing -> closed) & Hover Close:
  // 1. Doors swing shut (±114° -> 0°).
  // 2. Stage 1: Flaps dip inward in 3D (to ±9.2°) opening the authentic vertical gap between the flaps for a frame, revealing the white stamp inside.
  // 3. Stage 2: Flaps rebound naturally (to ±5.5°), making the gap visibly narrower.
  // 4. Stage 3: Flaps settle flush (0°) with no gap, right flap resting smoothly on top of the left flap with soft cast shadow.
  const doorRotateYLeft = shouldReduceMotion
    ? (doorsOpen ? -openAngle : 0)
    : isClosing
      ? [0, -openAngle, -openAngle, 0, 9.2, 5.5, 0]
      : isHoverClosing
        ? [-openAngle, 0, 9.2, 5.5, 0]
        : doorsOpen
          ? -openAngle
          : 0

  const doorRotateYRight = shouldReduceMotion
    ? (doorsOpen ? openAngle : 0)
    : isClosing
      ? [0, openAngle, openAngle, 0, -9.2, -5.5, 0]
      : isHoverClosing
        ? [openAngle, 0, -9.2, -5.5, 0]
        : doorsOpen
          ? openAngle
          : 0

  const doorTransition: Transition = shouldReduceMotion
    ? { duration: 0.22 }
    : isClosing
      ? {
          duration: 1.35,
          times: [0, 0.28, 0.40, 0.68, 0.80, 0.90, 1.0],
          ease: [
            "easeInOut",
            "linear",
            [0.25, 0.1, 0.25, 1],
            "easeOut",
            "easeInOut",
            [0.22, 1, 0.36, 1],
          ],
        }
      : isHoverClosing
        ? {
            duration: 0.42,
            times: [0, 0.42, 0.66, 0.84, 1.0],
            ease: [
              [0.25, 0.1, 0.25, 1],
              "easeOut",
              "easeInOut",
              [0.22, 1, 0.36, 1],
            ],
          }
        : doorsOpen
          ? { type: "spring", stiffness: 135, damping: 18, mass: 0.8 }
          : isPresented
            ? { duration: 0.84, ease: "easeInOut" }
            : { duration: 0.28, ease: "easeOut" }

  // Stamp transforms across the states:
  // Forward (open -> presented): launch up -> enlarge -> land at center.
  // Reverse (presented -> closing): launch up from center -> scale down -> dive into pocket -> tuck inside.
  const featuredAnim = shouldReduceMotion
    ? {
        x: isPresented ? "-48%" : "-56%",
        y: isPresented ? "16.5%" : doorsOpen ? "0%" : "6%",
        scale: isPresented ? 1.45 : doorsOpen ? 0.96 : 0.94,
        rotate: isPresented ? 0.2 : 4.8,
        opacity: 1,
      }
    : isClosing
      ? {
          x: ["-48%", "-48%", "-56%", "-56%"],
          y: ["16.5%", "-125%", "6%", "6%"],
          scale: [1.45, 1.45, 0.94, 0.94],
          rotate: [0.2, 1, 4.8, 4.8],
          opacity: 1,
        }
      : isPresented
        ? {
            x: ["-56%", "-48%", "-48%"],
            y: ["0%", "-125%", "16.5%"],
            scale: [0.96, 1.45, 1.45],
            rotate: [4.8, 1, 0.2],
            opacity: 1,
          }
        : doorsOpen && !isHoverClosing
          ? { x: "-56%", y: "0%", scale: 0.96, rotate: 4.8, opacity: 1 }
          : { x: "-56%", y: "6%", scale: 0.94, rotate: 4.8, opacity: 1 }

  const featuredTransition: Transition = shouldReduceMotion
    ? { duration: 0.28 }
    : isClosing
      ? {
          duration: 1.35,
          times: [0, 0.30, 0.68, 1.0],
          ease: ["easeOut", [0.22, 1, 0.36, 1], "linear"],
        }
      : isPresented
        ? {
            duration: 0.88,
            times: [0, 0.40, 1],
            ease: ["easeOut", [0.22, 1, 0.36, 1]],
          }
        : doorsOpen && !isHoverClosing
          ? {
              type: "spring",
              stiffness: 220,
              damping: 22,
              mass: 0.8,
            }
          : {
              duration: 0.32,
              ease: [0.32, 0.72, 0, 1],
            }

  const secondaryAnim = shouldReduceMotion
    ? {
        x: isPresented ? (secondaryPeeked ? "-12%" : "-43%") : "-37%",
        y: isPresented ? (secondaryPeeked ? "14%" : "20.5%") : (doorsOpen && !isHoverClosing) ? "17%" : "24%",
        scale: isPresented ? 1.30 : (doorsOpen && !isHoverClosing) ? 0.90 : 0.88,
        rotate: isPresented ? (secondaryPeeked ? 22 : 14.8) : 11,
        opacity: 1,
      }
    : isClosing
      ? {
          x: ["-43%", "-43%", "-37%", "-37%"],
          y: ["20.5%", "-130%", "24%", "24%"],
          scale: [1.30, 1.30, 0.88, 0.88],
          rotate: [14.8, 12, 11, 11],
          opacity: 1,
        }
      : isPresented
        ? secondaryPeeked
          ? {
              x: "-12%",
              y: "14%",
              scale: 1.30,
              rotate: 22,
              opacity: 1,
            }
          : hasEnteredPresented.current
            ? {
                x: "-43%",
                y: "20.5%",
                scale: 1.30,
                rotate: 14.8,
                opacity: 1,
              }
            : {
                x: ["-37%", "-43%", "-43%"],
                y: ["17%", "-130%", "20.5%"],
                scale: [0.90, 1.30, 1.30],
                rotate: [11, 12, 14.8],
                opacity: 1,
              }
        : doorsOpen && !isHoverClosing
          ? { x: "-37%", y: "17%", scale: 0.90, rotate: 11, opacity: 1 }
          : { x: "-37%", y: "24%", scale: 0.88, rotate: 11, opacity: 1 }

  const secondaryTransition: Transition = shouldReduceMotion
    ? { duration: 0.28 }
    : isClosing
      ? {
          duration: 1.35,
          times: [0, 0.30, 0.68, 1.0],
          ease: ["easeOut", [0.22, 1, 0.36, 1], "linear"],
        }
      : isPresented
        ? (secondaryPeeked || hasEnteredPresented.current)
          ? {
              type: "spring",
              stiffness: 260,
              damping: 22,
              mass: 0.8,
            }
          : {
              duration: 0.88,
              times: [0, 0.38, 1],
              ease: ["easeOut", [0.22, 1, 0.36, 1]],
            }
        : doorsOpen && !isHoverClosing
          ? {
              type: "spring",
              stiffness: 200,
              damping: 22,
              mass: 0.8,
              delay: 0.02,
            }
          : {
              duration: 0.32,
              ease: [0.32, 0.72, 0, 1],
            }

  const card = (
    <div
      className={cn("relative w-[340px] sm:w-[390px] md:w-[428px] max-w-full select-none shrink-0", className)}
      style={{ perspective: "960px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={state !== "closed"}
        aria-label={
          state === "closed" && !isHoverClosing
            ? "Stamp collection — hover to open folder"
            : state === "open"
              ? "Stamp collection — open. Click to present stamps."
              : state === "presented"
                ? "Stamp collection — presented. Click to return to pocket."
                : "Stamp collection — closing"
        }
        onClick={handleNextState}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleNextState()
          }
        }}
        onFocus={() => {
          if (state === "closed" || isHoverClosing) {
            handleOpen()
          }
        }}
        onBlur={() => {
          if (state === "open") {
            handleClose("open")
          }
        }}
        className="relative aspect-[428/520] w-full cursor-pointer overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-[#1C6350] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        initial={false}
        style={{
          perspective: "960px",
          borderRadius: 22,
        }}
      >
        {/* Ground drop shadow */}
        <motion.div
          className="absolute inset-x-8 bottom-[-22px] h-9 rounded-[50%] blur-2xl pointer-events-none"
          style={{ background: "rgba(12,40,32,0.32)" }}
          animate={{
            opacity: areDoorsOpen ? 0.75 : 0.45,
            scaleX: areDoorsOpen ? 1.25 : 1,
            scaleY: areDoorsOpen ? 1.15 : 1,
          }}
          transition={doorTransition}
        />

        {/* ---- Interior back wall (seamless connection, matching rounded corners) ---- */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-[22px]"
          style={{
            background: \`linear-gradient(180deg, \${GREEN.interiorTop} 0%, \${GREEN.interior} 100%)\`,
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.35)",
            zIndex: 1,
            borderRadius: 22,
          }}
        >
          {/* Crease line shadows at the hinges */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-6"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-6"
            style={{
              background:
                "linear-gradient(270deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* ---- Secondary (wave bird) stamp ----
            Positioned naturally behind the sparrow stamp, matching full stamp scale
            and peeking out prominently at the top and right, with its authentic
            perforation cutout teeth showing along the left and down.
            Interactive hover: fans out, glides to the right, and elevates with rich shadow. */}
        <motion.div
          className={cn(
            "absolute left-[47%] top-[6%] w-[48%] aspect-[480/772]",
            (doorsOpen || isPresented) && !isClosing ? "cursor-pointer pointer-events-auto" : "pointer-events-none"
          )}
          style={{
            zIndex: isPresented || (isClosing && closingPhase === "up") ? 40 : 12,
          }}
          initial={false}
          animate={secondaryAnim}
          transition={secondaryTransition}
          onClick={(e) => {
            if (isPresented) {
              e.stopPropagation()
              setSecondaryPeeked((p) => !p)
            }
          }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              transformOrigin: "bottom left",
              filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.3))",
            }}
            whileHover={
              !shouldReduceMotion && (doorsOpen || isPresented) && !isClosing
                ? {
                    x: 32,
                    y: -14,
                    rotate: 9.5,
                    scale: 1.05,
                    filter: "drop-shadow(0 20px 32px rgba(0,0,0,0.42))",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      mass: 0.8,
                    },
                  }
                : undefined
            }
          >
            <WaveBirdStamp />
          </motion.div>
        </motion.div>

        {/* ---- Featured (sparrow) stamp ----
            Hero stamp prominently centered inside the pocket, or floating on top in presented state.
            Interactive hover: scales smoothly with tactile spring lift and elevated shadow. */}
        <motion.div
          className={cn(
            "absolute left-[47%] top-[6%] w-[50%] aspect-[669/1024]",
            (doorsOpen || isPresented) && !isClosing ? "cursor-pointer pointer-events-auto" : "pointer-events-none"
          )}
          style={{
            zIndex: isPresented || (isClosing && closingPhase === "up") ? 45 : 15,
          }}
          initial={false}
          animate={featuredAnim}
          transition={featuredTransition}
        >
          <motion.div
            className="h-full w-full"
            style={{
              transformOrigin: "center center",
              filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.42))",
            }}
            whileHover={
              !shouldReduceMotion && (doorsOpen || isPresented) && !isClosing
                ? {
                    scale: 1.06,
                    y: -6,
                    filter: "drop-shadow(0 22px 36px rgba(0,0,0,0.52))",
                    transition: {
                      type: "spring",
                      stiffness: 340,
                      damping: 22,
                      mass: 0.7,
                    },
                  }
                : undefined
            }
          >
            <BirdStamp />
          </motion.div>
        </motion.div>

        {/* ---- Front pocket panel (bottom flap) ----
            Always INSIDE the doors. Holds stamps firmly inside pocket with zIndex: 25.
            In "presented" and initial closing launch, hidden so it doesn't overlap stamps. */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[48%] rounded-t-[16px] rounded-b-[22px] overflow-hidden pointer-events-none"
          style={{
            background: \`linear-gradient(180deg, \${GREEN.pocketTop} 0%, \${GREEN.pocketBottom} 100%)\`,
            boxShadow:
              "0 -6px 16px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 22,
            borderBottomRightRadius: 22,
          }}
          animate={{
            opacity: isPresented || (isClosing && closingPhase === "up") ? 0 : 1,
            zIndex: isPresented || (isClosing && closingPhase === "up") ? 0 : 25,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[16px]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
        </motion.div>


        {/* ---- Left door (hinged seamlessly at left edge at z = 0, zero hinge gap) ---- */}
        <motion.div
          className="absolute left-0 top-0 h-full cursor-pointer rounded-l-[22px]"
          initial={false}
          style={{
            width: "50%",
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            zIndex:
              isPresented || (isClosing && closingPhase === "up")
                ? 20
                : 30,
          }}
          animate={{ rotateY: doorRotateYLeft }}
          transition={doorTransition}
        >
          <DoorFrontFace side="left" />
          <DoorBackFace side="left" />
        </motion.div>

        {/* ---- Right door (hinged seamlessly at right edge at z = 0, zero hinge gap, overlaps left flap by 2px) ---- */}
        <motion.div
          className="absolute right-0 top-0 h-full cursor-pointer rounded-r-[22px]"
          initial={false}
          style={{
            width: "calc(50% + 2px)",
            transformStyle: "preserve-3d",
            transformOrigin: "right center",
            zIndex:
              isPresented || (isClosing && closingPhase === "up")
                ? 22
                : 32,
          }}
          animate={{ rotateY: doorRotateYRight }}
          transition={doorTransition}
        >
          <DoorFrontFace side="right" />
          <DoorBackFace side="right" />

          {/* Subtle drop shadow cast by the overlapping right flap onto the left flap */}
          <motion.div
            className="pointer-events-none absolute -left-[5px] top-0 bottom-0 w-[5px] z-10 rounded-l-[4px]"
            style={{
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(270deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.14) 65%, rgba(0,0,0,0) 100%)",
            }}
            initial={false}
            animate={{
              opacity: areDoorsOpen ? 0 : 1,
            }}
            transition={{
              duration: isHoverClosing ? 0.18 : 0.17,
              delay: isHoverClosing ? 0.17 : 0,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )

  if (embedded) {
    return (
      <div
        className={cn(
          chivoMono.className,
          "w-full h-full flex items-center justify-center p-4 select-none",
          className
        )}
      >
        {card}
      </div>
    )
  }

  return (
    <div
      className={cn(
        chivoMono.className,
        "w-full h-full flex items-center justify-center p-4 select-none",
        className
      )}
      style={defaultScale !== undefined ? { transform: \`scale(\${defaultScale})\` } : undefined}
    >
      {card}
    </div>
  )
}

export default StampCollectionPreview;
`;

export const fabricButtonSwitchCode = "\"use client\"\n\nimport * as React from \"react\"\nimport { motion, AnimatePresence } from \"motion/react\"\nimport { cn } from \"@/src/lib/utils\"\nimport { Button } from \"@/src/components/ui/button\"\n\n// ============================================================================\n// ============================================================================\n// AUDIO HAPTIC SYNTHESIS: Authentic Denim Jeans Button Fastening & Fabric Snap\n// Physically modeled acoustic layers via Web Audio API:\n// 1. Denim Fabric Weave Friction: Shaped noise burst swept through bandpass filter\n// 2. Heavy Metal Shank Button: Inharmonic metallic ping (antique bronze / pewter)\n// 3. Buttonhole Cavity Catch: Low-frequency mechanical pop / thud into eyelet\n// 4. Rivet Edge Transient: Micro-second click as metal clears stitched rim\n// ============================================================================\n\nlet sharedAudioCtx: AudioContext | null = null\n\nfunction getAudioContext(): AudioContext | null {\n  if (typeof window === \"undefined\") return null\n  const AudioCtx =\n    window.AudioContext ||\n    (window as unknown as { webkitAudioContext: typeof AudioContext })\n      .webkitAudioContext\n  if (!AudioCtx) return null\n  if (!sharedAudioCtx || sharedAudioCtx.state === \"closed\") {\n    sharedAudioCtx = new AudioCtx()\n  }\n  if (sharedAudioCtx.state === \"suspended\") {\n    sharedAudioCtx.resume().catch(() => {})\n  }\n  return sharedAudioCtx\n}\n\nfunction playTactileClack(isDark: boolean) {\n  try {\n    const ctx = getAudioContext()\n    if (!ctx) return\n    const now = ctx.currentTime\n\n    // Physical metallic fundamental frequency\n    // Light Mode (Antique Bronze Sun): Shimmering golden bronze coin / bell chime (~2380Hz)\n    // Dark Mode (Antique Pewter Star): Heavy, solid cast pewter / rivet snap (~1650Hz)\n    const baseFund = isDark ? 1650 : 2380\n\n    // ------------------------------------------------------------------------\n    // 1. METALLIC FM STRIKE (Instant crisp metal-on-metal clink)\n    // Frequency modulation produces the dense inharmonic sidebands of solid metal\n    // ------------------------------------------------------------------------\n    const carrier = ctx.createOscillator()\n    const modulator = ctx.createOscillator()\n    const modGain = ctx.createGain()\n    const carrierGain = ctx.createGain()\n\n    carrier.type = \"sine\"\n    carrier.frequency.setValueAtTime(baseFund, now)\n    carrier.frequency.exponentialRampToValueAtTime(baseFund * 0.88, now + 0.05)\n\n    // Modulator at non-integer inharmonic ratio (1.58x) for genuine metallic timbre\n    modulator.type = \"sine\"\n    modulator.frequency.setValueAtTime(baseFund * 1.58, now)\n    modulator.frequency.exponentialRampToValueAtTime(baseFund * 1.42, now + 0.04)\n\n    // FM index: sharp metallic attack dropping within 35ms\n    modGain.gain.setValueAtTime(baseFund * 1.85, now)\n    modGain.gain.exponentialRampToValueAtTime(1, now + 0.035)\n\n    modulator.connect(modGain)\n    modGain.connect(carrier.frequency)\n\n    carrierGain.gain.setValueAtTime(isDark ? 0.36 : 0.32, now)\n    carrierGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065)\n\n    carrier.connect(carrierGain)\n    carrierGain.connect(ctx.destination)\n\n    modulator.start(now)\n    carrier.start(now)\n    modulator.stop(now + 0.07)\n    carrier.stop(now + 0.07)\n\n    // ------------------------------------------------------------------------\n    // 2. METALLIC RING MODES (Acoustic resonance of circular metal medallion)\n    // Mode 1: ~2.29x base (chime overtone), Mode 2: ~3.65x base (upper metallic sheen)\n    // ------------------------------------------------------------------------\n    const ring1 = ctx.createOscillator()\n    const ringGain1 = ctx.createGain()\n    ring1.type = \"sine\"\n    ring1.frequency.setValueAtTime(baseFund * 2.29, now)\n    ring1.frequency.exponentialRampToValueAtTime(baseFund * 2.15, now + 0.07)\n\n    ringGain1.gain.setValueAtTime(isDark ? 0.20 : 0.24, now)\n    ringGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.075)\n\n    ring1.connect(ringGain1)\n    ringGain1.connect(ctx.destination)\n    ring1.start(now)\n    ring1.stop(now + 0.08)\n\n    const ring2 = ctx.createOscillator()\n    const ringGain2 = ctx.createGain()\n    ring2.type = \"sine\"\n    ring2.frequency.setValueAtTime(baseFund * 3.65, now)\n    ring2.frequency.exponentialRampToValueAtTime(baseFund * 3.4, now + 0.04)\n\n    ringGain2.gain.setValueAtTime(isDark ? 0.14 : 0.18, now)\n    ringGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.045)\n\n    ring2.connect(ringGain2)\n    ringGain2.connect(ctx.destination)\n    ring2.start(now)\n    ring2.stop(now + 0.05)\n\n    // ------------------------------------------------------------------------\n    // 3. HARD RIVET IMPACT TRANSIENT (Razor-sharp metal bite at t=0)\n    // ------------------------------------------------------------------------\n    const snapOsc = ctx.createOscillator()\n    const snapGain = ctx.createGain()\n    snapOsc.type = \"triangle\"\n    snapOsc.frequency.setValueAtTime(isDark ? 3800 : 4900, now)\n    snapOsc.frequency.exponentialRampToValueAtTime(1100, now + 0.012)\n\n    snapGain.gain.setValueAtTime(0.26, now)\n    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014)\n\n    snapOsc.connect(snapGain)\n    snapGain.connect(ctx.destination)\n    snapOsc.start(now)\n    snapOsc.stop(now + 0.016)\n\n    // ------------------------------------------------------------------------\n    // 4. SOLID CAST METAL WEIGHT (Punchy low-register body)\n    // ------------------------------------------------------------------------\n    const punchOsc = ctx.createOscillator()\n    const punchGain = ctx.createGain()\n    punchOsc.type = \"sine\"\n    const pStart = isDark ? 280 : 360\n    const pEnd = isDark ? 110 : 150\n    punchOsc.frequency.setValueAtTime(pStart, now)\n    punchOsc.frequency.exponentialRampToValueAtTime(pEnd, now + 0.028)\n\n    punchGain.gain.setValueAtTime(isDark ? 0.22 : 0.18, now)\n    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.032)\n\n    punchOsc.connect(punchGain)\n    punchGain.connect(ctx.destination)\n    punchOsc.start(now)\n    punchOsc.stop(now + 0.035)\n  } catch {\n    // Graceful fallback\n  }\n}\n\n// ============================================================================\n// EMBOSSED METAL DESKTOP BUTTONS (Ref: User Desktop PNGs)\n// - Light Mode: Antique Bronze Radiant Sun Medallion Button\n// - Dark Mode: Antique Silver / Pewter Compass Star Medallion Button\n// ============================================================================\n\ninterface DesktopButtonProps {\n  mode: \"light\" | \"dark\"\n  className?: string\n  hasShadow?: boolean\n}\n\nexport function DesktopButton({ mode, className, hasShadow = true }: DesktopButtonProps) {\n  const isLight = mode === \"light\"\n  const src = isLight\n    ? \"/textures/button-sun-opt.png\"\n    : \"/textures/button-star-opt.png\"\n  const alt = isLight\n    ? \"Embossed Antique Bronze Sun Button\"\n    : \"Embossed Antique Pewter Star Button\"\n\n  return (\n    <div\n      className={cn(\n        \"size-full w-full h-full select-none pointer-events-none relative flex items-center justify-center\",\n        className\n      )}\n      style={{\n        filter: hasShadow\n          ? \"drop-shadow(0 10px 16px rgba(0, 0, 0, 0.75)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.55))\"\n          : undefined,\n      }}\n    >\n      <img\n        src={src}\n        alt={alt}\n        className=\"size-full w-full h-full object-contain select-none pointer-events-none\"\n        draggable={false}\n      />\n    </div>\n  )\n}\n\n// ============================================================================\n// CORE SWITCH: FabricButtonSwitch\n// In accordance with media_1789210391812.png:\n// - Outer: Seamlessly flush with background denim (\"nothing outside\", no outer shadow)\n// - Border: Golden running-stitch seam encircling 5.5px outside the cutout\n// - Inner Edge: Deep dark inset shadow dropping into the cavity (\"shadow inside\")\n// - Inside: Denim track texture that adapts to light/dark mode (\"like it was before\")\n// ============================================================================\n\nexport interface FabricButtonSwitchProps {\n  checked?: boolean\n  defaultChecked?: boolean\n  onCheckedChange?: (checked: boolean) => void\n  soundEnabled?: boolean\n  disabled?: boolean\n  className?: string\n  ariaLabel?: string\n}\n\nconst SWITCH_LAYOUT = {\n  // Total container size\n  containerWidth: 196,\n  containerHeight: 92,\n\n  // Water-drop teardrop cavity bounds (Point at left, bulge at right)\n  cutoutWidth: 153,\n  cutoutHeight: 38,\n\n  // Button thumb (70px, elevated to z-30 above the opening & threads)\n  buttonSize: 70,\n  buttonTop: 11,\n  buttonLeft: 9,\n  travelDistance: 108,\n}\n\nexport function FabricButtonSwitch({\n  checked: controlledChecked,\n  defaultChecked = true,\n  onCheckedChange,\n  soundEnabled = true,\n  disabled = false,\n  className,\n  ariaLabel = \"Toggle dark mode and light mode\",\n}: FabricButtonSwitchProps) {\n  const [uncontrolledChecked, setUncontrolledChecked] =\n    React.useState(defaultChecked)\n  const isControlled = controlledChecked !== undefined\n  const isDark = isControlled ? controlledChecked : uncontrolledChecked\n\n  const cfg = SWITCH_LAYOUT\n\n  // Preload button images for instant smooth transitions\n  React.useEffect(() => {\n    const img1 = new Image()\n    img1.src = \"/textures/button-sun-opt.png\"\n    const img2 = new Image()\n    img2.src = \"/textures/button-star-opt.png\"\n  }, [])\n\n  const handleToggle = () => {\n    if (disabled) return\n    const nextState = !isDark\n    if (!isControlled) {\n      setUncontrolledChecked(nextState)\n    }\n    if (soundEnabled) {\n      playTactileClack(nextState)\n    }\n    onCheckedChange?.(nextState)\n  }\n\n  const handleKeyDown = (e: React.KeyboardEvent) => {\n    if (e.key === \"Enter\" || e.key === \" \") {\n      e.preventDefault()\n      handleToggle()\n    }\n  }\n\n  return (\n    <Button\n      variant=\"unstyled\"\n      size=\"none\"\n      role=\"switch\"\n      aria-checked={isDark}\n      aria-label={ariaLabel}\n      disabled={disabled}\n      onClick={handleToggle}\n      onKeyDown={handleKeyDown}\n      tabIndex={0}\n      className={cn(\n        \"relative inline-flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer transition-transform duration-150 active:scale-[0.98] p-0 border-0 bg-transparent shrink-0\",\n        disabled && \"opacity-50 cursor-not-allowed pointer-events-none\",\n        className\n      )}\n      style={{\n        width: `${cfg.containerWidth}px`,\n        height: `${cfg.containerHeight}px`,\n      }}\n    >\n      {/* ------------------------------------------------------------------ */}\n      {/* LAYER 1: JEANS WATER-DROP TEARDROP CUTOUT CAVITY (z-10)            */}\n      {/* Round circular eyelet on left, smoothly tapering to narrow tip     */}\n      {/* (Directly matching Derek Lam jeans reference media_1789214451983)  */}\n      {/* ------------------------------------------------------------------ */}\n      <svg\n        viewBox=\"0 0 196 92\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        className=\"absolute inset-0 size-full pointer-events-none z-10 overflow-hidden\"\n        aria-hidden=\"true\"\n      >\n        <defs>\n          {/* Water-drop teardrop shape clip path (Decreased height, sleek keyhole) */}\n          <clipPath id=\"jeans-waterdrop-clip\">\n            <path d=\"M 25.4 40.0 L 150.0 27.1 A 19 19 0 1 1 150.0 64.9 L 25.4 52.0 A 6 6 0 0 1 25.4 40.0 Z\" />\n          </clipPath>\n\n          {/* Deep Overhead Cast Shadow inside cavity */}\n          <linearGradient id=\"waterdrop-top-shadow\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n            <stop offset=\"0%\" stopColor=\"#000000\" stopOpacity={isDark ? \"0.6\" : \"0.55\"} />\n            <stop offset=\"50%\" stopColor=\"#000000\" stopOpacity={isDark ? \"0.2\" : \"0.15\"} />\n            <stop offset=\"100%\" stopColor=\"#000000\" stopOpacity=\"0\" />\n          </linearGradient>\n        </defs>\n\n        {/* Clipped Cavity Group */}\n        <g clipPath=\"url(#jeans-waterdrop-clip)\">\n          {/* Base cavity color */}\n          <rect\n            width=\"196\"\n            height=\"92\"\n            fill={isDark ? \"#121D2D\" : \"#385676\"}\n          />\n\n          {/* Light Denim Photo Texture Layer */}\n          <image\n            href=\"/textures/denim-light.jpg\"\n            width=\"196\"\n            height=\"92\"\n            preserveAspectRatio=\"xMidYMid slice\"\n            style={{\n              opacity: isDark ? 0 : 1,\n              transition: \"opacity 0.45s ease\",\n            }}\n          />\n\n          {/* Dark Denim Photo Texture Layer */}\n          <image\n            href=\"/textures/denim-dark.jpg\"\n            width=\"196\"\n            height=\"92\"\n            preserveAspectRatio=\"xMidYMid slice\"\n            style={{\n              opacity: isDark ? 1 : 0,\n              filter: \"brightness(1.22) contrast(1.15) saturate(1.1)\",\n              transition: \"opacity 0.45s ease\",\n            }}\n          />\n\n          {/* Deep Overhead Cast Shadow inside cavity */}\n          <rect\n            x=\"0\"\n            y=\"25\"\n            width=\"196\"\n            height=\"18\"\n            fill=\"url(#waterdrop-top-shadow)\"\n          />\n\n          {/* Bottom subtle light shelf */}\n          <rect\n            x=\"0\"\n            y=\"49\"\n            width=\"196\"\n            height=\"17\"\n            fill=\"url(#waterdrop-top-shadow)\"\n            transform=\"rotate(180 98 57.5)\"\n            opacity=\"0.3\"\n          />\n        </g>\n\n      </svg>\n\n      {/* ------------------------------------------------------------------ */}\n      {/* LAYER 2: GOLDEN THREAD RUNNING STITCH SEAMS (z-20)                 */}\n      {/* Inner seam along the cutout rim + Concentric outer seam            */}\n      {/* ------------------------------------------------------------------ */}\n      <svg\n        viewBox=\"0 0 196 92\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        className=\"absolute inset-0 size-full pointer-events-none overflow-visible z-20\"\n        aria-hidden=\"true\"\n      >\n        <defs>\n          <filter id=\"stitch-thread-shadow\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n            <feDropShadow dx=\"0\" dy=\"1.2\" stdDeviation=\"0.6\" floodColor=\"#000000\" floodOpacity=\"0.6\" />\n          </filter>\n        </defs>\n\n        {/* ================================================================ */}\n        {/* INNER SEAM: Thread stitching right along the cutout border       */}\n        {/* ================================================================ */}\n        {/* Inner Seam Thick Jeans Thread (White in white mode, Amber in dark mode) */}\n        <path\n          d=\"M 19.7 41.5 L 151.2 33.0 A 13 13 0 1 1 151.2 59.0 L 19.7 50.5 A 4.5 4.5 0 0 1 19.7 41.5 Z\"\n          stroke={isDark ? \"#F59E0B\" : \"#FFFFFF\"}\n          strokeWidth=\"2.3\"\n          strokeDasharray=\"4.6 3.4\"\n          strokeLinecap=\"round\"\n          filter=\"url(#stitch-thread-shadow)\"\n          className=\"transition-colors duration-300\"\n        />\n\n        {/* Inner Seam Thread Spine Highlight */}\n        <path\n          d=\"M 19.7 41.5 L 151.2 33.0 A 13 13 0 1 1 151.2 59.0 L 19.7 50.5 A 4.5 4.5 0 0 1 19.7 41.5 Z\"\n          stroke={isDark ? \"#FEF08A\" : \"#FFFFFF\"}\n          strokeWidth=\"0.8\"\n          strokeDasharray=\"3.6 4.4\"\n          strokeLinecap=\"round\"\n          strokeOpacity={isDark ? 0.85 : 0.6}\n          className=\"transition-colors duration-300\"\n        />\n\n        {/* ================================================================ */}\n        {/* OUTER SEAM: Tight 3.2px twin-stitch offset encircling teardrop   */}\n        {/* ================================================================ */}\n        {/* Outer Seam Thick Jeans Thread (White in white mode, Amber in dark mode) */}\n        <path\n          d=\"M 19.5 38.3 L 151.0 29.8 A 16.2 16.2 0 1 1 151.0 62.2 L 19.5 53.7 A 7.7 7.7 0 0 1 19.5 38.3 Z\"\n          stroke={isDark ? \"#F59E0B\" : \"#FFFFFF\"}\n          strokeWidth=\"2.3\"\n          strokeDasharray=\"4.8 3.4\"\n          strokeLinecap=\"round\"\n          filter=\"url(#stitch-thread-shadow)\"\n          className=\"transition-colors duration-300\"\n        />\n\n        {/* Outer Seam Thread Spine Highlight */}\n        <path\n          d=\"M 19.5 38.3 L 151.0 29.8 A 16.2 16.2 0 1 1 151.0 62.2 L 19.5 53.7 A 7.7 7.7 0 0 1 19.5 38.3 Z\"\n          stroke={isDark ? \"#FEF08A\" : \"#FFFFFF\"}\n          strokeWidth=\"0.8\"\n          strokeDasharray=\"3.8 4.4\"\n          strokeLinecap=\"round\"\n          strokeOpacity={isDark ? 0.85 : 0.6}\n          className=\"transition-colors duration-300\"\n        />\n      </svg>\n\n      {/* ------------------------------------------------------------------ */}\n      {/* LAYER 3: PHYSICAL METAL BUTTON SLIDER THUMB (z-30 ABOVE OPENING)   */}\n      {/* 70px medallion button sits over the water-drop eye, gliding        */}\n      {/* along the tapered track and rotating naturally as it rolls.        */}\n      {/* ------------------------------------------------------------------ */}\n      <motion.div\n        className=\"absolute flex items-center justify-center pointer-events-none z-30\"\n        style={{\n          top: `${cfg.buttonTop}px`,\n          left: `${cfg.buttonLeft}px`,\n          width: `${cfg.buttonSize}px`,\n          height: `${cfg.buttonSize}px`,\n          filter:\n            \"drop-shadow(0 10px 16px rgba(0, 0, 0, 0.75)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.55))\",\n        }}\n        animate={{\n          x: isDark ? cfg.travelDistance : 0,\n        }}\n        transition={{\n          type: \"spring\",\n          stiffness: 340,\n          damping: 28,\n          mass: 0.9,\n        }}\n      >\n        {/* Rotating Button Medallion on Stitch Track */}\n        <motion.div\n          className=\"relative size-full w-full h-full\"\n          animate={{\n            rotate: isDark ? 180 : 0,\n          }}\n          transition={{\n            type: \"spring\",\n            stiffness: 340,\n            damping: 28,\n            mass: 0.9,\n          }}\n        >\n          {/* Light Mode Face: Antique Bronze Sun Medallion */}\n          <motion.div\n            className=\"absolute inset-0 size-full\"\n            animate={{\n              opacity: isDark ? 0 : 1,\n              scale: isDark ? 0.96 : 1,\n            }}\n            transition={{\n              duration: 0.26,\n              ease: \"easeInOut\",\n            }}\n          >\n            <DesktopButton mode=\"light\" hasShadow={false} />\n          </motion.div>\n\n          {/* Dark Mode Face: Antique Pewter Moon / Star Medallion */}\n          <motion.div\n            className=\"absolute inset-0 size-full\"\n            animate={{\n              opacity: isDark ? 1 : 0,\n              scale: isDark ? 1 : 0.96,\n            }}\n            transition={{\n              duration: 0.26,\n              ease: \"easeInOut\",\n            }}\n          >\n            <DesktopButton mode=\"dark\" hasShadow={false} />\n          </motion.div>\n        </motion.div>\n      </motion.div>\n    </Button>\n  )\n}\n\n// ============================================================================\n// MAIN SHOWCASE EXPORT: FabricButtonSwitchPreview\n// Card background using the user's authentic high-res denim fabric textures\n// with perimeter running-stitch hem border.\n// ============================================================================\n\nexport interface FabricButtonSwitchPreviewProps {\n  embedded?: boolean\n  className?: string\n}\n\nexport default function FabricButtonSwitchPreview({\n  embedded = false,\n  className,\n}: FabricButtonSwitchPreviewProps) {\n  const [isDark, setIsDark] = React.useState(true)\n  const [toggleCount, setToggleCount] = React.useState(0)\n\n  const handleToggle = (checked: boolean) => {\n    setIsDark(checked)\n    setToggleCount((c) => c + 1)\n  }\n\n  return (\n    <div\n      className={cn(\n        \"flex flex-col items-center justify-center font-sans antialiased text-white select-none\",\n        embedded ? \"w-full py-6 px-4\" : \"min-h-dvh flex-1 w-full p-4 sm:p-8 lg:p-12\",\n        className\n      )}\n      style={{ backgroundColor: embedded ? \"transparent\" : \"#000000\" }}\n    >\n      {/* Ultra-Modern Haute-Couture Typography for Leather Brand Patch */}\n      <style>{`\n        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');\n      `}</style>\n\n      {/* ------------------------------------------------------------------ */}\n      {/* AUTHENTIC DENIM FABRIC CARD (Steady, no shake)                     */}\n      {/* ------------------------------------------------------------------ */}\n      <motion.div\n        layout\n        transition={{ type: \"spring\", stiffness: 350, damping: 28 }}\n        className=\"relative w-full max-w-[420px] sm:max-w-[460px] h-[300px] sm:h-[330px] rounded-[32px] flex items-center justify-center overflow-hidden transition-all duration-500\"\n        style={{\n          boxShadow: isDark\n            ? \"0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(96, 165, 250, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.15)\"\n            : \"0 30px 70px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.4)\",\n          backgroundColor: isDark ? \"#142132\" : \"#4A729A\",\n        }}\n      >\n        {/* Layer 1: Stone-Washed Light Denim Base Texture */}\n        <div\n          className=\"absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-500 ease-in-out\"\n          style={{\n            backgroundImage: \"url('/textures/denim-light.jpg')\",\n            opacity: isDark ? 0 : 1,\n          }}\n        />\n\n        {/* Layer 2: Raw Indigo Denim Photo Texture (User-provided JPG) */}\n        <div\n          className=\"absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-500 ease-in-out\"\n          style={{\n            backgroundImage: \"url('/textures/denim-dark.jpg')\",\n            opacity: isDark ? 1 : 0,\n            filter: \"brightness(1.25) contrast(1.18) saturate(1.12)\",\n          }}\n        />\n\n        {/* Layer 3: Tactile Fabric Vignette & Diagonal Twill Depth Lighting */}\n        <div\n          className=\"absolute inset-0 pointer-events-none transition-all duration-500\"\n          style={{\n            background: isDark\n              ? \"radial-gradient(ellipse at 50% 40%, rgba(96, 165, 250, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%)\"\n              : \"radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 0, 0, 0.2) 100%)\",\n          }}\n        />\n\n        {/* Layer 4: Luxury Saddle Leather Label Patch at Corner (Modern Haute-Couture Style) */}\n        {/* Sleek rectangular leather patch with modern luxury Italiana typography */}\n        <div\n          className=\"absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none w-[90px] sm:w-[96px] h-[46px] sm:h-[50px] rounded-[6px] flex flex-col items-center justify-center select-none\"\n          style={{\n            background: \"linear-gradient(172deg, #BA6426 0%, #A4511B 45%, #8E3E11 100%)\",\n            border: \"1px solid rgba(70, 28, 6, 0.4)\",\n            boxShadow:\n              \"0 4px 12px -2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.35)\",\n          }}\n        >\n          {/* Subtle leather surface sheen highlight */}\n          <div\n            className=\"absolute inset-0 rounded-[5px] pointer-events-none\"\n            style={{\n              background: \"radial-gradient(ellipse at 50% 12%, rgba(255, 255, 255, 0.16) 0%, transparent 70%)\",\n            }}\n          />\n\n          {/* Authentic Leather Perimeter Saddle Stitching */}\n          <svg\n            className=\"absolute inset-0 size-full pointer-events-none overflow-visible\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n            aria-hidden=\"true\"\n          >\n            {/* Needle puncture depressions */}\n            <rect\n              x=\"3.5\"\n              y=\"3.5\"\n              width=\"calc(100% - 7px)\"\n              height=\"calc(100% - 7px)\"\n              rx=\"3.5\"\n              fill=\"none\"\n              stroke=\"#2C1003\"\n              strokeWidth=\"1.1\"\n              strokeDasharray=\"0.9 3.5\"\n              strokeLinecap=\"round\"\n              strokeOpacity=\"0.45\"\n            />\n            {/* Fine dark saddle leather thread */}\n            <rect\n              x=\"3.5\"\n              y=\"3.5\"\n              width=\"calc(100% - 7px)\"\n              height=\"calc(100% - 7px)\"\n              rx=\"3.5\"\n              fill=\"none\"\n              stroke=\"#441D07\"\n              strokeWidth=\"1.0\"\n              strokeDasharray=\"2.6 1.8\"\n              strokeLinecap=\"round\"\n            />\n            {/* Delicate thread specular sheen */}\n            <rect\n              x=\"3.5\"\n              y=\"3.5\"\n              width=\"calc(100% - 7px)\"\n              height=\"calc(100% - 7px)\"\n              rx=\"3.5\"\n              fill=\"none\"\n              stroke=\"#C97532\"\n              strokeWidth=\"0.4\"\n              strokeDasharray=\"1.8 2.6\"\n              strokeLinecap=\"round\"\n              strokeOpacity=\"0.3\"\n            />\n          </svg>\n\n          {/* Deep Blind-Debossed Leather Lettering: Moon vs Sun (Modern Fashion Couture) */}\n          <div className=\"relative z-10 flex flex-col items-center justify-center -mt-0.5 select-none\">\n            <div className=\"relative flex items-center justify-center overflow-hidden h-[24px] sm:h-[26px]\">\n              <AnimatePresence mode=\"wait\" initial={false}>\n                <motion.div\n                  key={isDark ? \"moon\" : \"sun\"}\n                  initial={{ opacity: 0, y: 3 }}\n                  animate={{ opacity: 1, y: 0 }}\n                  exit={{ opacity: 0, y: -3 }}\n                  transition={{ duration: 0.22, ease: \"easeOut\" }}\n                  className=\"text-[21px] sm:text-[23px] font-normal leading-none select-none\"\n                  style={{\n                    fontFamily:\n                      \"'Italiana', 'Didot', 'Bodoni Moda', 'Playfair Display', serif\",\n                    letterSpacing: \"0.015em\",\n                    color: \"#421C06\",\n                    textShadow:\n                      \"0 -0.6px 0.5px rgba(25, 8, 2, 0.85), 0 0.5px 0.2px rgba(255, 255, 255, 0.15)\",\n                  }}\n                >\n                  {isDark ? \"Moon\" : \"Sun\"}\n                </motion.div>\n              </AnimatePresence>\n            </div>\n            {/* Subtext: PARIS (Modern Tight Haute-Couture Subtitle - Chlo\u00e9 Style) */}\n            <div\n              className=\"text-[6.5px] sm:text-[7.2px] font-sans font-semibold tracking-[0.14em] uppercase leading-none mt-0.5 select-none\"\n              style={{\n                color: \"#4C2008\",\n                textShadow:\n                  \"0 -0.4px 0.3px rgba(25, 8, 2, 0.75), 0 0.4px 0.1px rgba(255, 255, 255, 0.08)\",\n              }}\n            >\n              PARIS\n            </div>\n          </div>\n        </div>\n\n        {/* Layer 6: Perimeter Running Stitch Hem with Traveling Sewing Needle Animation */}\n        <svg\n          className=\"absolute inset-0 size-full pointer-events-none overflow-visible\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <defs>\n            <filter id=\"denim-card-stitch-drop\">\n              <feDropShadow dx=\"0\" dy=\"1\" stdDeviation=\"0.8\" floodColor=\"#000000\" floodOpacity=\"0.45\" />\n            </filter>\n          </defs>\n\n          {/* Needle Puncture Pits */}\n          <rect\n            x=\"10\"\n            y=\"10\"\n            width=\"calc(100% - 20px)\"\n            height=\"calc(100% - 20px)\"\n            rx=\"24\"\n            fill=\"none\"\n            stroke={isDark ? \"#05080D\" : \"#1F354D\"}\n            strokeWidth=\"3.2\"\n            strokeDasharray=\"1.5 10.5\"\n            strokeDashoffset=\"6.5\"\n            strokeLinecap=\"round\"\n            strokeOpacity=\"0.65\"\n          />\n\n          {/* Main Running Stitch Thread sewn firmly along the perimeter hem */}\n          <rect\n            x=\"10\"\n            y=\"10\"\n            width=\"calc(100% - 20px)\"\n            height=\"calc(100% - 20px)\"\n            rx=\"24\"\n            fill=\"none\"\n            stroke={isDark ? \"#D97706\" : \"#FFFFFF\"}\n            strokeWidth=\"2.2\"\n            strokeDasharray=\"6.5 5.5\"\n            strokeLinecap=\"round\"\n            filter=\"url(#denim-card-stitch-drop)\"\n            className=\"transition-colors duration-300\"\n          />\n        </svg>\n\n        {/* Layer 7: Centered Tactile Fabric Button Switch */}\n        <div className=\"relative z-10 flex items-center justify-center p-4\">\n          <FabricButtonSwitch\n            checked={isDark}\n            onCheckedChange={handleToggle}\n            soundEnabled={true}\n          />\n        </div>\n      </motion.div>\n    </div>\n  )\n}\n";

export const itineraryCarouselCode = "\"use client\";\n\nimport * as React from \"react\";\nimport Image from \"next/image\";\nimport {\n  motion,\n  AnimatePresence,\n  Reorder,\n  useReducedMotion,\n  useDragControls,\n  type PanInfo,\n} from \"motion/react\";\nimport { Plane, Volume2, VolumeX } from \"lucide-react\";\nimport { cn } from \"@/src/lib/utils\";\nimport { Button } from \"@/src/components/ui/button\";\nimport { Badge } from \"@/src/components/ui/badge\";\n\n// ============================================================================\n// Types\n// ============================================================================\n\nexport interface Stop {\n  id: string;\n  place: string;\n  location: string;\n  tag: string;\n  blurb: string;\n  photo: string;\n  accent: string;\n}\n\nexport interface ItineraryCarouselProps {\n  embedded?: boolean;\n  className?: string;\n  soundEnabled?: boolean;\n  showHeader?: boolean;\n  stops?: Stop[];\n}\n\n// ============================================================================\n// Default Stops Data\n// ============================================================================\n\nexport const DEFAULT_STOPS: Stop[] = [\n  {\n    id: \"cappadocia\",\n    place: \"Cappadocia\",\n    location: \"Göreme, Turkey\",\n    tag: \"Top rated\",\n    blurb: \"Dawn balloon ascent over the fairy chimneys, private launch.\",\n    photo: \"/images/itinerary/cappadocia.webp\",\n    accent: \"var(--itinerary-stop-cappadocia, #E8843C)\",\n  },\n  {\n    id: \"kyoto\",\n    place: \"Kyoto\",\n    location: \"Kansai, Japan\",\n    tag: \"Member favourite\",\n    blurb: \"A garden ryokan held for you, tea at first light.\",\n    photo: \"/images/itinerary/kyoto.webp\",\n    accent: \"var(--itinerary-stop-kyoto, #E5647A)\",\n  },\n  {\n    id: \"amalfi\",\n    place: \"Amalfi\",\n    location: \"Campania, Italy\",\n    tag: \"Signature\",\n    blurb: \"Cliffside marina, a boat waiting whenever the water calls.\",\n    photo: \"/images/itinerary/amalfi.webp\",\n    accent: \"var(--itinerary-stop-amalfi, #2E9BD6)\",\n  },\n  {\n    id: \"marrakech\",\n    place: \"Marrakech\",\n    location: \"Marrakesh-Safi, Morocco\",\n    tag: \"Hidden gem\",\n    blurb: \"A walled riad behind an unmarked door, courtyard to yourself.\",\n    photo: \"/images/itinerary/marrakech.webp\",\n    accent: \"var(--itinerary-stop-marrakech, #E0A43B)\",\n  },\n  {\n    id: \"reykjavik\",\n    place: \"Reykjavík\",\n    location: \"Höfuðborg, Iceland\",\n    tag: \"Seasonal\",\n    blurb: \"Aurora lodge off-grid, woken only if the sky performs.\",\n    photo: \"/images/itinerary/reykjavik.webp\",\n    accent: \"var(--itinerary-stop-reykjavik, #3FB79A)\",\n  },\n];\n\nexport const HANG_TILTS = [-4, 3.5, -2.5, 4.5, -3.5];\nexport const SWIPE_DISTANCE = 78;\nexport const SWIPE_VELOCITY = 380;\nexport const CARD_SPRING = { type: \"spring\" as const, stiffness: 140, damping: 20, mass: 1.0 };\n\n// ============================================================================\n// Procedural SVG Textures\n// ============================================================================\n\nexport const GRAIN_URI =\n  \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\\\")\";\n\nexport const WOOD_URI =\n  \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='140'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014 0.12' numOctaves='4' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E\\\")\";\n\nexport const CORK_BLOTCH_URI =\n  \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='b' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E\\\")\";\n\nexport const WALL_GRAIN_URI =\n  \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='wg' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wg)'/%3E%3C/svg%3E\\\")\";\n\nexport const WALL_MOTTLE_URI =\n  \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='wm' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wm)'/%3E%3C/svg%3E\\\")\";\n\nexport const WALL_STAIN_URI =\n  \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='ws' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='23' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ws)'/%3E%3C/svg%3E\\\")\";\n\n// ============================================================================\n// Procedural Web Audio API Acoustics\n// ============================================================================\n\nlet audioCtx: AudioContext | null = null;\nlet noiseBuffer: AudioBuffer | null = null;\nlet isAudioMuted = false;\n\nfunction getAudioCtx(): AudioContext | null {\n  if (typeof window === \"undefined\") return null;\n  if (!audioCtx) {\n    const AudioContextClass =\n      window.AudioContext ||\n      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;\n    if (AudioContextClass) {\n      audioCtx = new AudioContextClass();\n    }\n  }\n  if (audioCtx && audioCtx.state === \"suspended\") {\n    audioCtx.resume().catch(() => {});\n  }\n  return audioCtx;\n}\n\nexport function warmUpItineraryAudio() {\n  const ctx = getAudioCtx();\n  if (ctx && ctx.state === \"suspended\") {\n    ctx.resume().catch(() => {});\n  }\n}\n\nfunction getNoise(ctx: AudioContext): AudioBuffer {\n  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {\n    return noiseBuffer;\n  }\n  const bufferSize = ctx.sampleRate;\n  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);\n  const data = buffer.getChannelData(0);\n  let b0 = 0, b1 = 0, b2 = 0;\n  for (let i = 0; i < bufferSize; i++) {\n    const white = Math.random() * 2 - 1;\n    b0 = 0.99886 * b0 + white * 0.0555179;\n    b1 = 0.99332 * b1 + white * 0.0750759;\n    b2 = 0.969 * b2 + white * 0.153852;\n    data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.25;\n  }\n  noiseBuffer = buffer;\n  return buffer;\n}\n\nexport function setItineraryMuted(muted: boolean) {\n  isAudioMuted = muted;\n}\n\nexport function getItineraryMuted(): boolean {\n  return isAudioMuted;\n}\n\nexport function playCardSlideSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const src = ctx.createBufferSource();\n  src.buffer = getNoise(ctx);\n  const filter = ctx.createBiquadFilter();\n  filter.type = \"bandpass\";\n  filter.Q.setValueAtTime(1.3, now);\n  filter.frequency.setValueAtTime(440, now);\n  filter.frequency.exponentialRampToValueAtTime(880, now + 0.035);\n  filter.frequency.exponentialRampToValueAtTime(360, now + 0.1);\n  const gain = ctx.createGain();\n  gain.gain.setValueAtTime(0.001, now);\n  gain.gain.linearRampToValueAtTime(0.18, now + 0.02);\n  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);\n  src.connect(filter);\n  filter.connect(gain);\n  gain.connect(ctx.destination);\n  src.start(now);\n  src.stop(now + 0.13);\n}\n\nexport function playCardFlipSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const noiseSrc = ctx.createBufferSource();\n  noiseSrc.buffer = getNoise(ctx);\n  const noiseFilter = ctx.createBiquadFilter();\n  noiseFilter.type = \"bandpass\";\n  noiseFilter.Q.setValueAtTime(1.8, now);\n  noiseFilter.frequency.setValueAtTime(600, now);\n  noiseFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.06);\n  noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 0.2);\n  const noiseGain = ctx.createGain();\n  noiseGain.gain.setValueAtTime(0.001, now);\n  noiseGain.gain.linearRampToValueAtTime(0.24, now + 0.04);\n  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);\n  noiseSrc.connect(noiseFilter);\n  noiseFilter.connect(noiseGain);\n  noiseGain.connect(ctx.destination);\n  noiseSrc.start(now);\n  noiseSrc.stop(now + 0.23);\n\n  const thud = ctx.createOscillator();\n  thud.type = \"sine\";\n  thud.frequency.setValueAtTime(130, now + 0.08);\n  thud.frequency.exponentialRampToValueAtTime(45, now + 0.22);\n  const thudGain = ctx.createGain();\n  thudGain.gain.setValueAtTime(0.001, now);\n  thudGain.gain.setValueAtTime(0.14, now + 0.08);\n  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);\n  thud.connect(thudGain);\n  thudGain.connect(ctx.destination);\n  thud.start(now + 0.08);\n  thud.stop(now + 0.25);\n}\n\nexport function playPegSnapSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const osc1 = ctx.createOscillator();\n  osc1.type = \"triangle\";\n  osc1.frequency.setValueAtTime(1850, now);\n  osc1.frequency.exponentialRampToValueAtTime(520, now + 0.024);\n  const gain1 = ctx.createGain();\n  gain1.gain.setValueAtTime(0.28, now);\n  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.028);\n  osc1.connect(gain1);\n  gain1.connect(ctx.destination);\n  osc1.start(now);\n  osc1.stop(now + 0.03);\n\n  const osc2 = ctx.createOscillator();\n  osc2.type = \"sine\";\n  osc2.frequency.setValueAtTime(320, now + 0.004);\n  osc2.frequency.exponentialRampToValueAtTime(80, now + 0.045);\n  const gain2 = ctx.createGain();\n  gain2.gain.setValueAtTime(0.22, now + 0.004);\n  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);\n  osc2.connect(gain2);\n  gain2.connect(ctx.destination);\n  osc2.start(now + 0.004);\n  osc2.stop(now + 0.055);\n}\n\nexport function playPegReleaseSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const osc = ctx.createOscillator();\n  osc.type = \"triangle\";\n  osc.frequency.setValueAtTime(950, now);\n  osc.frequency.exponentialRampToValueAtTime(1600, now + 0.02);\n  const gain = ctx.createGain();\n  gain.gain.setValueAtTime(0.18, now);\n  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);\n  osc.connect(gain);\n  gain.connect(ctx.destination);\n  osc.start(now);\n  osc.stop(now + 0.026);\n}\n\nexport function playCardReorderSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const osc = ctx.createOscillator();\n  osc.type = \"sine\";\n  osc.frequency.setValueAtTime(260, now);\n  osc.frequency.exponentialRampToValueAtTime(380, now + 0.03);\n  const gain = ctx.createGain();\n  gain.gain.setValueAtTime(0.12, now);\n  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);\n  osc.connect(gain);\n  gain.connect(ctx.destination);\n  osc.start(now);\n  osc.stop(now + 0.04);\n}\n\nexport function playTicketArrivalSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const bell = ctx.createOscillator();\n  bell.type = \"sine\";\n  bell.frequency.setValueAtTime(1046.5, now);\n  const bellGain = ctx.createGain();\n  bellGain.gain.setValueAtTime(0.16, now);\n  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);\n  bell.connect(bellGain);\n  bellGain.connect(ctx.destination);\n  bell.start(now);\n  bell.stop(now + 0.46);\n}\n\nexport function playTicketTearSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const src = ctx.createBufferSource();\n  src.buffer = getNoise(ctx);\n  const filter = ctx.createBiquadFilter();\n  filter.type = \"bandpass\";\n  filter.Q.setValueAtTime(2.2, now);\n  filter.frequency.setValueAtTime(2200, now);\n  filter.frequency.exponentialRampToValueAtTime(3800, now + 0.08);\n  filter.frequency.exponentialRampToValueAtTime(1600, now + 0.22);\n  const gain = ctx.createGain();\n  gain.gain.setValueAtTime(0.01, now);\n  gain.gain.linearRampToValueAtTime(0.3, now + 0.03);\n  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);\n  src.connect(filter);\n  filter.connect(gain);\n  gain.connect(ctx.destination);\n  src.start(now);\n  src.stop(now + 0.26);\n}\n\nexport function playDeckResetSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  for (let i = 0; i < 4; i++) {\n    const delay = i * 0.045;\n    const src = ctx.createBufferSource();\n    src.buffer = getNoise(ctx);\n    const filter = ctx.createBiquadFilter();\n    filter.type = \"bandpass\";\n    filter.Q.setValueAtTime(1.6, now + delay);\n    filter.frequency.setValueAtTime(480 + i * 120, now + delay);\n    const gain = ctx.createGain();\n    gain.gain.setValueAtTime(0.14 - i * 0.02, now + delay);\n    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);\n    src.connect(filter);\n    filter.connect(gain);\n    gain.connect(ctx.destination);\n    src.start(now + delay);\n    src.stop(now + delay + 0.06);\n  }\n}\n\nexport function playButtonClickSound() {\n  if (isAudioMuted) return;\n  const ctx = getAudioCtx();\n  if (!ctx) return;\n  const now = ctx.currentTime;\n  const osc = ctx.createOscillator();\n  osc.type = \"sine\";\n  osc.frequency.setValueAtTime(620, now);\n  osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);\n  const gain = ctx.createGain();\n  gain.gain.setValueAtTime(0.16, now);\n  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);\n  osc.connect(gain);\n  gain.connect(ctx.destination);\n  osc.start(now);\n  osc.stop(now + 0.04);\n}\n\n// ============================================================================\n// Vector Icons & Cutouts\n// ============================================================================\n\nexport function SolidPlaneIcon({ className }: { className?: string }) {\n  return (\n    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" className={className} aria-hidden=\"true\">\n      <path d=\"M21 6.5c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-4.3 4.3-6.8-1.9-1.7 1.7 5 2.9-2.5 2.5-2.4-.5-1.3 1.3 3.2 1.7 1.7 3.2 1.3-1.3-.5-2.4 2.5-2.5 2.9 5 1.7-1.7-1.9-6.8L21 6.5Z\" />\n    </svg>\n  );\n}\n\nexport function MapPinIcon({ className }: { className?: string }) {\n  return (\n    <svg viewBox=\"0 0 24 24\" fill=\"none\" className={className} aria-hidden=\"true\">\n      <path\n        d=\"M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z\"\n        fill=\"currentColor\"\n        fillOpacity=\"0.18\"\n        stroke=\"currentColor\"\n        strokeWidth=\"1.8\"\n        strokeLinejoin=\"round\"\n      />\n      <circle cx=\"12\" cy=\"10\" r=\"2.4\" fill=\"currentColor\" />\n    </svg>\n  );\n}\n\nexport function ClothespinIcon({ className }: { className?: string }) {\n  return (\n    <svg viewBox=\"0 0 22 30\" className={className} aria-hidden=\"true\">\n      <rect x=\"6\" y=\"1.5\" width=\"4.2\" height=\"27\" rx=\"2\" fill=\"#d8b06a\" />\n      <rect x=\"11.8\" y=\"1.5\" width=\"4.2\" height=\"27\" rx=\"2\" fill=\"#c79a52\" />\n      <rect x=\"6\" y=\"1.5\" width=\"4.2\" height=\"27\" rx=\"2\" fill=\"none\" stroke=\"rgba(0,0,0,0.18)\" strokeWidth=\"0.5\" />\n      <rect x=\"11.8\" y=\"1.5\" width=\"4.2\" height=\"27\" rx=\"2\" fill=\"none\" stroke=\"rgba(0,0,0,0.18)\" strokeWidth=\"0.5\" />\n      <circle cx=\"11\" cy=\"15\" r=\"3.1\" fill=\"none\" stroke=\"#9a9a9a\" strokeWidth=\"1.4\" />\n      <circle cx=\"11\" cy=\"15\" r=\"3.1\" fill=\"none\" stroke=\"#e6e6e6\" strokeWidth=\"0.5\" />\n    </svg>\n  );\n}\n\n// ============================================================================\n// Mementos & Desk Ephemera\n// ============================================================================\n\nexport function PushPin({ color, className }: { color: string; className?: string }) {\n  return (\n    <svg viewBox=\"0 0 24 26\" className={className} aria-hidden=\"true\">\n      <rect x=\"11.3\" y=\"9\" width=\"1.4\" height=\"14\" rx=\"0.7\" fill=\"#8b8f96\" />\n      <rect x=\"11.3\" y=\"9\" width=\"0.6\" height=\"14\" rx=\"0.3\" fill=\"#c7ccd2\" />\n      <ellipse cx=\"12\" cy=\"24\" rx=\"2.6\" ry=\"1\" fill=\"rgba(0,0,0,0.28)\" />\n      <circle cx=\"12\" cy=\"8\" r=\"6.4\" fill={color} />\n      <circle cx=\"12\" cy=\"8\" r=\"6.4\" fill=\"none\" stroke=\"rgba(0,0,0,0.18)\" strokeWidth=\"0.6\" />\n      <circle cx=\"9.6\" cy=\"5.6\" r=\"2.1\" fill=\"rgba(255,255,255,0.55)\" />\n    </svg>\n  );\n}\n\nexport function WashiTape({\n  className,\n  tone = \"rgba(236,230,216,0.6)\",\n  rotate = 0,\n}: {\n  className?: string;\n  tone?: string;\n  rotate?: number;\n}) {\n  const tornMask =\n    \"url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='20' preserveAspectRatio='none'%3E%3Cpath d='M2,3 L4,1 L3,5 L5,2 L4,7 L6,3 L58,3 L60,1 L59,6 L61,2 L60,8 L62,3 L62,17 L60,19 L61,14 L59,18 L60,13 L58,17 L6,17 L4,19 L5,14 L3,18 L4,12 L2,17 Z' fill='%23fff'/%3E%3C/svg%3E\\\")\";\n  return (\n    <span\n      className={cn(\"relative block h-[1.15rem] w-16\", className)}\n      style={{\n        transform: `rotate(${rotate}deg)`,\n        background: `linear-gradient(180deg, rgba(255,255,255,0.22), transparent 40%, rgba(0,0,0,0.06)), ${tone}`,\n        boxShadow: \"0 1px 2px rgba(0,0,0,0.16), inset 0 0 0 0.5px rgba(255,255,255,0.25)\",\n        WebkitMaskImage: tornMask,\n        maskImage: tornMask,\n        WebkitMaskSize: \"100% 100%\",\n        maskSize: \"100% 100%\",\n      }}\n    >\n      <span\n        className=\"pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay\"\n        style={{ backgroundImage: GRAIN_URI, backgroundSize: \"90px 90px\" }}\n      />\n    </span>\n  );\n}\n\nexport function StickyNote({\n  color,\n  ink,\n  rotate = 0,\n  className,\n  children,\n}: {\n  color: string;\n  ink: string;\n  rotate?: number;\n  className?: string;\n  children: React.ReactNode;\n}) {\n  return (\n    <div\n      className={cn(\"relative h-[4.6rem] w-[4.6rem] p-2\", className)}\n      style={{\n        transform: `rotate(${rotate}deg)`,\n        backgroundColor: color,\n        boxShadow: \"0 8px 16px -8px rgba(50,35,12,0.55), inset 0 1px 0 rgba(255,255,255,0.35)\",\n      }}\n    >\n      <span\n        className=\"flex h-full w-full items-center justify-center text-center text-[0.6rem] font-semibold italic leading-tight\"\n        style={{ color: ink }}\n      >\n        {children}\n      </span>\n      <span\n        className=\"absolute bottom-0 right-0 h-3 w-3\"\n        style={{\n          background: \"linear-gradient(135deg, rgba(0,0,0,0.18), transparent 60%)\",\n          clipPath: \"polygon(100% 0, 100% 100%, 0 100%)\",\n        }}\n      />\n    </div>\n  );\n}\n\nexport function DeskStamp({\n  code,\n  hue,\n  rotate = 0,\n  className,\n}: {\n  code: string;\n  hue: string;\n  rotate?: number;\n  className?: string;\n}) {\n  return (\n    <div className={cn(\"relative\", className)} style={{ transform: `rotate(${rotate}deg)` }}>\n      <div\n        className=\"p-1\"\n        style={{\n          background: \"#f3efe4\",\n          boxShadow: \"0 4px 9px -4px rgba(40,28,10,0.6)\",\n          WebkitMask:\n            \"radial-gradient(circle 2px at 0 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 100% 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 50% 0, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, radial-gradient(circle 2px at 50% 100%, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, linear-gradient(#000, #000)\",\n          mask:\n            \"radial-gradient(circle 2px at 0 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 100% 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 50% 0, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, radial-gradient(circle 2px at 50% 100%, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, linear-gradient(#000, #000)\",\n        }}\n      >\n        <div\n          className=\"flex h-9 w-8 flex-col items-center justify-end rounded-[2px] p-1\"\n          style={{ background: `linear-gradient(160deg, ${hue}, rgba(255,255,255,0.35))` }}\n        >\n          <span className=\"rounded-[1px] bg-white/80 px-1 text-[0.5rem] font-bold leading-none text-neutral-700\">\n            {code}\n          </span>\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport function DeskBoardingStub({\n  from,\n  to,\n  rotate = 0,\n  className,\n}: {\n  from: string;\n  to: string;\n  rotate?: number;\n  className?: string;\n}) {\n  return (\n    <div\n      className={cn(\"relative w-24 overflow-hidden rounded-[3px]\", className)}\n      style={{\n        transform: `rotate(${rotate}deg)`,\n        background: \"#faf7ef\",\n        boxShadow: \"0 10px 18px -10px rgba(40,28,10,0.6)\",\n      }}\n    >\n      <div className=\"h-1.5 w-full bg-[#2b6b6b]\" />\n      <div className=\"flex items-center justify-between px-2 py-1.5\">\n        <div className=\"leading-none\">\n          <p className=\"text-[0.72rem] font-black tracking-tight text-neutral-800\">{from}</p>\n          <p className=\"text-[0.4rem] uppercase tracking-[0.15em] text-neutral-400\">from</p>\n        </div>\n        <SolidPlaneIcon className=\"size-3 text-neutral-500\" />\n        <div className=\"text-right leading-none\">\n          <p className=\"text-[0.72rem] font-black tracking-tight text-neutral-800\">{to}</p>\n          <p className=\"text-[0.4rem] uppercase tracking-[0.15em] text-neutral-400\">to</p>\n        </div>\n      </div>\n      <div\n        className=\"h-2 w-full\"\n        style={{\n          background:\n            \"radial-gradient(circle 3px at 6px 0, transparent 98%, var(--itinerary-cork, #c9a56e)) 0 0 / 12px 8px repeat-x\",\n        }}\n      />\n    </div>\n  );\n}\n\nexport function LuggageTag({\n  code,\n  tone,\n  rotate = 0,\n  className,\n}: {\n  code: string;\n  tone: string;\n  rotate?: number;\n  className?: string;\n}) {\n  return (\n    <div\n      className={cn(\"relative flex flex-col items-center\", className)}\n      style={{ transform: `rotate(${rotate}deg)` }}\n    >\n      <svg viewBox=\"0 0 20 16\" className=\"h-4 w-5\" aria-hidden=\"true\">\n        <path d=\"M10 14 C 4 10 4 4 10 3 C 16 4 16 10 10 14 Z\" fill=\"none\" stroke=\"#8a6a3c\" strokeWidth=\"1.1\" />\n      </svg>\n      <div\n        className=\"relative -mt-1 flex h-9 w-[3.4rem] items-center justify-center rounded-md px-1\"\n        style={{\n          background: `linear-gradient(155deg, ${tone}, rgba(255,255,255,0.4))`,\n          boxShadow: \"0 8px 14px -8px rgba(40,28,10,0.6), inset 0 1px 0 rgba(255,255,255,0.4)\",\n        }}\n      >\n        <span className=\"absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rounded-full border border-black/30 bg-white/70\" />\n        <span className=\"mt-1 text-[0.6rem] font-black uppercase tracking-[0.14em] text-neutral-700\">\n          {code}\n        </span>\n      </div>\n    </div>\n  );\n}\n\nexport function CompassDoodle({\n  className,\n  rotate = 0,\n}: {\n  className?: string;\n  rotate?: number;\n}) {\n  return (\n    <svg\n      viewBox=\"0 0 48 48\"\n      className={cn(\"text-[#4a3115]\", className)}\n      style={{ transform: `rotate(${rotate}deg)` }}\n      aria-hidden=\"true\"\n    >\n      <circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.1\" opacity=\"0.7\" />\n      <circle cx=\"24\" cy=\"24\" r=\"15\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"0.7\" strokeDasharray=\"1.5 2\" opacity=\"0.5\" />\n      <path\n        d=\"M24 5 L27 22 L44 24 L27 26 L24 43 L21 26 L5 24 L21 22 Z\"\n        fill=\"currentColor\"\n        fillOpacity=\"0.14\"\n        stroke=\"currentColor\"\n        strokeWidth=\"1\"\n        strokeLinejoin=\"round\"\n        opacity=\"0.8\"\n      />\n      <circle cx=\"24\" cy=\"24\" r=\"1.6\" fill=\"currentColor\" />\n      <text x=\"24\" y=\"4.4\" textAnchor=\"middle\" fontSize=\"5\" fontWeight=\"700\" fill=\"currentColor\" opacity=\"0.8\">N</text>\n    </svg>\n  );\n}\n\n// ============================================================================\n// Travel Card & Tangent Fillet Cutout\n// ============================================================================\n\nexport function computeTangentCardClip(w: number, h: number, isLg: boolean) {\n  const btn = isLg ? 40 : 26;\n  const inset = isLg ? 6 : 4;\n  const gap = isLg ? 6.0 : 4.0;\n  const r_f = isLg ? 7.5 : 5.0;\n  const r_c = isLg ? 17.5 : 10.0;\n\n  const badgeRadius = btn / 2;\n  const c = badgeRadius - inset;\n  const R = badgeRadius + gap;\n  const d = c + Math.sqrt((R + r_f) ** 2 - (c - r_f) ** 2);\n\n  const p1_x = w - d;\n  const p2_x = w - (c + (R * (d - c)) / (R + r_f));\n  const p2_y = c - (R * (c - r_f)) / (R + r_f);\n  const p3_x = w - p2_y;\n  const p3_y = c + (R * (d - c)) / (R + r_f);\n  const p4_y = d;\n\n  const n = (val: number, max: number) => (val / max).toFixed(4);\n\n  return [\n    `M ${n(r_c, w)} 0`,\n    `L ${n(p1_x, w)} 0`,\n    `A ${n(r_f, w)} ${n(r_f, h)} 0 0 1 ${n(p2_x, w)} ${n(p2_y, h)}`,\n    `A ${n(R, w)} ${n(R, h)} 0 0 0 ${n(p3_x, w)} ${n(p3_y, h)}`,\n    `A ${n(r_f, w)} ${n(r_f, h)} 0 0 1 1 ${n(p4_y, h)}`,\n    `L 1 ${n(h - r_c, h)}`,\n    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 ${n(w - r_c, w)} 1`,\n    `L ${n(r_c, w)} 1`,\n    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 0 ${n(h - r_c, h)}`,\n    `L 0 ${n(r_c, h)}`,\n    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 ${n(r_c, w)} 0 Z`,\n  ].join(\" \");\n}\n\nexport function TravelCardFront({ stop, size = \"md\" }: { stop: Stop; size?: \"md\" | \"lg\" }) {\n  const lg = size === \"lg\";\n  const btn = lg ? 40 : 26;\n  const inset = lg ? 6 : 4;\n  const rawId = React.useId();\n  const clipId = `travel-clip-${rawId.replace(/:/g, \"\")}`;\n  const containerRef = React.useRef<HTMLDivElement>(null);\n  const [clipD, setClipD] = React.useState<string>(\"\");\n\n  React.useEffect(() => {\n    const el = containerRef.current;\n    if (!el) return;\n    const updateClip = () => {\n      const w = el.offsetWidth;\n      const h = el.offsetHeight;\n      if (w > 0 && h > 0) {\n        setClipD(computeTangentCardClip(w, h, lg));\n      }\n    };\n    updateClip();\n    const observer = new ResizeObserver(updateClip);\n    observer.observe(el);\n    return () => observer.disconnect();\n  }, [lg]);\n\n  return (\n    <div\n      className={cn(\n        \"flex h-full w-full flex-col overflow-hidden bg-itinerary-card text-neutral-900 ring-1 ring-black/5\",\n        lg ? \"rounded-[1.35rem] p-3\" : \"rounded-[1rem] p-2\"\n      )}\n    >\n      <div ref={containerRef} className=\"relative min-h-0 flex-1\">\n        {clipD && (\n          <svg width=\"0\" height=\"0\" className=\"absolute\" aria-hidden=\"true\">\n            <defs>\n              <clipPath id={clipId} clipPathUnits=\"objectBoundingBox\">\n                <path d={clipD} />\n              </clipPath>\n            </defs>\n          </svg>\n        )}\n\n        <div\n          className=\"absolute inset-0 overflow-hidden bg-neutral-200\"\n          style={clipD ? { clipPath: `url(#${clipId})` } : undefined}\n        >\n          <Image\n            src={stop.photo}\n            alt={`${stop.place}, ${stop.location}`}\n            fill\n            sizes={lg ? \"400px\" : \"220px\"}\n            className=\"absolute inset-0 h-full w-full object-cover\"\n          />\n          <div className=\"pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10\" />\n\n          {!lg && (\n            <div className=\"pointer-events-none absolute inset-x-0 bottom-0\">\n              <div\n                className=\"absolute inset-0 backdrop-blur-lg backdrop-saturate-150\"\n                style={{\n                  WebkitMaskImage: \"linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)\",\n                  maskImage: \"linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)\",\n                }}\n              />\n              <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent\" />\n              <div className=\"relative px-2.5 pb-2.5 pt-8\">\n                <h3 className=\"truncate text-[1.05rem] font-bold leading-tight tracking-tight text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]\">\n                  {stop.place}\n                </h3>\n                <p className=\"mt-0.5 flex items-center gap-1 text-[0.64rem] font-medium text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]\">\n                  <MapPinIcon className=\"size-2.5 shrink-0 text-white/75\" />\n                  <span className=\"truncate\">{stop.location}</span>\n                </p>\n              </div>\n            </div>\n          )}\n        </div>\n\n        {lg && (\n          <Badge\n            variant=\"secondary\"\n            className=\"absolute left-2.5 top-2.5 inline-flex items-center border-none bg-white/20 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md\"\n          >\n            {stop.tag}\n          </Badge>\n        )}\n\n        <div\n          className=\"absolute z-10 flex items-center justify-center rounded-full bg-neutral-900 text-white shadow-md select-none\"\n          style={{ width: btn, height: btn, top: -inset, right: -inset }}\n          aria-hidden=\"true\"\n        >\n          <Plane className={lg ? \"size-5\" : \"size-3.5\"} strokeWidth={2} />\n        </div>\n      </div>\n\n      <div className={cn(\"shrink-0\", lg ? \"px-1.5 pt-2.5\" : \"px-0.5 pt-1\")}>\n        {lg && (\n          <>\n            <div className=\"flex min-w-0 items-baseline justify-between gap-3\">\n              <h3 className=\"min-w-0 flex-1 truncate text-2xl font-bold tracking-tight text-neutral-900 sm:text-[1.7rem]\">\n                {stop.place}\n              </h3>\n              <span className=\"shrink-0 text-right text-sm font-medium text-neutral-500\">\n                {stop.location}\n              </span>\n            </div>\n            <p className=\"mt-1.5 text-sm leading-relaxed text-neutral-600\">{stop.blurb}</p>\n          </>\n        )}\n\n        <Button\n          type=\"button\"\n          onClick={(e) => {\n            e.stopPropagation();\n            playButtonClickSound();\n          }}\n          className={cn(\n            \"group/book flex w-full items-center justify-center gap-1.5 rounded-full bg-neutral-900 font-semibold text-white transition-transform active:scale-[0.98] hover:bg-neutral-800\",\n            lg ? \"mt-2.5 h-10 text-sm\" : \"mt-1 h-7 text-[0.68rem]\"\n          )}\n        >\n          Book Now\n          <Plane\n            className={cn(\n              \"shrink-0 transition-transform duration-150 ease-out group-hover/book:translate-x-0.5 group-hover/book:-translate-y-0.5\",\n              lg ? \"size-4\" : \"size-3\"\n            )}\n            strokeWidth={2}\n          />\n        </Button>\n      </div>\n    </div>\n  );\n}\n\nexport function PostcardBack({ stop, seq, size = \"md\" }: { stop: Stop; seq: number; size?: \"md\" | \"lg\" }) {\n  const lg = size === \"lg\";\n  const country = stop.location.split(\",\").pop()?.trim() || stop.location;\n  return (\n    <div\n      className={cn(\n        \"relative h-full w-full overflow-hidden bg-itinerary-card-back text-itinerary-text ring-1 ring-black/10\",\n        lg ? \"rounded-[1.35rem]\" : \"rounded-[1rem]\"\n      )}\n    >\n      <div\n        className=\"pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply\"\n        style={{ backgroundImage: GRAIN_URI, backgroundSize: \"140px 140px\" }}\n      />\n      <div\n        className={cn(\n          \"pointer-events-none absolute inset-2.5 border border-dashed border-itinerary-text/35\",\n          lg ? \"rounded-xl\" : \"rounded-md\"\n        )}\n      />\n\n      <div className=\"relative flex h-full flex-col justify-between p-4 sm:p-5\">\n        <div>\n          <p className=\"text-[0.62rem] font-bold uppercase tracking-[0.32em] opacity-70\">\n            Meridian · Travel\n          </p>\n          <div className=\"mt-1 h-px w-10 bg-itinerary-text/30\" />\n        </div>\n\n        <div className=\"flex flex-col items-center text-center\">\n          <span className=\"text-[0.62rem] font-bold uppercase tracking-[0.2em] opacity-60\">\n            Stop {String(seq).padStart(2, \"0\")}\n          </span>\n\n          <div\n            className=\"relative mt-2 flex size-[4.2rem] flex-col items-center justify-center rounded-full border border-dashed border-itinerary-text/45 p-1\"\n            style={{ transform: \"rotate(-7deg)\" }}\n            aria-hidden=\"true\"\n          >\n            <span className=\"text-[0.4rem] font-bold uppercase tracking-[0.26em] opacity-60 leading-none\">\n              Air Mail\n            </span>\n            <span className=\"mt-1 max-w-[3.9rem] truncate text-[0.74rem] sm:text-[0.8rem] font-black uppercase leading-tight tracking-tight px-0.5\">\n              {country}\n            </span>\n            <span className=\"mt-1 flex items-center gap-1 opacity-55\">\n              <span className=\"h-px w-2.5 bg-itinerary-text/45\" />\n              <SolidPlaneIcon className=\"size-2\" />\n              <span className=\"h-px w-2.5 bg-itinerary-text/45\" />\n            </span>\n          </div>\n\n          <span className=\"mt-2 text-[0.62rem] uppercase tracking-[0.24em] opacity-55\">\n            Sealed until opened\n          </span>\n        </div>\n\n        <div className=\"space-y-2 pr-12 sm:pr-16\">\n          <div className=\"h-px w-full bg-itinerary-text/25\" />\n          <div className=\"h-px w-4/5 bg-itinerary-text/25\" />\n          <div className=\"h-px w-3/5 bg-itinerary-text/25\" />\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport function CardFaces({\n  stop,\n  seq,\n  faceUp,\n  size = \"md\",\n  reduce = false,\n  spin = false,\n}: {\n  stop: Stop;\n  seq: number;\n  faceUp: boolean;\n  size?: \"md\" | \"lg\";\n  reduce?: boolean;\n  spin?: boolean;\n}) {\n  return (\n    <div className=\"h-full w-full [perspective:1600px]\">\n      <motion.div\n        className=\"relative h-full w-full [transform-style:preserve-3d]\"\n        initial={spin ? { rotateY: 0 } : false}\n        animate={{ rotateY: faceUp ? 180 : 0 }}\n        transition={reduce ? { duration: 0.2 } : { duration: 0.38, ease: [0.23, 1, 0.32, 1] }}\n      >\n        <div className=\"absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(1px)]\">\n          <PostcardBack stop={stop} seq={seq} size={size} />\n        </div>\n        <div className=\"absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]\">\n          <TravelCardFront stop={stop} size={size} />\n        </div>\n      </motion.div>\n    </div>\n  );\n}\n\n// ============================================================================\n// Pegged Card (Reorderable item on clothesline)\n// ============================================================================\n\nexport function PeggedCard({\n  id,\n  index,\n  stop,\n  seq,\n  isActive,\n  reduce,\n  onOpen,\n}: {\n  id: string;\n  index: number;\n  stop: Stop;\n  seq: number;\n  isActive: boolean;\n  reduce: boolean;\n  onOpen: (id: string) => void;\n}) {\n  const tilt = HANG_TILTS[index % HANG_TILTS.length];\n  const itemTransition = reduce ? { duration: 0.2 } : CARD_SPRING;\n  const [dragging, setDragging] = React.useState(false);\n  const isDraggingRef = React.useRef(false);\n  const controls = useDragControls();\n\n  if (isActive) {\n    return (\n      <Reorder.Item\n        value={id}\n        as=\"div\"\n        drag={false}\n        layout\n        transition={itemTransition}\n        className=\"w-28 shrink-0 sm:w-32\"\n        style={{ aspectRatio: \"0.65\", visibility: \"hidden\" }}\n      />\n    );\n  }\n\n  return (\n    <Reorder.Item\n      data-pegged-card=\"true\"\n      value={id}\n      as=\"div\"\n      layoutId={`stop-${id}`}\n      transition={itemTransition}\n      dragControls={controls}\n      dragListener={false}\n      whileDrag={{ scale: 1.06, zIndex: 50 }}\n      onDragStart={() => {\n        isDraggingRef.current = true;\n        setDragging(true);\n        playCardReorderSound();\n      }}\n      onDragEnd={() => {\n        setDragging(false);\n        setTimeout(() => {\n          isDraggingRef.current = false;\n        }, 250);\n      }}\n      onPointerDown={(e) => {\n        if (e.pointerType === \"mouse\") {\n          controls.start(e);\n        }\n      }}\n      onTap={() => {\n        if (!isDraggingRef.current) {\n          playPegReleaseSound();\n          onOpen(id);\n        }\n      }}\n      onKeyDown={(e) => {\n        if (e.key === \"Enter\" || e.key === \" \") {\n          e.preventDefault();\n          playPegReleaseSound();\n          onOpen(id);\n        }\n      }}\n      className={cn(\n        \"relative w-28 shrink-0 select-none rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-32 !opacity-100\",\n        dragging ? \"cursor-grabbing\" : \"cursor-grab\"\n      )}\n      style={{ aspectRatio: \"0.65\", touchAction: \"pan-y\", opacity: 1 }}\n      role=\"button\"\n      tabIndex={0}\n      aria-label={`View ${stop.place}. Drag peg to reorder.`}\n    >\n      <motion.div\n        className=\"relative h-full w-full origin-top\"\n        animate={\n          dragging\n            ? { rotate: 0 }\n            : reduce\n              ? { rotate: tilt }\n              : { rotate: [tilt - 1.2, tilt + 1.2, tilt - 1.2] }\n        }\n        transition={\n          dragging || reduce\n            ? { duration: 0.2 }\n            : {\n                duration: 4.2 + (index % 3) * 0.8,\n                repeat: Infinity,\n                ease: [0.45, 0.05, 0.55, 0.95],\n              }\n        }\n      >\n        <div className=\"absolute inset-x-2 bottom-1 top-4 rounded-[1rem] bg-black/35 blur-md\" />\n        <div className=\"pointer-events-none relative h-full w-full\">\n          <CardFaces stop={stop} seq={seq} faceUp reduce={reduce} />\n        </div>\n        <div\n          className=\"absolute -top-6 left-1/2 z-30 flex h-10 w-11 -translate-x-1/2 cursor-grab items-center justify-center active:cursor-grabbing\"\n          style={{ touchAction: \"none\" }}\n          onPointerDown={(e) => {\n            controls.start(e);\n          }}\n          aria-label=\"Drag peg to reorder\"\n        >\n          <motion.div\n            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.85 }}\n            animate={{ opacity: 1, y: 0, scale: 1 }}\n            transition={\n              reduce\n                ? { duration: 0.15 }\n                : { delay: 0.05, duration: 0.18, ease: [0.23, 1, 0.32, 1] }\n            }\n          >\n            <ClothespinIcon className=\"h-7 w-5 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]\" />\n          </motion.div>\n        </div>\n      </motion.div>\n    </Reorder.Item>\n  );\n}\n\n// ============================================================================\n// Airplane Boarding Ticket with Perforated Tear Physics\n// ============================================================================\n\nexport const TICKET_CLIP_PATH =\n  \"M 0.038 0 H 0.696 A 0.024 0.058 0 0 0 0.744 0 H 0.962 A 0.038 0.092 0 0 1 1 0.092 V 0.908 A 0.038 0.092 0 0 1 0.962 1 H 0.744 A 0.024 0.058 0 0 0 0.696 1 H 0.038 A 0.038 0.092 0 0 1 0 0.908 V 0.092 A 0.038 0.092 0 0 1 0.038 0 Z\";\n\nexport const TORN_LEFT_PATH =\n  \"M 0.053 0 H 0.967 A 0.033 0.058 0 0 0 1 0.058 L 0.988 0.086 L 1 0.114 L 0.988 0.141 L 1 0.169 L 0.988 0.197 L 1 0.225 L 0.988 0.252 L 1 0.280 L 0.988 0.308 L 1 0.336 L 0.988 0.363 L 1 0.391 L 0.988 0.419 L 1 0.447 L 0.988 0.474 L 1 0.502 L 0.988 0.530 L 1 0.558 L 0.988 0.585 L 1 0.613 L 0.988 0.641 L 1 0.669 L 0.988 0.696 L 1 0.724 L 0.988 0.752 L 1 0.780 L 0.988 0.807 L 1 0.835 L 0.988 0.863 L 1 0.891 L 0.988 0.918 L 1 0.942 A 0.033 0.058 0 0 0 0.967 1 H 0.053 A 0.053 0.092 0 0 1 0 0.908 V 0.092 A 0.053 0.092 0 0 1 0.053 0 Z\";\n\nexport const TORN_RIGHT_PATH =\n  \"M 0 0.058 A 0.086 0.058 0 0 0 0.086 0 H 0.863 A 0.137 0.092 0 0 1 1 0.092 V 0.908 A 0.137 0.092 0 0 1 0.863 1 H 0.086 A 0.086 0.058 0 0 0 0 0.942 L 0.026 0.918 L 0 0.891 L 0.026 0.863 L 0 0.835 L 0.026 0.807 L 0 0.780 L 0.026 0.752 L 0 0.724 L 0.026 0.696 L 0 0.669 L 0.026 0.641 L 0 0.613 L 0.026 0.585 L 0 0.558 L 0.026 0.530 L 0 0.502 L 0.026 0.474 L 0 0.447 L 0.026 0.419 L 0 0.391 L 0.026 0.363 L 0 0.336 L 0.026 0.308 L 0 0.280 L 0.026 0.252 L 0 0.225 L 0.026 0.197 L 0 0.169 L 0.026 0.141 L 0 0.114 L 0.026 0.086 L 0 0.058 Z\";\n\nexport const BARCODE_STRIPES = [\n  3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1,\n];\n\nexport function AirplaneTicketCard({\n  reduce = false,\n  onTear,\n}: {\n  reduce?: boolean;\n  onTear?: () => void;\n}) {\n  const rawId = React.useId();\n  const cleanId = rawId.replace(/:/g, \"\");\n  const clipId = `ticket-clip-${cleanId}`;\n  const leftClipId = `torn-left-clip-${cleanId}`;\n  const rightClipId = `torn-right-clip-${cleanId}`;\n  const [tearing, setTearing] = React.useState(false);\n\n  const handleTear = React.useCallback(() => {\n    if (tearing) return;\n    playTicketTearSound();\n    setTearing(true);\n  }, [tearing]);\n\n  return (\n    <motion.div\n      initial={{ opacity: 0, scale: 0.94, y: 10 }}\n      animate={{ opacity: 1, scale: 1, y: 0 }}\n      transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}\n      className=\"relative h-full w-full select-none\"\n    >\n      <svg width=\"0\" height=\"0\" className=\"absolute\" aria-hidden=\"true\">\n        <defs>\n          <clipPath id={clipId} clipPathUnits=\"objectBoundingBox\">\n            <path d={TICKET_CLIP_PATH} />\n          </clipPath>\n          <clipPath id={leftClipId} clipPathUnits=\"objectBoundingBox\">\n            <path d={TORN_LEFT_PATH} />\n          </clipPath>\n          <clipPath id={rightClipId} clipPathUnits=\"objectBoundingBox\">\n            <path d={TORN_RIGHT_PATH} />\n          </clipPath>\n        </defs>\n      </svg>\n\n      {!tearing && (\n        <div\n          className=\"group relative h-full w-full cursor-pointer [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.08))_drop-shadow(0_4px_10px_rgba(0,0,0,0.04))]\"\n          onClick={handleTear}\n          role=\"button\"\n          tabIndex={0}\n          aria-label=\"Tear ticket to replay itinerary\"\n          onKeyDown={(e) => {\n            if (e.key === \"Enter\" || e.key === \" \") {\n              e.preventDefault();\n              handleTear();\n            }\n          }}\n        >\n          <div\n            className=\"relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none\"\n            style={{ clipPath: `url(#${clipId})` }}\n          >\n            <div\n              className=\"pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply\"\n              style={{ backgroundImage: GRAIN_URI, backgroundSize: \"140px 140px\" }}\n            />\n\n            <div className=\"relative flex h-full w-[72%] flex-col justify-between p-3.5 sm:p-5\">\n              <div className=\"flex items-center gap-2\">\n                <SolidPlaneIcon className=\"size-3 text-ticket-foreground opacity-80\" />\n                <span className=\"text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ticket-muted\">\n                  Meridian · Boarding Pass\n                </span>\n              </div>\n\n              <div className=\"my-auto flex items-center justify-between gap-3 py-1\">\n                <div>\n                  <h3 className=\"text-xl sm:text-2xl font-black tracking-tight text-ticket-foreground leading-none\">\n                    Bon voyage\n                  </h3>\n                  <p className=\"mt-1 text-[11px] sm:text-xs text-ticket-muted\">Your route is set.</p>\n                </div>\n                <div\n                  className=\"relative flex size-12 sm:size-14 flex-col items-center justify-center rounded-full border border-dashed border-ticket-stamp/70 p-1\"\n                  style={{ transform: \"rotate(-6deg)\" }}\n                >\n                  <div className=\"flex size-full flex-col items-center justify-center rounded-full border border-ticket-stamp/60 px-1 text-center bg-ticket-stamp/[0.04]\">\n                    <span className=\"text-[0.4rem] font-black uppercase tracking-[0.14em] leading-none opacity-90 text-ticket-stamp\">\n                      Meridian\n                    </span>\n                    <div className=\"my-0.5 flex items-center gap-1\">\n                      <span className=\"h-px w-1.5 bg-ticket-stamp/40\" />\n                      <SolidPlaneIcon className=\"size-2 text-ticket-stamp\" />\n                      <span className=\"h-px w-1.5 bg-ticket-stamp/40\" />\n                    </div>\n                    <span className=\"text-[0.44rem] font-black uppercase tracking-[0.12em] leading-none text-ticket-stamp\">\n                      Verified\n                    </span>\n                  </div>\n                </div>\n              </div>\n\n              <p className=\"text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70\">\n                5 Stops Confirmed\n              </p>\n            </div>\n\n            <div className=\"relative flex h-full flex-col justify-center\" aria-hidden=\"true\">\n              <div className=\"h-[75%] border-r border-dashed border-ticket-perforation\" />\n            </div>\n\n            <div className=\"relative flex h-full w-[28%] flex-col items-center justify-between bg-ticket-stub/40 p-2.5 sm:p-3 text-center transition-colors group-hover:bg-ticket-stub/60\">\n              <Badge\n                variant=\"outline\"\n                className=\"h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1 text-[0.44rem] font-bold uppercase tracking-wider text-ticket-muted transition-colors group-hover:border-ticket-muted\"\n              >\n                Gate 01\n              </Badge>\n\n              <div className=\"my-auto flex flex-col items-center gap-1\">\n                <div className=\"flex h-5 items-stretch justify-center gap-[1.5px] opacity-85 sm:h-6\" aria-hidden=\"true\">\n                  {BARCODE_STRIPES.map((w, idx) => (\n                    <span\n                      key={idx}\n                      style={{ width: `${w}px` }}\n                      className=\"shrink-0 rounded-[0.2px] bg-ticket-foreground\"\n                    />\n                  ))}\n                </div>\n                <p className=\"text-[0.4rem] font-medium uppercase tracking-[0.16em] text-ticket-muted\">\n                  MDR · 2026\n                </p>\n              </div>\n\n              <div className=\"flex items-center justify-center rounded px-2 py-0.5 transition-transform group-hover:scale-[1.03] group-hover:bg-ticket-foreground/10\">\n                <span className=\"text-[0.5rem] font-black uppercase tracking-[0.2em] text-ticket-muted transition-colors group-hover:text-ticket-foreground\">\n                  ✂ Replay\n                </span>\n              </div>\n            </div>\n\n            <svg className=\"pointer-events-none absolute inset-0 h-full w-full\" viewBox=\"0 0 1 1\" preserveAspectRatio=\"none\" aria-hidden=\"true\">\n              <path d={TICKET_CLIP_PATH} fill=\"none\" stroke=\"var(--ticket-border)\" strokeWidth=\"1\" vectorEffect=\"non-scaling-stroke\" />\n            </svg>\n          </div>\n        </div>\n      )}\n\n      {tearing && (\n        <div className=\"relative h-full w-full\">\n          <motion.div\n            key=\"torn-left\"\n            className=\"absolute left-0 top-0 bottom-0 w-[72%] origin-bottom-left [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.12))]\"\n            initial={{ x: 0, y: 0, rotate: 0 }}\n            animate={{\n              x: reduce ? -8 : -38,\n              y: reduce ? 10 : 72,\n              rotate: reduce ? 0 : -6,\n            }}\n            transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.23, 1, 0.32, 1] }}\n          >\n            <div\n              className=\"relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none\"\n              style={{ clipPath: `url(#${leftClipId})` }}\n            >\n              <div\n                className=\"pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply\"\n                style={{ backgroundImage: GRAIN_URI, backgroundSize: \"140px 140px\" }}\n              />\n              <div className=\"relative flex h-full w-full flex-col justify-between p-3.5 sm:p-5\">\n                <div className=\"flex items-center gap-2\">\n                  <SolidPlaneIcon className=\"size-3 text-ticket-foreground opacity-80\" />\n                  <span className=\"text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ticket-muted\">\n                    Meridian · Boarding Pass\n                  </span>\n                </div>\n                <div className=\"my-auto flex items-center justify-between gap-3 py-1\">\n                  <div>\n                    <h3 className=\"text-xl sm:text-2xl font-black leading-none tracking-tight text-ticket-foreground\">\n                      Bon voyage\n                    </h3>\n                    <p className=\"mt-1 text-[11px] sm:text-xs text-ticket-muted\">Your route is set.</p>\n                  </div>\n                </div>\n                <p className=\"text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70\">\n                  5 Stops Confirmed\n                </p>\n              </div>\n            </div>\n          </motion.div>\n\n          <motion.div\n            key=\"torn-right\"\n            className=\"absolute left-[72%] top-0 bottom-0 w-[28%] origin-top-left [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.12))]\"\n            initial={{ x: 0, y: 0, rotate: 0 }}\n            animate={{\n              x: reduce ? 8 : 56,\n              y: reduce ? 10 : 96,\n              rotate: reduce ? 0 : 20,\n            }}\n            transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.23, 1, 0.32, 1] }}\n            onAnimationComplete={() => {\n              setTearing(false);\n              onTear?.();\n            }}\n          >\n            <div\n              className=\"relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-ticket-stub/50 p-2.5 sm:p-3 text-center text-ticket-foreground select-none\"\n              style={{ clipPath: `url(#${rightClipId})` }}\n            >\n              <div\n                className=\"pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply\"\n                style={{ backgroundImage: GRAIN_URI, backgroundSize: \"140px 140px\" }}\n              />\n              <Badge\n                variant=\"outline\"\n                className=\"h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1 text-[0.44rem] font-bold uppercase tracking-wider text-ticket-muted\"\n              >\n                Gate 01\n              </Badge>\n              <span className=\"text-[0.5rem] font-bold uppercase tracking-[0.18em] text-ticket-muted\">\n                ✂ Replay\n              </span>\n            </div>\n          </motion.div>\n        </div>\n      )}\n    </motion.div>\n  );\n}\n\n// ============================================================================\n// Hanging Clothesline Rope\n// ============================================================================\n\nexport function HangingRope({\n  top,\n  className,\n  reduce = false,\n}: {\n  top?: number | string;\n  className?: string;\n  reduce?: boolean;\n}) {\n  return (\n    <motion.div\n      className={cn(\"pointer-events-none absolute inset-x-5 sm:inset-x-8\", className)}\n      style={top !== undefined ? { top: typeof top === \"number\" ? `${top}px` : top } : undefined}\n      animate={reduce ? undefined : { y: [0, 1.2, 0] }}\n      transition={\n        reduce\n          ? undefined\n          : { duration: 5.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }\n      }\n      aria-hidden=\"true\"\n    >\n      <span className=\"absolute -left-1.5 -top-1 size-3 rounded-full bg-itinerary-pin shadow-[0_1px_2px_rgba(0,0,0,0.5)]\" />\n      <span className=\"absolute -right-1.5 -top-1 size-3 rounded-full bg-itinerary-pin shadow-[0_1px_2px_rgba(0,0,0,0.5)]\" />\n      <svg className=\"h-6 w-full\" viewBox=\"0 0 100 12\" preserveAspectRatio=\"none\">\n        <path\n          d=\"M0,2 Q50,10 100,2\"\n          fill=\"none\"\n          className=\"stroke-itinerary-rope\"\n          strokeWidth=\"2.4\"\n          vectorEffect=\"non-scaling-stroke\"\n        />\n        <path\n          d=\"M0,2 Q50,10 100,2\"\n          fill=\"none\"\n          stroke=\"rgba(255,255,255,0.14)\"\n          strokeWidth=\"0.7\"\n          vectorEffect=\"non-scaling-stroke\"\n        />\n      </svg>\n    </motion.div>\n  );\n}\n\n// ============================================================================\n// Main Export: ItineraryCarousel\n// ============================================================================\n\nexport function ItineraryCarousel({\n  className,\n  soundEnabled = true,\n  showHeader = true,\n  stops = DEFAULT_STOPS,\n}: ItineraryCarouselProps) {\n  const reduce = useReducedMotion();\n  const [muted, setMuted] = React.useState(!soundEnabled);\n  const [active, setActive] = React.useState<string | null>(null);\n  const [order, setOrder] = React.useState<string[]>([]);\n  const boardScrollRef = React.useRef<HTMLDivElement>(null);\n  const prevOrderLength = React.useRef(order.length);\n\n  React.useEffect(() => {\n    setItineraryMuted(muted);\n  }, [muted]);\n\n  const toggleMute = React.useCallback(() => {\n    warmUpItineraryAudio();\n    setMuted((prev) => {\n      const next = !prev;\n      setItineraryMuted(next);\n      if (!next) {\n        playButtonClickSound();\n      }\n      return next;\n    });\n  }, []);\n\n  const revealed = React.useMemo(() => new Set(order), [order]);\n  const activeStop = active ? stops.find((s) => s.id === active) ?? null : null;\n  const alreadyRevealed = active ? revealed.has(active) : false;\n\n  const deck = stops.filter((s) => !revealed.has(s.id) && s.id !== active);\n  const topStop = deck[0];\n  const allRevealed = order.length === stops.length;\n\n  const seqOf = React.useCallback(\n    (id: string) => stops.findIndex((s) => s.id === id) + 1,\n    [stops]\n  );\n\n  const open = React.useCallback(\n    (id: string) => {\n      if (!revealed.has(id)) {\n        playCardFlipSound();\n      }\n      setActive(id);\n    },\n    [revealed]\n  );\n\n  const hang = React.useCallback(() => {\n    if (!active) return;\n    const id = active;\n    playPegSnapSound();\n    setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));\n    setActive(null);\n  }, [active]);\n\n  const reset = React.useCallback(() => {\n    playDeckResetSound();\n    setActive(null);\n    setOrder([]);\n  }, []);\n\n  // Auto-flip & auto-hang newly revealed cards\n  React.useEffect(() => {\n    if (!active || alreadyRevealed) return;\n    const flip = reduce ? 180 : 420;\n    const t = window.setTimeout(hang, flip);\n    return () => window.clearTimeout(t);\n  }, [active, alreadyRevealed, reduce, hang]);\n\n  // Escape key to close inspection\n  React.useEffect(() => {\n    if (!active) return;\n    const onKey = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\") hang();\n    };\n    window.addEventListener(\"keydown\", onKey);\n    return () => window.removeEventListener(\"keydown\", onKey);\n  }, [active, hang]);\n\n  // Audio arrival cue when all cards revealed\n  const prevAllRevealed = React.useRef(allRevealed);\n  React.useEffect(() => {\n    if (allRevealed && !prevAllRevealed.current) {\n      const timer = setTimeout(() => {\n        playTicketArrivalSound();\n      }, 350);\n      return () => clearTimeout(timer);\n    }\n    prevAllRevealed.current = allRevealed;\n  }, [allRevealed]);\n\n  // Auto-scroll board to newest hung card\n  React.useEffect(() => {\n    if (order.length > prevOrderLength.current) {\n      const container = boardScrollRef.current;\n      if (container) {\n        const timer = setTimeout(() => {\n          const cards = container.querySelectorAll(\"[data-pegged-card='true']\");\n          const lastCard = cards[cards.length - 1] as HTMLElement | undefined;\n          if (lastCard && container.scrollWidth > container.clientWidth) {\n            lastCard.scrollIntoView({\n              behavior: reduce ? \"auto\" : \"smooth\",\n              inline: \"center\",\n              block: \"nearest\",\n            });\n          }\n        }, 180);\n        return () => clearTimeout(timer);\n      }\n    }\n    prevOrderLength.current = order.length;\n  }, [order.length, reduce]);\n\n  const handleDeckDragEnd = (_e: unknown, info: PanInfo) => {\n    if (!topStop) return;\n    const { x, y } = info.offset;\n    const { x: vx, y: vy } = info.velocity;\n    const passed =\n      Math.abs(x) > SWIPE_DISTANCE ||\n      Math.abs(y) > SWIPE_DISTANCE ||\n      Math.abs(vx) > SWIPE_VELOCITY ||\n      Math.abs(vy) > SWIPE_VELOCITY;\n    if (passed) open(topStop.id);\n  };\n\n  return (\n    <div\n      className={cn(\n        \"relative isolate size-full w-full h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none text-neutral-900\",\n        className\n      )}\n      style={{\n        backgroundColor: \"var(--itinerary-bg, #ece5d7)\",\n        backgroundImage:\n          \"radial-gradient(120% 90% at 15% 0%, var(--itinerary-bg-gradient-start, #f3ede0) 0%, var(--itinerary-bg-gradient-mid, #e7ddca) 55%, var(--itinerary-bg-gradient-end, #ddd0b6) 100%)\",\n      }}\n    >\n      {/* Wall textures */}\n      <div\n        className=\"pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply\"\n        style={{ backgroundImage: WALL_STAIN_URI, backgroundSize: \"900px 900px\" }}\n      />\n      <div\n        className=\"pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply\"\n        style={{ backgroundImage: WALL_MOTTLE_URI, backgroundSize: \"460px 460px\" }}\n      />\n      <div\n        className=\"pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply\"\n        style={{ backgroundImage: WALL_GRAIN_URI, backgroundSize: \"160px 160px\" }}\n      />\n      <div className=\"pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_50px_rgba(90,70,45,0.15)]\" />\n      <div className=\"pointer-events-none absolute inset-0 bg-[radial-gradient(130%_110%_at_18%_-12%,rgba(255,252,244,0.7),transparent_58%)]\" />\n\n      {/* Desk Edge Mementos */}\n      <div className=\"pointer-events-none absolute inset-0 select-none\" aria-hidden=\"true\">\n        <div className=\"absolute left-6 top-8 hidden 2xl:block\">\n          <LuggageTag code=\"MDR\" tone=\"var(--itinerary-stop-marrakech, #e0a43b)\" rotate={-8} />\n        </div>\n        <div className=\"absolute right-28 top-8 hidden 2xl:block\">\n          <CompassDoodle className=\"h-12 w-12 opacity-70\" rotate={9} />\n        </div>\n      </div>\n\n      {/* Sound Toggle Button (safely offset from top-right island) */}\n      <div className=\"absolute right-16 top-4 z-30 sm:right-28 sm:top-5\">\n        <Button\n          type=\"button\"\n          variant=\"outline\"\n          size=\"sm\"\n          onClick={toggleMute}\n          aria-label={muted ? \"Unmute sound effects\" : \"Mute sound effects\"}\n          className=\"h-7.5 sm:h-8 gap-1.5 rounded-full border-neutral-300/80 bg-white/85 px-2.5 sm:px-3 text-[11px] sm:text-xs font-medium text-neutral-700 shadow-xs backdrop-blur-md transition-all hover:bg-white hover:text-neutral-900 active:scale-95 cursor-pointer\"\n        >\n          {muted ? (\n            <>\n              <VolumeX className=\"size-3.5 text-neutral-500\" />\n              <span>Muted</span>\n            </>\n          ) : (\n            <>\n              <Volume2 className=\"size-3.5 text-neutral-800\" />\n              <span>Sound On</span>\n            </>\n          )}\n        </Button>\n      </div>\n\n      {/* Safe Scroll & Centering Content Stage */}\n      <div className=\"relative z-10 flex min-h-full w-full flex-col items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8\">\n        <div className=\"my-auto flex w-full max-w-4xl flex-col items-center\">\n          {/* Header */}\n          {showHeader && (\n            <header className=\"mb-3 sm:mb-5 flex flex-col items-center text-center\">\n              <div className=\"flex items-center justify-center gap-2\">\n                <span className=\"inline-block size-1.5 rotate-45 bg-itinerary-accent shadow-xs\" />\n                <span className=\"text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500\">\n                  The Itinerary\n                </span>\n              </div>\n              <h2 className=\"mt-1.5 text-balance text-2xl font-black leading-[1.08] tracking-[-0.035em] text-neutral-900 sm:text-3xl lg:text-4xl\">\n                Places you&rsquo;ll go,{\" \"}\n                <span className=\"text-neutral-900/45\">with us.</span>\n              </h2>\n              <p className=\"mt-1 max-w-md text-balance text-xs sm:text-sm font-normal leading-relaxed text-neutral-600\">\n                Curated journeys and private access across the globe.\n              </p>\n            </header>\n          )}\n\n          {/* Board Stage: Wooden Frame & Cork */}\n          <div className=\"w-full\">\n            <div\n              className=\"relative rounded-[1.6rem] p-3 shadow-[0_20px_45px_-20px_rgba(60,40,15,0.55)] sm:p-4\"\n              style={{\n                backgroundImage:\n                  \"linear-gradient(158deg, var(--itinerary-frame-start, #9a6a3a) 0%, var(--itinerary-frame-mid, #734c26) 46%, var(--itinerary-frame-end, #5a3c20) 100%)\",\n              }}\n            >\n              <div\n                className=\"pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-50 mix-blend-overlay\"\n                style={{ backgroundImage: WOOD_URI, backgroundSize: \"260px 140px\" }}\n              />\n              <div className=\"pointer-events-none absolute inset-0 rounded-[1.6rem] shadow-[inset_0_2px_3px_rgba(255,255,255,0.28),inset_0_-4px_8px_rgba(0,0,0,0.4)]\" />\n\n              {/* Mementos on frame */}\n              <div className=\"pointer-events-none absolute inset-0 z-20 select-none\" aria-hidden=\"true\">\n                <div className=\"absolute -top-2 left-6 hidden sm:block\">\n                  <DeskBoardingStub from=\"LHR\" to=\"KIX\" rotate={-6} />\n                  <WashiTape rotate={-18} className=\"absolute -left-2 top-1 w-11\" tone=\"rgba(240,235,222,0.8)\" />\n                </div>\n                <div className=\"absolute right-8 top-0 hidden gap-1.5 sm:flex\">\n                  <DeskStamp code=\"PAR\" hue=\"#e0a43b\" rotate={5} />\n                  <DeskStamp code=\"TYO\" hue=\"#e5647a\" rotate={-7} className=\"mt-1.5\" />\n                </div>\n              </div>\n\n              {/* Inner Corkboard */}\n              <div\n                className=\"relative rounded-[1.1rem] shadow-[inset_0_2px_22px_rgba(60,38,15,0.4)] ring-1 ring-black/25\"\n                style={{ backgroundColor: \"var(--itinerary-cork, #c9a56e)\" }}\n              >\n                <div className=\"pointer-events-none absolute inset-0 overflow-hidden rounded-[1.1rem]\" aria-hidden=\"true\">\n                  <div\n                    className=\"absolute inset-0 opacity-[0.4] mix-blend-multiply\"\n                    style={{ backgroundImage: GRAIN_URI, backgroundSize: \"120px 120px\" }}\n                  />\n                  <div\n                    className=\"absolute inset-0 opacity-[0.18] mix-blend-multiply\"\n                    style={{ backgroundImage: CORK_BLOTCH_URI, backgroundSize: \"220px 220px\" }}\n                  />\n                  <div className=\"absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,240,210,0.3),transparent_55%)]\" />\n                  <div className=\"absolute inset-0 shadow-[inset_0_0_90px_rgba(70,45,20,0.45)]\" />\n\n                  <div className=\"absolute bottom-3 right-4 hidden lg:block\">\n                    <StickyNote color=\"#fce98a\" ink=\"#7a5c12\" rotate={-5}>\n                      wish you\n                      <br />\n                      were here\n                    </StickyNote>\n                    <PushPin color=\"#d64a4a\" className=\"absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.35)]\" />\n                  </div>\n                </div>\n\n                {/* Clothesline Stage with Pegs */}\n                <div className=\"relative min-h-[14rem] sm:min-h-[15.5rem] px-3 pb-5 pt-9 sm:px-6 sm:pt-11\">\n                  <HangingRope className=\"top-6 sm:top-7\" reduce={!!reduce} />\n\n                  {order.length === 0 ? (\n                    <p className=\"pt-12 text-center text-xs sm:text-sm font-medium text-itinerary-text/80\">\n                      The line is empty. Reveal a card below to peg your first stop.\n                    </p>\n                  ) : (\n                    <>\n                      <div\n                        ref={boardScrollRef}\n                        className=\"relative w-full -mt-5 -mb-3 overflow-x-auto overflow-y-hidden pb-3 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-0 sm:mt-0 sm:overflow-visible sm:pb-0 sm:pt-0\"\n                      >\n                        <Reorder.Group\n                          axis=\"x\"\n                          values={order}\n                          onReorder={setOrder}\n                          as=\"div\"\n                          className={cn(\n                            \"relative flex flex-nowrap items-start gap-x-3 px-2 pt-1 min-w-max sm:min-w-0 sm:justify-center sm:gap-x-6 sm:px-0\",\n                            order.length <= 2 ? \"justify-center\" : \"justify-start sm:justify-center\"\n                          )}\n                        >\n                          {order.map((id, i) => (\n                            <PeggedCard\n                              key={id}\n                              id={id}\n                              index={i}\n                              stop={stops.find((s) => s.id === id)!}\n                              seq={seqOf(id)}\n                              isActive={id === active}\n                              reduce={!!reduce}\n                              onOpen={open}\n                            />\n                          ))}\n                        </Reorder.Group>\n                      </div>\n                      {order.length > 1 && (\n                        <p className=\"mt-2 text-center text-[10px] sm:text-[11px] font-medium text-itinerary-text/75 sm:hidden\">\n                          Drag peg to reorder stops &bull; Tap to inspect\n                        </p>\n                      )}\n                    </>\n                  )}\n                </div>\n              </div>\n            </div>\n          </div>\n\n          {/* Draw Pile (Card Stack) or Airplane Ticket */}\n          <div className=\"relative z-20 mt-5 sm:mt-7 flex flex-col items-center gap-3\">\n            {allRevealed ? (\n              <div className=\"relative z-20 aspect-[2.4/1] w-64 sm:w-76\">\n                <AirplaneTicketCard reduce={!!reduce} onTear={reset} />\n              </div>\n            ) : (\n              <div className=\"relative z-20 aspect-[0.72] w-32 sm:w-36\">\n                {deck\n                  .map((stop, i) => ({ stop, i }))\n                  .reverse()\n                  .map(({ stop, i }) => {\n                    const isTop = i === 0;\n                    const depth = i;\n                    return (\n                      <motion.div\n                        key={stop.id}\n                        layoutId={`stop-${stop.id}`}\n                        transition={reduce ? { duration: 0.2 } : CARD_SPRING}\n                        className={cn(\n                          \"absolute inset-0 !opacity-100\",\n                          isTop ? \"cursor-grab active:cursor-grabbing\" : \"pointer-events-none\"\n                        )}\n                        style={{\n                          zIndex: isTop ? 50 : 40 - depth,\n                          touchAction: isTop ? \"none\" : undefined,\n                          opacity: 1,\n                        }}\n                        drag={isTop ? true : false}\n                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}\n                        dragElastic={0.5}\n                        dragMomentum={false}\n                        onDragEnd={isTop ? handleDeckDragEnd : undefined}\n                        onTap={isTop ? () => open(stop.id) : undefined}\n                        whileDrag={{ scale: 1.05, zIndex: 60 }}\n                        aria-hidden={!isTop}\n                      >\n                        <motion.div\n                          className=\"h-full w-full\"\n                          animate={{\n                            y: reduce ? 0 : depth * 7,\n                            x: reduce ? 0 : depth * 4,\n                            rotate: reduce ? 0 : depth * 2,\n                            scale: 1 - depth * 0.045,\n                          }}\n                          transition={reduce ? { duration: 0.2 } : CARD_SPRING}\n                        >\n                          <CardFaces stop={stop} seq={seqOf(stop.id)} faceUp={false} reduce={!!reduce} />\n                        </motion.div>\n                      </motion.div>\n                    );\n                  })}\n              </div>\n            )}\n\n            {!allRevealed ? (\n              <p className=\"text-center text-[11px] sm:text-xs font-medium tracking-wide text-neutral-600\">\n                Swipe or tap the top card to draw\n              </p>\n            ) : (\n              <p className=\"text-center text-[11px] sm:text-xs font-medium tracking-wide text-neutral-600\">\n                Tap anywhere on the ticket to tear &amp; replay\n              </p>\n            )}\n          </div>\n        </div>\n      </div>\n\n      {/* Scrim Backdrop */}\n      <AnimatePresence>\n        {activeStop && (\n          <motion.div\n            key=\"scrim\"\n            role=\"button\"\n            tabIndex={0}\n            aria-label=\"Hang card to the line\"\n            onClick={hang}\n            onKeyDown={(e) => {\n              if (e.key === \"Enter\" || e.key === \" \" || e.key === \"Escape\") {\n                e.preventDefault();\n                hang();\n              }\n            }}\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: reduce ? 0.15 : 0.25 }}\n            className={cn(\n              \"fixed inset-0 z-60\",\n              alreadyRevealed\n                ? \"cursor-pointer bg-black/65 backdrop-blur-[2px]\"\n                : \"pointer-events-none bg-black/35\"\n            )}\n          />\n        )}\n      </AnimatePresence>\n\n      {/* Spotlight Inspection Card */}\n      <AnimatePresence>\n        {activeStop && (\n          <motion.div\n            key={`spotlight-container-${activeStop.id}`}\n            className=\"pointer-events-none fixed inset-0 z-70 flex items-center justify-center p-5\"\n            initial={{ opacity: 1 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.2 }}\n          >\n            <motion.div\n              layoutId={`stop-${activeStop.id}`}\n              transition={reduce ? { duration: 0.2 } : CARD_SPRING}\n              className=\"pointer-events-auto relative z-70 w-full max-w-[19rem] sm:max-w-[22rem] !opacity-100\"\n              style={{\n                aspectRatio: \"0.70\",\n                filter: reduce ? undefined : \"drop-shadow(0 24px 45px rgba(0,0,0,0.3))\",\n                opacity: 1,\n              }}\n            >\n              <CardFaces\n                stop={activeStop}\n                seq={seqOf(activeStop.id)}\n                faceUp\n                spin={!alreadyRevealed}\n                size=\"lg\"\n                reduce={!!reduce}\n              />\n            </motion.div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n    </div>\n  );\n}\n\nexport default ItineraryCarousel;\n";
