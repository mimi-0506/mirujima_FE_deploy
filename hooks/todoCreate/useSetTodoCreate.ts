import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

export default function useTodoCreate() {
  const userId = useInfoStore((state) => state.userId);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const queryClient = useQueryClient();

  const setTodoCreate = async (
    formData: { [k: string]: FormDataEntryValue },
    savedPath?: string
  ) => {
    const body = {
      goalId: formData.goal,
      title: formData.title,
      filePath: savedPath || '',
      linkUrl: formData?.linkUrl,
      priority: formData.priority
    };

    const { data } = await apiWithClientToken.post('/todos', body);

    if (data.code === 200) todoCreateSueccess();
    else todoCreateFail();
  };

  const todoCreateSueccess = () => {
    toast('할일을 등록했습니다.');

    queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
    queryClient.refetchQueries({ queryKey: ['allTodos', userId] });

    setIsTodoCreateModalOpen(false);
  };

  const todoCreateFail = () => {
    toast.error('문제가 발생했습니다.');
    ``;
  };

  return { setTodoCreate };
}
