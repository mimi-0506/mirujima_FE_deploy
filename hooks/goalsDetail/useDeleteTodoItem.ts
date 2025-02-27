import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { TODO_DELETE_ERROR, TODO_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

const deleteTodoItem = async (todoId: number): Promise<void> => {
  await authApi.delete(`/todos/${todoId}`);
};

export function useDeleteTodoItem() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: (todoId: number) => deleteTodoItem(todoId),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (_, todoId) => {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
      toast.success(TODO_DELETE_SUCCESS);
    },
    onError: () => {
      setIsLoading(false);
      toast.error(TODO_DELETE_ERROR);
    }
  });
}
