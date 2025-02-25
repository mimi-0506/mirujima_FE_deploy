import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

import type { TodoType } from '@/types/todo.type';

const checkTodo = async ({ todo }: { todo: TodoType }) => {
  if (!todo.id) {
    throw new Error('ToDo id가 없습니다.');
  }
  const response = await authApi.patch(`/todos/completion/${todo.id}`, {
    done: todo.done,
    completionDate: todo.completionDate ?? null
  });
  return response.data;
};
export const useCheckTodo = () => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todo, goalId }: { todo: TodoType; goalId: number }) => {
      return checkTodo({ todo });
    },
    onSuccess: (_, { goalId }) => {
      queryClient.invalidateQueries({ queryKey: ['todos', goalId, userId, false] });
      queryClient.invalidateQueries({ queryKey: ['todos', goalId, userId, true] });
      queryClient.refetchQueries({ queryKey: ['todos', goalId, userId, false] });
      queryClient.refetchQueries({ queryKey: ['todos', goalId, userId, true] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
    },
    onError: (error: any) => {
      console.error('업데이트 실패:', error.response?.data?.message || 'Unknown error occurred.');
    }
  });
};
