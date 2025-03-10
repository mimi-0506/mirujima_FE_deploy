import type { ApiResponse } from '@/types/apiResponse.type';
import type { TodoType } from '@/types/todo.type';

import { apiWithServerToken } from '.';

export const readTodoFromServer = async (todoId: number): Promise<TodoType> => {
  try {
    const { data } = await apiWithServerToken.get<ApiResponse<TodoType>>(`/todos/${todoId}`);
    if (data.result === null) {
      throw new Error('할 일이 없습니다.');
    }
    return data.result;
  } catch (error) {
    if (error instanceof Error) {
      // 추후 에러 처리 예정
    }

    throw error;
  }
};
