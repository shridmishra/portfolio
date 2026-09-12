import {
  mangoCardsCode,
  mediaPlayerCode,
  colorPaletteCode,
  guitarStringCode,
  stampCollectionCode,
} from "./code-strings";

export interface PropDefinition {
  prop: string;
  type: string;
  description: string;
}

export interface CreditInfo {
  name: string;
  url: string;
  handle?: string;
  label?: string;
  role?: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: "CARDS" | "MEDIA" | "INTERACTIVE";
  tag: string;
  title: string;
  description: string;
  dependencies: string[];
  interactionType: string;
  props: PropDefinition[];
  installCommand: string;
  howToUse?: string;
  sourceCode: string;
  credit?: CreditInfo;
  defaultZoom?: number;
}

export const COMPONENTS_REGISTRY: ComponentItem[] = [
  {
    id: "mango-cards",
    name: "Mango cards",
    category: "CARDS",
    tag: "PRODUCT CARDS",
    title: "Two mango product cards: a compact preview and an expanded immersive version.",
    description: "Two mango product cards: a compact preview and an expanded immersive version.",
    dependencies: ["motion"],
    interactionType: "Swipe or drag horizontally across the carousel images in either card with spring physics.",
    props: [
      { prop: "accent?", type: "string", description: "Color theme accent for highlights." },
    ],
    installCommand: "npx shadcn@latest add https://shrid.site/r/mango-cards.json",
    howToUse: `import { MangoCardsPreview as MangoCards } from "@/components/ui/mango-cards";

export function Demo() {
  return <MangoCards />;
}`,
    sourceCode: mangoCardsCode,
  },
  {
    id: "media-player",
    name: "Media player",
    category: "MEDIA",
    tag: "MEDIA PLAYER",
    title: "A minimal, modern media player device with a soft rounded-square shape.",
    description: "A minimal, modern media player device with a soft rounded-square shape.",
    dependencies: ["lucide-react", "react-icons/hi2"],
    interactionType: "Play/pause videos, skip tracks with hardware-style push controls, and toggle the popout playlist drawer.",
    props: [
      { prop: "className?", type: "string", description: "Optional container class name." },
    ],
    installCommand: "npx shadcn@latest add https://shrid.site/r/media-player.json",
    howToUse: `import { MediaPlayerPreview as MediaPlayer } from "@/components/ui/media-player";

export function Demo() {
  return <MediaPlayer />;
}`,
    sourceCode: mediaPlayerCode,
  },
  {
    id: "color-palette-showcase",
    name: "Color palette showcase",
    category: "INTERACTIVE",
    tag: "COLOR PALETTE",
    title: "A 3D card-based color palette showcase with hover animations.",
    description: "A 3D card-based color palette showcase with hover animations.",
    dependencies: ["gsap", "next-themes"],
    interactionType: "Hover any card to elevate it and its adjacent neighbors in 3D perspective space with GSAP curves. Drag or swipe horizontally to pan.",
    props: [
      { prop: "isFullscreen?", type: "boolean", description: "Whether the showcase runs in fullscreen mode." },
    ],
    installCommand: "npx shadcn@latest add https://shrid.site/r/color-palette-showcase.json",
    howToUse: `import { ColorPalettePreview } from "@/components/ui/color-palette-showcase";

export function Demo() {
  return <ColorPalettePreview />;
}`,
    sourceCode: colorPaletteCode,
  },
  {
    id: "guitar-string",
    name: "Guitar string",
    category: "INTERACTIVE",
    tag: "GUITAR STRING",
    title: "A photorealistic roasted maple guitar neck with authentic wood grain, metallic ball-end frets, iridescent abalone inlays, and Web Audio pluck harmonics.",
    description: "A photorealistic roasted maple guitar neck with authentic wood grain, metallic ball-end frets, iridescent abalone inlays, and Web Audio pluck harmonics.",
    dependencies: ["gsap"],
    interactionType: "Hover or drag across strings to deflect and pluck notes with GSAP elastic rebound. Click Strum to play an open chord.",
    props: [
      { prop: "accent?", type: "string", description: "Color theme swatch applied to abalone paua inlays and ambient string glow." },
      { prop: "className?", type: "string", description: "Optional container class name." },
    ],
    installCommand: "npx shadcn@latest add https://shrid.site/r/guitar-string.json",
    howToUse: `import { GuitarStringPreview } from "@/components/ui/guitar-string";

export function Demo() {
  return <GuitarStringPreview accent="blue" />;
}`,
    sourceCode: guitarStringCode,
  },
  {
    id: "stamp-collection",
    name: "Stamp collection",
    category: "INTERACTIVE",
    tag: "INTERACTIVE FOLDER",
    title: "An archival green postage stamp folder with tactile 3D flap physics, hover peek elevation, and presentation modes.",
    description: "An archival green postage stamp folder with tactile 3D flap physics, hover peek elevation, and presentation modes.",
    dependencies: ["motion"],
    defaultZoom: 0.75,
    interactionType: "Hover to swing open the flaps and peek stamps out of the pocket. Click to present stamps in full view. Hover or click stamps to inspect them.",
    props: [
      { prop: "className?", type: "string", description: "Optional container class name." },
      { prop: "embedded?", type: "boolean", description: "Whether to render in embedded showcase mode." },
      { prop: "defaultScale?", type: "number", description: "Default zoom scale factor (e.g. 0.75)." },
    ],
    credit: {
      name: "Aditya Sur",
      handle: "@AdityaSur11",
      url: "https://x.com/AdityaSur11/status/2098328193660833874",
      label: "Original concept & interaction design on 𝕏",
      role: "concept",
    },
    installCommand: "npx shadcn@latest add https://shrid.site/r/stamp-collection.json",
    howToUse: `import { StampCollectionPreview as StampCollection } from "@/components/ui/stamp-collection";

export function Demo() {
  return <StampCollection />;
}`,
    sourceCode: stampCollectionCode,
  },
];
