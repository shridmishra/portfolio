"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  Reorder,
  useReducedMotion,
  useDragControls,
  type PanInfo,
} from "motion/react";
import { Plane, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

// ============================================================================
// Types
// ============================================================================

export interface Stop {
  id: string;
  place: string;
  location: string;
  tag: string;
  blurb: string;
  photo: string;
  accent: string;
}

export interface ItineraryCarouselProps {
  embedded?: boolean;
  className?: string;
  soundEnabled?: boolean;
  showHeader?: boolean;
  stops?: Stop[];
}

// ============================================================================
// Default Stops Data
// ============================================================================

export const DEFAULT_STOPS: Stop[] = [
  {
    id: "cappadocia",
    place: "Cappadocia",
    location: "Göreme, Turkey",
    tag: "Top rated",
    blurb: "Dawn balloon ascent over the fairy chimneys, private launch.",
    photo: "/images/itinerary/cappadocia.webp",
    accent: "var(--itinerary-stop-cappadocia, #E8843C)",
  },
  {
    id: "kyoto",
    place: "Kyoto",
    location: "Kansai, Japan",
    tag: "Member favourite",
    blurb: "A garden ryokan held for you, tea at first light.",
    photo: "/images/itinerary/kyoto.webp",
    accent: "var(--itinerary-stop-kyoto, #E5647A)",
  },
  {
    id: "amalfi",
    place: "Amalfi",
    location: "Campania, Italy",
    tag: "Signature",
    blurb: "Cliffside marina, a boat waiting whenever the water calls.",
    photo: "/images/itinerary/amalfi.webp",
    accent: "var(--itinerary-stop-amalfi, #2E9BD6)",
  },
  {
    id: "marrakech",
    place: "Marrakech",
    location: "Marrakesh-Safi, Morocco",
    tag: "Hidden gem",
    blurb: "A walled riad behind an unmarked door, courtyard to yourself.",
    photo: "/images/itinerary/marrakech.webp",
    accent: "var(--itinerary-stop-marrakech, #E0A43B)",
  },
  {
    id: "reykjavik",
    place: "Reykjavík",
    location: "Höfuðborg, Iceland",
    tag: "Seasonal",
    blurb: "Aurora lodge off-grid, woken only if the sky performs.",
    photo: "/images/itinerary/reykjavik.webp",
    accent: "var(--itinerary-stop-reykjavik, #3FB79A)",
  },
];

export const HANG_TILTS = [-4, 3.5, -2.5, 4.5, -3.5];
export const SWIPE_DISTANCE = 78;
export const SWIPE_VELOCITY = 380;
export const CARD_SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 1.0 };

// ============================================================================
// Procedural SVG Textures
// ============================================================================

export const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const WOOD_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='140'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014 0.12' numOctaves='4' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E\")";

export const CORK_BLOTCH_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='b' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E\")";

export const WALL_GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='wg' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wg)'/%3E%3C/svg%3E\")";

export const WALL_MOTTLE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='wm' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wm)'/%3E%3C/svg%3E\")";

export const WALL_STAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='ws' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='23' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ws)'/%3E%3C/svg%3E\")";

// ============================================================================
// Procedural Web Audio API Acoustics
// ============================================================================

let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let isAudioMuted = false;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function warmUpItineraryAudio() {
  const ctx = getAudioCtx();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

function getNoise(ctx: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
    return noiseBuffer;
  }
  const bufferSize = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.25;
  }
  noiseBuffer = buffer;
  return buffer;
}

export function setItineraryMuted(muted: boolean) {
  isAudioMuted = muted;
}

export function getItineraryMuted(): boolean {
  return isAudioMuted;
}

export function playCardSlideSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = getNoise(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.setValueAtTime(1.3, now);
  filter.frequency.setValueAtTime(440, now);
  filter.frequency.exponentialRampToValueAtTime(880, now + 0.035);
  filter.frequency.exponentialRampToValueAtTime(360, now + 0.1);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
  src.stop(now + 0.13);
}

export function playCardFlipSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = getNoise(ctx);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.Q.setValueAtTime(1.8, now);
  noiseFilter.frequency.setValueAtTime(600, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
  noiseFilter.frequency.exponentialRampToValueAtTime(400, now + 0.2);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.001, now);
  noiseGain.gain.linearRampToValueAtTime(0.24, now + 0.04);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  noiseSrc.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSrc.start(now);
  noiseSrc.stop(now + 0.23);

  const thud = ctx.createOscillator();
  thud.type = "sine";
  thud.frequency.setValueAtTime(130, now + 0.08);
  thud.frequency.exponentialRampToValueAtTime(45, now + 0.22);
  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0.001, now);
  thudGain.gain.setValueAtTime(0.14, now + 0.08);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
  thud.connect(thudGain);
  thudGain.connect(ctx.destination);
  thud.start(now + 0.08);
  thud.stop(now + 0.25);
}

export function playPegSnapSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  osc1.type = "triangle";
  osc1.frequency.setValueAtTime(1850, now);
  osc1.frequency.exponentialRampToValueAtTime(520, now + 0.024);
  const gain1 = ctx.createGain();
  gain1.gain.setValueAtTime(0.28, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.03);

  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(320, now + 0.004);
  osc2.frequency.exponentialRampToValueAtTime(80, now + 0.045);
  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0.22, now + 0.004);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.004);
  osc2.stop(now + 0.055);
}

export function playPegReleaseSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(950, now);
  osc.frequency.exponentialRampToValueAtTime(1600, now + 0.02);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.026);
}

export function playCardReorderSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(380, now + 0.03);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.04);
}

export function playTicketArrivalSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const bell = ctx.createOscillator();
  bell.type = "sine";
  bell.frequency.setValueAtTime(1046.5, now);
  const bellGain = ctx.createGain();
  bellGain.gain.setValueAtTime(0.16, now);
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  bell.connect(bellGain);
  bellGain.connect(ctx.destination);
  bell.start(now);
  bell.stop(now + 0.46);
}

export function playTicketTearSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = getNoise(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.setValueAtTime(2.2, now);
  filter.frequency.setValueAtTime(2200, now);
  filter.frequency.exponentialRampToValueAtTime(3800, now + 0.08);
  filter.frequency.exponentialRampToValueAtTime(1600, now + 0.22);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
  src.stop(now + 0.26);
}

export function playDeckResetSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (let i = 0; i < 4; i++) {
    const delay = i * 0.045;
    const src = ctx.createBufferSource();
    src.buffer = getNoise(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(1.6, now + delay);
    filter.frequency.setValueAtTime(480 + i * 120, now + delay);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14 - i * 0.02, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now + delay);
    src.stop(now + delay + 0.06);
  }
}

export function playButtonClickSound() {
  if (isAudioMuted) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(620, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.04);
}

// ============================================================================
// Vector Icons & Cutouts
// ============================================================================

export function SolidPlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21 6.5c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-4.3 4.3-6.8-1.9-1.7 1.7 5 2.9-2.5 2.5-2.4-.5-1.3 1.3 3.2 1.7 1.7 3.2 1.3-1.3-.5-2.4 2.5-2.5 2.9 5 1.7-1.7-1.9-6.8L21 6.5Z" />
    </svg>
  );
}

export function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function ClothespinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 30" className={className} aria-hidden="true">
      <rect x="6" y="1.5" width="4.2" height="27" rx="2" fill="#d8b06a" />
      <rect x="11.8" y="1.5" width="4.2" height="27" rx="2" fill="#c79a52" />
      <rect x="6" y="1.5" width="4.2" height="27" rx="2" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
      <rect x="11.8" y="1.5" width="4.2" height="27" rx="2" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
      <circle cx="11" cy="15" r="3.1" fill="none" stroke="#9a9a9a" strokeWidth="1.4" />
      <circle cx="11" cy="15" r="3.1" fill="none" stroke="#e6e6e6" strokeWidth="0.5" />
    </svg>
  );
}

// ============================================================================
// Mementos & Desk Ephemera
// ============================================================================

export function PushPin({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden="true">
      <rect x="11.3" y="9" width="1.4" height="14" rx="0.7" fill="#8b8f96" />
      <rect x="11.3" y="9" width="0.6" height="14" rx="0.3" fill="#c7ccd2" />
      <ellipse cx="12" cy="24" rx="2.6" ry="1" fill="rgba(0,0,0,0.28)" />
      <circle cx="12" cy="8" r="6.4" fill={color} />
      <circle cx="12" cy="8" r="6.4" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
      <circle cx="9.6" cy="5.6" r="2.1" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

export function WashiTape({
  className,
  tone = "rgba(236,230,216,0.6)",
  rotate = 0,
}: {
  className?: string;
  tone?: string;
  rotate?: number;
}) {
  const tornMask =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='20' preserveAspectRatio='none'%3E%3Cpath d='M2,3 L4,1 L3,5 L5,2 L4,7 L6,3 L58,3 L60,1 L59,6 L61,2 L60,8 L62,3 L62,17 L60,19 L61,14 L59,18 L60,13 L58,17 L6,17 L4,19 L5,14 L3,18 L4,12 L2,17 Z' fill='%23fff'/%3E%3C/svg%3E\")";
  return (
    <span
      className={cn("relative block h-[1.15rem] w-16", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: `linear-gradient(180deg, rgba(255,255,255,0.22), transparent 40%, rgba(0,0,0,0.06)), ${tone}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.16), inset 0 0 0 0.5px rgba(255,255,255,0.25)",
        WebkitMaskImage: tornMask,
        maskImage: tornMask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "90px 90px" }}
      />
    </span>
  );
}

export function StickyNote({
  color,
  ink,
  rotate = 0,
  className,
  children,
}: {
  color: string;
  ink: string;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative h-[4.6rem] w-[4.6rem] p-2", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        boxShadow: "0 8px 16px -8px rgba(50,35,12,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
      }}
    >
      <span
        className="flex h-full w-full items-center justify-center text-center text-[0.6rem] font-semibold italic leading-tight"
        style={{ color: ink }}
      >
        {children}
      </span>
      <span
        className="absolute bottom-0 right-0 h-3 w-3"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.18), transparent 60%)",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}

export function DeskStamp({
  code,
  hue,
  rotate = 0,
  className,
}: {
  code: string;
  hue: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)} style={{ transform: `rotate(${rotate}deg)` }}>
      <div
        className="p-1"
        style={{
          background: "#f3efe4",
          boxShadow: "0 4px 9px -4px rgba(40,28,10,0.6)",
          WebkitMask:
            "radial-gradient(circle 2px at 0 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 100% 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 50% 0, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, radial-gradient(circle 2px at 50% 100%, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, linear-gradient(#000, #000)",
          mask:
            "radial-gradient(circle 2px at 0 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 100% 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 50% 0, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, radial-gradient(circle 2px at 50% 100%, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, linear-gradient(#000, #000)",
        }}
      >
        <div
          className="flex h-9 w-8 flex-col items-center justify-end rounded-[2px] p-1"
          style={{ background: `linear-gradient(160deg, ${hue}, rgba(255,255,255,0.35))` }}
        >
          <span className="rounded-[1px] bg-white/80 px-1 text-[0.5rem] font-bold leading-none text-neutral-700">
            {code}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DeskBoardingStub({
  from,
  to,
  rotate = 0,
  className,
}: {
  from: string;
  to: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-24 overflow-hidden rounded-[3px]", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "#faf7ef",
        boxShadow: "0 10px 18px -10px rgba(40,28,10,0.6)",
      }}
    >
      <div className="h-1.5 w-full bg-[#2b6b6b]" />
      <div className="flex items-center justify-between px-2 py-1.5">
        <div className="leading-none">
          <p className="text-[0.72rem] font-black tracking-tight text-neutral-800">{from}</p>
          <p className="text-[0.4rem] uppercase tracking-[0.15em] text-neutral-400">from</p>
        </div>
        <SolidPlaneIcon className="size-3 text-neutral-500" />
        <div className="text-right leading-none">
          <p className="text-[0.72rem] font-black tracking-tight text-neutral-800">{to}</p>
          <p className="text-[0.4rem] uppercase tracking-[0.15em] text-neutral-400">to</p>
        </div>
      </div>
      <div
        className="h-2 w-full"
        style={{
          background:
            "radial-gradient(circle 3px at 6px 0, transparent 98%, var(--itinerary-cork, #c9a56e)) 0 0 / 12px 8px repeat-x",
        }}
      />
    </div>
  );
}

export function LuggageTag({
  code,
  tone,
  rotate = 0,
  className,
}: {
  code: string;
  tone: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 20 16" className="h-4 w-5" aria-hidden="true">
        <path d="M10 14 C 4 10 4 4 10 3 C 16 4 16 10 10 14 Z" fill="none" stroke="#8a6a3c" strokeWidth="1.1" />
      </svg>
      <div
        className="relative -mt-1 flex h-9 w-[3.4rem] items-center justify-center rounded-md px-1"
        style={{
          background: `linear-gradient(155deg, ${tone}, rgba(255,255,255,0.4))`,
          boxShadow: "0 8px 14px -8px rgba(40,28,10,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        <span className="absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rounded-full border border-black/30 bg-white/70" />
        <span className="mt-1 text-[0.6rem] font-black uppercase tracking-[0.14em] text-neutral-700">
          {code}
        </span>
      </div>
    </div>
  );
}

export function CompassDoodle({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("text-[#4a3115]", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.5 2" opacity="0.5" />
      <path
        d="M24 5 L27 22 L44 24 L27 26 L24 43 L21 26 L5 24 L21 22 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" />
      <text x="24" y="4.4" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor" opacity="0.8">N</text>
    </svg>
  );
}

// ============================================================================
// Travel Card & Tangent Fillet Cutout
// ============================================================================

export function computeTangentCardClip(w: number, h: number, isLg: boolean) {
  const btn = isLg ? 40 : 26;
  const inset = isLg ? 6 : 4;
  const gap = isLg ? 6.0 : 4.0;
  const r_f = isLg ? 7.5 : 5.0;
  const r_c = isLg ? 17.5 : 10.0;

  const badgeRadius = btn / 2;
  const c = badgeRadius - inset;
  const R = badgeRadius + gap;
  const d = c + Math.sqrt((R + r_f) ** 2 - (c - r_f) ** 2);

  const p1_x = w - d;
  const p2_x = w - (c + (R * (d - c)) / (R + r_f));
  const p2_y = c - (R * (c - r_f)) / (R + r_f);
  const p3_x = w - p2_y;
  const p3_y = c + (R * (d - c)) / (R + r_f);
  const p4_y = d;

  const n = (val: number, max: number) => (val / max).toFixed(4);

  return [
    `M ${n(r_c, w)} 0`,
    `L ${n(p1_x, w)} 0`,
    `A ${n(r_f, w)} ${n(r_f, h)} 0 0 1 ${n(p2_x, w)} ${n(p2_y, h)}`,
    `A ${n(R, w)} ${n(R, h)} 0 0 0 ${n(p3_x, w)} ${n(p3_y, h)}`,
    `A ${n(r_f, w)} ${n(r_f, h)} 0 0 1 1 ${n(p4_y, h)}`,
    `L 1 ${n(h - r_c, h)}`,
    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 ${n(w - r_c, w)} 1`,
    `L ${n(r_c, w)} 1`,
    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 0 ${n(h - r_c, h)}`,
    `L 0 ${n(r_c, h)}`,
    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 ${n(r_c, w)} 0 Z`,
  ].join(" ");
}

export function TravelCardFront({ stop, size = "md" }: { stop: Stop; size?: "md" | "lg" }) {
  const lg = size === "lg";
  const btn = lg ? 40 : 26;
  const inset = lg ? 6 : 4;
  const rawId = React.useId();
  const clipId = `travel-clip-${rawId.replace(/:/g, "")}`;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [clipD, setClipD] = React.useState<string>("");

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateClip = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w > 0 && h > 0) {
        setClipD(computeTangentCardClip(w, h, lg));
      }
    };
    updateClip();
    const observer = new ResizeObserver(updateClip);
    observer.observe(el);
    return () => observer.disconnect();
  }, [lg]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-itinerary-card text-neutral-900 ring-1 ring-black/5",
        lg ? "rounded-[1.35rem] p-3" : "rounded-[1rem] p-2"
      )}
    >
      <div ref={containerRef} className="relative min-h-0 flex-1">
        {clipD && (
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                <path d={clipD} />
              </clipPath>
            </defs>
          </svg>
        )}

        <div
          className="absolute inset-0 overflow-hidden bg-neutral-200"
          style={clipD ? { clipPath: `url(#${clipId})` } : undefined}
        >
          <Image
            src={stop.photo}
            alt={`${stop.place}, ${stop.location}`}
            fill
            sizes={lg ? "400px" : "220px"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

          {!lg && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div
                className="absolute inset-0 backdrop-blur-lg backdrop-saturate-150"
                style={{
                  WebkitMaskImage: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                  maskImage: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
              <div className="relative px-2.5 pb-2.5 pt-8">
                <h3 className="truncate text-[1.05rem] font-bold leading-tight tracking-tight text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
                  {stop.place}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-[0.64rem] font-medium text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                  <MapPinIcon className="size-2.5 shrink-0 text-white/75" />
                  <span className="truncate">{stop.location}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {lg && (
          <Badge
            variant="secondary"
            className="absolute left-2.5 top-2.5 inline-flex items-center border-none bg-white/20 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md"
          >
            {stop.tag}
          </Badge>
        )}

        <div
          className="absolute z-10 flex items-center justify-center rounded-full bg-neutral-900 text-white shadow-md select-none"
          style={{ width: btn, height: btn, top: -inset, right: -inset }}
          aria-hidden="true"
        >
          <Plane className={lg ? "size-5" : "size-3.5"} strokeWidth={2} />
        </div>
      </div>

      <div className={cn("shrink-0", lg ? "px-1.5 pt-2.5" : "px-0.5 pt-1")}>
        {lg && (
          <>
            <div className="flex min-w-0 items-baseline justify-between gap-3">
              <h3 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight text-neutral-900 sm:text-[1.7rem]">
                {stop.place}
              </h3>
              <span className="shrink-0 text-right text-sm font-medium text-neutral-500">
                {stop.location}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{stop.blurb}</p>
          </>
        )}

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playButtonClickSound();
          }}
          className={cn(
            "group/book flex w-full items-center justify-center gap-1.5 rounded-full bg-neutral-900 font-semibold text-white transition-transform active:scale-[0.98] hover:bg-neutral-800",
            lg ? "mt-2.5 h-10 text-sm" : "mt-1 h-7 text-[0.68rem]"
          )}
        >
          Book Now
          <Plane
            className={cn(
              "shrink-0 transition-transform duration-150 ease-out group-hover/book:translate-x-0.5 group-hover/book:-translate-y-0.5",
              lg ? "size-4" : "size-3"
            )}
            strokeWidth={2}
          />
        </Button>
      </div>
    </div>
  );
}

export function PostcardBack({ stop, seq, size = "md" }: { stop: Stop; seq: number; size?: "md" | "lg" }) {
  const lg = size === "lg";
  const country = stop.location.split(",").pop()?.trim() || stop.location;
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-itinerary-card-back text-itinerary-text ring-1 ring-black/10",
        lg ? "rounded-[1.35rem]" : "rounded-[1rem]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-2.5 border border-dashed border-itinerary-text/35",
          lg ? "rounded-xl" : "rounded-md"
        )}
      />

      <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] opacity-70">
            Meridian · Travel
          </p>
          <div className="mt-1 h-px w-10 bg-itinerary-text/30" />
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] opacity-60">
            Stop {String(seq).padStart(2, "0")}
          </span>

          <div
            className="relative mt-2 flex size-[4.2rem] flex-col items-center justify-center rounded-full border border-dashed border-itinerary-text/45 p-1"
            style={{ transform: "rotate(-7deg)" }}
            aria-hidden="true"
          >
            <span className="text-[0.4rem] font-bold uppercase tracking-[0.26em] opacity-60 leading-none">
              Air Mail
            </span>
            <span className="mt-1 max-w-[3.9rem] truncate text-[0.74rem] sm:text-[0.8rem] font-black uppercase leading-tight tracking-tight px-0.5">
              {country}
            </span>
            <span className="mt-1 flex items-center gap-1 opacity-55">
              <span className="h-px w-2.5 bg-itinerary-text/45" />
              <SolidPlaneIcon className="size-2" />
              <span className="h-px w-2.5 bg-itinerary-text/45" />
            </span>
          </div>

          <span className="mt-2 text-[0.62rem] uppercase tracking-[0.24em] opacity-55">
            Sealed until opened
          </span>
        </div>

        <div className="space-y-2 pr-12 sm:pr-16">
          <div className="h-px w-full bg-itinerary-text/25" />
          <div className="h-px w-4/5 bg-itinerary-text/25" />
          <div className="h-px w-3/5 bg-itinerary-text/25" />
        </div>
      </div>
    </div>
  );
}

export function CardFaces({
  stop,
  seq,
  faceUp,
  size = "md",
  reduce = false,
  spin = false,
}: {
  stop: Stop;
  seq: number;
  faceUp: boolean;
  size?: "md" | "lg";
  reduce?: boolean;
  spin?: boolean;
}) {
  return (
    <div className="h-full w-full [perspective:1600px]">
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={spin ? { rotateY: 0 } : false}
        animate={{ rotateY: faceUp ? 180 : 0 }}
        transition={reduce ? { duration: 0.2 } : { duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(1px)]">
          <PostcardBack stop={stop} seq={seq} size={size} />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]">
          <TravelCardFront stop={stop} size={size} />
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Pegged Card (Reorderable item on clothesline)
// ============================================================================

export function PeggedCard({
  id,
  index,
  stop,
  seq,
  isActive,
  reduce,
  onOpen,
}: {
  id: string;
  index: number;
  stop: Stop;
  seq: number;
  isActive: boolean;
  reduce: boolean;
  onOpen: (id: string) => void;
}) {
  const tilt = HANG_TILTS[index % HANG_TILTS.length];
  const itemTransition = reduce ? { duration: 0.2 } : CARD_SPRING;
  const [dragging, setDragging] = React.useState(false);
  const isDraggingRef = React.useRef(false);
  const controls = useDragControls();

  if (isActive) {
    return (
      <Reorder.Item
        value={id}
        as="div"
        drag={false}
        layout
        transition={itemTransition}
        className="w-28 shrink-0 sm:w-32"
        style={{ aspectRatio: "0.65", visibility: "hidden" }}
      />
    );
  }

  return (
    <Reorder.Item
      data-pegged-card="true"
      value={id}
      as="div"
      layoutId={`stop-${id}`}
      transition={itemTransition}
      dragControls={controls}
      dragListener={false}
      whileDrag={{ scale: 1.06, zIndex: 50 }}
      onDragStart={() => {
        isDraggingRef.current = true;
        setDragging(true);
        playCardReorderSound();
      }}
      onDragEnd={() => {
        setDragging(false);
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 250);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") {
          controls.start(e);
        }
      }}
      onTap={() => {
        if (!isDraggingRef.current) {
          playPegReleaseSound();
          onOpen(id);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playPegReleaseSound();
          onOpen(id);
        }
      }}
      className={cn(
        "relative w-28 shrink-0 select-none rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-32 !opacity-100",
        dragging ? "cursor-grabbing" : "cursor-grab"
      )}
      style={{ aspectRatio: "0.65", touchAction: "pan-y", opacity: 1 }}
      role="button"
      tabIndex={0}
      aria-label={`View ${stop.place}. Drag peg to reorder.`}
    >
      <motion.div
        className="relative h-full w-full origin-top"
        animate={
          dragging
            ? { rotate: 0 }
            : reduce
              ? { rotate: tilt }
              : { rotate: [tilt - 1.2, tilt + 1.2, tilt - 1.2] }
        }
        transition={
          dragging || reduce
            ? { duration: 0.2 }
            : {
                duration: 4.2 + (index % 3) * 0.8,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95],
              }
        }
      >
        <div className="absolute inset-x-2 bottom-1 top-4 rounded-[1rem] bg-black/35 blur-md" />
        <div className="pointer-events-none relative h-full w-full">
          <CardFaces stop={stop} seq={seq} faceUp reduce={reduce} />
        </div>
        <div
          className="absolute -top-6 left-1/2 z-30 flex h-10 w-11 -translate-x-1/2 cursor-grab items-center justify-center active:cursor-grabbing"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            controls.start(e);
          }}
          aria-label="Drag peg to reorder"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { delay: 0.05, duration: 0.18, ease: [0.23, 1, 0.32, 1] }
            }
          >
            <ClothespinIcon className="h-7 w-5 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]" />
          </motion.div>
        </div>
      </motion.div>
    </Reorder.Item>
  );
}

// ============================================================================
// Airplane Boarding Ticket with Perforated Tear Physics
// ============================================================================

export const TICKET_CLIP_PATH =
  "M 0.038 0 H 0.696 A 0.024 0.058 0 0 0 0.744 0 H 0.962 A 0.038 0.092 0 0 1 1 0.092 V 0.908 A 0.038 0.092 0 0 1 0.962 1 H 0.744 A 0.024 0.058 0 0 0 0.696 1 H 0.038 A 0.038 0.092 0 0 1 0 0.908 V 0.092 A 0.038 0.092 0 0 1 0.038 0 Z";

export const TORN_LEFT_PATH =
  "M 0.053 0 H 0.967 A 0.033 0.058 0 0 0 1 0.058 L 0.988 0.086 L 1 0.114 L 0.988 0.141 L 1 0.169 L 0.988 0.197 L 1 0.225 L 0.988 0.252 L 1 0.280 L 0.988 0.308 L 1 0.336 L 0.988 0.363 L 1 0.391 L 0.988 0.419 L 1 0.447 L 0.988 0.474 L 1 0.502 L 0.988 0.530 L 1 0.558 L 0.988 0.585 L 1 0.613 L 0.988 0.641 L 1 0.669 L 0.988 0.696 L 1 0.724 L 0.988 0.752 L 1 0.780 L 0.988 0.807 L 1 0.835 L 0.988 0.863 L 1 0.891 L 0.988 0.918 L 1 0.942 A 0.033 0.058 0 0 0 0.967 1 H 0.053 A 0.053 0.092 0 0 1 0 0.908 V 0.092 A 0.053 0.092 0 0 1 0.053 0 Z";

export const TORN_RIGHT_PATH =
  "M 0 0.058 A 0.086 0.058 0 0 0 0.086 0 H 0.863 A 0.137 0.092 0 0 1 1 0.092 V 0.908 A 0.137 0.092 0 0 1 0.863 1 H 0.086 A 0.086 0.058 0 0 0 0 0.942 L 0.026 0.918 L 0 0.891 L 0.026 0.863 L 0 0.835 L 0.026 0.807 L 0 0.780 L 0.026 0.752 L 0 0.724 L 0.026 0.696 L 0 0.669 L 0.026 0.641 L 0 0.613 L 0.026 0.585 L 0 0.558 L 0.026 0.530 L 0 0.502 L 0.026 0.474 L 0 0.447 L 0.026 0.419 L 0 0.391 L 0.026 0.363 L 0 0.336 L 0.026 0.308 L 0 0.280 L 0.026 0.252 L 0 0.225 L 0.026 0.197 L 0 0.169 L 0.026 0.141 L 0 0.114 L 0.026 0.086 L 0 0.058 Z";

export const BARCODE_STRIPES = [
  3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1,
];

export function AirplaneTicketCard({
  reduce = false,
  onTear,
}: {
  reduce?: boolean;
  onTear?: () => void;
}) {
  const rawId = React.useId();
  const cleanId = rawId.replace(/:/g, "");
  const clipId = `ticket-clip-${cleanId}`;
  const leftClipId = `torn-left-clip-${cleanId}`;
  const rightClipId = `torn-right-clip-${cleanId}`;
  const [tearing, setTearing] = React.useState(false);

  const handleTear = React.useCallback(() => {
    if (tearing) return;
    playTicketTearSound();
    setTearing(true);
  }, [tearing]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative h-full w-full select-none"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={TICKET_CLIP_PATH} />
          </clipPath>
          <clipPath id={leftClipId} clipPathUnits="objectBoundingBox">
            <path d={TORN_LEFT_PATH} />
          </clipPath>
          <clipPath id={rightClipId} clipPathUnits="objectBoundingBox">
            <path d={TORN_RIGHT_PATH} />
          </clipPath>
        </defs>
      </svg>

      {!tearing && (
        <div
          className="group relative h-full w-full cursor-pointer [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.08))_drop-shadow(0_4px_10px_rgba(0,0,0,0.04))]"
          onClick={handleTear}
          role="button"
          tabIndex={0}
          aria-label="Tear ticket to replay itinerary"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTear();
            }
          }}
        >
          <div
            className="relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none"
            style={{ clipPath: `url(#${clipId})` }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
              style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
            />

            <div className="relative flex h-full w-[72%] flex-col justify-between p-3.5 sm:p-5">
              <div className="flex items-center gap-2">
                <SolidPlaneIcon className="size-3 text-ticket-foreground opacity-80" />
                <span className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                  Meridian · Boarding Pass
                </span>
              </div>

              <div className="my-auto flex items-center justify-between gap-3 py-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-ticket-foreground leading-none">
                    Bon voyage
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-ticket-muted">Your route is set.</p>
                </div>
                <div
                  className="relative flex size-12 sm:size-14 flex-col items-center justify-center rounded-full border border-dashed border-ticket-stamp/70 p-1"
                  style={{ transform: "rotate(-6deg)" }}
                >
                  <div className="flex size-full flex-col items-center justify-center rounded-full border border-ticket-stamp/60 px-1 text-center bg-ticket-stamp/[0.04]">
                    <span className="text-[0.4rem] font-black uppercase tracking-[0.14em] leading-none opacity-90 text-ticket-stamp">
                      Meridian
                    </span>
                    <div className="my-0.5 flex items-center gap-1">
                      <span className="h-px w-1.5 bg-ticket-stamp/40" />
                      <SolidPlaneIcon className="size-2 text-ticket-stamp" />
                      <span className="h-px w-1.5 bg-ticket-stamp/40" />
                    </div>
                    <span className="text-[0.44rem] font-black uppercase tracking-[0.12em] leading-none text-ticket-stamp">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70">
                5 Stops Confirmed
              </p>
            </div>

            <div className="relative flex h-full flex-col justify-center" aria-hidden="true">
              <div className="h-[75%] border-r border-dashed border-ticket-perforation" />
            </div>

            <div className="relative flex h-full w-[28%] flex-col items-center justify-between bg-ticket-stub/40 p-2.5 sm:p-3 text-center transition-colors group-hover:bg-ticket-stub/60">
              <Badge
                variant="outline"
                className="h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1 text-[0.44rem] font-bold uppercase tracking-wider text-ticket-muted transition-colors group-hover:border-ticket-muted"
              >
                Gate 01
              </Badge>

              <div className="my-auto flex flex-col items-center gap-1">
                <div className="flex h-5 items-stretch justify-center gap-[1.5px] opacity-85 sm:h-6" aria-hidden="true">
                  {BARCODE_STRIPES.map((w, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${w}px` }}
                      className="shrink-0 rounded-[0.2px] bg-ticket-foreground"
                    />
                  ))}
                </div>
                <p className="text-[0.4rem] font-medium uppercase tracking-[0.16em] text-ticket-muted">
                  MDR · 2026
                </p>
              </div>

              <div className="flex items-center justify-center rounded px-2 py-0.5 transition-transform group-hover:scale-[1.03] group-hover:bg-ticket-foreground/10">
                <span className="text-[0.5rem] font-black uppercase tracking-[0.2em] text-ticket-muted transition-colors group-hover:text-ticket-foreground">
                  ✂ Replay
                </span>
              </div>
            </div>

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
              <path d={TICKET_CLIP_PATH} fill="none" stroke="var(--ticket-border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      )}

      {tearing && (
        <div className="relative h-full w-full">
          <motion.div
            key="torn-left"
            className="absolute left-0 top-0 bottom-0 w-[72%] origin-bottom-left [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.12))]"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: reduce ? -8 : -38,
              y: reduce ? 10 : 72,
              rotate: reduce ? 0 : -6,
            }}
            transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none"
              style={{ clipPath: `url(#${leftClipId})` }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
                style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
              />
              <div className="relative flex h-full w-full flex-col justify-between p-3.5 sm:p-5">
                <div className="flex items-center gap-2">
                  <SolidPlaneIcon className="size-3 text-ticket-foreground opacity-80" />
                  <span className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                    Meridian · Boarding Pass
                  </span>
                </div>
                <div className="my-auto flex items-center justify-between gap-3 py-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black leading-none tracking-tight text-ticket-foreground">
                      Bon voyage
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-ticket-muted">Your route is set.</p>
                  </div>
                </div>
                <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70">
                  5 Stops Confirmed
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            key="torn-right"
            className="absolute left-[72%] top-0 bottom-0 w-[28%] origin-top-left [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.12))]"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: reduce ? 8 : 56,
              y: reduce ? 10 : 96,
              rotate: reduce ? 0 : 20,
            }}
            transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={() => {
              setTearing(false);
              onTear?.();
            }}
          >
            <div
              className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-ticket-stub/50 p-2.5 sm:p-3 text-center text-ticket-foreground select-none"
              style={{ clipPath: `url(#${rightClipId})` }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
                style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
              />
              <Badge
                variant="outline"
                className="h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1 text-[0.44rem] font-bold uppercase tracking-wider text-ticket-muted"
              >
                Gate 01
              </Badge>
              <span className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                ✂ Replay
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// Hanging Clothesline Rope
// ============================================================================

export function HangingRope({
  top,
  className,
  reduce = false,
}: {
  top?: number | string;
  className?: string;
  reduce?: boolean;
}) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-x-5 sm:inset-x-8", className)}
      style={top !== undefined ? { top: typeof top === "number" ? `${top}px` : top } : undefined}
      animate={reduce ? undefined : { y: [0, 1.2, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 5.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }
      }
      aria-hidden="true"
    >
      <span className="absolute -left-1.5 -top-1 size-3 rounded-full bg-itinerary-pin shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
      <span className="absolute -right-1.5 -top-1 size-3 rounded-full bg-itinerary-pin shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
      <svg className="h-6 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
        <path
          d="M0,2 Q50,10 100,2"
          fill="none"
          className="stroke-itinerary-rope"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,2 Q50,10 100,2"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </motion.div>
  );
}

// ============================================================================
// Main Export: ItineraryCarousel
// ============================================================================

export function ItineraryCarousel({
  className,
  soundEnabled = true,
  showHeader = true,
  stops = DEFAULT_STOPS,
}: ItineraryCarouselProps) {
  const reduce = useReducedMotion();
  const [muted, setMuted] = React.useState(!soundEnabled);
  const [active, setActive] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<string[]>([]);
  const boardScrollRef = React.useRef<HTMLDivElement>(null);
  const prevOrderLength = React.useRef(order.length);

  React.useEffect(() => {
    setItineraryMuted(muted);
  }, [muted]);

  const toggleMute = React.useCallback(() => {
    warmUpItineraryAudio();
    setMuted((prev) => {
      const next = !prev;
      setItineraryMuted(next);
      if (!next) {
        playButtonClickSound();
      }
      return next;
    });
  }, []);

  const revealed = React.useMemo(() => new Set(order), [order]);
  const activeStop = active ? stops.find((s) => s.id === active) ?? null : null;
  const alreadyRevealed = active ? revealed.has(active) : false;

  const deck = stops.filter((s) => !revealed.has(s.id) && s.id !== active);
  const topStop = deck[0];
  const allRevealed = order.length === stops.length;

  const seqOf = React.useCallback(
    (id: string) => stops.findIndex((s) => s.id === id) + 1,
    [stops]
  );

  const open = React.useCallback(
    (id: string) => {
      if (!revealed.has(id)) {
        playCardFlipSound();
      }
      setActive(id);
    },
    [revealed]
  );

  const hang = React.useCallback(() => {
    if (!active) return;
    const id = active;
    playPegSnapSound();
    setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActive(null);
  }, [active]);

  const reset = React.useCallback(() => {
    playDeckResetSound();
    setActive(null);
    setOrder([]);
  }, []);

  // Auto-flip & auto-hang newly revealed cards
  React.useEffect(() => {
    if (!active || alreadyRevealed) return;
    const flip = reduce ? 180 : 420;
    const t = window.setTimeout(hang, flip);
    return () => window.clearTimeout(t);
  }, [active, alreadyRevealed, reduce, hang]);

  // Escape key to close inspection
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hang();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, hang]);

  // Audio arrival cue when all cards revealed
  const prevAllRevealed = React.useRef(allRevealed);
  React.useEffect(() => {
    if (allRevealed && !prevAllRevealed.current) {
      const timer = setTimeout(() => {
        playTicketArrivalSound();
      }, 350);
      return () => clearTimeout(timer);
    }
    prevAllRevealed.current = allRevealed;
  }, [allRevealed]);

  // Auto-scroll board to newest hung card
  React.useEffect(() => {
    if (order.length > prevOrderLength.current) {
      const container = boardScrollRef.current;
      if (container) {
        const timer = setTimeout(() => {
          const cards = container.querySelectorAll("[data-pegged-card='true']");
          const lastCard = cards[cards.length - 1] as HTMLElement | undefined;
          if (lastCard && container.scrollWidth > container.clientWidth) {
            lastCard.scrollIntoView({
              behavior: reduce ? "auto" : "smooth",
              inline: "center",
              block: "nearest",
            });
          }
        }, 180);
        return () => clearTimeout(timer);
      }
    }
    prevOrderLength.current = order.length;
  }, [order.length, reduce]);

  const handleDeckDragEnd = (_e: unknown, info: PanInfo) => {
    if (!topStop) return;
    const { x, y } = info.offset;
    const { x: vx, y: vy } = info.velocity;
    const passed =
      Math.abs(x) > SWIPE_DISTANCE ||
      Math.abs(y) > SWIPE_DISTANCE ||
      Math.abs(vx) > SWIPE_VELOCITY ||
      Math.abs(vy) > SWIPE_VELOCITY;
    if (passed) open(topStop.id);
  };

  return (
    <div
      className={cn(
        "relative isolate size-full w-full h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none text-neutral-900",
        className
      )}
      style={{
        backgroundColor: "var(--itinerary-bg, #ece5d7)",
        backgroundImage:
          "radial-gradient(120% 90% at 15% 0%, var(--itinerary-bg-gradient-start, #f3ede0) 0%, var(--itinerary-bg-gradient-mid, #e7ddca) 55%, var(--itinerary-bg-gradient-end, #ddd0b6) 100%)",
      }}
    >
      {/* Wall textures */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: WALL_STAIN_URI, backgroundSize: "900px 900px" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: WALL_MOTTLE_URI, backgroundSize: "460px 460px" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{ backgroundImage: WALL_GRAIN_URI, backgroundSize: "160px 160px" }}
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_50px_rgba(90,70,45,0.15)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_110%_at_18%_-12%,rgba(255,252,244,0.7),transparent_58%)]" />

      {/* Desk Edge Mementos */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <div className="absolute left-6 top-8 hidden 2xl:block">
          <LuggageTag code="MDR" tone="var(--itinerary-stop-marrakech, #e0a43b)" rotate={-8} />
        </div>
        <div className="absolute right-28 top-8 hidden 2xl:block">
          <CompassDoodle className="h-12 w-12 opacity-70" rotate={9} />
        </div>
      </div>

      {/* Sound Toggle Button (safely offset from top-right island) */}
      <div className="absolute right-16 top-4 z-30 sm:right-28 sm:top-5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleMute}
          aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
          className="h-7.5 sm:h-8 gap-1.5 rounded-full border-neutral-300/80 bg-white/85 px-2.5 sm:px-3 text-[11px] sm:text-xs font-medium text-neutral-700 shadow-xs backdrop-blur-md transition-all hover:bg-white hover:text-neutral-900 active:scale-95 cursor-pointer"
        >
          {muted ? (
            <>
              <VolumeX className="size-3.5 text-neutral-500" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="size-3.5 text-neutral-800" />
              <span>Sound On</span>
            </>
          )}
        </Button>
      </div>

      {/* Safe Scroll & Centering Content Stage */}
      <div className="relative z-10 flex min-h-full w-full flex-col items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8">
        <div className="my-auto flex w-full max-w-4xl flex-col items-center">
          {/* Header */}
          {showHeader && (
            <header className="mb-3 sm:mb-5 flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block size-1.5 rotate-45 bg-itinerary-accent shadow-xs" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                  The Itinerary
                </span>
              </div>
              <h2 className="mt-1.5 text-balance text-2xl font-black leading-[1.08] tracking-[-0.035em] text-neutral-900 sm:text-3xl lg:text-4xl">
                Places you&rsquo;ll go,{" "}
                <span className="text-neutral-900/45">with us.</span>
              </h2>
              <p className="mt-1 max-w-md text-balance text-xs sm:text-sm font-normal leading-relaxed text-neutral-600">
                Curated journeys and private access across the globe.
              </p>
            </header>
          )}

          {/* Board Stage: Wooden Frame & Cork */}
          <div className="w-full">
            <div
              className="relative rounded-[1.6rem] p-3 shadow-[0_20px_45px_-20px_rgba(60,40,15,0.55)] sm:p-4"
              style={{
                backgroundImage:
                  "linear-gradient(158deg, var(--itinerary-frame-start, #9a6a3a) 0%, var(--itinerary-frame-mid, #734c26) 46%, var(--itinerary-frame-end, #5a3c20) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-50 mix-blend-overlay"
                style={{ backgroundImage: WOOD_URI, backgroundSize: "260px 140px" }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] shadow-[inset_0_2px_3px_rgba(255,255,255,0.28),inset_0_-4px_8px_rgba(0,0,0,0.4)]" />

              {/* Mementos on frame */}
              <div className="pointer-events-none absolute inset-0 z-20 select-none" aria-hidden="true">
                <div className="absolute -top-2 left-6 hidden sm:block">
                  <DeskBoardingStub from="LHR" to="KIX" rotate={-6} />
                  <WashiTape rotate={-18} className="absolute -left-2 top-1 w-11" tone="rgba(240,235,222,0.8)" />
                </div>
                <div className="absolute right-8 top-0 hidden gap-1.5 sm:flex">
                  <DeskStamp code="PAR" hue="#e0a43b" rotate={5} />
                  <DeskStamp code="TYO" hue="#e5647a" rotate={-7} className="mt-1.5" />
                </div>
              </div>

              {/* Inner Corkboard */}
              <div
                className="relative rounded-[1.1rem] shadow-[inset_0_2px_22px_rgba(60,38,15,0.4)] ring-1 ring-black/25"
                style={{ backgroundColor: "var(--itinerary-cork, #c9a56e)" }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.1rem]" aria-hidden="true">
                  <div
                    className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
                    style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
                    style={{ backgroundImage: CORK_BLOTCH_URI, backgroundSize: "220px 220px" }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,240,210,0.3),transparent_55%)]" />
                  <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(70,45,20,0.45)]" />

                  <div className="absolute bottom-3 right-4 hidden lg:block">
                    <StickyNote color="#fce98a" ink="#7a5c12" rotate={-5}>
                      wish you
                      <br />
                      were here
                    </StickyNote>
                    <PushPin color="#d64a4a" className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.35)]" />
                  </div>
                </div>

                {/* Clothesline Stage with Pegs */}
                <div className="relative min-h-[14rem] sm:min-h-[15.5rem] px-3 pb-5 pt-9 sm:px-6 sm:pt-11">
                  <HangingRope className="top-6 sm:top-7" reduce={!!reduce} />

                  {order.length === 0 ? (
                    <p className="pt-12 text-center text-xs sm:text-sm font-medium text-itinerary-text/80">
                      The line is empty. Reveal a card below to peg your first stop.
                    </p>
                  ) : (
                    <>
                      <div
                        ref={boardScrollRef}
                        className="relative w-full -mt-5 -mb-3 overflow-x-auto overflow-y-hidden pb-3 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-0 sm:mt-0 sm:overflow-visible sm:pb-0 sm:pt-0"
                      >
                        <Reorder.Group
                          axis="x"
                          values={order}
                          onReorder={setOrder}
                          as="div"
                          className={cn(
                            "relative flex flex-nowrap items-start gap-x-3 px-2 pt-1 min-w-max sm:min-w-0 sm:justify-center sm:gap-x-6 sm:px-0",
                            order.length <= 2 ? "justify-center" : "justify-start sm:justify-center"
                          )}
                        >
                          {order.map((id, i) => (
                            <PeggedCard
                              key={id}
                              id={id}
                              index={i}
                              stop={stops.find((s) => s.id === id)!}
                              seq={seqOf(id)}
                              isActive={id === active}
                              reduce={!!reduce}
                              onOpen={open}
                            />
                          ))}
                        </Reorder.Group>
                      </div>
                      {order.length > 1 && (
                        <p className="mt-2 text-center text-[10px] sm:text-[11px] font-medium text-itinerary-text/75 sm:hidden">
                          Drag peg to reorder stops &bull; Tap to inspect
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Draw Pile (Card Stack) or Airplane Ticket */}
          <div className="relative z-20 mt-5 sm:mt-7 flex flex-col items-center gap-3">
            {allRevealed ? (
              <div className="relative z-20 aspect-[2.4/1] w-64 sm:w-76">
                <AirplaneTicketCard reduce={!!reduce} onTear={reset} />
              </div>
            ) : (
              <div className="relative z-20 aspect-[0.72] w-32 sm:w-36">
                {deck
                  .map((stop, i) => ({ stop, i }))
                  .reverse()
                  .map(({ stop, i }) => {
                    const isTop = i === 0;
                    const depth = i;
                    return (
                      <motion.div
                        key={stop.id}
                        layoutId={`stop-${stop.id}`}
                        transition={reduce ? { duration: 0.2 } : CARD_SPRING}
                        className={cn(
                          "absolute inset-0 !opacity-100",
                          isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                        )}
                        style={{
                          zIndex: isTop ? 50 : 40 - depth,
                          touchAction: isTop ? "none" : undefined,
                          opacity: 1,
                        }}
                        drag={isTop ? true : false}
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.5}
                        dragMomentum={false}
                        onDragEnd={isTop ? handleDeckDragEnd : undefined}
                        onTap={isTop ? () => open(stop.id) : undefined}
                        whileDrag={{ scale: 1.05, zIndex: 60 }}
                        aria-hidden={!isTop}
                      >
                        <motion.div
                          className="h-full w-full"
                          animate={{
                            y: reduce ? 0 : depth * 7,
                            x: reduce ? 0 : depth * 4,
                            rotate: reduce ? 0 : depth * 2,
                            scale: 1 - depth * 0.045,
                          }}
                          transition={reduce ? { duration: 0.2 } : CARD_SPRING}
                        >
                          <CardFaces stop={stop} seq={seqOf(stop.id)} faceUp={false} reduce={!!reduce} />
                        </motion.div>
                      </motion.div>
                    );
                  })}
              </div>
            )}

            {!allRevealed ? (
              <p className="text-center text-[11px] sm:text-xs font-medium tracking-wide text-neutral-600">
                Swipe or tap the top card to draw
              </p>
            ) : (
              <p className="text-center text-[11px] sm:text-xs font-medium tracking-wide text-neutral-600">
                Tap anywhere on the ticket to tear &amp; replay
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scrim Backdrop */}
      <AnimatePresence>
        {activeStop && (
          <motion.div
            key="scrim"
            role="button"
            tabIndex={0}
            aria-label="Hang card to the line"
            onClick={hang}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
                e.preventDefault();
                hang();
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.25 }}
            className={cn(
              "fixed inset-0 z-60",
              alreadyRevealed
                ? "cursor-pointer bg-black/65 backdrop-blur-[2px]"
                : "pointer-events-none bg-black/35"
            )}
          />
        )}
      </AnimatePresence>

      {/* Spotlight Inspection Card */}
      <AnimatePresence>
        {activeStop && (
          <motion.div
            key={`spotlight-container-${activeStop.id}`}
            className="pointer-events-none fixed inset-0 z-70 flex items-center justify-center p-5"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              layoutId={`stop-${activeStop.id}`}
              transition={reduce ? { duration: 0.2 } : CARD_SPRING}
              className="pointer-events-auto relative z-70 w-full max-w-[19rem] sm:max-w-[22rem] !opacity-100"
              style={{
                aspectRatio: "0.70",
                filter: reduce ? undefined : "drop-shadow(0 24px 45px rgba(0,0,0,0.3))",
                opacity: 1,
              }}
            >
              <CardFaces
                stop={activeStop}
                seq={seqOf(activeStop.id)}
                faceUp
                spin={!alreadyRevealed}
                size="lg"
                reduce={!!reduce}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ItineraryCarousel;
