import { useQuery } from '@tanstack/react-query';

import { readTodoList } from '@/apis/clientActions/todo';

import type { TodoListType } from '@/types/todo.type';

export const useAllTodos = (pageSize?: number) => {
  const { data, isLoading } = useQuery<TodoListType>({
    queryKey: ['todos', pageSize],
    queryFn: () => readTodoList({ pageSize }),
    retry: 0
  });

  const todoData = data?.todos || [];

  return { todoData, isLoading };
};
