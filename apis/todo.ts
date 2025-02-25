import { apiWithClientToken } from './clientActions/index';

import type { TodoListType } from '@/types/todo.type';

const TODO_SIZE = 40;

export const readTodoList = async ({
  pageParam = 9999,
  pageSize = TODO_SIZE
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<TodoListType> => {
  const response = await apiWithClientToken.get<{ result: TodoListType }>('/todos', {
    params: { lastSeenId: pageParam, pageSize }
  });

  if (response.data.result === null) throw new Error('read todo list error');

  return response.data.result;
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
