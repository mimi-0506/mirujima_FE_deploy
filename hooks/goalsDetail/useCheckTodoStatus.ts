import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';
import { cacheType } from '@/types/query.type';
import { TodoType } from '@/types/todo.types';

interface CheckTodoParams {
  todo: TodoType;
}

export const useCheckTodo = () => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todo }: CheckTodoParams) => {
      if (!todo.id) throw new Error('ToDo id가 없습니다.');

      await apiWithClientToken.patch(`/todos/completion/${todo.id}`, {
        done: todo.done,
        completionDate: todo.completionDate ?? null
      });
      return { todo };
    },
    onMutate: ({ todo }) => {
      return { todo };
    },
    onSuccess: async ({ todo }: { todo: TodoType }) => {
      if (todo.goal) {
        await queryClient.setQueryData(
          ['todos', todo.goal.id, userId, todo.done],
          (cache: TodoType[]) => {
            const oldTodos = [...cache];
            const newTodos = [...oldTodos, todo].sort((a, b) => a.id - b.id);

            return newTodos;
          }
        );

        await queryClient.setQueryData(
          ['todos', todo.goal.id, userId, !todo.done],
          (cache: TodoType[]) => {
            const oldTodos = [...cache];
            const newTodos = oldTodos.filter((item: TodoType) => item.id !== todo.id);

            return newTodos;
          }
        );
      }

      await queryClient.setQueryData(
        ['allTodos', userId],
        (
          cache: cacheType<{ lastSeeId: number; remainigCount: number; todos: TodoType[] }> | []
        ) => {
          if (!cache || Array.isArray(cache)) return [];
          const oldTodos = Array.isArray(cache.pages) ? cache.pages[0].todos : cache.todos;
          const newTodos = Array.isArray(oldTodos)
            ? oldTodos.map((item: TodoType) => {
                if (item?.id === todo?.id) return todo;
                else return item;
              })
            : [];

          return Array.isArray(cache.pages)
            ? { ...cache, pages: [{ ...cache.pages[0], todos: newTodos }] }
            : { ...cache, todos: newTodos };
        }
      );
    },
    onError: (error, _) => {
      console.error(error);
    }
  });
};
