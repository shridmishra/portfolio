"use client";
import Image from "next/image";
import Link from "next/link";
import { FlipWords } from "@/src/components/ui/flip-words";
import { words } from "@/src/lib/constants";
import { Mail, Calendar, ArrowRight } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaGithub, FaPaperclip } from "react-icons/fa6";
import { SeparatorLine } from "@/src/components/ui/separator-line";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { HoverBorderGradient } from "@/src/components/ui/hover-border-gradient";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <section className="relative screen-line-before before:-top-px pt-12 group/hero">


      {/* Banner Section with Background Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0 ">
          <Image
            src="/assets/banner.jpeg"
            alt="Banner"
            fill
            className="object-cover transition-all duration-500"
            priority
          />
          {/* Overlay gradient - darker at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40 dark:from-background/80 dark:via-background/40 dark:to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 dark:from-background/60 dark:via-transparent dark:to-background/60" />
        </div>

        {/* Profile Picture - Positioned at bottom */}
        <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 translate-y-1/2 z-10">
          <motion.div
            className="group"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-2 ring-edge hover:ring-4 hover:ring-foreground/20 transition-all duration-300">
              <Image
                src="/assets/me.jpg"
                width={144}
                height={144}
                alt="Shrid Mishra"
                className="w-full h-full object-cover transition-all duration-300"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 sm:px-8 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            className="flex flex-col gap-4 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Name and Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2 leading-tight flex items-center gap-2" style={{ fontFamily: '"Instrument Serif", serif' }}>
                Shrid Mishra
              </h1>
              <div className="flex items-center justify-between gap-4">
                <FlipWords
                  words={words}
                  className="text-md sm:text-lg text-muted-foreground/80 font-thin"
                />
                <div className="flex items-center gap-2 sm:gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://linkedin.com/in/shridmishra" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-foreground/5 hover:text-muted-foreground text-foreground transition-all duration-200">
                        <FaLinkedin className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://twitter.com/shridmishra" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-foreground/5 hover:text-muted-foreground text-foreground transition-all duration-200">
                        <FaXTwitter className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://github.com/shridmishra" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-foreground/5 hover:text-muted-foreground text-foreground transition-all duration-200">
                        <FaGithub className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-foreground/5 hover:text-muted-foreground text-foreground transition-all duration-200">
                        <FaPaperclip className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Resume</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </motion.div>

          <SeparatorLine />

          {/* Professional Info */}
          <motion.div
            className="space-y-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground my-6 text-md lg:text-lg max-w-2xl leading-relaxed">
              I love both <span className="text-foreground font-medium">Design</span> & <span className="text-foreground font-medium">Development</span>. That means I can create beautiful and functional websites. I&apos;m always looking for new opportunities to learn and grow.
            </p>

           
          </motion.div>
        </div>
      </div>


    </section>
  );
};
