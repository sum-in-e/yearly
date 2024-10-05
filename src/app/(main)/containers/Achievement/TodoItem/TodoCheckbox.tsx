import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/lib/types/todo";
import { updateTodoCompleteMutation } from "@/app/(main)/lib/queryHooks/useUpdateTodoMutation";

interface TodoCheckboxProps {
  todo: Todo;
  userId: string;
  invalidateQueries: () => Promise<void>;
}

const TodoCheckbox = ({
  todo,
  userId,
  invalidateQueries,
}: TodoCheckboxProps) => {
  const { mutate: todoCompleteMutate } = updateTodoCompleteMutation();

  const handleTodoToggle = () => {
    todoCompleteMutate(
      {
        id: todo.id,
        is_completed: !todo.is_completed,
        userId: userId,
      },
      {
        onSuccess: invalidateQueries,
      },
    );
  };

  return (
    <Checkbox
      id={`todo-${todo.id}`}
      checked={todo.is_completed ?? false}
      onCheckedChange={handleTodoToggle}
    />
  );
};

export default TodoCheckbox;
