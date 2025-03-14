import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { COMMON_ERROR, TODO_CREATE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

export default function useTodoCreate() {
  const userId = useInfoStore((state) => state.userId);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      savedPath
    }: {
      data: { [k: string]: FormDataEntryValue };
      savedPath?: string;
    }) => {
      const body = {
        goalId: data.goal,
        title: data.title,
        filePath: savedPath || '',
        linkUrl: data?.linkUrl,
        priority: data.priority
      };

      await apiWithClientToken.post('/todos', body);
      return { body };
    },
    onSuccess: (_) => {
      toast.success(TODO_CREATE_SUCCESS);

      // 실제 아이디 필요하므로 refetch
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });

      setIsTodoCreateModalOpen(false);
    },
    onError: (_err, _) => {
      toast.error(COMMON_ERROR);
    }
  });
}
