import { apiWithClientToken } from './clientActions/index';

import type { FilterType } from '@/app/todoList/_components/TodoFilter';
import type { TodoListType } from '@/types/todo.type';

const TODO_SIZE = 40;

export const readTodoList = async ({
  pageParam = 9999,
  filter,
  pageSize = TODO_SIZE
}: {
  pageParam?: number;
  filter?: FilterType;
  pageSize?: number;
}): Promise<TodoListType> => {
  let doneParam; // 필터 값에 따라 'done' 파라미터 설정

  if (filter === 'Done') doneParam = true;
  else if (filter === 'To do') doneParam = false;

  const response = await apiWithClientToken.get<{ result: TodoListType }>('/todos', {
    params: { lastSeenId: pageParam, pageSize, done: doneParam }
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
