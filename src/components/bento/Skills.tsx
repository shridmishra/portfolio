"use client";
import React from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiSolana,
  SiRust,
  SiNodedotjs,
  SiReact,
  SiJavascript,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiExpress,
  SiMongodb,
  SiSolidity,
  SiEthereum,
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";

const skills = [
  { icon: SiNextdotjs, name: "Next.js", color: "text-foreground" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiPrisma, name: "Prisma", color: "text-foreground" },
  { icon: SiRust, name: "Rust", color: "#DEA584" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiExpress, name: "Express", color: "text-foreground" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },

];

export const SkillsCarousel = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col group">
      <h2 className="text-lg font-light mb-4">Skills</h2>
      <div className="flex flex-wrap gap-6 justify-center items-center flex-1 content-center">
        {skills.map((skill, idx) => (
          <SkillItem key={`skill-${idx}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const SkillItem = ({ skill }: { skill: typeof skills[0] }) => {
  const Icon = skill.icon;
  const isHexColor = skill.color.startsWith("#");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer hover:scale-110 transition-all duration-200 grayscale group-hover:grayscale-0">
          <Icon
            size={32}
            className={cn("flex-shrink-0", !isHexColor && skill.color)}
            style={isHexColor ? { color: skill.color } : undefined}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{skill.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
