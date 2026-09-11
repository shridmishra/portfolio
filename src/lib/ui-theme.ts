/**
 * Centralized UI Theme Configuration
 * Separates the App UI branding from the Showcase Component palette!
 */

export type SwatchId =
  | "purple"
  | "white"
  | "rose"
  | "pink"
  | "orange"
  | "blue"
  | "green"
  | "red"
  | "black"
  | "violet";

/**
 * App UI Branding Accent (Sidebar active tree branch, UI chrome, etc.)
 * This controls the App UI and NEVER changes when the user clicks swatches.
 * Can be changed anytime right here!
 */
export const APP_UI_ACCENT = "#FF9500"; // Orange (like it was before!)

/**
 * Component Showcase Default Swatch
 * This controls the default color of the showcase component in the center stage.
 * Can be changed anytime right here!
 */
export const DEFAULT_SHOWCASE_SWATCH: SwatchId = "purple";
export const DEFAULT_PRIMARY_SWATCH = DEFAULT_SHOWCASE_SWATCH;

export const SWATCH_HEX_MAP: Record<SwatchId | string, string> = {
  purple: "#AF52DE",
  white: "#F5F5F7",
  rose: "#F43F5E",
  pink: "#EC4899",
  orange: "#FF9500",
  blue: "#007AFF",
  green: "#34C759",
  red: "#FF3B30",
  black: "#1C1C1E",
  violet: "#AF52DE",
};

export const DEFAULT_PRIMARY_HEX = SWATCH_HEX_MAP[DEFAULT_SHOWCASE_SWATCH];
