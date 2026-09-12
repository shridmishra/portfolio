"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";
import { Icons } from "@/src/components/ui/icons";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/src/components/ui/collapsible";
import { CodeBlock } from "@/src/components/ui/code-block";
import { ComponentItem } from "./registry";
import { cn } from "@/src/lib/utils";

interface CodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  component: ComponentItem;
}

export function CodeDrawer({ isOpen, onClose, component }: CodeDrawerProps) {
  const [mounted, setMounted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"usage" | "code">("usage");
  const [packageManager, setPackageManager] = React.useState<"npm" | "pnpm" | "yarn" | "bun">("npm");
  const [copiedInstall, setCopiedInstall] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut to close drawer on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const visibleDependencies = React.useMemo(() => {
    return (component.dependencies ?? []).filter(
      (dep) => !["clsx", "tailwind-merge", "tailwind_merge"].includes(dep.toLowerCase().trim())
    );
  }, [component.dependencies]);

  const getInstallCommand = () => {
    const pkg = component.installCommand.replace(/^npx shadcn@latest add /, "");
    switch (packageManager) {
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${pkg}`;
      case "bun":
        return `bunx --bun shadcn@latest add ${pkg}`;
      case "yarn":
      case "npm":
      default:
        return `npx shadcn@latest add ${pkg}`;
    }
  };

  const handleInstallCopy = async () => {
    const cmd = getInstallCommand();
    await navigator.clipboard.writeText(cmd);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCodeCopy = async (codeToCopy: string) => {
    await navigator.clipboard.writeText(codeToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getDepIcon = (dep: string) => {
    const d = dep.toLowerCase();
    if (d.includes("motion")) return <Icons.Motion className="size-3 text-foreground shrink-0" />;
    if (d.includes("radix")) return <Icons.Radix className="size-3 text-foreground shrink-0" />;
    if (d.includes("lucide")) return <Icons.Lucide className="size-3 text-foreground shrink-0" />;
    if (d.includes("tailwind")) return <Icons.Tailwind className="size-3 shrink-0" />;
    return <Icons.Layers className="size-3 text-muted-foreground shrink-0" />;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/70 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Right Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[500px] md:w-[560px] lg:w-[620px] max-w-full bg-card border-l border-border shadow-2xl flex flex-col h-full overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={component.title}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 pb-4 border-b border-border/40 shrink-0">
              <div className="space-y-1 min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider rounded-md bg-muted/60 text-muted-foreground border-0"
                  >
                    {component.tag}
                  </Badge>
                </div>
                <h2 className="text-base font-bold tracking-tight text-foreground truncate">
                  {component.name}
                </h2>
              </div>

              {/* Close Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={onClose}
                    className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted p-0 cursor-pointer shrink-0"
                    aria-label="Close drawer"
                  >
                    <Icons.Close className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="text-xs">
                  Close (Esc)
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Segmented Two Tabs Control: Usage & Code */}
            <div className="px-5 pt-3 shrink-0">
              <div className="flex items-center p-1 rounded-xl bg-muted/50 border border-border/40">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("usage")}
                  className={cn(
                    "flex-1 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer gap-2",
                    activeTab === "usage"
                      ? "bg-card text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icons.Terminal className="size-3.5" />
                  <span>Usage</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("code")}
                  className={cn(
                    "flex-1 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer gap-2",
                    activeTab === "code"
                      ? "bg-card text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icons.Code className="size-3.5" />
                  <span>Code</span>
                </Button>
              </div>
            </div>

            {/* Drawer Body - Scrollable */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-5 space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "usage" ? (
                  <motion.div
                    key="usage-tab"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    {/* Component Title Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {component.title}
                    </p>

                    {/* Unified Compact Install Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                          Installation
                        </span>
                        {/* Package Manager Selector */}
                        <div className="flex items-center gap-0.5 bg-muted/50 p-0.5 rounded-lg border border-border/30">
                          {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
                            <Button
                              key={pm}
                              variant="ghost"
                              size="xs"
                              onClick={() => setPackageManager(pm)}
                              className={cn(
                                "h-5 px-1.5 text-[10.5px] font-mono rounded-md transition-colors cursor-pointer",
                                packageManager === pm
                                  ? "bg-card text-foreground shadow-xs font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {pm}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between rounded-xl bg-muted/40 dark:bg-card/70 border border-border/40 px-3 py-2 font-mono text-xs text-foreground/90 group">
                        <span className="truncate pr-2 select-text text-[11.5px]">
                          {getInstallCommand()}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={handleInstallCopy}
                              className="size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted p-0 shrink-0 cursor-pointer"
                              aria-label="Copy install command"
                            >
                              {copiedInstall ? (
                                <Icons.Check className="size-3 text-success" />
                              ) : (
                                <Icons.Copy className="size-3" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="text-xs">
                            {copiedInstall ? "Copied!" : "Copy command"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Dependencies */}
                    {visibleDependencies.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                          Dependencies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {visibleDependencies.map((dep) => (
                            <Badge
                              key={dep}
                              variant="secondary"
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted/60 text-foreground border border-border/30 flex items-center gap-1.5"
                            >
                              {getDepIcon(dep)}
                              <span>{dep}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* How to Use Code Section */}
                    {component.howToUse && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                            How to Use
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => handleCodeCopy(component.howToUse!)}
                                className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted p-0 cursor-pointer"
                                aria-label="Copy usage code"
                              >
                                {copiedCode ? (
                                  <Icons.Check className="size-3.5 text-success" />
                                ) : (
                                  <Icons.Copy className="size-3.5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-xs">
                              {copiedCode ? "Copied!" : "Copy code"}
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <CodeBlock
                          code={component.howToUse}
                          language="tsx"
                          filename="Demo.tsx"
                          showFrame={true}
                          showHeader={false}
                          showLineNumbers={false}
                          showCopyButton={false}
                          className="rounded-xl max-h-[300px] overflow-auto border border-border/40 bg-card/60"
                        />
                      </div>
                    )}

                    {/* Interaction Note */}
                    {component.interactionType && (
                      <div className="p-3.5 rounded-xl bg-muted/30 border border-border/30 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                          <Icons.Compass className="size-3.5 text-foreground" />
                          <span>Interaction</span>
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {component.interactionType}
                        </p>
                      </div>
                    )}

                    {/* Inspiration Section */}
                    {component.credit && (
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                          Inspiration
                        </span>
                        <a
                          href={component.credit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/40 transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="size-8 rounded-lg bg-card border border-border/40 flex items-center justify-center shrink-0">
                              <Icons.Twitter className="size-3.5 text-foreground" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                                <span>{component.credit.name}</span>
                                {component.credit.handle && (
                                  <span className="text-muted-foreground font-normal">
                                    {component.credit.handle}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground truncate">
                                {component.credit.label ?? "Original concept & interaction design on 𝕏"}
                              </p>
                            </div>
                          </div>
                          <div className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 pr-1">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="code-tab"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-3"
                  >
                    {/* Source Code Header */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                          Source Code
                        </span>
                        <span className="text-[11.5px] text-muted-foreground font-mono">
                          • {component.sourceCode.split("\n").length} lines
                        </span>
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleCodeCopy(component.sourceCode)}
                            className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted p-0 cursor-pointer"
                            aria-label="Copy source code"
                          >
                            {copiedCode ? (
                              <Icons.Check className="size-3.5 text-success" />
                            ) : (
                              <Icons.Copy className="size-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-xs">
                          {copiedCode ? "Copied code!" : "Copy code"}
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Full Source Code Block */}
                    <CodeBlock
                      code={component.sourceCode}
                      language="tsx"
                      filename={`${component.id}.tsx`}
                      showFrame={true}
                      showHeader={true}
                      showLineNumbers={true}
                      showCopyButton={false}
                      className="rounded-xl max-h-[600px] overflow-auto border border-border/40 bg-card/60"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsible Info & License Footer */}
              <div className="pt-4 border-t border-border/30 space-y-2.5 pb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Shrid Mishra</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="mailto:contact@shrid.site"
                      className="hover:text-foreground transition-colors p-1 rounded hover:bg-muted"
                      aria-label="Email"
                    >
                      <Icons.Mail className="size-3.5" />
                    </a>
                    <a
                      href="https://twitter.com/shridmishra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors p-1 rounded hover:bg-muted font-bold text-xs"
                      aria-label="Twitter"
                    >
                      𝕏
                    </a>
                  </div>
                </div>

                <Collapsible open={isAboutExpanded} onOpenChange={setIsAboutExpanded}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="xs"
                      className="w-full justify-between text-[11px] text-muted-foreground hover:text-foreground px-1 h-6 font-normal cursor-pointer"
                    >
                      <span>About & License Details</span>
                      <Icons.ChevronDown
                        className={cn(
                          "size-3 text-muted-foreground transition-transform duration-200",
                          isAboutExpanded && "rotate-180"
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2.5 pt-2 text-xs text-muted-foreground leading-relaxed">
                    <p>
                      Most components here are recreations and experiments inspired by great work around the web,
                      re-engineered with custom physics and accessible design tokens.
                    </p>
                    <ul className="space-y-1 list-disc list-inside text-[11.5px]">
                      <li>Free to use and modify in personal and commercial projects.</li>
                      <li>Attribution is appreciated.</li>
                      <li>Please do not redistribute or resell as a component kit.</li>
                    </ul>
                    {component.credit && (
                      <p className="pt-2 border-t border-border/30 text-[11.5px]">
                        Inspired by{" "}
                        <a
                          href={component.credit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
                        >
                          {component.credit.name} {component.credit.handle && `(${component.credit.handle})`}
                        </a>{" "}
                        for the original design & concept.
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
