"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { ItineraryCarousel } from "@/src/components/ui/itinerary-carousel";

export interface ItineraryCarouselPreviewProps {
  embedded?: boolean;
  className?: string;
}

export function ItineraryCarouselPreview({
  embedded = true,
  className,
}: ItineraryCarouselPreviewProps) {
  return (
    <div className={cn("size-full w-full h-full select-none", className)}>
      <ItineraryCarousel embedded={embedded} showHeader={true} />
    </div>
  );
}

export default ItineraryCarouselPreview;
