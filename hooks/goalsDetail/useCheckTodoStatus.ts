// hooks/useCheckTodo.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/api/clientActions/authApi';

const checkTodo = async (id: number, done: boolean) => {
  console.log('체크한 목표의 id:', id, '보내는 done:', done);
  const response = await authApi.patch(`/todos/completion/${id}`, { done });
  return response.data; // 서버 응답(JSON)
};

export const useCheckTodo = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (done: boolean) => checkTodo(id, done),
    onSuccess: (data) => {
      console.log('Update successful:', data);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      const backendError = error.response?.data?.message || 'An error occurred.';
      console.log('Update failed:', backendError);
    }
  });
};
