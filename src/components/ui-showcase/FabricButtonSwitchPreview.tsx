"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"

// ============================================================================
// ============================================================================
// AUDIO HAPTIC SYNTHESIS: Authentic Denim Jeans Button Fastening & Fabric Snap
// Physically modeled acoustic layers via Web Audio API:
// 1. Denim Fabric Weave Friction: Shaped noise burst swept through bandpass filter
// 2. Heavy Metal Shank Button: Inharmonic metallic ping (antique bronze / pewter)
// 3. Buttonhole Cavity Catch: Low-frequency mechanical pop / thud into eyelet
// 4. Rivet Edge Transient: Micro-second click as metal clears stitched rim
// ============================================================================

let sharedAudioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  if (!AudioCtx) return null
  if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
    sharedAudioCtx = new AudioCtx()
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {})
  }
  return sharedAudioCtx
}

function playTactileClack(isDark: boolean) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Physical metallic fundamental frequency
    // Light Mode (Antique Bronze Sun): Shimmering golden bronze coin / bell chime (~2380Hz)
    // Dark Mode (Antique Pewter Star): Heavy, solid cast pewter / rivet snap (~1650Hz)
    const baseFund = isDark ? 1650 : 2380

    // ------------------------------------------------------------------------
    // 1. METALLIC FM STRIKE (Instant crisp metal-on-metal clink)
    // Frequency modulation produces the dense inharmonic sidebands of solid metal
    // ------------------------------------------------------------------------
    const carrier = ctx.createOscillator()
    const modulator = ctx.createOscillator()
    const modGain = ctx.createGain()
    const carrierGain = ctx.createGain()

    carrier.type = "sine"
    carrier.frequency.setValueAtTime(baseFund, now)
    carrier.frequency.exponentialRampToValueAtTime(baseFund * 0.88, now + 0.05)

    // Modulator at non-integer inharmonic ratio (1.58x) for genuine metallic timbre
    modulator.type = "sine"
    modulator.frequency.setValueAtTime(baseFund * 1.58, now)
    modulator.frequency.exponentialRampToValueAtTime(baseFund * 1.42, now + 0.04)

    // FM index: sharp metallic attack dropping within 35ms
    modGain.gain.setValueAtTime(baseFund * 1.85, now)
    modGain.gain.exponentialRampToValueAtTime(1, now + 0.035)

    modulator.connect(modGain)
    modGain.connect(carrier.frequency)

    carrierGain.gain.setValueAtTime(isDark ? 0.36 : 0.32, now)
    carrierGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065)

    carrier.connect(carrierGain)
    carrierGain.connect(ctx.destination)

    modulator.start(now)
    carrier.start(now)
    modulator.stop(now + 0.07)
    carrier.stop(now + 0.07)

    // ------------------------------------------------------------------------
    // 2. METALLIC RING MODES (Acoustic resonance of circular metal medallion)
    // Mode 1: ~2.29x base (chime overtone), Mode 2: ~3.65x base (upper metallic sheen)
    // ------------------------------------------------------------------------
    const ring1 = ctx.createOscillator()
    const ringGain1 = ctx.createGain()
    ring1.type = "sine"
    ring1.frequency.setValueAtTime(baseFund * 2.29, now)
    ring1.frequency.exponentialRampToValueAtTime(baseFund * 2.15, now + 0.07)

    ringGain1.gain.setValueAtTime(isDark ? 0.20 : 0.24, now)
    ringGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.075)

    ring1.connect(ringGain1)
    ringGain1.connect(ctx.destination)
    ring1.start(now)
    ring1.stop(now + 0.08)

    const ring2 = ctx.createOscillator()
    const ringGain2 = ctx.createGain()
    ring2.type = "sine"
    ring2.frequency.setValueAtTime(baseFund * 3.65, now)
    ring2.frequency.exponentialRampToValueAtTime(baseFund * 3.4, now + 0.04)

    ringGain2.gain.setValueAtTime(isDark ? 0.14 : 0.18, now)
    ringGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.045)

    ring2.connect(ringGain2)
    ringGain2.connect(ctx.destination)
    ring2.start(now)
    ring2.stop(now + 0.05)

    // ------------------------------------------------------------------------
    // 3. HARD RIVET IMPACT TRANSIENT (Razor-sharp metal bite at t=0)
    // ------------------------------------------------------------------------
    const snapOsc = ctx.createOscillator()
    const snapGain = ctx.createGain()
    snapOsc.type = "triangle"
    snapOsc.frequency.setValueAtTime(isDark ? 3800 : 4900, now)
    snapOsc.frequency.exponentialRampToValueAtTime(1100, now + 0.012)

    snapGain.gain.setValueAtTime(0.26, now)
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014)

    snapOsc.connect(snapGain)
    snapGain.connect(ctx.destination)
    snapOsc.start(now)
    snapOsc.stop(now + 0.016)

    // ------------------------------------------------------------------------
    // 4. SOLID CAST METAL WEIGHT (Punchy low-register body)
    // ------------------------------------------------------------------------
    const punchOsc = ctx.createOscillator()
    const punchGain = ctx.createGain()
    punchOsc.type = "sine"
    const pStart = isDark ? 280 : 360
    const pEnd = isDark ? 110 : 150
    punchOsc.frequency.setValueAtTime(pStart, now)
    punchOsc.frequency.exponentialRampToValueAtTime(pEnd, now + 0.028)

    punchGain.gain.setValueAtTime(isDark ? 0.22 : 0.18, now)
    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.032)

    punchOsc.connect(punchGain)
    punchGain.connect(ctx.destination)
    punchOsc.start(now)
    punchOsc.stop(now + 0.035)
  } catch {
    // Graceful fallback
  }
}

// ============================================================================
// EMBOSSED METAL DESKTOP BUTTONS (Ref: User Desktop PNGs)
// - Light Mode: Antique Bronze Radiant Sun Medallion Button
// - Dark Mode: Antique Silver / Pewter Compass Star Medallion Button
// ============================================================================

interface DesktopButtonProps {
  mode: "light" | "dark"
  className?: string
  hasShadow?: boolean
}

export function DesktopButton({ mode, className, hasShadow = true }: DesktopButtonProps) {
  const isLight = mode === "light"
  const [hasError, setHasError] = React.useState(false)
  const src = isLight
    ? "/textures/button-sun-opt.png"
    : "/textures/button-star-opt.png"
  const alt = isLight
    ? "Embossed Antique Bronze Sun Button"
    : "Embossed Antique Pewter Star Button"

  return (
    <div
      className={cn(
        "size-full w-full h-full select-none pointer-events-none relative flex items-center justify-center rounded-full overflow-hidden",
        className
      )}
      style={{
        filter: hasShadow
          ? "drop-shadow(0 10px 16px rgba(0, 0, 0, 0.75)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.55))"
          : undefined,
      }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={70}
          height={70}
          onError={() => setHasError(true)}
          className="size-full w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />
      ) : (
        <div
          className="size-full rounded-full flex items-center justify-center border-2"
          style={{
            background: isLight
              ? "radial-gradient(circle at 35% 30%, #D49B5A 0%, #A46C32 50%, #6E431B 100%)"
              : "radial-gradient(circle at 35% 30%, #BAC4D0 0%, #707A86 50%, #3B424C 100%)",
            borderColor: isLight ? "#F59E0B" : "#94A3B8",
            boxShadow: isLight
              ? "inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.6)"
              : "inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -3px 6px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full border border-black/30 flex items-center justify-center"
            style={{
              background: isLight ? "#8A5420" : "#4F5762",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: isLight ? "#FDE68A" : "#E2E8F0",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// CORE SWITCH: FabricButtonSwitch
// In accordance with media_1789210391812.png:
// - Outer: Seamlessly flush with background denim ("nothing outside", no outer shadow)
// - Border: Golden running-stitch seam encircling 5.5px outside the cutout
// - Inner Edge: Deep dark inset shadow dropping into the cavity ("shadow inside")
// - Inside: Denim track texture that adapts to light/dark mode ("like it was before")
// ============================================================================

export interface FabricButtonSwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  soundEnabled?: boolean
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

const SWITCH_LAYOUT = {
  // Total container size
  containerWidth: 196,
  containerHeight: 92,

  // Water-drop teardrop cavity bounds (Point at left, bulge at right)
  cutoutWidth: 153,
  cutoutHeight: 38,

  // Button thumb (70px, elevated to z-30 above the opening & threads)
  buttonSize: 70,
  buttonTop: 11,
  buttonLeft: 9,
  travelDistance: 108,
}

export function FabricButtonSwitch({
  checked: controlledChecked,
  defaultChecked = true,
  onCheckedChange,
  soundEnabled = true,
  disabled = false,
  className,
  ariaLabel = "Toggle dark mode and light mode",
}: FabricButtonSwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    React.useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const isDark = isControlled ? controlledChecked : uncontrolledChecked

  const cfg = SWITCH_LAYOUT

  // Preload button images for instant smooth transitions
  React.useEffect(() => {
    const img1 = new Image()
    img1.src = "/textures/button-sun-opt.png"
    const img2 = new Image()
    img2.src = "/textures/button-star-opt.png"
  }, [])

  const handleToggle = () => {
    if (disabled) return
    const nextState = !isDark
    if (!isControlled) {
      setUncontrolledChecked(nextState)
    }
    if (soundEnabled) {
      playTactileClack(nextState)
    }
    onCheckedChange?.(nextState)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <Button
      variant="unstyled"
      size="none"
      role="switch"
      aria-checked={isDark}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={cn(
        "relative inline-flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer transition-transform duration-150 active:scale-[0.98] p-0 border-0 bg-transparent shrink-0",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      style={{
        width: `${cfg.containerWidth}px`,
        height: `${cfg.containerHeight}px`,
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* LAYER 1: JEANS WATER-DROP TEARDROP CUTOUT CAVITY (z-10)            */}
      {/* Round circular eyelet on left, smoothly tapering to narrow tip     */}
      {/* (Directly matching Derek Lam jeans reference media_1789214451983)  */}
      {/* ------------------------------------------------------------------ */}
      <svg
        viewBox="0 0 196 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none z-10 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          {/* Water-drop teardrop shape clip path (Decreased height, sleek keyhole) */}
          <clipPath id="jeans-waterdrop-clip">
            <path d="M 25.4 40.0 L 150.0 27.1 A 19 19 0 1 1 150.0 64.9 L 25.4 52.0 A 6 6 0 0 1 25.4 40.0 Z" />
          </clipPath>

          {/* Deep Overhead Cast Shadow inside cavity */}
          <linearGradient id="waterdrop-top-shadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity={isDark ? "0.6" : "0.55"} />
            <stop offset="50%" stopColor="#000000" stopOpacity={isDark ? "0.2" : "0.15"} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Clipped Cavity Group */}
        <g clipPath="url(#jeans-waterdrop-clip)">
          {/* Base cavity color */}
          <rect
            width="196"
            height="92"
            fill={isDark ? "#121D2D" : "#385676"}
          />

          {/* Light Denim Photo Texture Layer */}
          <image
            href="/textures/denim-light.jpg"
            width="196"
            height="92"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: isDark ? 0 : 1,
              transition: "opacity 0.45s ease",
            }}
          />

          {/* Dark Denim Photo Texture Layer */}
          <image
            href="/textures/denim-dark.jpg"
            width="196"
            height="92"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: isDark ? 1 : 0,
              filter: "brightness(1.22) contrast(1.15) saturate(1.1)",
              transition: "opacity 0.45s ease",
            }}
          />

          {/* Deep Overhead Cast Shadow inside cavity */}
          <rect
            x="0"
            y="25"
            width="196"
            height="18"
            fill="url(#waterdrop-top-shadow)"
          />

          {/* Bottom subtle light shelf */}
          <rect
            x="0"
            y="49"
            width="196"
            height="17"
            fill="url(#waterdrop-top-shadow)"
            transform="rotate(180 98 57.5)"
            opacity="0.3"
          />
        </g>

      </svg>

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 2: GOLDEN THREAD RUNNING STITCH SEAMS (z-20)                 */}
      {/* Inner seam along the cutout rim + Concentric outer seam            */}
      {/* ------------------------------------------------------------------ */}
      <svg
        viewBox="0 0 196 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none overflow-visible z-20"
        aria-hidden="true"
      >
        <defs>
          <filter id="stitch-thread-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ================================================================ */}
        {/* INNER SEAM: Thread stitching right along the cutout border       */}
        {/* ================================================================ */}
        {/* Inner Seam Thick Jeans Thread (White in white mode, Amber in dark mode) */}
        <path
          d="M 19.7 41.5 L 151.2 33.0 A 13 13 0 1 1 151.2 59.0 L 19.7 50.5 A 4.5 4.5 0 0 1 19.7 41.5 Z"
          stroke={isDark ? "#F59E0B" : "#FFFFFF"}
          strokeWidth="2.3"
          strokeDasharray="4.6 3.4"
          strokeLinecap="round"
          filter="url(#stitch-thread-shadow)"
          className="transition-colors duration-300"
        />

        {/* Inner Seam Thread Spine Highlight */}
        <path
          d="M 19.7 41.5 L 151.2 33.0 A 13 13 0 1 1 151.2 59.0 L 19.7 50.5 A 4.5 4.5 0 0 1 19.7 41.5 Z"
          stroke={isDark ? "#FEF08A" : "#FFFFFF"}
          strokeWidth="0.8"
          strokeDasharray="3.6 4.4"
          strokeLinecap="round"
          strokeOpacity={isDark ? 0.85 : 0.6}
          className="transition-colors duration-300"
        />

        {/* ================================================================ */}
        {/* OUTER SEAM: Tight 3.2px twin-stitch offset encircling teardrop   */}
        {/* ================================================================ */}
        {/* Outer Seam Thick Jeans Thread (White in white mode, Amber in dark mode) */}
        <path
          d="M 19.5 38.3 L 151.0 29.8 A 16.2 16.2 0 1 1 151.0 62.2 L 19.5 53.7 A 7.7 7.7 0 0 1 19.5 38.3 Z"
          stroke={isDark ? "#F59E0B" : "#FFFFFF"}
          strokeWidth="2.3"
          strokeDasharray="4.8 3.4"
          strokeLinecap="round"
          filter="url(#stitch-thread-shadow)"
          className="transition-colors duration-300"
        />

        {/* Outer Seam Thread Spine Highlight */}
        <path
          d="M 19.5 38.3 L 151.0 29.8 A 16.2 16.2 0 1 1 151.0 62.2 L 19.5 53.7 A 7.7 7.7 0 0 1 19.5 38.3 Z"
          stroke={isDark ? "#FEF08A" : "#FFFFFF"}
          strokeWidth="0.8"
          strokeDasharray="3.8 4.4"
          strokeLinecap="round"
          strokeOpacity={isDark ? 0.85 : 0.6}
          className="transition-colors duration-300"
        />
      </svg>

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 3: PHYSICAL METAL BUTTON SLIDER THUMB (z-30 ABOVE OPENING)   */}
      {/* 70px medallion button sits over the water-drop eye, gliding        */}
      {/* along the tapered track and rotating naturally as it rolls.        */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none z-30"
        style={{
          top: `${cfg.buttonTop}px`,
          left: `${cfg.buttonLeft}px`,
          width: `${cfg.buttonSize}px`,
          height: `${cfg.buttonSize}px`,
          filter:
            "drop-shadow(0 10px 16px rgba(0, 0, 0, 0.75)) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.55))",
        }}
        animate={{
          x: isDark ? cfg.travelDistance : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 28,
          mass: 0.9,
        }}
      >
        {/* Rotating Button Medallion on Stitch Track */}
        <motion.div
          className="relative size-full w-full h-full"
          animate={{
            rotate: isDark ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 28,
            mass: 0.9,
          }}
        >
          {/* Light Mode Face: Antique Bronze Sun Medallion */}
          <motion.div
            className="absolute inset-0 size-full"
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0.96 : 1,
            }}
            transition={{
              duration: 0.26,
              ease: "easeInOut",
            }}
          >
            <DesktopButton mode="light" hasShadow={false} />
          </motion.div>

          {/* Dark Mode Face: Antique Pewter Moon / Star Medallion */}
          <motion.div
            className="absolute inset-0 size-full"
            animate={{
              opacity: isDark ? 1 : 0,
              scale: isDark ? 1 : 0.96,
            }}
            transition={{
              duration: 0.26,
              ease: "easeInOut",
            }}
          >
            <DesktopButton mode="dark" hasShadow={false} />
          </motion.div>
        </motion.div>
      </motion.div>
    </Button>
  )
}

// ============================================================================
// MAIN SHOWCASE EXPORT: FabricButtonSwitchPreview
// Card background using the user's authentic high-res denim fabric textures
// with perimeter running-stitch hem border.
// ============================================================================

export interface FabricButtonSwitchPreviewProps {
  embedded?: boolean
  className?: string
}

export function FabricButtonSwitchPreview({
  embedded = false,
  className,
}: FabricButtonSwitchPreviewProps) {
  const [isDark, setIsDark] = React.useState(true)
  const [toggleCount, setToggleCount] = React.useState(0)

  const handleToggle = (checked: boolean) => {
    setIsDark(checked)
    setToggleCount((c) => c + 1)
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center font-sans antialiased text-white select-none",
        embedded ? "w-full py-6 px-4" : "min-h-dvh flex-1 w-full p-4 sm:p-8 lg:p-12",
        className
      )}
      style={{ backgroundColor: embedded ? "transparent" : "#000000" }}
    >
      {/* Ultra-Modern Haute-Couture Typography for Leather Brand Patch */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* AUTHENTIC DENIM FABRIC CARD (Steady, no shake)                     */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] h-[300px] sm:h-[330px] rounded-[32px] flex items-center justify-center overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isDark
            ? "0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(96, 165, 250, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.15)"
            : "0 30px 70px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
          backgroundColor: isDark ? "#142132" : "#4A729A",
        }}
      >
        {/* Layer 1: Stone-Washed Light Denim Base Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: "url('/textures/denim-light.jpg')",
            opacity: isDark ? 0 : 1,
          }}
        />

        {/* Layer 2: Raw Indigo Denim Photo Texture (User-provided JPG) */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: "url('/textures/denim-dark.jpg')",
            opacity: isDark ? 1 : 0,
            filter: "brightness(1.25) contrast(1.18) saturate(1.12)",
          }}
        />

        {/* Layer 3: Tactile Fabric Vignette & Diagonal Twill Depth Lighting */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at 50% 40%, rgba(96, 165, 250, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%)"
              : "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 0, 0, 0.2) 100%)",
          }}
        />

        {/* Layer 4: Luxury Saddle Leather Label Patch at Corner (Modern Haute-Couture Style) */}
        {/* Sleek rectangular leather patch with modern luxury Italiana typography */}
        <div
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none w-[90px] sm:w-[96px] h-[46px] sm:h-[50px] rounded-[6px] flex flex-col items-center justify-center select-none"
          style={{
            background: "linear-gradient(172deg, #BA6426 0%, #A4511B 45%, #8E3E11 100%)",
            border: "1px solid rgba(70, 28, 6, 0.4)",
            boxShadow:
              "0 4px 12px -2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Subtle leather surface sheen highlight */}
          <div
            className="absolute inset-0 rounded-[5px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 12%, rgba(255, 255, 255, 0.16) 0%, transparent 70%)",
            }}
          />

          {/* Authentic Leather Perimeter Saddle Stitching */}
          <svg
            className="absolute inset-0 size-full pointer-events-none overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Needle puncture depressions */}
            <rect
              x="3.5"
              y="3.5"
              width="calc(100% - 7px)"
              height="calc(100% - 7px)"
              rx="3.5"
              fill="none"
              stroke="#2C1003"
              strokeWidth="1.1"
              strokeDasharray="0.9 3.5"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            {/* Fine dark saddle leather thread */}
            <rect
              x="3.5"
              y="3.5"
              width="calc(100% - 7px)"
              height="calc(100% - 7px)"
              rx="3.5"
              fill="none"
              stroke="#441D07"
              strokeWidth="1.0"
              strokeDasharray="2.6 1.8"
              strokeLinecap="round"
            />
            {/* Delicate thread specular sheen */}
            <rect
              x="3.5"
              y="3.5"
              width="calc(100% - 7px)"
              height="calc(100% - 7px)"
              rx="3.5"
              fill="none"
              stroke="#C97532"
              strokeWidth="0.4"
              strokeDasharray="1.8 2.6"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
          </svg>

          {/* Deep Blind-Debossed Leather Lettering: Moon vs Sun (Modern Fashion Couture) */}
          <div className="relative z-10 flex flex-col items-center justify-center -mt-0.5 select-none">
            <div className="relative flex items-center justify-center overflow-hidden h-[24px] sm:h-[26px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "moon" : "sun"}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="text-[21px] sm:text-[23px] font-normal leading-none select-none"
                  style={{
                    fontFamily:
                      "'Italiana', 'Didot', 'Bodoni Moda', 'Playfair Display', serif",
                    letterSpacing: "0.015em",
                    color: "#421C06",
                    textShadow:
                      "0 -0.6px 0.5px rgba(25, 8, 2, 0.85), 0 0.5px 0.2px rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {isDark ? "Moon" : "Sun"}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Subtext: PARIS (Modern Tight Haute-Couture Subtitle - Chloé Style) */}
            <div
              className="text-[6.5px] sm:text-[7.2px] font-sans font-semibold tracking-[0.14em] uppercase leading-none mt-0.5 select-none"
              style={{
                color: "#4C2008",
                textShadow:
                  "0 -0.4px 0.3px rgba(25, 8, 2, 0.75), 0 0.4px 0.1px rgba(255, 255, 255, 0.08)",
              }}
            >
              PARIS
            </div>
          </div>
        </div>

        {/* Layer 6: Perimeter Running Stitch Hem with Traveling Sewing Needle Animation */}
        <svg
          className="absolute inset-0 size-full pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="denim-card-stitch-drop">
              <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Needle Puncture Pits */}
          <rect
            x="10"
            y="10"
            width="calc(100% - 20px)"
            height="calc(100% - 20px)"
            rx="24"
            fill="none"
            stroke={isDark ? "#05080D" : "#1F354D"}
            strokeWidth="3.2"
            strokeDasharray="1.5 10.5"
            strokeDashoffset="6.5"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />

          {/* Main Running Stitch Thread sewn firmly along the perimeter hem */}
          <rect
            x="10"
            y="10"
            width="calc(100% - 20px)"
            height="calc(100% - 20px)"
            rx="24"
            fill="none"
            stroke={isDark ? "#D97706" : "#FFFFFF"}
            strokeWidth="2.2"
            strokeDasharray="6.5 5.5"
            strokeLinecap="round"
            filter="url(#denim-card-stitch-drop)"
            className="transition-colors duration-300"
          />
        </svg>

        {/* Layer 7: Centered Tactile Fabric Button Switch */}
        <div className="relative z-10 flex items-center justify-center p-4">
          <FabricButtonSwitch
            checked={isDark}
            onCheckedChange={handleToggle}
            soundEnabled={true}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default FabricButtonSwitchPreview;

