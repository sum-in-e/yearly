import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Todo } from "@/lib/types/todo";
import { deleteTodoMutation } from "@/app/(main)/lib/queryHooks/useDeleteTodoMutation";

interface TodoDeleteButtonProps {
  todo: Todo;
  userId: string;
  invalidateQueries: () => Promise<void>;
}

const TodoDeleteButton = ({
  todo,
  userId,
  invalidateQueries,
}: TodoDeleteButtonProps) => {
  const { mutate: deleteTodoMutate } = deleteTodoMutation();

  const handleDeleteTodo = () => {
    deleteTodoMutate(
      { id: todo.id, userId },
      {
        onSuccess: invalidateQueries,
      },
    );
  };

  return (
    <Button
      onClick={handleDeleteTodo}
      variant="destructive"
      className="h-8 w-8 min-w-8 rounded-lg border bg-transparent p-0 hover:bg-transparent hover:bg-zinc-100"
    >
      <TrashIcon size={15} className="text-red-500" />
    </Button>
  );
};

export default TodoDeleteButton;
