import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';
import type { TodoType } from '@/types/todo.types';
import type { GoalType } from '@/types/goal.types';

const checkTodo = async (todo: TodoType) => {
  if (!todo.id) {
    throw new Error('ToDo id가 없습니다.');
  }
  const response = await apiWithClientToken.patch(`/todos/completion/${todo.id}`, {
    done: todo.done,
    completionDate: todo.completionDate ?? null
  });
  return response.data;
};

export const useCheckTodo = () => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation<TodoType, Error, TodoType & { goalId: GoalType['id'] | null }>({
    mutationFn: (todoWithGoalId) => checkTodo(todoWithGoalId),
    onSuccess: (_, { goalId }) => {
      const todoKeys = [false, true].map((done) => ['todos', goalId, userId, done]);
      todoKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
    },
    onError: (error) => {
      console.error('업데이트 실패:', error || 'Unknown error occurred.');
    }
  });
};
