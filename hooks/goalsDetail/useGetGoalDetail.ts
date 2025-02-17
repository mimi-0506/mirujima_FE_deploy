import { useQuery } from '@tanstack/react-query';

import authApi from '@/api/clientActions/authApi';

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
  const query = useQuery<GoalDetailResponse>({
    queryKey: ['goalDetail', goalId],
    queryFn: () => fetchGoalDetail(goalId as string),
    enabled: !!goalId
  });

  return query;
};
