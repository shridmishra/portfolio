"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/src/components/layout";

export function ConditionalHeader() {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith("/components");

  if (hideHeader) return null;
  return <Header />;
}
