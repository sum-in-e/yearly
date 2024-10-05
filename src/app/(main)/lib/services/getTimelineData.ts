import { TodosByYear } from "@/lib/types/todo";
import { createClient } from "@/lib/utils/supabase/client";

export const getTimelineData = async (
  userId: string,
  startYear: number,
  endYear: number,
): Promise<TodosByYear> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("userId", userId)
    .is("deleted_at", null);

  if (error) throw error;

  const todosByYear: TodosByYear = {};

  // 모든 연도에 대해 빈 배열 초기화
  for (let year = startYear; year <= endYear; year++) {
    todosByYear[year] = [];
  }

  // 각 todo를 적절한 연도(들)에 할당
  data.forEach((todo) => {
    const start = todo.target_year_start;
    const end = todo.target_year_end;

    if (start !== null && end === null) {
      // start만 있는 경우
      if (start >= startYear && start <= endYear) {
        todosByYear[start].push(todo);
      }
    } else if (start !== null && end !== null) {
      // start와 end 모두 있는 경우
      for (
        let year = Math.max(start, startYear);
        year <= Math.min(end, endYear);
        year++
      ) {
        todosByYear[year].push(todo);
      }
    }
    // start와 end 모두 null인 경우는 무시됩니다.
  });

  return todosByYear;
};
