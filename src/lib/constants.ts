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
  SiVite,
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

// Technology icons and colors mapping
export const TECH_ICONS: Record<string, { icon: IconType; color: string }> = {
  // Frameworks
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "React": { icon: SiReact, color: "#61DAFB" },
  
  // Languages
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Rust": { icon: SiRust, color: "#DEA584" },
  
  // Styling
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Framer": { icon: SiFramer, color: "#0055FF" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "NeoBrutalism": { icon: TbPalette, color: "#FF6B6B" },
  
  // Databases
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Redis": { icon: DiRedis, color: "#DC382D" },
  "Drizzle": { icon: SiDrizzle, color: "#C5F74F" },
  
  // Backend
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express": { icon: SiExpress, color: "#ffffff" },
  "Socket.io": { icon: SiSocketdotio, color: "#010101" },
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
    company_logo: "/assets/beiyo.png",
    company_name: "Beiyo",
    duration: "2024 - 2025",
    job_title: "FullStack Developer",
    description: "",
  },
  {
    company_link: "#",
    company_logo: "/assets/upwork-icon.png",
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
    status: "In Development",
    year: "2025",
    link: "https://paths.shrid.in",
    code: "https://github.com/shridmishra/paths",
    imageSrc: "/projects/path.png",
    video:"/projects/video/paths.mp4"
  },
   {
    title: "CRM",
    description: "Customer Relationship Management app.",
    tech: ["Next.js","TypeScript","React","Drizzle","PostgreSQL","BetterAuth",],
    status: "In Development",
    year: "2025",
    link: "https://crm.shrid.in",
    code: "https://github.com/shridmishra",
    imageSrc: "/projects/crm.png",
    video:"/projects/video/crm.mp4"
  },
  {
    title: "Project Manager",
    description: "Project Management app with clean UI dashboards.",
    tech: ["Next.js","TypeScript","PostgreSQL","Drizzle","React","Tailwind CSS"],
    status: "In Development",
    year: "2025",
    link: "https://projects.shrid.in",
    code: "https://github.com/shridmishra/project-management",
    imageSrc: "/projects/projects.png",
    video:"/projects/video/projects.mp4"
  },{
    title: "Practice JS",
    description: "Leetcode like questions but for FullStack Development.",
    tech: ["Next.js", "TypeScript", "MongoDB","React","Tailwind CSS","Framer Motion"],
    status: "Live",
    year: "2025",
    link: "https://practicejs.shrid.in",
    code: "https://github.com/shridmishra/practicejs",
    imageSrc: "/projects/js.png",
    video: "/projects/video/practicejs.mp4",
  },
  {
    title: "AnimeFlix",
    description: "Anime streaming platform with NeoBrutalism.",
    tech: ["NeoBrutalism", "YouTube API"],
    status: "In Progress",
    year: "2025",
    link: "https://animeflix.shrid.in",
    code: "https://github.com/shridmishra/animeflix",
    imageSrc: "/projects/animeflix.png",
    video: "/projects/video/animeflix.mp4",

  },
  {
    title: "Grocery Store",
    description: "Shopping app with cart, admin panel and payments.",
    tech: ["React", "Stripe", "MongoDB","JavaScript","Tailwind CSS","Vite"],
    status: "Live",
    year: "2025",
    link: "https://grocery.shrid.in",
    code: "https://github.com/shridmishra/grocery-store",
    imageSrc: "/projects/grocery.png",
    video: "/projects/video/grocery.mp4",


  },
 
  {
    title: "MediChain",
    description: "Solana platform for secure health data.",
    tech: ["Next.js", "TypeScript", "Solana", "Anchor", "PostgreSQL"],
    status: "In Development",
    year: "2025",
    link: "https://medichain.shrid.in",
    code: "https://github.com/shridmishra/medichain",
    imageSrc: "/projects/medichain.png",
  },
{
    title: "Blogs",
    description: "Personal blogging platform with rich text editor.",
    tech: ["TipTap", "MDX", "TypeScript"],
    status: "In Development",
    year: "2025",
    link: "https://blogs.shrid.in/post/new",
    code: "https://github.com/shridmishra/blogs",
    imageSrc: "/projects/blogs.png",
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
    status: "Live",
    year: "2025",
    link: "https://crypto.shrid.in",
    code: "https://github.com/shridmishra/crypto-explorer",
    imageSrc: "/projects/crypto.png",
  },
  
  {
    title: "Notes",
    description: "Note app with collaboration features.",
    tech: ["React", "JavaScript", "Node.js", "Express", "Socket.io", "MongoDB"],
    status: "Live",
    year: "2025",
    link: "https://notes.shrid.in",
    code: "https://github.com/shridmishra/sgsits-notes",
    imageSrc: "/projects/notes.png",
  },
  {
    title: "Landing Page",
    description: "SEO-optimized marketing landing template.",
    tech: ["Next.js", "TypeScript", "Framer"],
    status: "Live",
    year: "2025",
    link: "https://landing-page-shrid.vercel.app/",
    code: "https://github.com/shridmishra/landing-page",
    imageSrc: "/projects/landing.png",
  },

  {
    title: "Old Portfolio",
    description: "Personal portfolio with modern design.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    status: "Live",
    year: "2025",
    link: "https://portfolio.shrid.in",
    code: "https://github.com/shridmishra/shridmishra-v1",

    imageSrc: "/projects/portfolio.png",
  },
  {
    title: "Finboard",
    description: "Finance dashboard with live stock and widgets.",
    tech: ["ReCharts", "Zustland", "RGL"],
    status: "In Progress",
    year: "2025",
    link: "https://finboard.shrid.in",
    code: "https://github.com/shridmishra/finboard",
    imageSrc: "/projects/finboard.png",
  },
  {
    title: "Solana Contract",
    description: "Smart contract for SPL token staking.",
    tech: ["Rust", "Solana", "Anchor", "TypeScript", "Mocha"],
    status: "Live",
    year: "2025",
    link: "https://github.com/shridmishra/solana-contracts",
    code: "https://github.com/shridmishra/solana-contracts",
    imageSrc: "/projects/solana.png",
  },
];
