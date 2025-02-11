import { getCookie } from 'cookies-next';

import api from './authApi';

import type { TodoList } from '@/types/todoTypes';

const accessToken = getCookie('accessToken');

const TODO_SIZE = 40;

export const readTodoList = async ({ pageParam = null }) => {
  const response = await api.get<TodoList>('/4/todos', {
    params: { cursor: pageParam, size: TODO_SIZE },
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data;
};
