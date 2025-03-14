import { useQuery } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions/index';
import { useInfoStore } from '@/provider/store-provider';
import type { ApiResponse } from '@/types/apiResponse.type';
import type { GoalType } from '@/types/goal.types';
import type { TodoType } from '@/types/todo.types';

type GoalDetailResult = GoalType & {
  todos: TodoType[];
};

type GoalDetailResponse = ApiResponse<GoalDetailResult>;

const fetchGoalDetail = async (goalId: GoalType['id']): Promise<GoalDetailResponse> => {
  const response = await apiWithClientToken.get<GoalDetailResponse>(`/goals/${goalId}`);
  return response.data;
};

export const useGetGoalDetail = (goalId: GoalType['id']) => {
  const userId = useInfoStore((state) => state.userId);

  const query = useQuery<GoalDetailResponse>({
    queryKey: ['goal', goalId, userId],
    queryFn: () => fetchGoalDetail(goalId),
    enabled: !!goalId
    // staleTime: 5 * 60 * 1000,
    // gcTime: 10 * 60 * 1000 // cacheTime → gcTime
  });

  return query;
};
