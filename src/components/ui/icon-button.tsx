"use client";

import { motion } from "motion/react";
import { useRef } from "react";

interface IconButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  width?: number;
  height?: number;
  widthIcon?: number;
  heightIcon?: number;
}

export function IconButton({
  href,
  onClick,
  icon,
  width = 48,
  height = 48,
  widthIcon = 24,
  heightIcon = 24,
}: IconButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const Wrapper = href ? "a" : "button";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <Wrapper {...wrapperProps}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        whileHover={{ scale: 1.1 }}
        className="relative flex aspect-square items-center justify-center rounded-full"
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}
