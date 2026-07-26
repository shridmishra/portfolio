"use client";
import React from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiFigma,
  SiTailwindcss,
  SiFramer,
  SiRust,
} from "react-icons/si";

import { cn } from "@/src/lib/utils";
import { TechBadge } from "@/src/components/ui/tech-badge";

const row1 = [
  { icon: SiFramer, name: "Framer Motion", color: "text-foreground" },
  { icon: SiRust, name: "Rust", color: "#DEA584" },
  { icon: SiExpress, name: "Express", color: "text-foreground" },
  { icon: SiNextdotjs, name: "Next.js", color: "text-foreground" },
];

const row2 = [
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
];

const row3 = [
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiPrisma, name: "Prisma", color: "text-foreground" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
];

export const SkillsCarousel = () => {
  return (
    <div className="w-full h-full p-2.5 md:p-4 flex flex-col justify-center items-center group">
      <div className="flex flex-col gap-2 md:gap-3 w-full">
        <div className="flex items-center justify-between w-full gap-1 sm:gap-2">
          {row1.map((skill, idx) => (
            <TechBadge
              key={`r1-${idx}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
              className="px-1.5 py-1 md:px-2 md:py-1"
            />
          ))}
        </div>
        <div className="flex items-center justify-between w-full gap-1 sm:gap-2">
          {row2.map((skill, idx) => (
            <TechBadge
              key={`r2-${idx}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
              className="px-1.5 py-1 md:px-2 md:py-1"
            />
          ))}
        </div>
        <div className="flex items-center justify-between w-full gap-1 sm:gap-2">
          {row3.map((skill, idx) => (
            <TechBadge
              key={`r3-${idx}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
              className="px-1.5 py-1 md:px-2 md:py-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
