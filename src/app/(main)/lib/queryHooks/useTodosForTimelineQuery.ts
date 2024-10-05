import { queryKeys } from "@/lib/queryHooks/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getTimelineData } from "@/app/(main)/lib/services/getTimelineData";

interface UseTodosForTimelineProps {
  userId: string;
  startYear: number;
  endYear: number;
}

export const useTodosForTimeline = ({
  userId,
  startYear,
  endYear,
}: UseTodosForTimelineProps) => {
  const query = useQuery({
    queryKey: queryKeys.todosForTimeline(),
    queryFn: () => getTimelineData(userId, startYear, endYear),
    enabled: !!userId,
  });

  return query;
};
