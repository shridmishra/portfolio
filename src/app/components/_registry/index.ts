import {
  MagneticButton,
  magneticButtonCode,
  ShimmerButton,
  shimmerButtonCode,
  GradientText,
  gradientTextCode,
  TypewriterText,
  typewriterCode,
  GlassCard,
  glassCardCode,
} from "./components";

// Types for component registry
export interface ComponentItem {
  name: string;
  id: string;
  isFree: boolean;
}

export interface ComponentCategory {
  category: string;
  items: ComponentItem[];
}

// Component registry - add new categories and components here
export const componentRegistry: ComponentCategory[] = [
  {
    category: "Buttons",
    items: [
      { name: "Magnetic Button", id: "magnetic-button", isFree: true },
      { name: "Shimmer Button", id: "shimmer-button", isFree: true },
    ],
  },
  {
    category: "Text Effects",
    items: [
      { name: "Gradient Text", id: "gradient-text", isFree: true },
      { name: "Typewriter", id: "typewriter", isFree: false },
    ],
  },
  {
    category: "Cards",
    items: [{ name: "Glass Card", id: "glass-card", isFree: true }],
  },
];

// Map component IDs to their React components
export const componentMap: Record<string, React.FC> = {
  "magnetic-button": MagneticButton,
  "shimmer-button": ShimmerButton,
  "gradient-text": GradientText,
  "typewriter": TypewriterText,
  "glass-card": GlassCard,
};

// Map component IDs to their source code
export const codeMap: Record<string, string> = {
  "magnetic-button": magneticButtonCode,
  "shimmer-button": shimmerButtonCode,
  "gradient-text": gradientTextCode,
  "typewriter": typewriterCode,
  "glass-card": glassCardCode,
};
