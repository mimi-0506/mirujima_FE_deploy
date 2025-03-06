import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions/index';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

import type { TodoType } from '@/types/todo.type';
import type { QueryClient } from '@tanstack/react-query';

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
  goalId: number | undefined | null,
  done = false,
  lastSeenId = 9999,
  pageSize = 50
): Promise<TodoType[]> => {
  const response = await apiWithClientToken.get<TodoListResponse>('/todos', {
    params: { goalId, done, lastSeenId, pageSize }
  });
  return response.data.result.todos;
};

export const useGetTodoList = (goalId?: number | null | undefined, done = false) => {
  const isTodoCreateModalOpen = useModalStore((state) => state.isTodoCreateModalOpen);
  const queryClient: QueryClient = useQueryClient();
  const userId = useInfoStore((state) => state.userId);
  const query = useQuery<TodoType[]>({
    queryKey: ['todos', goalId, userId, done],
    queryFn: () => fetchTodoList(goalId, done),
    enabled: !!goalId
  });

  useEffect(() => {
    if (!isTodoCreateModalOpen) {
      queryClient.invalidateQueries({ queryKey: ['todos', goalId, userId, done] });
      queryClient.refetchQueries({ queryKey: ['todos', goalId, userId, done] });
    }
  }, [isTodoCreateModalOpen]);

  return query;
};
