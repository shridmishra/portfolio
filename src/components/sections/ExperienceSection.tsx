"use client";

import { WorkExperience } from "@/src/components/work-experience";
import type { ExperienceItemType } from "@/src/components/work-experience";
import Title from "@/src/components/ui/title";
import { SeparatorLine } from "@/src/components/ui/separator-line";

export const ExperienceSection = () => {
  return (
    <section>
      <div className="max-w-4xl mx-auto ">
        {/* Section Header */}
        <Title
          title="Experience"
        />

        <SeparatorLine />

        {/* Experience Timeline */}
        <div className="mt-4">
          <WorkExperience
            className="bg-transparent"
            experiences={EXPERIENCES}
          />
        </div>
      </div>
    </section>
  );
};

const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "stealth-startup",
    companyName: "Stealth Startup",
    companyLogo: "",
    companyWebsite: "",
    positions: [
      {
        id: "stealth-1",
        title: "Full-Stack Developer",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Full-time",
        description: `- Engineered key product features and scalable APIs for a stealth-stage venture.
- Designed user interfaces and responsive web layouts to drive early traction and product launch.`,
        skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
        isExpanded: true,
      }
    ],
    isCurrentEmployer: true,
  },
  {
    id: "freelance",
    companyName: "Freelance",
    companyLogo: "",
    companyWebsite: "https://www.upwork.com",
    positions: [
      {
        id: "freelance-1",
        title: "Full-Stack Developer",
        employmentPeriod: {
          start: "2023",
        },
        employmentType: "Freelance / Contract",
        description: `- Delivering high-quality custom web applications, responsive e-commerce stores, and web dashboards for global clients.
- Collaborating closely with clients from design mockups in Figma to final deployments on Vercel.`,
        skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "MongoDB"],
      }
    ],
  },
  {
    id: "beiyo",
    companyName: "Beiyo",
    companyLogo: "",
    companyWebsite: "https://www.beiyo.in/",
    positions: [
      {
        id: "beiyo-1",
        title: "Full-Stack Developer Intern",
        employmentPeriod: {
          start: "01.2025",
          end: "03.2025",
        },
        employmentType: "Internship",
        description: `- Engineered and shipped production-ready features for Beiyo's platform using Next.js and TypeScript.
- Integrated third-party APIs and built reusable components following modern Design System principles.
- Optimized backend queries and database schema designs using PostgreSQL and Prisma.`,
        skills: ["Next.js", "TypeScript", "React", "PostgreSQL", "Tailwind CSS"],
      }
    ],
  }
];
