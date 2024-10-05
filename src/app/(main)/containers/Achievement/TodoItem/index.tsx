import { Todo } from "@/lib/types/todo";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryHooks/queryKeys";
import TodoCheckbox from "@/app/(main)/containers/Achievement/TodoItem/TodoCheckbox";
import TodoText from "@/app/(main)/containers/Achievement/TodoItem/TodoText";
import TodoEditButton from "@/app/(main)/containers/Achievement/TodoItem/TodoEditButton";
import TodoDeleteButton from "@/app/(main)/containers/Achievement/TodoItem/TodoDeleteButton";
import { useState } from "react";
import { updateTodoTextMutation } from "@/app/(main)/lib/queryHooks/useUpdateTodoMutation";

interface TodoItemProps {
  todo: Todo;
  userId: string;
  selectedYear: number;
}

const TodoItem = ({ todo, userId, selectedYear }: TodoItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: todoTextMutate } = updateTodoTextMutation();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const invalidateQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.todos(selectedYear),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.todosForTimeline(),
      }),
    ]);
  };

  const isEditing = editingTodo?.id === todo.id;

  const handleUpdateTodo = () => {
    if (editingTodo && editingTodo.text?.trim()) {
      todoTextMutate(
        {
          id: editingTodo.id,
          text: editingTodo.text.trim(),
          userId,
        },
        {
          onSuccess: async () => {
            await invalidateQueries();
            setEditingTodo(null);
          },
        },
      );
    }
  };

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <TodoCheckbox
          todo={todo}
          userId={userId}
          invalidateQueries={invalidateQueries}
        />
        <TodoText
          todo={todo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          isEditing={isEditing}
          onUpdateTodo={handleUpdateTodo}
        />
        <TodoEditButton
          todo={todo}
          isEditing={isEditing}
          setEditingTodo={setEditingTodo}
          onUpdateTodo={handleUpdateTodo}
        />
        <TodoDeleteButton
          todo={todo}
          userId={userId}
          invalidateQueries={invalidateQueries}
        />
      </div>
      {todo.completed_date && (
        <span className="text-[11px] text-zinc-400">{`완료일: ${todo.completed_date}`}</span>
      )}
    </div>
  );
};

export default TodoItem;
