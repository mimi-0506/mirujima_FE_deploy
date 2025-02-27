import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { COMMON_ERROR, TODO_EDIT_SUCCESS } from '@/constant/toastText';
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
    const { data: todoEditData } = await apiWithClientToken.patch(`/todos/${id}`, body);
    const { data: todoDoneData } = await apiWithClientToken.patch(`/todos/completion/${id}`, {
      done: formData.done === 'on' ? true : false
    });

    if (todoEditData.code === 200 && todoDoneData.code === 200) todoEditSueccess();
    else todoEditFail();
  };

  const todoEditSueccess = () => {
    toast.success(TODO_EDIT_SUCCESS);

    queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
    queryClient.refetchQueries({ queryKey: ['allTodos', userId] });

    setIsTodoCreateModalOpen(false);
  };

  const todoEditFail = () => {
    toast.error(COMMON_ERROR);
  };
  return { setTodoEdit };
}
