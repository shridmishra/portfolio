"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { cn } from "@/src/lib/utils";

export function Header() {
  const navItems = [
    { title: "Projects", href: "/projects" },
    
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      setIsDesktop(window.innerWidth >= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <motion.nav
        animate={{
          width: isDesktop ? (scrolled ? "45%" : "55%") : "95%",
          y: scrolled ? 10 : 0,
          borderRadius: scrolled ? "2.5rem" : "0rem", 
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex mx-auto items-center justify-between",
          "px-4 py-3 bg-background/80 backdrop-blur-lg font-display border-b",
          "text-foreground transition-all duration-300",
          scrolled ? "border-border/40 shadow-md" : "border-transparent sm:border-transparent"
        )}
        style={{
            maxWidth: "46rem"
        }}
      >
        <Link href="/" className="hover:opacity-75 transition-opacity duration-300">
          <Image
            className="w-9 h-9 rounded-full shadow-sm object-cover lg:hidden"
            src="/assets/me.jpg"
            width={100}
            height={100}
            alt="Avatar"
          />
          <Image
            className="w-20 h-auto hidden lg:block invert-0 dark:invert"
            src="/assets/logo.svg"
            width={100}
            height={100}
            alt="Logo"
          />
        </Link>

        {/* Navigation links on the right */}
        <div className="ml-auto flex flex-wrap items-center justify-end ">
          {navItems.map((item, idx) => (
            <Link
              className="text-sm relative px-3 py-1.5 text-muted-foreground font-medium transition-colors duration-300 hover:text-foreground"
              href={item.href}
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="h-full w-full absolute inset-0 rounded-md bg-muted"
                />
              )}
              <span className="relative z-10">{item.title}</span>
            </Link>
          ))}
          
          <div className="pl-2 border-l bg-background/10 border-border/50">
            <motion.div
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

