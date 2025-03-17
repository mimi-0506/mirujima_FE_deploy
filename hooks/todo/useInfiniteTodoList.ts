import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { readTodoList } from '@/apis/clientActions/todo';

export const useInfiniteTodoList = (userId: number) => {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['allTodosInfiniteScroll', userId],
    queryFn: ({ pageParam }) => readTodoList({ lastSeenId: pageParam ?? 9999 }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.remainingCount > 0) {
        return lastPage.lastSeenId;
      }
      return undefined;
    },
    select: (data) => {
      if (!data || !data.pages) {
        return { pages: [], pageParams: [] };
      }
      return {
        ...data,
        pages: data.pages.flatMap((page) => page?.todos ?? [])
      };
    }
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);
  const todos = data?.pages ?? [];

  return { data: todos, isLoading, isFetching, fetchNextPage, ref };
};
