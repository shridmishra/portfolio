
import React from "react";
import { WaveButton, waveButtonCode } from "./components/wave-button";
import { TypewriterText, typewriterCode } from "./components/typewriter";
import { BorderFrameDemo, borderFrameCode } from "./components/border-frame";

export { WaveButton, waveButtonCode, TypewriterText, typewriterCode, BorderFrameDemo, borderFrameCode };

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
    category: "Cards",
    items: [
      { name: "Border Frame", id: "border-frame", isFree: true },
    ],
  },
  {
    category: "Buttons",
    items: [
      { name: "Wave Button", id: "wave-button", isFree: true },
    ],
  },
  {
    category: "Text Effects",
    items: [
      { name: "Typewriter", id: "typewriter", isFree: false },
    ],
  },
 
];

// Map component IDs to their React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentMap: Record<string, React.ComponentType<any>> = {
  "wave-button": () => React.createElement(WaveButton, null, "Hover Me"),
  
  "typewriter": TypewriterText,
  
  "border-frame": BorderFrameDemo,
};

// Map component IDs to their source code
export const codeMap: Record<string, string> = {
  "wave-button": waveButtonCode,
  "typewriter": typewriterCode,
  "border-frame": borderFrameCode,
};
