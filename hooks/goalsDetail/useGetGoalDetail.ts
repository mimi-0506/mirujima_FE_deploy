import { useQuery } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

import type { TodoType } from '@/types/todo.type';

interface GoalDetailResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    title: string;
    todos: TodoType[];
  };
}

const fetchGoalDetail = async (goalId: string): Promise<GoalDetailResponse> => {
  const response = await authApi.get<GoalDetailResponse>(`/goals/${goalId}`);
  return response.data;
};

export const useGetGoalDetail = (goalId?: string) => {
  const { userId } = useInfoStore((state) => state);
  const query = useQuery<GoalDetailResponse>({
    queryKey: ['goal', goalId, userId],
    queryFn: () => fetchGoalDetail(goalId as string),
    enabled: !!goalId
  });

  return query;
};
