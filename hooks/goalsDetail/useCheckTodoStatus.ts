import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/api/clientActions/authApi';

const checkTodo = async ({
  id,
  done,
  title,
  priority
}: {
  id: number;
  done: boolean;
  title: string;
  priority: number;
}) => {
  if (id === undefined) {
    throw new Error('ToDo id가 없습니다.');
  }
  const response = await authApi.patch(`/todos/${id}`, {
    done,
    title,
    priority
  });
  return response.data;
};

export const useCheckTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      done,
      title,
      priority,
      goalId
    }: {
      id: number;
      done: boolean;
      title: string;
      priority: number;
      goalId: number;
    }) => checkTodo({ id, done, title, priority }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todoList', variables.goalId, false] });
      queryClient.invalidateQueries({ queryKey: ['todoList', variables.goalId, true] });
    },

    onError: (error: any) => {
      console.error('업데이트 실패:', error.response?.data?.message || 'Unknown error occurred.');
    }
  });
};
