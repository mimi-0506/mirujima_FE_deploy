import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import { readTodoList } from '@/apis/todo';

export const useInfiniteTodoList = (userId: number, filter: string, priority: number) => {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['allTodos', userId, filter, priority],
    queryFn: ({ pageParam = undefined }) => readTodoList({ lastSeenId: pageParam }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => (lastPage.remainingCount > 0 ? lastPage.lastSeenId : undefined),
    select: (data) => {
      return {
        ...data,
        pages: data.pages ? data.pages.flatMap((page) => page.todos) : []
      };
    }
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching]);

  return { data, isLoading, isFetching, fetchNextPage, ref };
};
