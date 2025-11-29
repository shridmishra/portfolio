
"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const Stagger = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.from(gridRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            stagger: {
                each: 0.1,
                from: "center",
                grid: "auto"
            }
        });
    }, { scope: containerRef });

    const items = Array.from({ length: 49 }, (_, i) => i + 1);

    return (
        <div ref={containerRef} className="grid grid-cols-7 gap-2">
            {items.map((item, i) => (
                <div
                    key={item}
                    ref={(el) => { gridRef.current[i] = el; }}
                    className="w-12 h-12 bg-card border rounded-md flex items-center justify-center text-lg font-bold"
                />
            ))}
        </div>
    );
};

export const staggerCode = `
"use client";
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const Stagger = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.from(gridRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            stagger: {
                each: 0.1,
                from: "center",
                grid: "auto"
            }
        });
    }, { scope: containerRef });

    const items = Array.from({ length: 49 }, (_, i) => i + 1);

    return (
        <div ref={containerRef} className="grid grid-cols-7 gap-2">
            {items.map((item, i) => (
                <div
                    key={item}
                    ref={(el) => { gridRef.current[i] = el; }}
                    className="w-12 h-12 bg-card border rounded-md flex items-center justify-center text-lg font-bold"
                />
            ))}
        </div>
    );
};
`;
