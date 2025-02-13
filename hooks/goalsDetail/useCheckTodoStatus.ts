import { useMutation, useQueryClient } from '@tanstack/react-query';
import authApi from '@/api/clientActions/authApi';

const checkTodo = async (id: number) => {
  console.log('체크한 목표의 id:', id);
  const response = await authApi.patch(`/todos/completion/${id}`);
  return response.data;
};

export const useCheckTodo = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => checkTodo(id),
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
