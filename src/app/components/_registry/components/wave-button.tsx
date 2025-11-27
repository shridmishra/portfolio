import React, { useRef } from "react";
import { cn } from "@/src/lib/utils";

interface WaveButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const WaveButton = ({ children, className }: WaveButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--wave-x", `${x}px`);
    btn.style.setProperty("--wave-y", `${y}px`);
  };

  return (
    <button
      ref={btnRef}
      className={cn(
        "relative overflow-hidden px-12 py-6 rounded-xl font-bold text-xl transition-colors duration-300 bg-foreground text-background group focus:outline-none",
        "before:content-[''] before:absolute before:inset-0 before:bg-transparent before:pointer-events-none",
        "after:content-[''] after:absolute after:rounded-full after:opacity-0 after:transition after:duration-700",
        className
      )}
      style={{
        // fallback for browsers that don't support CSS variables
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        const btn = btnRef.current;
        if (btn) {
          btn.style.setProperty("--wave-x", `-100px`);
          btn.style.setProperty("--wave-y", `-100px`);
        }
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute left-0 top-0 w-full h-full"
        aria-hidden="true"
        style={{
          zIndex: 1,
        }}
      >
        <span
          className="block w-0 h-0"
          style={{
            left: "var(--wave-x, -100px)",
            top: "var(--wave-y, -100px)",
            position: "absolute",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" style={{
            position: "absolute",
            left: "-100px",
            top: "-100px",
            pointerEvents: "none",
            zIndex: 2,
          }}>
            <defs>
              <radialGradient id="wave-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="url(#wave-gradient)" />
          </svg>
        </span>
      </span>
    </button>
  );
};

export const waveButtonCode = `import React, { useRef } from "react";
import { cn } from "@/src/lib/utils";

export const WaveButton = ({ children, className }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--wave-x", \`\${x}px\`);
    btn.style.setProperty("--wave-y", \`\${y}px\`);
  };

  return (
    <button
      ref={btnRef}
      className={cn(
        "relative overflow-hidden px-12 py-6 rounded-xl font-bold text-xl transition-colors duration-300 bg-foreground text-background group focus:outline-none",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        const btn = btnRef.current;
        if (btn) {
          btn.style.setProperty("--wave-x", \`-100px\`);
          btn.style.setProperty("--wave-y", \`-100px\`);
        }
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute left-0 top-0 w-full h-full"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        <span
          className="block w-0 h-0"
          style={{
            left: "var(--wave-x, -100px)",
            top: "var(--wave-y, -100px)",
            position: "absolute",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" style={{
            position: "absolute",
            left: "-100px",
            top: "-100px",
            pointerEvents: "none",
            zIndex: 2,
          }}>
            <defs>
              <radialGradient id="wave-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="url(#wave-gradient)" />
          </svg>
        </span>
      </span>
    </button>
  );
};`;


