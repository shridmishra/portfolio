"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MagicCard } from "@/src/components/ui/magic-card";
import { I_Experience } from "@/src/types/type";
import { experienceData } from "@/src/lib/constants";
import { SeparatorLine } from "@/src/components/ui/separator-line";


export const ExperienceSection = () => {
  return (
    <section>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <header className="text-center my-4 lg:my-6">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground mb-3 tracking-tight" style={{ fontFamily: 'ClashDisplay, sans-serif' }}>
            Experience
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My professional journey building innovative solutions.
          </p>
        </header>

        <SeparatorLine />

        {/* Experience Cards */}
        <div className="space-y-6 mt-8">
          {experienceData.map((exp: I_Experience, idx) => (
            <motion.div
              key={`${exp.company_name}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ExperienceCard experience={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  experience: I_Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div>
      <MagicCard className="bg-card/30 backdrop-blur-sm rounded-sm">
        <div className="p-4 lg:p-8  flex flex-col gap-6">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <Link
              href={experience.company_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 transition-transform hover:scale-105"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-sm overflow-hidden border border-edge bg-background shadow-sm">
                <Image
                  src={experience.company_logo}
                  alt={`${experience.company_name} logo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Experience Details */}
            <div className="flex-1 ">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg lg:text-xl font-normal text-foreground leading-tight mb-2">
                    {experience.job_title}
                  </h3>
                  <p className="text-base text-muted-foreground font-medium">
                    {experience.company_name}
                  </p>
                </div>
                <span className="flex items-center text-center px-4 text-sm text-foreground bg-muted py-1.5 rounded-full border border-edge max-w-32">

                  <span className="whitespace-nowrap font-medium">
                    {experience.duration}
                  </span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </div>
          </div>
        </div>
      </MagicCard>

    </div>


  );
};
