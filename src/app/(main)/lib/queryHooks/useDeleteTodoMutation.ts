import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

interface UseDeleteTodoMutationProps {
  id: number;
  userId: string;
}

export const deleteTodoMutation = () => {
  const supabase = createClient();

  const mutation = useMutation({
    mutationFn: async ({ id, userId }: UseDeleteTodoMutationProps) => {
      const { error } = await supabase
        .from("todos")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id)
        .eq("userId", userId);

      if (error) throw error;
    },
   
  });

  return mutation;
};
