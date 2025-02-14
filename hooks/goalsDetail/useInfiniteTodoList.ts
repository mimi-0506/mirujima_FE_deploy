import { useInfiniteQuery } from '@tanstack/react-query';
import authApi from '@/api/clientActions/authApi';
import type { TodoType } from '@/types/todo.type';

interface TodoListResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    lastSeenId: number;
    totalCount: number;
    todos: TodoType[];
  };
}

const fetchTodoListInfinite = async (
  goalId: string,
  done: boolean,
  lastSeenId: number = 9999,
  pageSize: number = 5
): Promise<TodoListResponse['result']> => {
  const response = await authApi.get<TodoListResponse>('/todos', {
    params: { goalId, done, lastSeenId, pageSize }
  });
  return response.data.result;
};

export const useInfiniteTodoList = (goalId: string, done: boolean) => {
  return useInfiniteQuery({
    queryKey: ['todoList', goalId, done],
    queryFn: async ({ pageParam = 9999 }) => await fetchTodoListInfinite(goalId, done, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.todos.length > 0) {
        return lastPage.lastSeenId;
      }
      return undefined;
    },
    enabled: !!goalId,
    initialPageParam: 9999
  });
};
