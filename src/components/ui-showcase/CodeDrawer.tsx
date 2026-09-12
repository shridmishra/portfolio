"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Button } from "@/src/components/ui/button";
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
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] md:w-[520px] lg:w-[560px] max-w-full bg-card border-l border-border/40 shadow-2xl flex flex-col h-full overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={component.title}
          >
            {/* Drawer Header & Tabs with Muted Background */}
            <div className="bg-muted/60 shrink-0">
              <div className="p-6 pb-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {component.name}
                  </h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={onClose}
                        className="size-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted p-0 cursor-pointer -mt-0.5 -mr-1 shrink-0"
                        aria-label="Close drawer"
                      >
                        <Icons.Close className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="text-xs">
                      Close (Esc)
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Subheading / Description */}
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {component.title}
                </p>
              </div>

              {/* Clean Underline Tabs: Usage & Code */}
              <LayoutGroup id="drawer-tabs">
                <div className="flex items-center gap-6 px-6">
                  {(["usage", "code"] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "pb-3 pt-1 text-[13px] font-medium transition-colors relative cursor-pointer select-none",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="capitalize">{tab}</span>
                        {isActive && (
                          <motion.div
                            layoutId="drawer-tab-underline"
                            className="absolute bottom-0 inset-x-0 h-[2px] bg-foreground rounded-full"
                            transition={{
                              type: "spring",
                              bounce: 0.15,
                              duration: 0.35,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            {/* Drawer Body - Scrollable */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-6 space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "usage" ? (
                  <motion.div
                    key="usage-tab"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Clean Installation Bar with Muted Background */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground">Installation</span>
                        {/* Package Manager Selector */}
                        <div className="flex items-center gap-1">
                          {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
                            <button
                              key={pm}
                              type="button"
                              onClick={() => setPackageManager(pm)}
                              className={cn(
                                "px-2 py-0.5 text-[11px] font-mono rounded-md transition-colors cursor-pointer",
                                packageManager === pm
                                  ? "text-foreground font-semibold bg-background shadow-xs"
                                  : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                              )}
                            >
                              {pm}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-muted px-3.5 py-2.5 text-xs font-mono text-foreground/90 group">
                        <span className="truncate pr-2 select-text text-[11.5px]">
                          {getInstallCommand()}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={handleInstallCopy}
                              className="size-6 text-muted-foreground hover:text-foreground hover:bg-background/60 p-0 shrink-0 cursor-pointer"
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

                    {/* How to Use Code Section with Muted Background */}
                    {component.howToUse && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground">How to use</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => handleCodeCopy(component.howToUse!)}
                                className="size-6 text-muted-foreground hover:text-foreground hover:bg-muted p-0 cursor-pointer"
                                aria-label="Copy usage code"
                              >
                                {copiedCode ? (
                                  <Icons.Check className="size-3 text-success" />
                                ) : (
                                  <Icons.Copy className="size-3" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-xs">
                              {copiedCode ? "Copied!" : "Copy code"}
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="rounded-xl bg-muted p-3.5 overflow-hidden">
                          <CodeBlock
                            code={component.howToUse}
                            language="tsx"
                            filename="Demo.tsx"
                            showFrame={false}
                            showHeader={false}
                            showLineNumbers={false}
                            showCopyButton={false}
                            className="max-h-[260px] overflow-auto text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {/* Details Card (Interaction, Dependencies, Inspiration on unified muted surface) */}
                    <div className="rounded-xl bg-muted p-4 space-y-3.5">
                      {component.interactionType && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                            Interaction
                          </span>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            {component.interactionType}
                          </p>
                        </div>
                      )}

                      {visibleDependencies.length > 0 && (
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-muted-foreground">Dependencies</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {visibleDependencies.map((dep) => (
                              <span
                                key={dep}
                                className="px-2 py-0.5 text-[11px] font-mono rounded bg-background/80 text-foreground"
                              >
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {component.credit && (
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-muted-foreground">Inspiration</span>
                          <a
                            href={component.credit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors group cursor-pointer"
                          >
                            <span>{component.credit.name}</span>
                            {component.credit.handle && (
                              <span className="text-muted-foreground font-normal">
                                {component.credit.handle}
                              </span>
                            )}
                            <svg
                              className="size-3 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17l10-10M7 7h10v10" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code-tab"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="space-y-2.5"
                  >
                    {/* Source Code Header */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-foreground">Source code</span>
                        <span className="text-[11px] text-muted-foreground font-mono">
                          • {component.sourceCode.split("\n").length} lines
                        </span>
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleCodeCopy(component.sourceCode)}
                            className="size-6 text-muted-foreground hover:text-foreground hover:bg-muted/60 p-0 cursor-pointer"
                            aria-label="Copy source code"
                          >
                            {copiedCode ? (
                              <Icons.Check className="size-3 text-success" />
                            ) : (
                              <Icons.Copy className="size-3" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="text-xs">
                          {copiedCode ? "Copied code!" : "Copy code"}
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Full Source Code Block with Muted Background */}
                    <div className="rounded-xl bg-muted p-3.5 overflow-hidden">
                      <CodeBlock
                        code={component.sourceCode}
                        language="tsx"
                        filename={`${component.id}.tsx`}
                        showFrame={false}
                        showHeader={false}
                        showLineNumbers={true}
                        showCopyButton={false}
                        className="max-h-[620px] overflow-auto text-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Minimal Footer */}
              <div className="pt-4 space-y-2 pb-4 text-[11.5px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Shrid Mishra</span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="mailto:contact@shrid.site"
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                      aria-label="Email"
                    >
                      <Icons.Mail className="size-3.5" />
                    </a>
                    <a
                      href="https://twitter.com/shridmishra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors font-bold text-[11.5px] leading-none inline-flex items-center"
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
                      className="w-full justify-between text-[11.5px] text-muted-foreground/80 hover:text-foreground px-0 py-0 h-auto min-h-0 has-[>svg]:px-0 font-normal cursor-pointer hover:bg-transparent shadow-none"
                    >
                      <span>About & License Details</span>
                      <Icons.ChevronDown
                        className={cn(
                          "size-3.5 text-muted-foreground transition-transform duration-200",
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
                      <p className="pt-1.5 text-[11.5px]">
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
