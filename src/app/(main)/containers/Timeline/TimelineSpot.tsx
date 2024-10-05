import { cn } from "@/lib/utils/cn";

interface TimelineSpotProps {
  year: number;
  index: number;
  selectedYear: number;
  currentYear: number;
  todosForYear: any[];
  onClick: () => void;
}

const TimelineSpot = ({
  year,
  index,
  selectedYear,
  currentYear,
  todosForYear,
  onClick,
}: TimelineSpotProps) => {
  const hasTodos = todosForYear.length > 0;
  const todosCount = todosForYear.length;
  const completedTodos = todosForYear.filter(
    (todo) => todo.is_completed,
  ).length;

  return (
    <g onClick={onClick} className="cursor-pointer">
      {year === currentYear && (
        <text
          x={index * 100 + 50}
          y="20"
          textAnchor="middle"
          className="fill-green-600 text-xs font-semibold"
        >
          올해
        </text>
      )}
      <circle
        cx={index * 100 + 50}
        cy="40"
        r="7"
        className={cn(
          year === selectedYear ? "fill-blue-500" : "fill-zinc-300",
        )}
      />
      <text
        x={index * 100 + 50}
        y="68"
        textAnchor="middle"
        className={cn(
          "text-sm font-bold",
          year === selectedYear ? "fill-blue-500" : "fill-zinc-300",
        )}
      >
        {year}
      </text>
      {hasTodos && (
        <text
          x={index * 100 + 50}
          y="83"
          textAnchor="middle"
          className="fill-orange-400 text-[10px] font-semibold"
        >
          {`${completedTodos} / ${todosCount}`}
        </text>
      )}
    </g>
  );
};

export default TimelineSpot;
