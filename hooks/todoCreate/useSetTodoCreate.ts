import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { apiWithClientToken } from '@/apis/clientActions';
import { useModalStore } from '@/provider/store-provider';

export default function useTodoCreate() {
  const { setIsTodoCreateModalOpen } = useModalStore((state) => state);
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const setTodoCreate = async (
    formData: { [k: string]: FormDataEntryValue },
    savedPath?: string
  ) => {
    const { data } = await apiWithClientToken.post('/todos', {
      goalId: formData.goal,
      title: formData.title,
      filePath: savedPath || '',
      linkUrl: formData?.linkUrl,
      priority: formData.priority
    });

    console.log('setTodoCreate', data);

    if (data.code === 200) todoCreateSueccess();
    else todoCreateFail();
  };

  const todoCreateSueccess = () => {
    toast('할일을 등록했습니다.');

    if (pathname === '/todoList') queryClient.invalidateQueries({ queryKey: ['todos'] });
    setIsTodoCreateModalOpen(false);
  };

  const todoCreateFail = () => {
    toast.error('문제가 발생했습니다.');
    ``;
  };

  return { setTodoCreate };
}
