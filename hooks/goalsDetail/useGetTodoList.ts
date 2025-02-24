import { useQuery } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

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

const fetchTodoList = async (
  goalId: string,
  done = false,
  lastSeenId = 9999,
  pageSize = 5
): Promise<TodoType[]> => {
  const response = await authApi.get<TodoListResponse>('/todos', {
    params: { goalId, done, lastSeenId, pageSize }
  });
  return response.data.result.todos;
};

export const useGetTodoList = (goalId?: string, done = false) => {
  const { userId } = useInfoStore((state) => state);
  const query = useQuery<TodoType[]>({
    queryKey: ['todos', goalId, userId],
    queryFn: () => fetchTodoList(goalId as string, done),
    enabled: !!goalId
  });

  return query;
};
