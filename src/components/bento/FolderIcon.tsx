import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FolderIcon = () => {
    return (
        <Link
            href="/ui"
            className="w-full h-full p-3.5 md:p-4 flex flex-col justify-between group cursor-pointer relative z-10"
        >
            {/* Header: Title on top-left, Arrow on top-right */}
            <div className="flex items-center justify-between w-full">
                <span className="text-xs md:text-sm font-medium text-foreground">UI Library</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
            </div>

            {/* Folder Center */}
            <div className="flex-1 flex items-center justify-center pt-2">
                <div className="relative w-16 h-12 md:w-20 md:h-16 perspective-1000">
                    {/* Folder Back */}
                    <div
                        className="absolute bottom-0 w-full h-6/6 bg-foreground dark:bg-neutral-800 shadow-lg transform transition-transform duration-300 origin-bottom"
                        style={{
                            clipPath: "path('M 0 6 Q 0 0 6 0 L 25 0 Q 35 0 40 10 L 74 10 Q 80 10 80 16 L 80 47 Q 80 53 74 53 L 6 53 Q 0 53 0 47 Z')",
                        }}
                    ></div>
                    {/* Documents */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-20 transition-all duration-300 ease-out translate-y-4 opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 will-change-transform">
                        {/* Doc 3 (Back) */}
                        <div className="absolute bottom-0 left-1 w-14 h-16 bg-neutral-400 dark:bg-neutral-600 rounded-sm shadow-sm transform origin-bottom transition-all duration-300 ease-out will-change-transform group-hover:-translate-x-4 group-hover:-translate-y-2 group-hover:-rotate-12">
                            <div className="space-y-1 p-1 mt-1 opacity-50"></div>
                        </div>

                        {/* Doc 2 (Middle) */}
                        <div className="absolute bottom-0 left-1 w-14 h-16 bg-neutral-300 dark:bg-neutral-500 rounded-sm shadow-sm transform origin-bottom transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-3">
                            <div className="space-y-1 p-1 mt-1 opacity-60"></div>
                        </div>

                        {/* Doc 1 (Front) */}
                        <div className="absolute bottom-0 left-1 w-14 h-16 bg-neutral-200 dark:bg-neutral-400 rounded-sm shadow-md transform origin-bottom transition-all duration-300 ease-out will-change-transform group-hover:translate-x-4 group-hover:-translate-y-2 group-hover:rotate-12">
                            <div className="space-y-1 p-1 mt-1"></div>
                        </div>
                    </div>

                    {/* Folder Front (Glass) */}
                    <div
                        className="absolute bottom-0 w-full h-5/6 z-10"
                        style={{
                            filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.2)) drop-shadow(0 1px 0 rgba(255,255,255,0.1))"
                        }}
                    >
                        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-900 bg-gradient-to-b from-black/10 dark:from-white/20 to-transparent backdrop-blur-lg flex items-center justify-center overflow-hidden rounded-xs md:rounded-lg"></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
