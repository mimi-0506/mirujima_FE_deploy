import { useQuery } from '@tanstack/react-query';

import { readTodoList } from '@/apis/clientActions/todo';

import type { TodoListType } from '@/types/todo.types';

export const useAllTodos = (userId: number, pageSize?: number) => {
  const { data, isLoading } = useQuery<TodoListType>({
    queryKey: ['allTodos', userId],
    queryFn: () => readTodoList({ pageSize: 9999 }),
    retry: 0
  });

  const todos = data?.todos || [];
  const todoData = pageSize ? todos.slice(0, pageSize) : todos;

  return { todoData, isLoading };
};
