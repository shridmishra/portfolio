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
                "flex items-center gap-1 px-2 py-1 rounded-lg bg-muted border border-[1.5px] border-dashed border-gray-500 transition-all duration-200 cursor-default",
                className
            )}
            style={{ borderColor: "gray", backgroundColor: "rgba(128, 128, 128, 0.3)" }}
        >
            {Icon && (
                <Icon
                    size={16}
                    className={cn("flex-shrink-0", !isHexColor && color)}
                    style={isHexColor ? { color } : undefined}
                />
            )}
            <span className="text-xl md:text-sm font-medium text-foreground whitespace-nowrap">
                {name}
            </span>
        </div>
    );
};
