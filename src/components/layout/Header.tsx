"use client";
import { cn } from "@/src/lib/utils";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();

  const baseLink =
    "text-sm transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300";
  const inactive = "text-muted-foreground hover:text-foreground";
  const active = "text-foreground font-medium after:w-full";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 border-b-2 border-edge",
        "bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="mx-auto max-w-xl sm:max-w-4xl flex items-center justify-between px-4 sm:px-8 lg:px-4 py-4 border-l-2 border-r-2 border-edge">
        {/* Logo */}
        <div className="">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              className="h-8 w-auto invert-0 dark:invert"
              height={50}
              width={50}
            />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              baseLink,
              pathname === "/" ? active : inactive
            )}
          >
            Portfolio
          </Link>
          <Link
            href="/projects"
            className={cn(
              baseLink,
              pathname?.startsWith("/projects") ? active : inactive
            )}
          >
            Projects
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

