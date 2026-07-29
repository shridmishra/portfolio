import React from "react";
import { I_Experience } from "@/src/types/type";
import { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiVercel,
  SiSolana,
  SiRust,
  SiNodedotjs,
  SiSocketdotio,
  SiExpress,
  SiStripe,
  SiFramer,
  SiJavascript,
  SiDrizzle,
  SiFigma,
  SiVite,
  SiGreensock,
} from "react-icons/si";
import { DiRedis } from "react-icons/di";
import {
  TbBrandOpenai,
  TbApi,
  TbChartLine,
  TbAnchor,
  TbTestPipe,
  TbLayoutGrid,
  TbPalette,
  TbFileTypography,
} from "react-icons/tb";

export const GsapFilledIcon: IconType = (props) =>
  React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      width: "1em",
      height: "1em",
      ...props,
    },
    React.createElement("rect", {
      width: "24",
      height: "24",
      rx: "4",
      fill: "currentColor",
    }),
    React.createElement(
      "text",
      {
        x: "12",
        y: "15.5",
        textAnchor: "middle",
        fill: "#000000",
        fontSize: "7.5",
        fontWeight: "900",
        fontFamily: "system-ui, -apple-system, sans-serif",
        letterSpacing: "-0.3px",
      },
      "GSAP"
    )
  );

// Technology icons and colors mapping
export const TECH_ICONS: Record<string, { icon: IconType; color: string }> = {
  // Frameworks
  "Next.js": { icon: SiNextdotjs, color: "text-foreground" },
  "React": { icon: SiReact, color: "#61DAFB" },
  
  // Languages
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  
  // Styling
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Framer": { icon: SiFramer, color: "#0055FF" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "GSAP": { icon: GsapFilledIcon, color: "#88CE02" },
  "NeoBrutalism": { icon: TbPalette, color: "#FF6B6B" },
  "Figma": { icon: SiFigma, color: "#F24E1E" },
  
  // Databases
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Redis": { icon: DiRedis, color: "#DC382D" },
  "Drizzle": { icon: SiDrizzle, color: "#C5F74F" },
  
  // Backend
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express": { icon: SiExpress, color: "text-foreground" },
  "Socket.io": { icon: SiSocketdotio, color: "text-foreground" },
  "trpc": { icon: TbApi, color: "#2596BE" },
  "TRPC": { icon: TbApi, color: "#2596BE" },
  "BetterAuth": { icon: TbApi, color: "#10B981" },
  "Vite": { icon: SiVite, color: "#10B981" },
  
  // Blockchain
  "Solana": { icon: SiSolana, color: "#9945FF" },
  "Anchor": { icon: TbAnchor, color: "#14F195" },
  
  // AI & APIs
  "AI": { icon: TbBrandOpenai, color: "#10A37F" },
  "YouTube API": { icon: TbApi, color: "#FF0000" },
  "CoinGecko API": { icon: TbApi, color: "#8BC53F" },
  "Axios": { icon: TbApi, color: "#5A29E4" },
  
  // Deployment
  "Vercel": { icon: SiVercel, color: "#ffffff" },
  
  // Payments
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  
  // Charts & UI
  "Chart.js": { icon: TbChartLine, color: "#FF6384" },
  "ReCharts": { icon: TbChartLine, color: "#22C55E" },
  "RGL": { icon: TbLayoutGrid, color: "#8B5CF6" },
  "Zustland": { icon: TbLayoutGrid, color: "#453F39" },
  
  // Testing
  "Mocha": { icon: TbTestPipe, color: "#8D6748" },
  
  // Editor & Content
  "TipTap": { icon: TbFileTypography, color: "#68D391" },
  "MDX": { icon: TbFileTypography, color: "#FCB32C" },
  "Framer Motion  ": { icon: SiFramer, color: "#0055FF" },
};

export const words = [
  "Design Engineer",
  "Full-Stack Developer",
  "Frontend Specialist",
];

export const experienceData: I_Experience[] = [
  {
    company_link: "https://www.beiyo.in/",
    company_logo: "/assets/beiyo.webp",
    company_name: "Beiyo",
    duration: "2024 - 2025",
    job_title: "FullStack Developer",
    description: "",
  },
  {
    company_link: "#",
    company_logo: "/assets/upwork-icon.webp",
    company_name: "Freelance",
    duration: "2023 - Present",
    job_title: "FullStack Developer",
    description: "",
  },
];

export const projects = [
   {
    title: "Paths AI",
    description: "Structured learning journeys created by AI.",
    tech: ["AI","TRPC","Redis","Next.js","React","TypeScript","PostgreSQL"],
    category: "fullstack",
    status: "In Development",
    year: "2025",
    link: "https://paths.shrid.site",
    code: "https://github.com/shridmishra/paths",
    imageSrc: "/projects/path.webp",
    video:"/projects/video/paths.mp4"
  },
   {
    title: "CRM",
    description: "Customer Relationship Management app.",
    tech: ["Next.js","TypeScript","React","Drizzle","PostgreSQL","BetterAuth",],
    category: "fullstack",
    status: "In Development",
    year: "2025",
    link: "https://crm.shrid.site",
    code: "https://github.com/shridmishra",
    imageSrc: "/projects/crm.webp",
    video:"/projects/video/crm.mp4"
  },
  {
    title: "Project Manager",
    description: "Project Management app with clean UI dashboards.",
    tech: ["Next.js","TypeScript","PostgreSQL","Drizzle","React","Tailwind CSS"],
    category: "fullstack",
    status: "In Development",
    year: "2025",
    link: "https://projects.shrid.site",
    code: "https://github.com/shridmishra/project-management",
    imageSrc: "/projects/projects.webp",
    video:"/projects/video/projects.mp4"
  },{
    title: "Practice JS",
    description: "Leetcode like questions but for FullStack Development.",
    tech: ["Next.js", "TypeScript", "MongoDB","React","Tailwind CSS","Framer Motion"],
    category: "fullstack",
    status: "Live",
    year: "2025",
    link: "https://js.shrid.site",
    code: "https://github.com/shridmishra/practicejs",
    imageSrc: "/projects/js.webp",
    video: "/projects/video/practicejs.mp4",
  },
  {
    title: "AnimeFlix",
    description: "Anime streaming platform with NeoBrutalism.",
    tech: ["NeoBrutalism", "YouTube API"],
    category: "fullstack",
    status: "In Progress",
    year: "2025",
    link: "https://animeflix.shrid.site",
    code: "https://github.com/shridmishra/animeflix",
    imageSrc: "/projects/animeflix.webp",
    video: "/projects/video/animeflix.mp4",

  },
  {
    title: "Grocery Store",
    description: "Shopping app with cart, admin panel and payments.",
    tech: ["React", "Stripe", "MongoDB","JavaScript","Tailwind CSS","Vite"],
    category: "fullstack",
    status: "Live",
    year: "2025",
    link: "https://grocery.shrid.site",
    code: "https://github.com/shridmishra/grocery-store",
    imageSrc: "/projects/grocery.webp",
    video: "/projects/video/grocery.mp4",


  },
 

{
    title: "Blogs",
    description: "Personal blogging platform with rich text editor.",
    tech: ["TipTap", "MDX", "TypeScript"],
    category: "fullstack",
    status: "In Development",
    year: "2025",
    link: "https://blogs.shrid.site/post/new",
    code: "https://github.com/shridmishra/blogs",
    imageSrc: "/projects/blogs.webp",
  },
  {
    title: "Crypto Explorer",
    description: "Real-time cryptocurrency data visualization.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Chart.js",
      "CoinGecko API",
      "Axios",
    ],
    category: "fullstack",
    status: "Live",
    year: "2025",
    link: "https://crypto.shrid.site",
    code: "https://github.com/shridmishra/crypto-explorer",
    imageSrc: "/projects/crypto.webp",
  },
  
  {
    title: "Notes",
    description: "Note app with collaboration features.",
    tech: ["React", "JavaScript", "Node.js", "Express", "Socket.io", "MongoDB"],
    category: "fullstack",
    status: "Live",
    year: "2025",
    link: "https://notes.shrid.site",
    code: "https://github.com/shridmishra/sgsits-notes",
    imageSrc: "/projects/notes.webp",
  },
  {
    title: "GTA VI",
    description: "Immersive Grand Theft Auto VI landing page experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    category: "landing",
    status: "Live",
    year: "2025",
    link: "https://gta.shrid.site",
    code: "https://github.com/shridmishra/gta",
    imageSrc: "/projects/gta.webp",
    video: "/projects/video/gta.mp4",
  },
  {
    title: "Qrux Studio",
    description: "Digital design and branding agency landing page.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "landing",
    status: "Live",
    year: "2025",
    link: "https://qruxstudios.in",
    code: "https://github.com/shridmishra",
    imageSrc: "/projects/qrux.webp",
    video: "/projects/video/qrux.mp4",
  },
  {
    title: "Marketique",
    description: "Social media agency platform for growing brands & creators.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    category: "landing",
    status: "Live",
    year: "2025",
    link: "https://marketique.shrid.site",
    code: "https://github.com/shridmishra/marketique",
    imageSrc: "/projects/marketique.webp",
    video: "/projects/video/marketique.mp4",
  },
  {
    title: "Rivvl",
    description: "Developer portfolio platform with clean aesthetics.",
    tech: ["Next.js", "Framer Motion", "TypeScript"],
    category: "landing",
    status: "Live",
    year: "2025",
    link: "https://rivvl.vercel.app",
    code: "https://github.com/shridmishra",
    imageSrc: "/projects/rivvl.webp",
    video: "/projects/video/rivvl.mp4",
  },
  {
    title: "Practice JS",
    description: "Leetcode like questions but for FullStack Development.",
    tech: ["Next.js", "TypeScript", "MongoDB", "React", "Tailwind CSS", "Framer Motion"],
    category: "landing",
    status: "Live",
    year: "2025",
    link: "https://js.shrid.site",
    code: "https://github.com/shridmishra/practicejs",
    imageSrc: "/projects/js.webp",
    video: "/projects/video/practicejs.mp4",
  },
  {
    title: "Landing Page",
    description: "SEO-optimized marketing landing template.",
    tech: ["Next.js", "TypeScript", "Framer"],
    category: "landing",
    status: "Live",
    year: "2025",
    link: "https://landing-page-shrid.vercel.app/",
    code: "https://github.com/shridmishra/landing-page",
    imageSrc: "/projects/landing.webp",
  },
];
