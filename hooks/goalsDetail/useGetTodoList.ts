import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import authApi from '@/api/clientActions/authApi';

/** Todo 타입 (목표에 속한 할 일) */
interface Todo {
  goal: {
    id: number;
    title: string;
    completionDate: string | null;
  };
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  priority: number;
}

/** 할 일 목록 조회 API 응답 형태 */
interface TodoListResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    lastSeenId: number;
    totalCount: number;
    todos: Todo[]; // 실제 할 일 목록
  };
}

// 할 일 목록 가져오기 함수
const fetchTodoList = async (
  goalId: string,
  done = false,
  lastSeenId = 9999,
  pageSize = 5
): Promise<Todo[]> => {
  console.log(`📡 Fetching todos for Goal ID: ${goalId}, done: ${done}`);
  const response = await authApi.get<TodoListResponse>('/todos', {
    params: { goalId, done, lastSeenId, pageSize }
  });
  console.log('✅ Todos API Response:', response.data);
  return response.data.result.todos;
};

// 할 일 목록 커스텀 훅
export const useGetTodoList = (goalId?: string, done = false) => {
  const query = useQuery<Todo[]>({
    queryKey: ['todoList', goalId, done],
    queryFn: () => fetchTodoList(goalId as string, done),
    enabled: !!goalId // goalId가 있을 때만 fetch
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log('🎉 Todo List Query Success:', query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      console.error('❌ Todo List Query Error:', query.error);
    }
  }, [query.isError, query.error]);

  return query;
};
