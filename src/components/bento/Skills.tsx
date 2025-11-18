"use client";
import React from "react";
import { motion } from "framer-motion";
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

const baseIcons = [
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
  SiExpress,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiSolidity,
  SiEthereum
];

export const SkillsCarousel = () => {
  const repeatedIcons = [...baseIcons, ...baseIcons, ...baseIcons]; 
  const half = Math.ceil(repeatedIcons.length / 2);
  const firstRow = repeatedIcons.slice(0, half);
  const secondRow = repeatedIcons.slice(half);

  return (
    <div className="w-full h-full p-4 overflow-hidden">
      <h2 className="text-lg font-light mb-3">Skills</h2>
      <div className="space-y-4">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }} 
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "linear",
          }}
        >
          {[...firstRow, ...firstRow].map((Icon, idx) => (
            <Icon key={`row1-${idx}`} size={32} className="text-secondary flex-shrink-0" />
          ))}
        </motion.div>

        <motion.div
          className="flex gap-6 mt-8"
          animate={{ x: ["-50%", "0%"] }} // opposite direction
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "linear",
          }}
        >
          {[...secondRow, ...secondRow].map((Icon, idx) => (
            <Icon key={`row2-${idx}`} size={32} className="text-secondary flex-shrink-0" />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
