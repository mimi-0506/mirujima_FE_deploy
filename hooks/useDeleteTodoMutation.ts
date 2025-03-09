import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';

import { deleteTodoItem } from '@/apis/clientActions/todo';
import { TODO_DELETE_ERROR, TODO_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

import type { QueryClient } from '@tanstack/react-query';

export function useDeleteTodoMutation(queryClient: QueryClient) {
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  const userId = useInfoStore((state) => state.userId);
  return useMutation({
    mutationFn: (id: number) => deleteTodoItem(id),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });

      setIsLoading(false);
      toast.success(TODO_DELETE_SUCCESS);
    },
    onError: () => {
      setIsLoading(false);
      toast.error(TODO_DELETE_ERROR);
    }
  });
}
