"use client"

import { useCallback, useRef, type ComponentProps } from "react"
import { differenceInMonths, parse } from "date-fns"
import ReactMarkdown from "react-markdown"

import { cn } from "@/src/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible"
import { Separator } from "@/src/components/ui/separator"
import type { ChevronsUpDownIconHandle } from "@/src/components/chevrons-up-down-icon"
import { ChevronsUpDownIcon } from "@/src/components/chevrons-up-down-icon"
import { Briefcase, InfinityIcon, LockIcon, ChevronDown } from "lucide-react"
import { TechBadge } from "@/src/components/ui/tech-badge"
import { TECH_ICONS } from "@/src/lib/constants"

export type ExperiencePositionItemType = {
  /** Unique identifier for the position */
  id: string
  /** The job title or position name */
  title: string
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** The type of employment (e.g., "Full-time", "Part-time", "Contract") */
  employmentType?: string
  /** A brief description of the position or responsibilities */
  description?: string
  /** An icon representing the position */
  icon?: React.ReactElement
  /** A list of skills associated with the position */
  skills?: string[]
  /** Indicates if the position details are expanded in the UI */
  isExpanded?: boolean
}

export type ExperienceItemType = {
  /** Unique identifier for the experience item */
  id: string
  /** Name of the company where the experience was gained */
  companyName: string
  /** URL or path to the company's logo image */
  companyLogo?: string
  /** Custom className for company logo image (e.g. "dark:invert") */
  logoClassName?: string
  /** URL to the company's website. */
  companyWebsite?: string
  /**
   * List of positions held at the company
   * @fumadocsHref #experiencepositionitemtype
   * */
  positions: ExperiencePositionItemType[]
  /** Indicates if this is the user's current employer */
  isCurrentEmployer?: boolean
}

export type WorkExperienceProps = {
  className?: string
  /** @fumadocsHref #experienceitemtype */
  experiences: ExperienceItemType[]
}

export function WorkExperience({
  className,
  experiences,
}: WorkExperienceProps) {
  return (
    <div className={cn("bg-background px-4 text-foreground", className)}>
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  )
}

export type ExperienceItemProps = {
  experience: ExperienceItemType;
  isLast?: boolean;
}

export function ExperienceItem({ experience, isLast }: ExperienceItemProps) {
  const primaryPosition = experience.positions[0];
  const primaryTitle = primaryPosition?.title;

  return (
    <div className="relative py-3.5">
      {/* Vertical line connecting to next company logo */}
      {!isLast && (
        <div className="absolute left-[13px] top-9 bottom-0 w-px bg-border/60 pointer-events-none" />
      )}

      {primaryPosition ? (
        <Collapsible
          defaultOpen={primaryPosition.isExpanded ?? false}
          disabled={!primaryPosition.description}
        >
          <div className="not-prose flex items-center justify-between gap-3">
            <CollapsibleTrigger
              className={cn(
                "group/experience-position not-prose flex items-center justify-between gap-3 text-left select-none cursor-pointer w-full",
                "disabled:cursor-default"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-black border border-border/70 text-foreground/80 z-10 overflow-hidden shadow-xs">
                  {experience.companyLogo ? (
                    <img
                      src={experience.companyLogo}
                      alt={experience.companyName}
                      className={cn("size-4.5 object-contain", experience.logoClassName)}
                    />
                  ) : (
                    <Briefcase className="size-3.5" />
                  )}
                </div>

                <h3 className="text-base sm:text-lg leading-snug flex items-center gap-2 flex-wrap">
                  {experience.companyWebsite ? (
                    <a
                      className="link font-medium text-foreground hover:underline min-h-[44px] py-1.5 inline-flex items-center cursor-pointer"
                      href={experience.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {experience.companyName}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{experience.companyName}</span>
                  )}
                  {primaryTitle && (
                    <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                      • {primaryTitle}
                    </span>
                  )}
                
                </h3>
              </div>

              {primaryPosition.description && (
                <div className="shrink-0 text-muted-foreground pr-1">
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/experience-position:rotate-180" />
                </div>
              )}
            </CollapsibleTrigger>
          </div>

          <div className="relative space-y-3 pt-2">
            {experience.positions.map((position) => (
              <ExperiencePositionDetails key={position.id} position={position} />
            ))}
          </div>
        </Collapsible>
      ) : null}
    </div>
  )
}

export type ExperiencePositionDetailsProps = {
  position: ExperiencePositionItemType
}

export function ExperiencePositionDetails({
  position,
}: ExperiencePositionDetailsProps) {
  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = formatDuration(start, end)

  return (
    <div className="relative">
      <dl className="relative z-1 flex items-center gap-2 pl-10 text-xs sm:text-sm text-muted-foreground">
        {position.employmentType && (
          <>
            <div>
              <dt className="sr-only">Employment Type</dt>
              <dd className="font-medium">{position.employmentType}</dd>
            </div>

            <Separator
              className="data-vertical:h-3.5 data-vertical:self-center"
              orientation="vertical"
            />
          </>
        )}

        <div>
          <dt className="sr-only">Employment Period</dt>
          <dd className="flex items-center gap-1 tabular-nums">
            <span>{start}</span>
            <span className="font-mono">-</span>
            {isOngoing ? (
              <span className="font-medium text-foreground/90">Present</span>
            ) : (
              <span>{end}</span>
            )}
          </dd>
        </div>

        {duration && (
          <>
            <Separator
              className="data-vertical:h-3.5 data-vertical:self-center"
              orientation="vertical"
            />
            <div>
              <dt className="sr-only">Duration</dt>
              <dd className="tabular-nums">{duration}</dd>
            </div>
          </>
        )}
      </dl>

      <CollapsibleContent className="overflow-hidden transition-all">
        {position.description && (
          <Prose className="pt-2.5 pl-10">
            <ReactMarkdown>{position.description}</ReactMarkdown>
          </Prose>
        )}
      </CollapsibleContent>
    </div>
  )
}


function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none prose-sm dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 text-muted-foreground/90 font-normal leading-relaxed text-xs sm:text-sm",
        className
      )}
      {...props}
    />
  )
}

function Skill({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  // Both year-only: granularity is years, no month arithmetic needed.
  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  // +1 to count both the start and end months inclusively.
  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return `${years}y`
  }
  return `${years}y ${months}m`
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date())
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}
