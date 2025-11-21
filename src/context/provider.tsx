"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { TooltipProvider } from "@/src/components/ui/tooltip";

export default function DarkModeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </NextThemesProvider>
  );
}
