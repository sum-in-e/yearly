import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

interface UseUpdateTodoTextMutationProps {
  id: number;
  text: string;
  userId: string;
}

export const updateTodoTextMutation = () => {
  const supabase = createClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      text,
      userId,
    }: UseUpdateTodoTextMutationProps) => {
      const { data, error } = await supabase
        .from("todos")
        .update({ text })
        .eq("id", id)
        .eq("userId", userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });

  return mutation;
};

interface UseUpdateTodoCompleteMutationProps {
  id: number;
  is_completed: boolean;
  userId: string;
}

export const updateTodoCompleteMutation = () => {
  const supabase = createClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      is_completed,
      userId,
    }: UseUpdateTodoCompleteMutationProps) => {
      const updateData = is_completed
        ? { is_completed, completed_date: new Date().toISOString() }
        : { is_completed, completed_date: null };

      const { data, error } = await supabase
        .from("todos")
        .update(updateData)
        .eq("id", id)
        .eq("userId", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });

  return mutation;
};
