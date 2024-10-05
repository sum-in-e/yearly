import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectorProps {
  selectedYear: number;
  years: number[];
  onYearChange: (year: string) => void;
}

const YearSelector = ({
  selectedYear,
  years,
  onYearChange,
}: YearSelectorProps) => (
  <Select onValueChange={onYearChange} value={selectedYear.toString()}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="연도 선택" />
    </SelectTrigger>
    <SelectContent>
      {years.map((year) => (
        <SelectItem key={year} value={year.toString()}>
          {year}년
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default YearSelector;
