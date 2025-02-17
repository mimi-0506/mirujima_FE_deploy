import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import { apiWithClientToken } from '@/api/clientActions';
import { useInfoStore } from '@/provider/store-provider';

export default function useGetGoalList() {
  const { id } = useInfoStore((state) => state);

  const {
    data = { pages: [] },
    fetchNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['goalList', id],
    queryFn: async ({ pageParam }) => {
      if (!id) return { data: [] };
      return await getGoalList(pageParam);
    },
    getNextPageParam: (lastPage, allPage, nextPage) => {
      //   console.log('getNextPageParam', lastPage); //왜 중복호출될까.. 중복호출되어도 상관없긴 한데..
      return lastPage.pagenation?.nextPage;
    },
    enabled: !!id,
    initialPageParam: 1,
    retry: 0,
    refetchOnWindowFocus: false
  });

  const [ref, inView] = useInView();

  const getGoalList = async (pageParam: number): Promise<any> => {
    const { data } = await apiWithClientToken.get('/goals', {
      params: { lastSeenId: pageParam * 1000, pageSize: 10 }
    });

    const returnData = {
      data: data.result.goals,
      pagenation: {
        nextPage: pageParam + 1
      }
    };
    console.log(pageParam, '페이지 호출', returnData);

    return returnData;
  };

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      console.log('inview');

      fetchNextPage();
    }
  }, [inView]);

  return { ref, data, isLoading, isFetchingNextPage };
}
