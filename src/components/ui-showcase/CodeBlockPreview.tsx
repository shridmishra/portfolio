"use client";

import * as React from 'react';
import { CodeBlock } from '@/src/components/ui/code-block';

interface CodeBlockPreviewProps {
  accent?: string;
}

const SAMPLE_CODE = `import { useSpring, animated } from "motion/react";

type OrbitProps = {
  radius?: number;
  speed?: number;
};

export function Orbit({ radius = 120, speed = 1 }: OrbitProps) {
  const angle = useSpring(0, { stiffness: 80, damping: 20 });

  const x = Math.cos(angle.get()) * radius;
  const y = Math.sin(angle.get()) * radius;

  return (
    <animated.div
      style={{ x, y }}
      className="size-4 rounded-full bg-current"
    />
  );
}`;

import {
  DEFAULT_PRIMARY_SWATCH,
  DEFAULT_PRIMARY_HEX,
  SWATCH_HEX_MAP,
} from '@/src/lib/ui-theme';

export function CodeBlockPreview({ accent = DEFAULT_PRIMARY_SWATCH }: CodeBlockPreviewProps) {
  const accentHex = SWATCH_HEX_MAP[accent] ?? DEFAULT_PRIMARY_HEX;

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <CodeBlock
        code={SAMPLE_CODE}
        language="tsx"
        filename="Orbit.tsx"
        accent={accentHex}
        highlightLines={[8, 9, 15, 16]}
        showFrame={true}
        showHeader={true}
        showLineNumbers={true}
        showCopyButton={true}
        className="shadow-md"
      />
    </div>
  );
}
