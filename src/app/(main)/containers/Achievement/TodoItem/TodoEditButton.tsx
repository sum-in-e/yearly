import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon } from "lucide-react";
import { Todo } from "@/lib/types/todo";

interface TodoEditButtonProps {
  todo: Todo;
  isEditing: boolean;
  setEditingTodo: (todo: Todo | null) => void;
  onUpdateTodo: () => void;
}

const TodoEditButton = ({
  todo,
  isEditing,
  setEditingTodo,
  onUpdateTodo,
}: TodoEditButtonProps) => {
  const handleClick = () => {
    if (isEditing) {
      onUpdateTodo();
      setEditingTodo(null);
    } else {
      setEditingTodo(todo);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="h-8 w-8 min-w-8 rounded-lg border bg-transparent p-0 hover:bg-transparent hover:bg-zinc-100"
    >
      {isEditing ? (
        <CheckIcon size={15} className="text-black" />
      ) : (
        <EditIcon size={15} className="text-black" />
      )}
    </Button>
  );
};

export default TodoEditButton;
