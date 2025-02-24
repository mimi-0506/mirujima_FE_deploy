import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todo, goalId }: { todo: TodoType; goalId: number }) => {
      return checkTodo({ todo });
    },
    onSuccess: (data, variables) => {
      // 서버에서 반환해주는 전체 응답을 콘솔에서 확인
      console.log('체크 완료(서버 응답):', data);

      // goalId, done 상태에 따라 todoList를 다시 불러옴
      queryClient.invalidateQueries({ queryKey: ['todoList', variables.goalId, false] });
      queryClient.invalidateQueries({ queryKey: ['todoList', variables.goalId, true] });
    },
    onError: (error: any) => {
      console.error('업데이트 실패:', error.response?.data?.message || 'Unknown error occurred.');
    }
  });
};
