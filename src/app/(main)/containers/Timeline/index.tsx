"use client";

import { useRef, useEffect, useState } from "react";
import { useTodosForTimeline } from "@/app/(main)/lib/queryHooks/useTodosForTimelineQuery";
import { CLASSNAMES } from "@/lib/constants/className";
import { cn } from "@/lib/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import TimelineSVG from "@/app/(main)/containers/Timeline/TimelineSVG";

interface TimelineProps {
  years: number[];
  userId: string;
  startYear: number;
  selectedYear: number;
  onYearChange: (year: number) => void;
  scrollToYear: (year: number) => void;
}

const Timeline = ({
  years,
  userId,
  startYear,
  selectedYear,
  onYearChange,
  scrollToYear,
}: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data, isLoading, error } = useTodosForTimeline({
    userId,
    startYear,
    endYear: years[years.length - 1],
  });

  useEffect(() => {
    if (isInitialLoad && !isLoading) {
      scrollToYear(currentYear);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, isLoading, currentYear, scrollToYear]);

  const handleYearClick = (year: number) => {
    onYearChange(year);
  };

  if (isLoading)
    return <Skeleton className="mb-4 h-[140px] w-full rounded-lg" />;

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div
      ref={timelineRef}
      className={cn(
        "mb-8 overflow-x-auto whitespace-nowrap rounded-lg border",
        CLASSNAMES.TIMELINE_SCROLL,
      )}
      style={{ scrollBehavior: "smooth" }}
    >
      <TimelineSVG
        years={years}
        data={data || []}
        selectedYear={selectedYear}
        currentYear={currentYear}
        onYearClick={handleYearClick}
      />
    </div>
  );
};

export default Timeline;
