import { useQuery } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

export default function useGetGoalList() {
  const { userId } = useInfoStore((state) => state);

  const fetchGoalList = async () => {
    const { data } = await apiWithClientToken.get('/goals', {
      params: { pageSize: 9999 }
    });

    return data.result.goals.reverse();
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['goals', userId],
    queryFn: fetchGoalList,
    refetchOnWindowFocus: false,
    retry: 0
  });

  return { data, isFetching, isLoading };
}
