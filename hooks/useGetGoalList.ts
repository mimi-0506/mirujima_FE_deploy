import { useQuery } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import type { GoalListType } from '@/types/goal.types';

const fetchGoalList = async (): Promise<GoalListType['goals']> => {
  const { data } = await apiWithClientToken.get('/goals', {
    params: { pageSize: 9999 }
  });
  return data.result.goals.reverse();
};

export default function useGetGoalList() {
  const userId = useInfoStore((state) => state.userId);

  const { data, isFetching, isLoading } = useQuery<GoalListType['goals']>({
    queryKey: ['goals', userId],
    queryFn: fetchGoalList,
    refetchOnWindowFocus: false,
    retry: 0
  });

  return { data, isFetching, isLoading };
}
