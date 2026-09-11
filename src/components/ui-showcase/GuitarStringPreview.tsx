"use client";

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

// 12 Fret positions across the vintage rosewood neck (wire X coordinates, logarithmic scale rule)
const FRETS = [
  { fret: 1, x: 134 },
  { fret: 2, x: 223 },
  { fret: 3, x: 307 },
  { fret: 4, x: 387 },
  { fret: 5, x: 461 },
  { fret: 6, x: 532 },
  { fret: 7, x: 599 },
  { fret: 8, x: 662 },
  { fret: 9, x: 721 },
  { fret: 10, x: 777 },
  { fret: 11, x: 830 },
  { fret: 12, x: 880 },
];

// The 5 classic steel/pearl circle position markers from reference photo (frets 3, 5, 7, 9, 12 double-dot)
const INLAYS = [
  { fret: 3, x: 265, y: 190, r: 7.6, isDouble: false }, // Fret 3
  { fret: 5, x: 424, y: 190, r: 7.6, isDouble: false }, // Fret 5
  { fret: 7, x: 565, y: 190, r: 7.6, isDouble: false }, // Fret 7
  { fret: 9, x: 691, y: 190, r: 7.6, isDouble: false }, // Fret 9
  { fret: 12, x: 855, y: 135, r: 6.4, isDouble: true },  // Fret 12 top
  { fret: 12, x: 855, y: 245, r: 6.4, isDouble: true },  // Fret 12 bottom
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
        const currentPath = `M 40 ${yBase} Q ${clampedX} ${yBase + pull} 960 ${yBase}`;
        const currentShadow = `M 40 ${yBase + 2.5} Q ${clampedX} ${yBase + 2.5 + pull * 0.65} 960 ${yBase + 2.5}`;

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
      const restingPath = `M 40 ${yBase} Q 500 ${yBase} 960 ${yBase}`;
      const restingShadow = `M 40 ${yBase + 2.5} Q 500 ${yBase + 2.5} 960 ${yBase + 2.5}`;

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
      const restingPath = `M 40 ${yBase} Q 500 ${yBase} 960 ${yBase}`;
      const pulledPath = `M 40 ${yBase} Q 500 ${yBase + 26} 960 ${yBase}`;
      const restingShadow = `M 40 ${yBase + 2.5} Q 500 ${yBase + 2.5} 960 ${yBase + 2.5}`;
      const pulledShadow = `M 40 ${yBase + 2.5} Q 500 ${yBase + 2.5 + 16} 960 ${yBase + 2.5}`;

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
              Vintage Rosewood Neck
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
        className="w-full max-w-4xl aspect-[1000/380] relative rounded-3xl border border-border/70 overflow-hidden flex items-center justify-center cursor-guitar-pick shadow-2xl transition-all"
        style={{
          boxShadow: `0 24px 60px -20px var(--color-guitar-rosewood-shadow, rgba(20, 9, 4, 0.55))`,
          cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='28' viewBox='0 0 24 28' fill='none'%3E%3Cpath d='M12 26 C9 22 2 13 2 8 C2 3.5 6.5 1 12 1 C17.5 1 22 3.5 22 8 C22 13 15 22 12 26 Z' fill='%23000000' fill-opacity='0.35' transform='translate(0.5, 1)'/%3E%3Cpath d='M12 26 C9 22 2 13 2 8 C2 3.5 6.5 1 12 1 C17.5 1 22 3.5 22 8 C22 13 15 22 12 26 Z' fill='%23034ead' stroke='%23ffffff' stroke-width='1.2' stroke-linejoin='round'/%3E%3Cpath d='M6 7 C6 4.5 8.5 2.5 12 2.5' stroke='%23ffffff' stroke-width='0.8' stroke-linecap='round' stroke-opacity='0.6'/%3E%3Ccircle cx='12' cy='9' r='1.5' fill='%23ffffff' fill-opacity='0.6'/%3E%3C/svg%3E") 12 26, crosshair`,
        }}
      >
        <svg
          viewBox="0 0 1000 380"
          className="w-full h-full overflow-hidden pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* 1. Vintage Brazilian/Indian Rosewood Longitudinal Gradient */}
            <linearGradient id="vintage-rosewood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-rosewood-deep, #1a0d07)" />
              <stop offset="4%" stopColor="var(--color-guitar-rosewood-dark, #27150d)" />
              <stop offset="20%" stopColor="var(--color-guitar-rosewood-base, #382015)" />
              <stop offset="50%" stopColor="var(--color-guitar-rosewood-warm, #4d2d1d)" />
              <stop offset="78%" stopColor="var(--color-guitar-rosewood-base, #382015)" />
              <stop offset="96%" stopColor="var(--color-guitar-rosewood-dark, #27150d)" />
              <stop offset="100%" stopColor="var(--color-guitar-rosewood-deep, #1a0d07)" />
            </linearGradient>

            {/* 2. Open-Pore Micro-Groove Pattern (Authentic Rosewood Fibrous Texture) */}
            <pattern id="rosewood-pores" width="48" height="14" patternUnits="userSpaceOnUse">
              {/* Fine porous fissures running parallel to strings */}
              <path d="M 2 2 L 18 2 M 26 2.2 L 42 2.2" stroke="var(--color-guitar-rosewood-grain, #150a05)" strokeWidth="0.85" opacity="0.65" strokeLinecap="round" />
              <path d="M 10 5.5 L 34 5.5" stroke="var(--color-guitar-rosewood-deep, #1a0d07)" strokeWidth="0.75" opacity="0.5" strokeLinecap="round" />
              <path d="M 0 9 L 16 9 M 24 8.8 L 44 8.8" stroke="var(--color-guitar-rosewood-grain, #150a05)" strokeWidth="0.9" opacity="0.7" strokeLinecap="round" />
              <path d="M 14 12.5 L 36 12.5" stroke="var(--color-guitar-rosewood-deep, #1a0d07)" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
              {/* Micro open pores */}
              <circle cx="6" cy="3.5" r="0.45" fill="var(--color-guitar-rosewood-grain, #150a05)" opacity="0.75" />
              <circle cx="22" cy="7" r="0.5" fill="var(--color-guitar-rosewood-grain, #150a05)" opacity="0.65" />
              <circle cx="38" cy="10.5" r="0.45" fill="var(--color-guitar-rosewood-grain, #150a05)" opacity="0.75" />
            </pattern>

            {/* 3. Rosewood Natural Play-Sheen Gradient (Fret 3-7 soft contact glow) */}
            <linearGradient id="rosewood-play-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-guitar-rosewood-base, #382015)" stopOpacity="0.05" />
              <stop offset="25%" stopColor="var(--color-guitar-rosewood-chestnut, #5e3723)" stopOpacity="0.22" />
              <stop offset="45%" stopColor="var(--color-guitar-rosewood-warm, #4d2d1d)" stopOpacity="0.28" />
              <stop offset="65%" stopColor="var(--color-guitar-rosewood-chestnut, #5e3723)" stopOpacity="0.2" />
              <stop offset="88%" stopColor="var(--color-guitar-rosewood-base, #382015)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--color-guitar-rosewood-dark, #27150d)" stopOpacity="0.04" />
            </linearGradient>

            {/* 4. Vintage Celluloid Cream Binding Gradients */}
            <linearGradient id="binding-top-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-binding-cream, #f4ece1)" />
              <stop offset="70%" stopColor="var(--color-guitar-binding-edge, #d8caa9)" />
              <stop offset="100%" stopColor="var(--color-guitar-binding-shadow, #23120a)" />
            </linearGradient>

            <linearGradient id="binding-bottom-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-binding-shadow, #23120a)" />
              <stop offset="30%" stopColor="var(--color-guitar-binding-edge, #d8caa9)" />
              <stop offset="100%" stopColor="var(--color-guitar-binding-cream, #f4ece1)" />
            </linearGradient>

            {/* 5. Metallic Polished Nickel Fret Polish Gradient */}
            <linearGradient id="nickel-fret-shine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
              <stop offset="6%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="22%" stopColor="var(--color-guitar-fret-wire, #b4bec7)" />
              <stop offset="48%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="75%" stopColor="var(--color-guitar-fret-wire, #b4bec7)" />
              <stop offset="94%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="100%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
            </linearGradient>

            {/* 6. Authentic Vintage Mother-of-Pearl Dot Inlay Gradient */}
            <radialGradient id="real-pearl-dot" cx="44%" cy="40%" r="60%">
              <stop offset="0%" stopColor="var(--color-guitar-pearl-sheen, #ffffff)" />
              <stop offset="32%" stopColor="var(--color-guitar-pearl-base, #f5f1e8)" />
              <stop offset="68%" stopColor="var(--color-guitar-pearl-mid, #eae3d2)" />
              <stop offset="92%" stopColor="var(--color-guitar-pearl-shade, #ded5c0)" />
              <stop offset="100%" stopColor="var(--color-guitar-pearl-edge, #26150e)" stopOpacity="0.45" />
            </radialGradient>

            {/* 7. Soft Natural Pearloid Chatoyancy Sheen Overlay */}
            <linearGradient id="pearl-chatoyancy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="42%" stopColor="#f4ece1" stopOpacity="0.15" />
              <stop offset="72%" stopColor="#ded5c0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.38" />
            </linearGradient>

            {/* 8. 3D Hemispherical Chrome/Nickel Ball-End Gradient */}
            <radialGradient id="ball-end-metal" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="var(--color-guitar-chrome-bright, #ffffff)" />
              <stop offset="38%" stopColor="var(--color-guitar-chrome-mid, #cbd5e1)" />
              <stop offset="78%" stopColor="var(--color-guitar-chrome-dark, #64748b)" />
              <stop offset="100%" stopColor="var(--color-guitar-rosewood-shadow, #140904)" />
            </radialGradient>

            {/* 9. Plain Steel String Longitudinal Metallic Luster Gradient (Strings 1-3) */}
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

            {/* 10. Nickel-Wound String Longitudinal Metallic Luster Gradient (Strings 4-6) */}
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

            {/* 11. Authentic Roundwound Metallic Coil Micro-texture Pattern */}
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

            {/* 12. Left/Right Steel Bar & Nut Gradient */}
            <linearGradient id="bone-nut-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-guitar-nut-bone, #f4efe2)" />
              <stop offset="40%" stopColor="var(--color-guitar-inlay-steel-bright, #ffffff)" />
              <stop offset="70%" stopColor="var(--color-guitar-binding-edge, #d8caa9)" />
              <stop offset="100%" stopColor="var(--color-guitar-nut-bone, #f4efe2)" />
            </linearGradient>

            {/* 13. String Glow Bloom Filter */}
            <filter id="string-shimmer" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
            </filter>
          </defs>

          {/* ================= 1. FULL-BLEED VINTAGE ROSEWOOD FRETBOARD NECK ================= */}
          {/* Base Rosewood Slab */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="380"
            fill="url(#vintage-rosewood)"
          />

          {/* Real Open-Pore Micro Grain Pattern Texture */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="380"
            fill="url(#rosewood-pores)"
            opacity="0.55"
          />

          {/* Natural Play-Sheen Warmth Overlay */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="380"
            fill="url(#rosewood-play-sheen)"
            opacity="0.25"
          />

          {/* Long Fibrous Rosewood Grain Lines (Horizontal, matching photo) */}
          <g opacity="0.42">
            {[26, 42, 60, 78, 98, 118, 140, 162, 184, 206, 228, 250, 274, 296, 318, 338, 354].map((y, i) => (
              <path
                key={`rosewood-grain-${i}`}
                d={`M 0 ${y} Q 240 ${y + (i % 2 === 0 ? 1.6 : -1.4)} 600 ${y + (i % 3 === 0 ? -1.3 : 1.5)} T 1000 ${y + (i % 2 === 0 ? 0.9 : -0.8)}`}
                fill="none"
                stroke={i % 2 === 0 ? "var(--color-guitar-rosewood-grain, #150a05)" : "var(--color-guitar-rosewood-chestnut, #5e3723)"}
                strokeWidth={i % 3 === 0 ? "1.3" : "0.85"}
                strokeDasharray={i % 2 === 0 ? "85 18 130 15 65 12" : "110 24 80 18 140 14"}
              />
            ))}
          </g>

          {/* ================= 2. TOP & BOTTOM VINTAGE CREAM CELLULOID BINDING ================= */}
          {/* Top Binding Strip */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="16"
            fill="url(#binding-top-grad)"
          />
          {/* Top Binding Boundary Seam on Rosewood */}
          <line
            x1="0"
            y1="16"
            x2="1000"
            y2="16"
            stroke="var(--color-guitar-binding-shadow, #23120a)"
            strokeWidth="1.2"
          />
          {/* Top Outer Edge Rolled Highlight */}
          <line
            x1="0"
            y1="1"
            x2="1000"
            y2="1"
            stroke="var(--color-guitar-inlay-steel-bright, #ffffff)"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Bottom Binding Strip */}
          <rect
            x="0"
            y="364"
            width="1000"
            height="16"
            fill="url(#binding-bottom-grad)"
          />
          {/* Bottom Binding Boundary Seam on Rosewood */}
          <line
            x1="0"
            y1="364"
            x2="1000"
            y2="364"
            stroke="var(--color-guitar-binding-shadow, #23120a)"
            strokeWidth="1.2"
          />
          {/* Bottom Outer Edge Shadow */}
          <line
            x1="0"
            y1="379"
            x2="1000"
            y2="379"
            stroke="var(--color-guitar-binding-shadow, #23120a)"
            strokeWidth="1"
            strokeOpacity="0.75"
          />

          {/* ================= 3. REFINED NICKEL-SILVER FRETS (VERTICAL LINES FROM PHOTO) ================= */}
          {FRETS.map(({ fret, x }) => (
            <g key={`fret-${fret}`}>
              {/* Fret Tang Slot Shadow on Rosewood */}
              <line
                x1={x + 0.9}
                y1="16"
                x2={x + 0.9}
                y2="364"
                stroke="var(--color-guitar-rosewood-shadow, #140904)"
                strokeWidth="1.4"
                strokeOpacity="0.6"
              />
              {/* Cylindrical Metallic Polished Nickel Fret Wire */}
              <line
                x1={x}
                y1="16"
                x2={x}
                y2="364"
                stroke="url(#nickel-fret-shine)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Specular Crown Highlight Hairline */}
              <line
                x1={x}
                y1="18"
                x2={x}
                y2="362"
                stroke="var(--color-guitar-inlay-steel-bright, #ffffff)"
                strokeWidth="0.6"
                strokeOpacity="0.85"
              />
              {/* Top Fret End Bevel on Binding */}
              <line
                x1={x - 1}
                y1="16"
                x2={x + 1}
                y2="16"
                stroke="var(--color-guitar-chrome-dark, #64748b)"
                strokeWidth="1.2"
              />
              {/* Bottom Fret End Bevel on Binding */}
              <line
                x1={x - 1}
                y1="364"
                x2={x + 1}
                y2="364"
                stroke="var(--color-guitar-chrome-dark, #64748b)"
                strokeWidth="1.2"
              />
            </g>
          ))}

          {/* ================= 4. THE 5 VINTAGE PEARL CIRCLE INLAYS (FROM PHOTO: FRETS 3, 5, 7, 9, 12) ================= */}
          {INLAYS.map((inlay, i) => (
            <g key={`pearl-circle-inlay-${i}`}>
              {/* Ultra-fine flush wood seam (hairline edge, NOT a thick black ring) */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r + 0.35}
                fill="none"
                stroke="var(--color-guitar-pearl-edge, #26150e)"
                strokeWidth="0.7"
                opacity="0.5"
              />

              {/* Natural Vintage Mother-of-Pearl Disk Body */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r}
                fill="url(#real-pearl-dot)"
              />

              {/* Organic Pearloid Chatoyancy Soft Grain Sheen */}
              <circle
                cx={inlay.x}
                cy={inlay.y}
                r={inlay.r}
                fill="url(#pearl-chatoyancy)"
                opacity="0.65"
              />

              {/* Delicate Natural Ambient Light Catch */}
              <circle
                cx={inlay.x - inlay.r * 0.22}
                cy={inlay.y - inlay.r * 0.22}
                r={inlay.r * 0.32}
                fill="var(--color-guitar-pearl-sheen, #ffffff)"
                opacity="0.45"
              />
            </g>
          ))}

          {/* ================= 5. LEFT STEEL NUT BAR ================= */}
          <g id="left-steel-bar">
            <rect
              x="34"
              y="14"
              width="12"
              height="352"
              rx="3.5"
              fill="url(#bone-nut-grad)"
              style={{ filter: "drop-shadow(2.5px 0 4px rgba(20,9,4,0.6))" }}
            />
            {/* Polished Specular Highlight Hairline */}
            <line
              x1="37"
              y1="17"
              x2="37"
              y2="363"
              stroke="var(--color-guitar-inlay-steel-bright, #ffffff)"
              strokeWidth="0.85"
              strokeOpacity="0.85"
            />
            {/* Left Nut String Notches */}
            {STRINGS_CONFIG.map((str) => (
              <circle
                key={`left-nut-notch-${str.id}`}
                cx="40"
                cy={str.yBase}
                r={str.thickness * 0.65}
                fill="var(--color-guitar-rosewood-shadow, #140904)"
                opacity="0.9"
              />
            ))}
          </g>

          {/* ================= 6. RIGHT STEEL BAR (MATCHING SYMMETRIC TWIN) ================= */}
          <g id="right-steel-bar">
            <rect
              x="954"
              y="14"
              width="12"
              height="352"
              rx="3.5"
              fill="url(#bone-nut-grad)"
              style={{ filter: "drop-shadow(-2.5px 0 4px rgba(20,9,4,0.6))" }}
            />
            {/* Polished Specular Highlight Hairline */}
            <line
              x1="957"
              y1="17"
              x2="957"
              y2="363"
              stroke="var(--color-guitar-inlay-steel-bright, #ffffff)"
              strokeWidth="0.85"
              strokeOpacity="0.85"
            />
            {/* Right String Notches */}
            {STRINGS_CONFIG.map((str) => (
              <circle
                key={`right-nut-notch-${str.id}`}
                cx="960"
                cy={str.yBase}
                r={str.thickness * 0.65}
                fill="var(--color-guitar-rosewood-shadow, #140904)"
                opacity="0.9"
              />
            ))}
          </g>

          {/* ================= 7. GUITAR STRINGS (HORIZONTAL LINES FROM PHOTO) ================= */}
          {STRINGS_CONFIG.map((str, index) => {
            const initialD = `M 40 ${str.yBase} Q 500 ${str.yBase} 960 ${str.yBase}`;
            const initialShadowD = `M 40 ${str.yBase + 2.8} Q 500 ${str.yBase + 2.8} 960 ${str.yBase + 2.8}`;

            return (
              <g key={`string-${str.id}`}>
                {/* 1. Physical Drop Shadow on Dark Rosewood Fretboard */}
                <path
                  ref={(el) => {
                    shadowRefs.current[index] = el;
                  }}
                  d={initialShadowD}
                  fill="none"
                  stroke="var(--color-guitar-rosewood-shadow, #140904)"
                  strokeWidth={str.thickness * 0.8}
                  strokeOpacity="0.45"
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
                  stroke="var(--color-guitar-inlay-steel-bright, #ffffff)"
                  strokeWidth={Math.max(0.65, str.thickness * 0.32)}
                  strokeLinecap="round"
                  opacity="0.94"
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
