"use client";
import Image from "next/image";
import Link from "next/link";
import { FlipWords } from "@/src/components/ui/flip-words";
import { words } from "@/src/lib/constants";
import {
  MapPin,
  Mail,
  CodeXml,
  UserPen,
  BadgeCheck
} from "lucide-react";
import { FaLinkedin, FaXTwitter, FaGithub, FaPaperclip } from "react-icons/fa6";
import Text from "@/src/components/ui/text";
import { SeparatorLine } from "@/src/components/ui/separator-line";

export const Hero = () => {
  return (
    <section className="relative border-x border-edge screen-line-before screen-line-after before:-top-px after:-bottom-px">
   

      {/* Banner Section with Background Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/banner.jpeg"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient - darker at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40 dark:from-background/80 dark:via-background/40 dark:to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 dark:from-background/60 dark:via-transparent dark:to-background/60" />
        </div>

        {/* Profile Picture - Positioned at bottom */}
        <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 translate-y-1/2 z-10">
          <div className="group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-2 ring-edge">
              <Image
                src="/assets/me.jpg"
                width={144}
                height={144}
                alt="Shrid Mishra"
                className="
        w-full h-full object-cover 
        transition-all duration-300
       lg:group-hover:filter-none lg:filter lg:grayscale
        
      "
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pt-20 pb-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col gap-6 mb-6">
            {/* Name and Title */}
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-medium mb-1 leading-tight flex items-center gap-2" style={{ fontFamily: 'ClashDisplay, sans-serif' }}>
                Shrid Mishra
                <BadgeCheck className="text-foreground/80" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <FlipWords
                  words={words}
                  className="text-md sm:text-lg text-muted-foreground/80 font-medium"
                />
                <div className="flex items-center gap-3">
                  <Link href="https://linkedin.com/in/shridmishra" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground text-foreground transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                  </Link>
                  <Link href="https://twitter.com/shridmishra" target="_blank" rel="noopener noreferrer" className=" hover:text-muted-foreground text-foreground transition-colors">
                    <FaXTwitter className="w-5 h-5" />
                  </Link>
                  <Link href="https://github.com/shridmishra" target="_blank" rel="noopener noreferrer" className=" hover:text-muted-foreground text-foreground transition-colors">
                    <FaGithub className="w-5 h-5" />
                  </Link>
                  <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground text-foreground transition-colors">
                    <FaPaperclip className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
             <SeparatorLine />


          {/* Professional Info */}
          <div className="space-y-1 max-w-2xl mx-auto sm:mx-0">
            <div className="text-muted my-8 text-md lg:text-lg">I love both <span className="text-foreground">Design</span> & <span className="text-foreground">Development</span>. so, That means I can create beautiful and functional websites. I&apos;m always looking for new opportunities to learn and grow.</div>

   <SeparatorLine />

            <div className="flex items-start lg:items-center gap-3 ">
              <CodeXml className="w-5 h-5 text-muted-foreground flex-shrink-0 " />
              <Text text="Full Stack & Blockchain Engineer" />

            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <Text text="Mumbai, IN" />


            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <Link
                href="mailto:shridmishra00@gmail.com"
                className="text-base sm:text-lg text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                <Text text="shridmishra00@gmail.com" />

              </Link>
            </div>

            <div className="flex items-center gap-3 text-foreground/80 text-base sm:text-lg">
              <UserPen className="w-5 h-5 text-foreground/60 flex-shrink-0" />
              <Text text="21, He/Him" />


            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 pr-1">
                <div className="w-2 h-2 bg-accent-foreground rounded-full animate-pulse shadow-sm"></div>
              </div>
              <div className="text-lg text-foreground/80 font-medium">
                <Text text="Available for Hire" />

              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};
