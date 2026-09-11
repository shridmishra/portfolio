"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/src/components/layout";

export function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname === "/ui" || pathname.startsWith("/ui/")) {
    return null;
  }
  return <Header />;
}
