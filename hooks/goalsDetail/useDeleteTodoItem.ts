import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

const deleteTodoItem = async (todoId: number): Promise<void> => {
  await authApi.delete(`/todos/${todoId}`);
};

export function useDeleteTodoItem() {
  const { userId } = useInfoStore((state) => state);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodoItem(todoId),
    onMutate: () => {
      toast.loading('할 일 삭제 중...', { id: 'deleteTodo' });
    },
    onSuccess: (_, todoId) => {
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
