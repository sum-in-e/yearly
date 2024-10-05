"use client";

import Achievement from "@/app/(main)/containers/Achievement";
import Timeline from "@/app/(main)/containers/Timeline";
import React, { useState, useMemo, useCallback } from "react";

interface Props {
  birthYear: number;
  userId: string;
}

const MainContainer = ({ birthYear, userId }: Props) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // years 배열을 생성합니다. birthYear부터 100년 후까지의 연도를 포함합니다.
  const years = useMemo(() => {
    const endYear = birthYear + 99;
    return Array.from(
      { length: endYear - birthYear + 1 },
      (_, i) => birthYear + i,
    );
  }, [birthYear]);

  const scrollToYear = useCallback(
    (year: number) => {
      const timelineElement = document.querySelector(".timeline-scroll");
      if (timelineElement) {
        const yearIndex = years.findIndex((y) => y === year);
        if (yearIndex !== -1) {
          const scrollPosition = yearIndex * 100; // 각 연도 항목의 너비가 100px이라고 가정
          timelineElement.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    },
    [years],
  );

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <Timeline
        startYear={birthYear}
        userId={userId}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        years={years}
        scrollToYear={scrollToYear}
      />
      <section className="flex justify-center">
        <div className="w-[600px] max-w-[600px]">
          <Achievement
            userId={userId}
            selectedYear={selectedYear}
            years={years}
            onYearChange={handleYearChange}
            scrollToYear={scrollToYear}
          />
        </div>
      </section>
    </div>
  );
};

export default MainContainer;
