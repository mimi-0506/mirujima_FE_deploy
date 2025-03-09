import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import type { TodoType } from '@/types/todo.type';

interface CheckTodoParams {
  todo: TodoType;
}

interface CheckTodoMutationVars {
  todo: TodoType;
  goalId: number;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const checkTodo = async ({ todo }: CheckTodoParams): Promise<TodoType> => {
  if (!todo.id) {
    throw new Error('ToDo id가 없습니다.');
  }
  const response = await apiWithClientToken.patch(`/todos/completion/${todo.id}`, {
    done: todo.done,
    completionDate: todo.completionDate ?? null
  });
  return response.data;
};

export const useCheckTodo = () => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation<TodoType, ApiError, CheckTodoMutationVars>({
    mutationFn: async ({ todo }: CheckTodoMutationVars): Promise<TodoType> => {
      return checkTodo({ todo });
    },
    onSuccess: (_, { goalId }) => {
      queryClient.invalidateQueries({ queryKey: ['todos', goalId, userId, false] });
      queryClient.invalidateQueries({ queryKey: ['todos', goalId, userId, true] });
      queryClient.refetchQueries({ queryKey: ['todos', goalId, userId, false] });
      queryClient.refetchQueries({ queryKey: ['todos', goalId, userId, true] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
    },
    onError: (error: ApiError) => {
      console.error('업데이트 실패:', error.response?.data?.message || 'Unknown error occurred.');
    }
  });
};
