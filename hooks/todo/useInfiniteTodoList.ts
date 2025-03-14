import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { readTodoList } from '@/apis/clientActions/todo';

export const useInfiniteTodoList = (userId: number) => {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['allTodos', userId],
    queryFn: ({ pageParam }) => readTodoList({ lastSeenId: pageParam ?? 9999 }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => (lastPage.remainingCount > 0 ? lastPage.lastSeenId : undefined),
    select: (data) => ({
      ...data,
      pages: Array.isArray(data.pages) ? data.pages.flatMap((page) => page.todos) : []
    })
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView, isFetching]);

  return { data, isLoading, isFetching, fetchNextPage, ref };
};
