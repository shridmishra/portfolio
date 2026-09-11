"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";

const mango = "/assets/showcase/cards/mango.jpg";
const images = [mango, mango, mango];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

function Carousel({
  setIndex,
  className,
  imageClassName,
}: {
  setIndex: (index: number) => void;
  className?: string;
  imageClassName?: string;
}) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    setPage([newPage, newDirection]);
    setIndex(wrap(0, images.length, newPage));
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ""}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover ${imageClassName ?? ""}`}
          alt="Alphonso Mango"
        />
      </AnimatePresence>
    </div>
  );
}

export interface MangoCardsPreviewProps {
  accent?: string;
}

export function MangoCardsPreview({ accent }: MangoCardsPreviewProps = {}) {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center justify-center p-2 sm:p-4 w-full max-w-5xl mx-auto select-none">
      {/* Card 1: Compact Version */}
      <div className="relative w-[320px] h-[480px] bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 rounded-[32px] shadow-xl overflow-hidden flex flex-col group transition-transform hover:scale-[1.02] duration-300">
        {/* Image Section */}
        <div className="relative h-[320px] w-full overflow-hidden p-2">
          <Carousel
            setIndex={setIndex1}
            imageClassName="rounded-[28px]"
          />
          <div className="absolute top-6 left-6 bg-black/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full z-10">
            20% off
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index1 ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="flex-1 px-5 pt-2 pb-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-50">
                Alphonso
              </h3>
              <span className="bg-gray-950 text-white dark:bg-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
                ₹270
              </span>
            </div>
            <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed mb-3">
              Loved worldwide for their sweetness our Alphonso mangoes are a
              delicious delight wherever you are.
            </p>
            <div className="flex gap-2 mb-4">
              <span className="bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                Best Seller
              </span>
              <span className="bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                9 left
              </span>
            </div>
          </div>

          <Button className="w-full bg-mango-brown hover:bg-mango-brown-hover text-white text-sm font-semibold py-3 h-auto rounded-2xl transition-colors flex items-center justify-center gap-2">
            Add to cart
          </Button>
        </div>
      </div>

      {/* Card 2: Expanded/Immersive Version */}
      <div className="relative w-[320px] h-[480px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col group transition-transform hover:scale-[1.02] duration-300">
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <Carousel setIndex={setIndex2} />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-mango-gold via-mango-gold/80 to-transparent pt-40 pointer-events-none z-10" />
        </div>

        <div className="absolute top-4 right-4 bg-black/10 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full z-20">
          20% off
        </div>

        {/* Pagination Dots */}
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index2 ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="relative z-20 mt-auto px-6 pb-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold">Alphonso</h3>
            <span className="bg-black/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full ">
              ₹270
            </span>
          </div>

          <p className="text-white/90 text-sm leading-relaxed mb-4 font-medium">
            Loved worldwide for their sweetness our Alphonso mangoes are a
            delicious delight wherever you are.
          </p>

          <div className="flex gap-2 mb-6">
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full ">
              Best Seller
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-full ">
              9 left
            </span>
          </div>

          <Button className="w-full bg-white text-black hover:bg-gray-50 text-sm font-bold py-4 h-auto rounded-full transition-colors shadow-lg ">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
