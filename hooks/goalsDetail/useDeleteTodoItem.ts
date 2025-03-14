import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TODO_DELETE_ERROR, TODO_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import { TodoType } from '@/types/todo.type';
import { cacheType } from '@/types/query.type';
import { deleteTodoItem } from '@/apis/clientActions/todo';

export function useDeleteTodoItem() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  const cacheUpdate = async (queryKey: any[], todo: TodoType) => {
    await queryClient.setQueryData(
      queryKey,
      (cache: cacheType<{ lastSeeId: number; remainigCount: number; todos: TodoType[] }> | []) => {
        console.log(cache);
        if (!cache || Array.isArray(cache)) return [];
        const oldTodos = cache.pages[0].todos;
        const newTodos = oldTodos.filter((item: TodoType) => item.id !== todo.id);

        return { ...cache, pages: [{ ...cache.pages[0], todos: newTodos }] };
      }
    );
  };

  return useMutation({
    mutationFn: async (todo: TodoType) => {
      await deleteTodoItem(todo.id);
      return { todo };
    },
    onMutate: (todo) => {
      return { todo };
    },
    onSuccess: ({ todo }: { todo: TodoType }) => {
      setIsLoading(false);

      if (todo.goal) cacheUpdate(['todos', todo.goal.id, userId], todo);

      cacheUpdate(['allTodos', userId], todo);
      toast.success(TODO_DELETE_SUCCESS);
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
      toast.error(TODO_DELETE_ERROR);
    }
  });
}
