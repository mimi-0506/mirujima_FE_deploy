import { useMutation } from '@tanstack/react-query';

import { updateTodoStatus } from '@/apis/clientActions/todo';
import { useInfoStore } from '@/provider/store-provider';

import type { QueryClient } from '@tanstack/react-query';

export function useUpdateTodoStatusMutation(queryClient: QueryClient) {
  const userId = useInfoStore((state) => state.userId);
  return useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) => updateTodoStatus(id, done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
    }
  });
}
