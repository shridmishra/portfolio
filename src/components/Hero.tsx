"use client";
import Image from "next/image";
import Link from "next/link";
import BorderFrame from "./ui/BorderFrame";
import { FlipWords } from "./ui/flip-words";
import { words } from "../lib/constants";
import {
  MapPin,
  Mail,


  CodeXml,
  UserPen,
  BadgeCheck
} from "lucide-react";
import Text from "./ui/text";

export const Hero = () => {
  return (
    <section className="relative pb-6 lg:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 mb-4 sm:mb-6">
          {/* Profile Picture */}

          <div className="group flex items-start">
            <BorderFrame className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 ">
              <Image
                src="/assets/me.jpg"
                width={128}
                height={128}
                alt="Shrid Mishra"
                className="
        w-full h-full object-cover 
        transition-all duration-300
       lg:group-hover:filter-none lg:filter lg:grayscale
        
      "
                priority
              />
            </BorderFrame>
          </div>







          <div className="flex-1  ">
            <div className="text-xl sm:text-2xl lg:text-3xl font-medium mb-1 leading-tight flex items-center gap-2 ">
              Shrid Mishra
              <BadgeCheck className="text-foreground/80" />
            </div>
            <FlipWords
              words={words}
              className="text-md sm:text-lg text-muted-foreground/80 font-medium"
            />
          </div>
        </div>

        {/* Professional Info */}
        <div className="space-y-1 max-w-2xl mx-auto sm:mx-0">
          <div className="text-muted my-8 text-md lg:text-lg">I love both <span className="text-foreground">Design</span> & <span className="text-foreground">Development</span>. so, That means I can create beautiful and functional websites. I&apos;m always looking for new opportunities to learn and grow.</div>
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
    </section>
  );
};
