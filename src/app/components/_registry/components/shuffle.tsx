
"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '@/src/components/ui/button';

export const Shuffle = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<(HTMLDivElement | null)[]>([]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const shuffleGrid = contextSafe(() => {
        gsap.to(gridRef.current, {
            scramble: {
                text: "X",
                chars: "lowerCase",
                speed: 0.3,
                revealDelay: 0.5,
                newClass: "text-red-500"
            }
        });
        gsap.to(gridRef.current, {
            duration: 1,
            scramble: {
                text: "X",
                chars: "upperCase",
                speed: 0.3,
                revealDelay: 0.5,
                newClass: "text-blue-500"
            }
        });
        gsap.to(gridRef.current, {
            duration: 1,
            scramble: {
                text: "{original}",
                chars: "upperCase",
                speed: 0.3,
                revealDelay: 0.5,
                newClass: ""
            }
        });
    });

    const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
        <div ref={containerRef} className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-2">
                {items.map((item, i) => (
                    <div
                        key={item}
                        ref={(el) => { gridRef.current[i] = el; }}
                        className="w-20 h-20 bg-card border rounded-md flex items-center justify-center text-2xl font-bold"
                    >
                        {item}
                    </div>
                ))}
            </div>
            <Button onClick={shuffleGrid}>Shuffle</Button>
        </div>
    );
};

export const shuffleCode = `
"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '@/src/components/ui/button';

export const Shuffle = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<(HTMLDivElement | null)[]>([]);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const shuffleGrid = contextSafe(() => {
        gsap.to(gridRef.current, {
            scramble: {
                text: "X",
                chars: "lowerCase",
                speed: 0.3,
                revealDelay: 0.5,
                newClass: "text-red-500"
            }
        });
        gsap.to(gridRef.current, {
            duration: 1,
            scramble: {
                text: "X",
                chars: "upperCase",
                speed: 0.3,
                revealDelay: 0.5,
                newClass: "text-blue-500"
            }
        });
        gsap.to(gridRef.current, {
            duration: 1,
            scramble: {
                text: "{original}",
                chars: "upperCase",
                speed: 0.3,
                revealDelay: 0.5,
                newClass: ""
            }
        });
    });

    const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
        <div ref={containerRef} className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-2">
                {items.map((item, i) => (
                    <div
                        key={item}
                        ref={(el) => { gridRef.current[i] = el; }}
                        className="w-20 h-20 bg-card border rounded-md flex items-center justify-center text-2xl font-bold"
                    >
                        {item}
                    </div>
                ))}
            </div>
            <Button onClick={shuffleGrid}>Shuffle</Button>
        </div>
    );
};
`;
