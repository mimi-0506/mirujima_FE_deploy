import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';

import { deleteTodoItem } from '@/apis/todo';
import { useInfoStore } from '@/provider/store-provider';

import type { QueryClient } from '@tanstack/react-query';

export function useDeleteTodoMutation(queryClient: QueryClient) {
  const userId = useInfoStore((state) => state.userId);
  return useMutation({
    mutationFn: (id: number) => deleteTodoItem(id),
    onMutate: () => {
      toast.loading('할 일 삭제 중...', { id: 'deleteTodo' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });

      toast.dismiss('deleteTodo');
      toast.success('할 일이 삭제되었습니다!');
    },
    onError: () => {
      toast.dismiss('deleteTodo');
      toast.error('할 일 삭제 실패했습니다.');
    }
  });
}
