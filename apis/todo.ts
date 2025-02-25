import { apiWithClientToken } from './clientActions/index';

import type { TodoListType } from '@/types/todo.type';

const TODO_SIZE = 10;

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

export const deleteTodoItem = async (id: number) => {
  await apiWithClientToken.delete(`/todos/${id}`);
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
