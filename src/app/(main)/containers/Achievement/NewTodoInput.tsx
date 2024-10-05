import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { addTodoMutation } from "@/app/(main)/lib/queryHooks/useAddTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryHooks/queryKeys";

interface NewTodoInputProps {
  userId: string;
  selectedYear: number;
}

const NewTodoInput = ({ userId, selectedYear }: NewTodoInputProps) => {
  const queryClient = useQueryClient();
  const { mutate } = addTodoMutation();

  const [newTodoText, setNewTodoText] = useState("");

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;

    mutate(
      { text: newTodoText.trim(), userId, selectedYear },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: queryKeys.todos(selectedYear), // TODO: 현재 년도 새로고침
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.todosForTimeline(), // TODO: 타임라인 새로고침
            }),
          ]);
          setNewTodoText("");
        },
      },
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      console.log("sdfsdf");
      handleAddTodo();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        value={newTodoText}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        placeholder="새로운 실현할 일 추가"
        className="h-8"
      />

      <Button
        onClick={handleAddTodo}
        className="h-8 w-8 border bg-transparent p-0 hover:bg-zinc-100"
      >
        <PlusIcon size={15} className="text-black" />
      </Button>
    </div>
  );
};

export default NewTodoInput;
