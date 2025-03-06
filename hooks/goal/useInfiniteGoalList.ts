import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import { readGoalList } from '@/apis/clientActions/goal';

export const useInfiniteGoalList = () => {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['goals'],
    queryFn: ({ pageParam = undefined }) => readGoalList({ lastSeenId: pageParam, pageSize: 3 }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) =>
      lastPage?.remainingCount > 0 ? lastPage.lastSeenId : undefined,
    select: (data) => {
      return {
        ...data,
        pages: data.pages ? data.pages.flatMap((page) => page.goals) : []
      };
    }
  });

  const goals = data?.pages || [];

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1
  });

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  return { goals, isLoading, isFetching, fetchNextPage, ref };
};
