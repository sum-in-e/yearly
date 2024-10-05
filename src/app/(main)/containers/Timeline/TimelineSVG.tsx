import TimelineSpot from "@/app/(main)/containers/Timeline/TimelineSpot";
import { TodosByYear } from "@/lib/types/todo";
import { cn } from "@/lib/utils/cn";

interface TimelineSVGProps {
  years: number[];
  data: TodosByYear;
  selectedYear: number;
  currentYear: number;
  onYearClick: (year: number) => void;
}

const TimelineSVG = ({
  years,
  data,
  selectedYear,
  currentYear,
  onYearClick,
}: TimelineSVGProps) => {
  return (
    <svg className={cn(`h-28`)} width={years.length * 100}>
      {years.map(
        (year, index) =>
          index > 0 && (
            <line
              key={`line-${year}`}
              x1={(index - 1) * 100 + 50}
              y1="40"
              x2={index * 100 + 50}
              y2="40"
              className="stroke-zinc-300 stroke-1"
            />
          ),
      )}
      {years.map((year, index) => (
        <TimelineSpot
          key={`spot-${year}`}
          year={year}
          index={index}
          selectedYear={selectedYear}
          currentYear={currentYear}
          todosForYear={data[year] || []}
          onClick={() => onYearClick(year)}
        />
      ))}
    </svg>
  );
};

export default TimelineSVG;
