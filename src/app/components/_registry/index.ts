
import React from "react";
import { WaveButton, waveButtonCode } from "./components/wave-button";
import { TypewriterText, typewriterCode } from "./components/typewriter";
import { BorderFrameDemo, borderFrameCode } from "./components/border-frame";
import { ScrollRevealCards, scrollRevealCardsCode } from "./components/scroll-reveal-cards";
import { Shuffle, shuffleCode } from "./components/shuffle";
import { Stagger, staggerCode } from "./components/stagger";
import { TextReveal, textRevealCode } from "./components/text-reveal";

export { WaveButton, waveButtonCode, TypewriterText, typewriterCode, BorderFrameDemo, borderFrameCode, ScrollRevealCards, scrollRevealCardsCode, Shuffle, shuffleCode, Stagger, staggerCode, TextReveal, textRevealCode };

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
      { name: "Text Reveal", id: "text-reveal", isFree: true },
    ],
  },
  {
    category: "Scroll Effects",
    items: [
      { name: "Scroll Reveal Cards", id: "scroll-reveal-cards", isFree: true },
    ],
  },
  {
    category: "Animations",
    items: [
      { name: "Shuffle", id: "shuffle", isFree: true },
      { name: "Stagger", id: "stagger", isFree: true },
    ],
  },
 
];

// Map component IDs to their React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentMap: Record<string, React.ComponentType<any>> = {
  "wave-button": () => React.createElement(WaveButton, null, "Hover Me"),
  
  "typewriter": TypewriterText,
  "text-reveal": TextReveal,
  
  "border-frame": BorderFrameDemo,
  "scroll-reveal-cards": ScrollRevealCards,
  "shuffle": Shuffle,
  "stagger": Stagger,
};

// Map component IDs to their source code
export const codeMap: Record<string, string> = {
  "wave-button": waveButtonCode,
  "typewriter": typewriterCode,
  "text-reveal": textRevealCode,
  "border-frame": borderFrameCode,
  "scroll-reveal-cards": scrollRevealCardsCode,
  "shuffle": shuffleCode,
  "stagger": staggerCode,
};
