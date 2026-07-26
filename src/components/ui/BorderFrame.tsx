import { ReactNode } from "react";
import clsx from "clsx";

interface BorderFrameProps {
  children: ReactNode;
  className?: string; // extra styles for outer wrapper
}

export default function BorderFrame({ children, className }: BorderFrameProps) {
  return (
    <div className={clsx("relative group", className)}>
      {/* Content inside the frame */}
      <div className="w-full h-full overflow-hidden shadow-lg bg-card rounded-xl z-0">
        {children}
      </div>
    </div>
  );
}
