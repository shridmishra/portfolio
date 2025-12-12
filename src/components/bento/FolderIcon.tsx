import React from "react";
import { ArrowUpRight } from "lucide-react";

export const FolderIcon = () => {
    return (
        <a 
            href="https://ui.shrid.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 group cursor-pointer relative"
        >
            {/* URL on hover - top left */}
            <div className="absolute -bottom-8 -left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-neutral-600 dark:text-neutral-400">ui.shrid.in</span>
            </div>
            
            {/* Arrow on hover - top right */}
            <div className="absolute -top-8 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </div>

            <div className="relative w-20 h-16 perspective-1000">
                {/* Folder Back */}
                <div
                    className="absolute bottom-0 w-full h-6/6 bg-neutral-400 dark:bg-neutral-800 shadow-lg transform transition-transform duration-300 origin-bottom"
                    style={{
                        clipPath: "path('M 0 6 Q 0 0 6 0 L 25 0 Q 35 0 40 10 L 74 10 Q 80 10 80 16 L 80 47 Q 80 53 74 53 L 6 53 Q 0 53 0 47 Z')",
                    }}
                ></div>
                {/* Documents */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-20 transition-all duration-300 ease-out translate-y-4 opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 will-change-transform">
                    {/* Doc 3 (Back) */}
                    <div className="absolute bottom-0 left-1 w-14 h-16 bg-neutral-400 dark:bg-neutral-600 rounded-sm shadow-sm transform origin-bottom transition-all duration-300 ease-out will-change-transform group-hover:-translate-x-4 group-hover:-translate-y-2 group-hover:-rotate-12">
                        <div className="space-y-1 p-1 mt-1 opacity-50">

                        </div>
                    </div>

                    {/* Doc 2 (Middle) */}
                    <div className="absolute bottom-0 left-1 w-14 h-16 bg-neutral-300 dark:bg-neutral-500 rounded-sm shadow-sm transform origin-bottom transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-3">
                        <div className="space-y-1 p-1 mt-1 opacity-60">

                        </div>
                    </div>

                    {/* Doc 1 (Front) */}
                    <div className="absolute bottom-0 left-1 w-14 h-16 bg-neutral-200 dark:bg-neutral-400 rounded-sm shadow-md transform origin-bottom transition-all duration-300 ease-out will-change-transform group-hover:translate-x-4 group-hover:-translate-y-2 group-hover:rotate-12">
                        <div className="space-y-1 p-1 mt-1">

                        </div>
                    </div>
                </div>

                {/* Folder Front (Glass) */}
                <div
                    className="absolute bottom-0 w-full h-5/6 z-10"
                    style={{
                        filter: "drop-shadow(0 5px 5px rgba(0,0,0,0.2)) drop-shadow(0 1px 0 rgba(255,255,255,0.1))"
                    }}
                >
                    <div
                        className="w-full h-full bg-neutral-200 dark:bg-neutral-900 bg-gradient-to-b from-black/10 dark:from-white/20 to-transparent backdrop-blur-lg flex items-center justify-center overflow-hidden rounded-lg"
                    >
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 ml-8 text-md text-neutral-600 dark:text-neutral-400">
                <p className="relative hover:text-neutral-900 dark:hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Landing Pages</p>
                <p className="relative hover:text-neutral-900 dark:hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Components</p>
                <p className="relative hover:text-neutral-900 dark:hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Hero Sections</p>
            </div>
        </a>
    );
};
