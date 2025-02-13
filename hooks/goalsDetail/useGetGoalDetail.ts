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

/** 목표 상세 조회 API 응답 형태 */
interface GoalDetailResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    id: number; // goal id
    title: string; // goal 제목
    todos: Todo[]; // 목표에 속한 할 일 목록
  };
}

// 목표 상세 데이터 가져오기
const fetchGoalDetail = async (goalId: string): Promise<GoalDetailResponse> => {
  console.log(`📡 Fetching goal detail for ID: ${goalId}`);
  const response = await authApi.get<GoalDetailResponse>(`/goals/${goalId}`);
  console.log('✅ API Response:', response.data);
  return response.data;
};

// 목표 상세 커스텀 훅
export const useGetGoalDetail = (goalId?: string) => {
  const query = useQuery<GoalDetailResponse>({
    queryKey: ['goalDetail', goalId],
    queryFn: () => fetchGoalDetail(goalId as string),
    enabled: !!goalId // goalId가 있을 때만 fetch
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log('🎉 Query Success:', query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      console.error('❌ Query Error:', query.error);
    }
  }, [query.isError, query.error]);

  return query;
};
