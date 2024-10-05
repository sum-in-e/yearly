import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewTodoInput from "@/app/(main)/containers/Achievement/NewTodoInput";
import TodoList from "@/app/(main)/containers/Achievement/TodoList";
import YearSelector from "@/app/(main)/containers/Achievement/YearSelector";

interface AchievementProps {
  userId: string;
  selectedYear: number;
  years: number[];
  onYearChange: (year: number) => void;
  scrollToYear: (year: number) => void;
}

const Achievement = ({
  userId,
  selectedYear,
  years,
  onYearChange,
  scrollToYear,
}: AchievementProps) => {
  const handleYearChange = (year: string) => {
    const newYear = Number(year);
    onYearChange(newYear);
    scrollToYear(newYear);
  };

  return (
    <Card>
      <CardHeader className="mb-5 border-b border-gray-200 bg-gray-50 px-4 py-6">
        <CardTitle className="flex items-center justify-between">
          <span>나의 실현 목록</span>
          <YearSelector
            years={years}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <NewTodoInput userId={userId} selectedYear={selectedYear} />
        <TodoList userId={userId} selectedYear={selectedYear} />
      </CardContent>
    </Card>
  );
};

export default Achievement;
