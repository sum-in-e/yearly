import { Input } from "@/components/ui/input";
import { Todo } from "@/lib/types/todo";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { cn } from "@/lib/utils/cn";

interface TodoTextProps {
  todo: Todo;
  editingTodo: Todo | null;
  setEditingTodo: (todo: Todo | null) => void;
  isEditing: boolean;
  onUpdateTodo: () => void;
}

const TodoText = ({
  todo,
  editingTodo,
  setEditingTodo,
  isEditing,
  onUpdateTodo,
}: TodoTextProps) => {
  const [localText, setLocalText] = useState(editingTodo?.text || "");

  const debouncedUpdate = useCallback(
    debounce((text: string) => {
      if (editingTodo) {
        setEditingTodo({ ...editingTodo, text });
      }
    }, 100),
    [editingTodo, setEditingTodo, onUpdateTodo],
  );

  useEffect(() => {
    if (isEditing && editingTodo) {
      setLocalText(editingTodo.text || "");
    }
  }, [isEditing, editingTodo]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setLocalText(newText);
    debouncedUpdate(newText);
  };

  if (isEditing && editingTodo) {
    return (
      <Input
        value={localText}
        className="h-8 focus-visible:ring-0"
        onChange={handleChangeText}
        onBlur={onUpdateTodo}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            onUpdateTodo();
            setEditingTodo(null);
          }
        }}
      />
    );
  }

  return (
    <label
      className={cn(
        "flex-grow text-sm text-zinc-700",
        todo.is_completed ? "text-zinc-400 line-through" : "",
      )}
    >
      {todo.text}
    </label>
  );
};

export default TodoText;
