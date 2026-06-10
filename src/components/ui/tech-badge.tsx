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
                "flex items-center gap-2 px-1.5 py-1 md:px-2 md:py-1 rounded-md md:rounded-lg bg-background transition-all duration-200 cursor-default shadow-badge",
                className
            )}
        >
            {Icon && (
                <Icon
                    className={cn("flex-shrink-0 w-3 h-3 md:w-4 md:h-4", !isHexColor && color)}
                    style={isHexColor ? { color } : undefined}
                />
            )}
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground/80 whitespace-nowrap">
                {name}
            </span>
        </div>
    );
};
