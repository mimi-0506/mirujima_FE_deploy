import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { COMMON_ERROR, TODO_CREATE_SUCCESS } from '@/constant/toastText';
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
    toast.success(TODO_CREATE_SUCCESS);

    queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
    queryClient.refetchQueries({ queryKey: ['allTodos', userId] });

    setIsTodoCreateModalOpen(false);
  };

  const todoCreateFail = () => {
    toast.error(COMMON_ERROR);
  };

  return { setTodoCreate };
}
