import { useInfiniteQuery } from '@tanstack/react-query';

import authApi from '@/api/clientActions/authApi';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { TodoType } from '@/types/todo.type';

export interface TodoListResult {
  lastSeenId: number;
  totalCount: number;
  todos: TodoType[];
}

export type TodoListResponse = ApiResponse<TodoListResult>;

const fetchTodoListInfinite = async (
  goalId: number,
  done: boolean,
  lastSeenId: number = 9999,
  pageSize: number = 5
): Promise<TodoListResult> => {
  const response = await authApi.get<ApiResponse<TodoListResult>>('/todos', {
    params: { goalId, done, lastSeenId, pageSize }
  });

  if (response.data.result === null) throw new Error('infinte todo list error');

  return response.data.result;
};

export const useInfiniteTodoList = (goalId: number, done: boolean) => {
  return useInfiniteQuery({
    queryKey: ['todoList', goalId, done],
    queryFn: async ({ pageParam = 9999 }) => fetchTodoListInfinite(goalId, done, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.todos.length === 0) {
        return undefined;
      }
      return lastPage.lastSeenId;
    },
    enabled: !!goalId,
    initialPageParam: 9999
  });
};
