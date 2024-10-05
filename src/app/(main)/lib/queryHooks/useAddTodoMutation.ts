import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

interface UseTodoMutationProps {
  text: string;
  userId: string;
  selectedYear: number;
}

export const addTodoMutation = () => {
  const supabase = createClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      text,
      selectedYear,
    }: UseTodoMutationProps) => {
      const { data, error } = await supabase
        .from("todos")
        .insert({ userId, text, target_year_start: selectedYear })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });

  return mutation;
};
