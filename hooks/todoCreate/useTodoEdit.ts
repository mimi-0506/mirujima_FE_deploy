import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { COMMON_ERROR, TODO_EDIT_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';
import { cacheType } from '@/types/query.type';
import { TodoType } from '@/types/todo.types';

interface TodoBodyType {
  goalId: FormDataEntryValue;
  title: FormDataEntryValue;
  orgFileName: string;
  filePath: string;
  linkUrl: FormDataEntryValue;
  priority: FormDataEntryValue;
  done: boolean;
}

export default function useTodoEdit() {
  const userId = useInfoStore((state) => state.userId);
  const id = useTodoCreateModalStore((state) => state.id);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const queryClient = useQueryClient();

  const cacheUpdate = async (queryKey: any[], body: TodoBodyType) => {
    await queryClient.setQueryData(
      queryKey,
      (cache: cacheType<{ lastSeeId: number; remainigCount: number; todos: TodoType[] }> | []) => {
        console.log(cache);
        if (!cache || Array.isArray(cache)) return [];
        const oldTodos = cache.pages[0].todos;
        const newTodos = oldTodos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                done: body.done,
                priority: body.priority,
                title: body.title,
                linkUrl: body.linkUrl,
                filePath: body.filePath
              }
            : todo
        );

        return { ...cache, pages: [{ ...cache.pages[0], todos: newTodos }] };
      }
    );
  };

  return useMutation({
    mutationFn: async ({
      data,
      fileName,
      savedPath
    }: {
      data: { [k: string]: FormDataEntryValue };
      fileName?: string | null;
      savedPath?: string;
    }) => {
      const body = {
        goalId: data.goal,
        title: data.title,
        orgFileName: fileName || '',
        filePath: savedPath || '',
        linkUrl: data?.linkUrl,
        priority: data.priority,
        done: data.done === 'on' ? true : false
      };

      // 할 일 수정 요청
      await apiWithClientToken.patch(`/todos/${id}`, body);
      // 할 일 완료 여부 수정 요청
      await apiWithClientToken.patch(`/todos/completion/${id}`, {
        done: body.done
      });

      return { body };
    },
    onMutate: (body) => {
      return { body };
    },
    onSuccess: ({ body }) => {
      toast.success(TODO_EDIT_SUCCESS);

      if (body.goalId) cacheUpdate(['todos', body.goalId, userId], body);
      cacheUpdate(['allTodos', userId], body);

      setIsTodoCreateModalOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(COMMON_ERROR);
    }
  });
}
