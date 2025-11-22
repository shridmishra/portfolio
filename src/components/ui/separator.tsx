import { cn } from "@/src/lib/utils";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/60",
        "after:absolute after:inset-0 after:-left-[100vw] after:w-[200vw] after:-z-2",
        "after:border-t after:border-b after:border-edge",
        className
      )}
    />
  );
}
