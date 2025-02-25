import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore, useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';

export default function useTodoEdit() {
  const userId = useInfoStore((state) => state.userId);
  const id = useTodoCreateModalStore((state) => state.id);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const queryClient = useQueryClient();

  const setTodoEdit = async (
    formData: { [k: string]: FormDataEntryValue },
    fileName: string,
    savedPath?: string
  ) => {
    const body = {
      goalId: formData.goal,
      title: formData.title,
      orgFileName: fileName,
      filePath: savedPath || '',
      linkUrl: formData?.linkUrl,
      priority: formData.priority
    };
    const { data } = await apiWithClientToken.patch(`/todos/${id}`, body);

    if (data.code === 200) todoEditSueccess();
    else todoEditFail();
  };

  const todoEditSueccess = () => {
    toast('할일을 수정했습니다.');

    queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
    queryClient.refetchQueries({ queryKey: ['allTodos', userId] });

    setIsTodoCreateModalOpen(false);
  };

  const todoEditFail = () => {
    toast.error('문제가 발생했습니다.');
  };
  return { setTodoEdit };
}
