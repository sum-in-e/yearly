import { Tables } from "@/lib/types/supabase";

export type Todo = Tables<"todos">;
export type TodosByYear = Record<number, Todo[]>;
