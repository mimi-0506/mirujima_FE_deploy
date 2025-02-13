// hooks/useGetGoalDetail.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '@/api/clientActions/authApi';

// API 호출 함수
const fetchGoalDetail = async (goalId: string) => {
  console.log(`📡 Fetching goal detail for ID: ${goalId}`);
  const response = await api.get(`/goals/${goalId}`);
  console.log('✅ API Response:', response.data);
  return response.data;
};

// 커스텀 훅
export const useGetGoalDetail = (goalId?: string) => {
  const query = useQuery({
    queryKey: ['goalDetail', goalId],
    queryFn: () => fetchGoalDetail(goalId as string),
    enabled: !!goalId
    // goalId가 존재할 때만 fetch 진행
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

  return query; // { data, isLoading, isError, error, ... }
};
