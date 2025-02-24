import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { apiWithClientToken } from '@/apis/clientActions';
import { useModalStore } from '@/provider/store-provider';

export default function useTodoEdit(todoId?: number) {
  const { setIsTodoCreateModalOpen } = useModalStore((state) => state);
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const setTodoEdit = async (formData: { [k: string]: FormDataEntryValue }, savedPath?: string) => {
    const { data } = await apiWithClientToken.patch(`/todos/${todoId}`, {
      goalId: formData.goal,
      title: formData.title,
      filePath: savedPath || '',
      linkUrl: formData?.linkUrl,
      priority: formData.priority,
      done: Boolean(formData?.done)
    });

    if (data.code === 200) todoEditSueccess();
    else todoEditFail();
  };

  const todoEditSueccess = () => {
    toast('할일을 수정했습니다.');

    if (pathname === '/todoList') queryClient.invalidateQueries({ queryKey: ['todos'] });
    setIsTodoCreateModalOpen(false);
  };

  const todoEditFail = () => {
    toast.error('문제가 발생했습니다.');
  };
  return { setTodoEdit };
}
