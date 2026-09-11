"use client";

import * as React from "react";
import {
  SidebarLeftIcon,
  CodeIcon,
  Copy01Icon,
  Tick02Icon,
  Maximize02Icon,
  Minimize02Icon,
  Cancel01Icon,
  Folder01Icon,
  GithubIcon,
  Layers01Icon,
  CommandLineIcon,
  GitBranchIcon,
  RotateLeft01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Clock01Icon,
  SecurityCheckIcon,
  PlayIcon,
  PauseIcon,
  PreviousIcon,
  NextIcon,
  PlusSignIcon,
  MinusSignIcon,
  DragDropVerticalIcon,
  CompassIcon,
  Home01Icon,
  Home04Icon,
  Settings01Icon,
  Search01Icon,
  Notification01Icon,
  Mail01Icon,
  NewTwitterIcon,
  Sun01Icon,
  Moon02Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import { Volume2 as Volume2Icon, VolumeX as VolumeXIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Custom Striped Contrast / Theme Toggle Icon matching the exact design specification.
 */
export const ThemeToggleIcon = React.forwardRef<SVGSVGElement, CustomIconProps>(
  function ThemeToggleIcon({ size = 18, className, ...props }, ref) {
    const clipId = React.useId();

    return (
      <svg
        ref={ref}
        data-theme-icon
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("shrink-0", className)}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            {/* Right half of the circle interior */}
            <path d="M 50 8 A 42 42 0 0 1 50 92 Z" />
          </clipPath>
        </defs>

        {/* Outer Circle Ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
        />

        {/* Center Vertical Divider Line */}
        <line
          x1="50"
          y1="8"
          x2="50"
          y2="92"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Right Half 45-degree Striped Hatching */}
        <g clipPath={`url(#${clipId})`}>
          <line
            x1="30"
            y1="34"
            x2="94"
            y2="-30"
            stroke="currentColor"
            strokeWidth="8"
          />
          <line
            x1="30"
            y1="58"
            x2="110"
            y2="-22"
            stroke="currentColor"
            strokeWidth="8"
          />
          <line
            x1="30"
            y1="82"
            x2="110"
            y2="2"
            stroke="currentColor"
            strokeWidth="8"
          />
          <line
            x1="30"
            y1="106"
            x2="110"
            y2="26"
            stroke="currentColor"
            strokeWidth="8"
          />
          <line
            x1="30"
            y1="130"
            x2="110"
            y2="50"
            stroke="currentColor"
            strokeWidth="8"
          />
        </g>
      </svg>
    );
  }
);
ThemeToggleIcon.displayName = "ThemeToggleIcon";

/**
 * Exact Sidebar Panel Toggle Icon specified by user.
 */
export function SidebarToggleIcon({
  size = 20,
  className,
  ...props
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path
        d="m20,3H4c-1.654,0-3,1.346-3,3v12c0,1.654,1.346,3,3,3h16c1.654,0,3-1.346,3-3V6c0-1.654-1.346-3-3-3ZM3,18V6c0-.551.449-1,1-1h11v14H4c-.551,0-1-.449-1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Right Sidebar Panel Toggle Icon.
 */
export function SidebarRightToggleIcon({
  size = 20,
  className,
  ...props
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 scale-x-[-1]", className)}
      {...props}
    >
      <path
        d="m20,3H4c-1.654,0-3,1.346-3,3v12c0,1.654,1.346,3,3,3h16c1.654,0,3-1.346,3-3V6c0-1.654-1.346-3-3-3ZM3,18V6c0-.551.449-1,1-1h11v14H4c-.551,0-1-.449-1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Exact Fullscreen / Focus Corner Brackets Icon matching user specification.
 */
export function FullscreenFocusIcon({
  size = 18,
  className,
  ...props
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Top Left */}
      <path d="M 8 3.5 V 6 A 2 2 0 0 1 6 8 H 3.5" />
      {/* Top Right */}
      <path d="M 16 3.5 V 6 A 2 2 0 0 0 18 8 H 20.5" />
      {/* Bottom Left */}
      <path d="M 8 20.5 V 18 A 2 2 0 0 0 6 16 H 3.5" />
      {/* Bottom Right */}
      <path d="M 16 20.5 V 18 A 2 2 0 0 1 18 16 H 20.5" />
    </svg>
  );
}

/**
 * Exact Exit Fullscreen / Collapse Focus Corner Brackets Icon matching user specification.
 */
export function FullscreenExitFocusIcon({
  size = 18,
  className,
  ...props
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Top Left */}
      <path d="M 4 9.5 H 6.5 A 2 2 0 0 0 8.5 7.5 V 5" />
      {/* Top Right */}
      <path d="M 20 9.5 H 17.5 A 2 2 0 0 1 15.5 7.5 V 5" />
      {/* Bottom Left */}
      <path d="M 4 14.5 H 6.5 A 2 2 0 0 1 8.5 16.5 V 19" />
      {/* Bottom Right */}
      <path d="M 20 14.5 H 17.5 A 2 2 0 0 0 15.5 16.5 V 19" />
    </svg>
  );
}

/**
 * Exact Code </ > Icon matching user specification.
 */
export function CodeSlashIcon({
  size = 18,
  className,
  ...props
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M 8 7.5 L 3.5 12 L 8 16.5" />
      <path d="M 14 4.5 L 10 19.5" />
      <path d="M 16 7.5 L 20.5 12 L 16 16.5" />
    </svg>
  );
}

/**
 * Exact 6-dot grip handle icon for floating swatch dock.
 */
export function SixDotsGripIcon({
  size = 14,
  className,
  ...props
}: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      <circle cx="3.5" cy="3" r="1.5" />
      <circle cx="10.5" cy="3" r="1.5" />
      <circle cx="3.5" cy="9" r="1.5" />
      <circle cx="10.5" cy="9" r="1.5" />
      <circle cx="3.5" cy="15" r="1.5" />
      <circle cx="10.5" cy="15" r="1.5" />
    </svg>
  );
}

/**
 * Official Package Managers & Libraries brand icons
 */
export function NpmIcon({ size = 16, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} {...props}>
      <rect width="24" height="24" rx="4" fill="#CB3837" />
      <path d="M4.5 4.5h15v15h-7.5V8.25h-3.75v11.25H4.5V4.5z" fill="#FFFFFF" />
    </svg>
  );
}

export function PnpmIcon({ size = 16, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} {...props}>
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.2" fill="#F69220" />
      <rect x="9.25" y="2" width="5.5" height="5.5" rx="1.2" fill="#F69220" />
      <rect x="16.5" y="2" width="5.5" height="5.5" rx="1.2" fill="#F69220" />
      <rect x="9.25" y="9.25" width="5.5" height="5.5" rx="1.2" fill="#F69220" />
      <rect x="16.5" y="9.25" width="5.5" height="5.5" rx="1.2" fill="#4B32C3" />
      <rect x="2" y="16.5" width="5.5" height="5.5" rx="1.2" fill="#F69220" />
      <rect x="9.25" y="16.5" width="5.5" height="5.5" rx="1.2" fill="#4B32C3" />
      <rect x="16.5" y="16.5" width="5.5" height="5.5" rx="1.2" fill="#4B32C3" />
    </svg>
  );
}

export function YarnIcon({ size = 16, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} {...props}>
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 2.82 1.168 5.368 3.05 7.2l2.6-3.2A6.47 6.47 0 0 1 6.5 12c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5c0 1.346-.484 2.58-1.294 3.535l2.64 3.123A9.957 9.957 0 0 0 22 12c0-5.523-4.477-10-10-10z"
        fill="#2C8EBB"
      />
    </svg>
  );
}

export function BunIcon({ size = 16, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} {...props}>
      <path
        d="M18.8 8.8C17.4 6.2 14.9 4.5 12 4.5S6.6 6.2 5.2 8.8C3.3 9.9 2 12 2 14.5 2 17.8 4.7 20.5 8 20.5c1.2 0 2.3-.3 3.2-.9.5.6 1.3.9 2.1.9s1.6-.3 2.1-.9c.9.6 2 .9 3.2.9 3.3 0 6-2.7 6-6 0-2.5-1.3-4.6-3.2-5.7z"
        fill="#F3E2C8"
        stroke="#CA9B68"
        strokeWidth="1.2"
      />
      <circle cx="8.5" cy="13.5" r="1.2" fill="#4A3728" />
      <circle cx="15.5" cy="13.5" r="1.2" fill="#4A3728" />
      <ellipse cx="6" cy="15.5" rx="1.5" ry="0.8" fill="#F8A5A5" />
      <ellipse cx="18" cy="15.5" rx="1.5" ry="0.8" fill="#F8A5A5" />
    </svg>
  );
}

export function MotionIcon({ size = 14, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} {...props}>
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="currentColor" />
    </svg>
  );
}

export function RadixIcon({ size = 14, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" fill="none" className={cn("shrink-0", className)} {...props}>
      <path d="M12 25C18.6274 25 24 19.6274 24 13H12V25Z" fill="currentColor" />
      <path d="M12 0H0V12H12V0Z" fill="currentColor" />
      <path d="M12 12C12 5.37258 17.3726 0 24 0V12H12Z" fill="currentColor" />
    </svg>
  );
}

export function LucideBrandIcon({ size = 14, className, ...props }: CustomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="m12 3-8 9 8 9 8-9z" />
    </svg>
  );
}

export function TailwindIcon({ size = 14, className, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)} {...props}>
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  );
}

// Hugeicons mappings maintained centrally
export const Icons = {
  // Navigation & UI
  Sidebar: SidebarToggleIcon,
  SidebarRight: SidebarRightToggleIcon,
  PanelRight: SidebarRightToggleIcon,
  Info: InformationCircleIcon,
  Code: CodeSlashIcon,
  Copy: Copy01Icon,
  Check: Tick02Icon,
  Maximize: FullscreenFocusIcon,
  Minimize: FullscreenExitFocusIcon,
  Fullscreen: FullscreenFocusIcon,
  Close: Cancel01Icon,
  Grip: SixDotsGripIcon,
  Folder: Folder01Icon,
  Layers: Layers01Icon,
  Rotate: RotateLeft01Icon,
  ChevronDown: ArrowDown01Icon,
  ChevronUp: ArrowUp01Icon,
  ChevronLeft: ArrowLeft01Icon,
  ChevronRight: ArrowRight01Icon,
  chevronLeft: ArrowLeft01Icon,
  chevronRight: ArrowRight01Icon,

  // App & Sections
  Github: GithubIcon,
  Terminal: CommandLineIcon,
  GitBranch: GitBranchIcon,
  Mail: Mail01Icon,
  Twitter: NewTwitterIcon,
  Clock: Clock01Icon,
  ShieldCheck: SecurityCheckIcon,
  Play: PlayIcon,
  Pause: PauseIcon,
  Previous: PreviousIcon,
  Next: NextIcon,
  Plus: PlusSignIcon,
  Minus: MinusSignIcon,
  Compass: CompassIcon,
  Home: Home04Icon,
  Home04: Home04Icon,
  Settings: Settings01Icon,
  Search: Search01Icon,
  Bell: Notification01Icon,
  Sun: Sun01Icon,
  Moon: Moon02Icon,
  Volume: Volume2Icon,
  VolumeMute: VolumeXIcon,

  // Package Managers
  Npm: NpmIcon,
  Pnpm: PnpmIcon,
  Yarn: YarnIcon,
  Bun: BunIcon,

  // Ecosystem & Libraries
  Motion: MotionIcon,
  Radix: RadixIcon,
  Lucide: LucideBrandIcon,
  Tailwind: TailwindIcon,

  // Custom Theme Toggle
  ThemeToggle: ThemeToggleIcon,
  SidebarToggle: SidebarToggleIcon,
};

export {
  SidebarLeftIcon,
  CodeIcon,
  Copy01Icon,
  Tick02Icon,
  Maximize02Icon,
  Minimize02Icon,
  Cancel01Icon,
  Folder01Icon,
  GithubIcon,
  Layers01Icon,
  CommandLineIcon,
  GitBranchIcon,
  RotateLeft01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Clock01Icon,
  SecurityCheckIcon,
  PlayIcon,
  PauseIcon,
  PreviousIcon,
  NextIcon,
  PlusSignIcon,
  MinusSignIcon,
  DragDropVerticalIcon,
  CompassIcon,
  Home01Icon,
  Home04Icon,
  Settings01Icon,
  Search01Icon,
  Notification01Icon,
  Mail01Icon,
  NewTwitterIcon,
  Sun01Icon,
  Moon02Icon,
};
