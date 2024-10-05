import { queryKeys } from "@/lib/queryHooks/queryKeys";
import { Todo } from "@/lib/types/todo";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface UseTodosByYearQueryProps {
  selectedYear: number;
  userId: string;
}

export const useTodosByYearQuery = ({
  selectedYear,
  userId,
}: UseTodosByYearQueryProps) => {
  const supabase = createClient();

  const query = useQuery({
    queryKey: queryKeys.todos(selectedYear),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("userId", userId)
        .is("deleted_at", null)
        .or(
          `target_year_start.eq.${selectedYear},and(target_year_start.lte.${selectedYear},target_year_end.gte.${selectedYear})`,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as Todo[];
    },
    enabled: !!userId && !!selectedYear,
  });

  return query;
};
