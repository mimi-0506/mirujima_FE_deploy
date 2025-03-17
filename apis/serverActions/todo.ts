'use server';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { TodoType } from '@/types/todo.types';
import { apiWithServerToken } from '.';
import { notFound } from 'next/navigation';

export const readTodoFromServer = async (todoId: number) => {
  const isInvalid = isNaN(todoId);
  if (isInvalid) notFound();

  const res = await apiWithServerToken.get<ApiResponse<TodoType>>(`/todos/${todoId}`);

  return res.data?.result;
};
