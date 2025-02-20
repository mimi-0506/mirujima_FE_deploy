import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useInfoStore } from '@/provider/store-provider';

import useGetGoalList from '../useGetGoalList';

export default function useInfinityGoalList() {
  const { id } = useInfoStore((state) => state);
  const { getGoalList } = useGetGoalList();

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

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      console.log('inview');

      fetchNextPage();
    }
  }, [inView]);

  return { ref, data, isLoading, isFetchingNextPage };
}
