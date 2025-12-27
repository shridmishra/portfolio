import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/src/lib/utils";

interface TechBadgeProps {
    name: string;
    icon?: IconType;
    color?: string;
    className?: string;
}

export const TechBadge = ({ name, icon: Icon, color, className }: TechBadgeProps) => {
    const isHexColor = color?.startsWith("#");

    return (
        <div
            className={cn(
                "flex items-center gap-1 px-1.5 py-1 md:px-2 md:py-1 rounded-md md:rounded-lg bg-muted border border-[1.5px] border-dashed border-gray-500 transition-all duration-200 cursor-default",
                className
            )}
            style={{ borderColor: "gray", backgroundColor: "rgba(128, 128, 128, 0.2)" }}
        >
            {Icon && (
                <Icon
                    className={cn("flex-shrink-0 w-3 h-3 md:w-4 md:h-4", !isHexColor && color)}
                    style={isHexColor ? { color } : undefined}
                />
            )}
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
                {name}
            </span>
        </div>
    );
};
