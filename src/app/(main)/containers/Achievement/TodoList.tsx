import TodoItem from "@/app/(main)/containers/Achievement/TodoItem";
import { useTodosByYearQuery } from "@/app/(main)/lib/queryHooks/useTodosByYearQuery";
import { Todo } from "@/lib/types/todo";
import { Skeleton } from "@/components/ui/skeleton";

interface TodoListProps {
  userId: string;
  selectedYear: number;
}

const TodoList = ({
  userId,
  selectedYear,
}: TodoListProps) => {
  const { data, isLoading } = useTodosByYearQuery({ userId, selectedYear });

  if (isLoading) return <Skeleton className="h-[100px] w-full rounded-lg" />;

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        선택된 연도의 실현할 일 목록이 없습니다.
      </p>
    );
  }

  return (
    <>
      {data.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          userId={userId}
          selectedYear={selectedYear}
        />
      ))}
    </>
  );
};

export default TodoList;
