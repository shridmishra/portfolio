"use client";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Skeleton } from "@/src/components/ui/skeleton";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export default function GitHubContributionGraph() {
  const [contributionData, setContributionData] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  // Generate mock data
  const generateMockData = () => {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const currentDate = new Date(startDate);
    let totalContribs = 0;

    for (let week = 0; week < 53; week++) {
      const contributionDays: ContributionDay[] = [];
      for (let day = 0; day < 7; day++) {
        if (currentDate <= today) {
          const rand = Math.random();
          let contributionCount = 0;
          if (rand > 0.7) contributionCount = Math.floor(Math.random() * 3) + 1;
          else if (rand > 0.85) contributionCount = Math.floor(Math.random() * 5) + 4;
          else if (rand > 0.95) contributionCount = Math.floor(Math.random() * 10) + 8;
          totalContribs += contributionCount;
          contributionDays.push({
            date: currentDate.toISOString().split("T")[0],
            contributionCount,
            color: contributionCount === 0 ? "#161b22" : "#39d353",
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if (contributionDays.length > 0) {
        weeks.push({ contributionDays });
      }
    }
    setContributionData(weeks.slice(-39));
    setTotalContributions(totalContribs);
  };

  // Fetch real data from your API
  const fetchContributionData = async () => {
    try {
      const res = await fetch("/api/github-contributions");
      const data = await res.json();
      if (data.error) return;
      setContributionData(data.weeks.slice(-39));
      setTotalContributions(data.totalContributions);
    } catch {
      // ignore errors to keep mock data
    }
  };

  useEffect(() => {
    generateMockData();
    fetchContributionData();
    // Set loading to false after a short delay to show skeleton
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get contribution intensity CSS class
  const getContributionIntensity = (count: number) => {
    if (count === 0) return "bg-secondary border-none";
    if (count <= 2) return "bg-green-400 dark:bg-green-900 border-none";
    if (count <= 5) return "bg-green-500 dark:bg-green-700 border-none";
    if (count <= 8) return "bg-green-600 dark:bg-green-500 border-none";
    return "bg-green-800 dark:bg-green-300 border-none";
  };

  // Format date for tooltip
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Generate month labels above the graph
  // We'll show month abbreviations above weeks where the first day of the week is in that month
  const getMonthLabels = () => {
    if (!contributionData.length) return null;

    const months: { [key: string]: string } = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    const labels = contributionData.map((week, i) => {
      const firstDay = week.contributionDays[0];
      if (!firstDay) return null;
      const monthIndex = new Date(firstDay.date).getMonth();

      // Show label only if first week or month changes from previous
      if (
        i === 0 ||
        (i > 0 &&
          new Date(contributionData[i - 1].contributionDays[0].date).getMonth() !== monthIndex)
      ) {
        return (
          <div
            key={i}
            className="text-xs text-secondary w-2.5 text-center font-mono"
            style={{ marginLeft: i === 0 ? 2 : 0 }}
          >
            {months[monthIndex]}
          </div>
        );
      }
      return <div key={i} className="w-2.5" />;
    });

    return <div className="flex gap-1 mb-1">{labels}</div>;
  };

  return (
    <div className="bg-background p-4 rounded-lg group w-full h-full flex items-center justify-center">
      <div className="w-fit">
        {loading ? (
          <div className="space-y-2">
            <div className="flex gap-1 mb-1">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-3 w-8" />
              ))}
            </div>
            <div className="flex gap-1">
              {[...Array(39)].map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {[...Array(7)].map((_, dayIndex) => (
                    <Skeleton key={dayIndex} className="w-2.5 h-2.5 rounded-xs" />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ) : (
          <>
            {/* Month labels */}
            {getMonthLabels()}

            {/* Contribution grid */}
            <div className="flex gap-1">
              {contributionData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day, dayIndex) => (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-2.5 h-2.5 border rounded-xs cursor-pointer transition-all duration-150 hover:border-gray-400 ${getContributionIntensity(
                            day.contributionCount
                          )}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {day.contributionCount === 0
                            ? `No contributions on ${formatDate(day.date)}`
                            : `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatDate(day.date)}`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs text-secondary">
                <span className="font-medium text-secondary">{totalContributions.toLocaleString()}</span> contributions
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 bg-secondary rounded-sm"></div>
                  <div className="w-2.5 h-2.5 bg-green-200 dark:bg-green-900 rounded-sm"></div>
                  <div className="w-2.5 h-2.5 bg-green-400 dark:bg-green-700 rounded-sm"></div>
                  <div className="w-2.5 h-2.5 bg-green-600 dark:bg-green-500 rounded-sm"></div>
                  <div className="w-2.5 h-2.5 bg-green-800 dark:bg-green-300 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
