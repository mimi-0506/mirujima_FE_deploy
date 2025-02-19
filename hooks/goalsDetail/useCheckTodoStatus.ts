import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';

import type { TodoType } from '@/types/todo.type';

const checkTodo = async ({ todo }: { todo: TodoType }) => {
  if (!todo.id) {
    throw new Error('ToDo id가 없습니다.');
  }
  const response = await authApi.patch(`/todos/${todo.id}`, todo);
  return response.data;
};

export const useCheckTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todo, goalId }: { todo: TodoType; goalId: number }) => {
      return checkTodo({ todo });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todoList', variables.goalId, false] });
      queryClient.invalidateQueries({ queryKey: ['todoList', variables.goalId, true] });
    },
    onError: (error: any) => {
      console.error('업데이트 실패:', error.response?.data?.message || 'Unknown error occurred.');
    }
  });
};
