import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/api/clientActions/authApi';

const deleteTodoItem = async (todoId: number): Promise<void> => {
  await authApi.delete(`/todos/${todoId}`);
};

export function useDeleteTodoItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodoItem(todoId),
    onMutate: () => {
      toast.loading('할 일 삭제 중...', { id: 'deleteTodo' });
    },
    onSuccess: (_, todoId) => {
      queryClient.invalidateQueries({ queryKey: ['todoList'] });

      toast.dismiss('deleteTodo');
      toast.success('할 일이 삭제되었습니다!');
    },
    onError: () => {
      toast.dismiss('deleteTodo');
      toast.error('할 일 삭제 실패했습니다.');
    }
  });
}
