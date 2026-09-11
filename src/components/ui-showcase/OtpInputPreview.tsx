"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Icons } from "@/src/components/ui/icons";
import { cn } from "@/src/lib/utils";

import { DEFAULT_PRIMARY_SWATCH } from "@/src/lib/ui-theme";

interface OtpInputPreviewProps {
  accent?: string;
}

export function OtpInputPreview({ accent = DEFAULT_PRIMARY_SWATCH }: OtpInputPreviewProps) {
  const [digits, setDigits] = React.useState(["4", "8", "2", "", "", ""]);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const getAccentRing = () => {
    switch (accent) {
      case "purple":
        return "focus:border-swatch-purple focus:ring-swatch-purple/20 text-swatch-purple";
      case "white":
        return "focus:border-foreground focus:ring-foreground/20 text-foreground";
      case "rose":
        return "focus:border-swatch-rose focus:ring-swatch-rose/20 text-swatch-rose";
      case "blue":
        return "focus:border-swatch-blue focus:ring-swatch-blue/20 text-swatch-blue";
      case "red":
        return "focus:border-swatch-red focus:ring-swatch-red/20 text-swatch-red";
      case "green":
        return "focus:border-swatch-green focus:ring-swatch-green/20 text-swatch-green";
      case "orange":
        return "focus:border-swatch-orange focus:ring-swatch-orange/20 text-swatch-orange";
      default:
        return "focus:border-primary-accent focus:ring-primary-accent/20 text-primary-accent";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center p-6 select-none gap-6">
      <div className="w-full p-6 rounded-3xl bg-card border border-border/80 shadow-xl flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Icons.ShieldCheck className="size-4" />
          <span>Verification Code</span>
        </div>

        {/* 6 OTP Inputs */}
        <div className="flex items-center gap-2 justify-center">
          {digits.map((digit, i) => (
            <motion.div
              key={i}
              whileFocus={{ scale: 1.08 }}
              className="relative size-11 md:size-12"
            >
              <Input
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={cn(
                  "size-full p-0 text-center text-lg font-bold font-mono rounded-xl bg-muted/40 border border-border/80 transition-all duration-200",
                  getAccentRing()
                )}
              />
            </motion.div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDigits(["", "", "", "", "", ""]);
            inputsRef.current[0]?.focus();
          }}
          className="rounded-xl gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <Icons.Rotate className="size-3.5" />
          <span>Clear Code</span>
        </Button>
      </div>
    </div>
  );
}
