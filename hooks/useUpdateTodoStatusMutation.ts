import { useMutation } from '@tanstack/react-query';

import { updateTodoStatus } from '../apis/todo';

import type { QueryClient } from '@tanstack/react-query';

export function useUpdateTodoStatusMutation(queryClient: QueryClient) {
  return useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) => updateTodoStatus(id, done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
}
