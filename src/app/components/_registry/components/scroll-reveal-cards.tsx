"use client";

import React, { useRef, forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backText: string;
    className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ id, frontSrc, frontAlt, backText, className }, ref) => {
        return (
            <div className={cn("card", className)} id={id} ref={ref}>
                <div className="card-wrapper">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <Image
                                src={frontSrc}
                                alt={frontAlt}
                                width={240}
                                height={360}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flip-card-back">
                            <p className="text-black">{backText}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
Card.displayName = "Card";

export const ScrollRevealCards = () => {
    const container = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(Boolean);
            const position = [14, 38, 62, 86];
            const rotation = [-15, -7.5, 7.5, 15];

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: container.current,
            });

            cards.forEach((card, index) => {
                gsap.to(card, {
                    left: `${position[index]}%`,
                    rotation: `${rotation[index]}`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: "top top",
                        end: "center center",
                        scrub: 0.5,
                    },
                });
            });

            cards.forEach((card, index) => {
                if (!card) return;
                const innerEl = card.querySelector(".flip-card-inner");
                
                ScrollTrigger.create({
                    trigger: scrollContainerRef.current,
                    start: "center center",
                    end: "bottom top",
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const flipRotation = 180 * progress;
                        const cardRotation = rotation[index] * (1 - progress);

                        gsap.to(innerEl, {
                            rotateY: flipRotation,
                            ease: "power1.out",
                            overwrite: "auto",
                        });

                        gsap.to(card, {
                            xPercent: -50,
                            yPercent: -50,
                            rotate: cardRotation,
                            ease: "power1.out",
                            overwrite: "auto",
                        });
                    },
                });
            });
        },
        { scope: container }
    );

    return (
        <div className="w-full h-[300vh] overflow-y-auto" ref={scrollContainerRef}>
            <div
                className="relative w-full h-screen"
                ref={container}
                style={{ fontFamily: '"Instrument Serif", serif' }}
            >
                <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap");

          .card {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 240px;
            height: 360px;
            perspective: 1000px;
          }

          .card p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-size: 20px;
            font-weight: 500;
          }

          .card-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            animation: floating 3s infinite ease-in-out;
          }

          #card-1 .card-wrapper {
            animation-delay: 0s;
          }
          #card-2 .card-wrapper {
            animation-delay: 0.2s;
          }
          #card-3 .card-wrapper {
            animation-delay: 0.4s;
          }
          #card-4 .card-wrapper {
            animation-delay: 0.6s;
          }

          .flip-card-inner {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.6s ease;
          }

          .flip-card-front,
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 0.8em;
            overflow: hidden;
          }

          .flip-card-front {
            transform: rotateY(0deg);
            z-index: 2;
          }

          .flip-card-back {
            transform: rotateY(180deg);
            background-color: #fff;
            padding: 1em;
            z-index: 1;
          }

          @keyframes floating {
            0% {
              transform: translate(-50%, -50%);
            }
            50% {
              transform: translate(-50%, -60%);
            }
            100% {
              transform: translate(-50%, -50%);
            }
          }
        `}</style>
                <section className="cards relative w-full h-full bg-[#70c2ed] overflow-hidden">
                    {[...Array(4)].map((_, index) => (
                        <Card
                            key={index}
                            id={`card-${index + 1}`}
                            frontSrc="https://images.unsplash.com/photo-1535478044878-3ed830034712?q=80&w=2070&auto=format&fit=crop"
                            frontAlt="Card Image"
                            backText="Back"
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};

export const scrollRevealCardsCode = `
"use client";

import React, { useRef, forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backText: string;
    className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ id, frontSrc, frontAlt, backText, className }, ref) => {
        return (
            <div className={cn("card", className)} id={id} ref={ref}>
                <div className="card-wrapper">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <Image
                                src={frontSrc}
                                alt={frontAlt}
                                width={240}
                                height={360}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flip-card-back">
                            <p className="text-black">{backText}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
Card.displayName = "Card";

export const ScrollRevealCards = () => {
    const container = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(Boolean);
            const position = [14, 38, 62, 86];
            const rotation = [-15, -7.5, 7.5, 15];

            ScrollTrigger.create({
                trigger: scrollContainerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: container.current,
            });

            cards.forEach((card, index) => {
                gsap.to(card, {
                    left: \`\${position[index]}%\`,
                    rotation: \`\${rotation[index]}\`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: "top top",
                        end: "center center",
                        scrub: 0.5,
                    },
                });
            });

            cards.forEach((card, index) => {
                if (!card) return;
                const innerEl = card.querySelector(".flip-card-inner");
                
                ScrollTrigger.create({
                    trigger: scrollContainerRef.current,
                    start: "center center",
                    end: "bottom top",
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const flipRotation = 180 * progress;
                        const cardRotation = rotation[index] * (1 - progress);

                        gsap.to(innerEl, {
                            rotateY: flipRotation,
                            ease: "power1.out",
                            overwrite: "auto",
                        });

                        gsap.to(card, {
                            xPercent: -50,
                            yPercent: -50,
                            rotate: cardRotation,
                            ease: "power1.out",
                            overwrite: "auto",
                        });
                    },
                });
            });
        },
        { scope: container }
    );

    return (
        <div className="w-full h-[300vh] overflow-y-auto" ref={scrollContainerRef}>
            <div
                className="relative w-full h-screen"
                ref={container}
                style={{ fontFamily: '"Instrument Serif", serif' }}
            >
                <style jsx global>{\`
          @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap");

          .card {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 240px;
            height: 360px;
            perspective: 1000px;
          }

          .card p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-size: 20px;
            font-weight: 500;
          }

          .card-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            animation: floating 3s infinite ease-in-out;
          }

          #card-1 .card-wrapper {
            animation-delay: 0s;
          }
          #card-2 .card-wrapper {
            animation-delay: 0.2s;
          }
          #card-3 .card-wrapper {
            animation-delay: 0.4s;
          }
          #card-4 .card-wrapper {
            animation-delay: 0.6s;
          }

          .flip-card-inner {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.6s ease;
          }

          .flip-card-front,
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 0.8em;
            overflow: hidden;
          }

          .flip-card-front {
            transform: rotateY(0deg);
            z-index: 2;
          }

          .flip-card-back {
            transform: rotateY(180deg);
            background-color: #fff;
            padding: 1em;
            z-index: 1;
          }

          @keyframes floating {
            0% {
              transform: translate(-50%, -50%);
            }
            50% {
              transform: translate(-50%, -60%);
            }
            100% {
              transform: translate(-50%, -50%);
            }
          }
        \`}</style>
                <section className="cards relative w-full h-full bg-[#70c2ed] overflow-hidden">
                    {[...Array(4)].map((_, index) => (
                        <Card
                            key={index}
                            id={\`card-\${index + 1}\`}
                            frontSrc="https://images.unsplash.com/photo-1535478044878-3ed830034712?q=80&w=2070&auto=format&fit=crop"
                            frontAlt="Card Image"
                            backText="Back"
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};
`;
