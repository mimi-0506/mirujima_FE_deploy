import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import authApi from '@/api/clientActions/authApi';

// ✅ DELETE 요청을 올바르게 수행하는 함수
const deleteTodoItem = async (todoId: number): Promise<void> => {
  await authApi.delete(`/todos/${todoId}`);
};

// ✅ React Query의 useMutation을 활용한 훅
export function useDeleteTodoItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodoItem(todoId), // ✅ todoId만 전달!
    onMutate: () => {
      toast.loading('할 일 삭제 중...', { id: 'deleteTodo' });
    },
    onSuccess: (_, todoId) => {
      // ✅ 'todoList' 키를 사용하여 관련된 데이터를 무효화함
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
