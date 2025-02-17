import type { ApiResponse } from '@/types/apiResponse.type';
import type { TodoType } from '@/types/todo.type';

import { apiWithServerToken } from '.';

export const readTodoFromServer = async (todoId: number) => {
  try {
    const res = await apiWithServerToken.get<ApiResponse<TodoType>>(`/todos/${todoId}`);

    return res.data.result;
  } catch (error) {
    if (error instanceof Error) {
      // 추후 에러 처리 예정
    }

    throw error;
  }
};
