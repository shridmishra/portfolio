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
  SiDrizzle,
  SiTailwindcss,
  SiFramer,
  SiRust,
} from "react-icons/si";

import { cn } from "@/src/lib/utils";
import { TechBadge } from "@/src/components/ui/tech-badge";

const skills = [
  { icon: SiNextdotjs, name: "Next.js", color: "text-foreground" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiRust, name: "Rust", color: "red" }, { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiExpress, name: "Express", color: "text-foreground" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiDrizzle, name: "Drizzle", color: "text-foreground" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiFramer, name: "Framer Motion", color: "text-foreground" },
  { icon: SiPrisma, name: "Prisma", color: "text-foreground" },

];

export const SkillsCarousel = () => {
  const row1 = skills.slice(0, 4);
  const row2 = skills.slice(4, 8);
  const row3 = skills.slice(8, 12);

  return (
    <div className="w-full h-full p-2 md:p-4 flex flex-col group">
      <div className="text-sm md:text-lg font-normal flex justify-start items-start px-2 md:px-4 -mt-1 md:-mt-2">Tech Stack</div>
      <div className="flex flex-col gap-1.5 md:gap-3 px-2 md:px-4 justify-center items-center flex-1 content-center">
        <div className="flex flex-wrap md:flex-nowrap gap-1 md:gap-2 justify-start items-center w-full">
          {row1.map((skill, idx) => (
            <TechBadge
              key={`skill-r1-${idx}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
            />
          ))}
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-1 md:gap-2 justify-start items-center w-full">
          {row2.map((skill, idx) => (
            <TechBadge
              key={`skill-r2-${idx}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
            />
          ))}
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-1 md:gap-2 justify-start items-center w-full">
          {row3.map((skill, idx) => (
            <TechBadge
              key={`skill-r3-${idx}`}
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
