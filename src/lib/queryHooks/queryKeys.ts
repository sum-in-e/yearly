export const queryKeys = {
  todos: (selectedYear: number) => ["todos", selectedYear] as const,
  todosForTimeline: () => ["todosForTimeline"] as const,
} as const;
