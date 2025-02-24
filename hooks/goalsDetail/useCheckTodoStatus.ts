import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

import type { TodoType } from '@/types/todo.type';

const checkTodo = async ({ todo }: { todo: TodoType }) => {
  if (!todo.id) {
    throw new Error('ToDo id가 없습니다.');
  }
  const response = await authApi.patch(`/todos/${todo.id}`, todo);
  return response.data;
};

export const useCheckTodo = () => {
  const { userId } = useInfoStore((state) => state);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todo, goalId }: { todo: TodoType; goalId: number }) => {
      return checkTodo({ todo });
    },
    onSuccess: (_, { goalId }) => {
      queryClient.invalidateQueries({ queryKey: ['todos', goalId, userId] });
      queryClient.refetchQueries({ queryKey: ['todos', goalId, userId] });
      // queryClient.invalidateQueries({ queryKey: ['todos', goalId, true] }); false, true가 뭐가 다를까요..??
    },
    onError: (error: any) => {
      console.error('업데이트 실패:', error.response?.data?.message || 'Unknown error occurred.');
    }
  });
};
