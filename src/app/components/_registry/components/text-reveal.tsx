"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TextReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const text = "Hello World";
    const chars = text.split("");

    useGSAP(() => {
        if (!textRef.current) return;
        const charElements = textRef.current.children;

        gsap.from(charElements, {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.out",
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen flex items-center justify-center">
            <h1 ref={textRef} className="text-6xl font-bold" style={{ overflow: 'hidden' }}>
                {chars.map((char, index) => (
                    <span key={index} style={{ display: 'inline-block' }}>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export const textRevealCode = `
"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TextReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const text = "Hello World";
    const chars = text.split("");

    useGSAP(() => {
        if (!textRef.current) return;
        const charElements = textRef.current.children;

        gsap.from(charElements, {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.out",
            duration: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen flex items-center justify-center">
            <h1 ref={textRef} className="text-6xl font-bold" style={{ overflow: 'hidden' }}>
                {chars.map((char, index) => (
                    <span key={index} style={{ display: 'inline-block' }}>
                        {char === " " ? "\\u00A0" : char}
                    </span>
                ))}
            </h1>
        </div>
    );
};
`;
