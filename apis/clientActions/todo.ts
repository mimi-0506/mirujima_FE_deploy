import type { TodoListType, TodoProgressType } from '@/types/todo.types';

import { apiWithClientToken } from '.';

const TODO_SIZE = 40;

export const readTodoList = async ({
  lastSeenId,
  pageSize = TODO_SIZE
}: {
  lastSeenId?: number;
  pageSize?: number;
}): Promise<TodoListType> => {
  const response = await apiWithClientToken.get<{ result: TodoListType }>('/todos', {
    params: { lastSeenId, pageSize }
  });

  if (response.data.result === null) throw new Error('read todo list error');

  return { ...response.data.result, todos: response.data.result.todos.reverse() };
};

export const deleteTodoItem = async (todoId: number): Promise<void> => {
  await apiWithClientToken.delete(`/todos/${todoId}`);
};

export const updateTodoStatus = async (id: number, done: boolean): Promise<TodoListType> => {
  const response = await apiWithClientToken.patch<{ result: TodoListType }>(
    `/todos/completion/${id}`,
    {
      done
    }
  );
  return response.data.result;
};

export const readTodoProgress = async () => {
  const response = await apiWithClientToken.get<{ result: TodoProgressType }>('/todos/progress');
  return response.data.result;
};
