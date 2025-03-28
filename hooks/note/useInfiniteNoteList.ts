import React from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import { readNoteListFromClient } from '@/apis/clientActions/note';
import { useInfoStore } from '@/provider/store-provider';

import type { NoteListType } from '@/types/note.types';

const useInfiniteNoteList = (goalId: number | undefined, initData?: NoteListType) => {
  const effectGoalId = goalId ?? 0;

  const [isFirst, setIsFirst] = React.useState(true);
  const userId = useInfoStore((state) => state.userId);

  const staleTime = initData ? (isFirst ? 1000 : 10 * 60 * 1000) : isFirst ? 0 : 10 * 60 * 1000;

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['notes', effectGoalId, userId],
    queryFn: ({ pageParam }) =>
      readNoteListFromClient({ goalId: effectGoalId, lastSeenId: pageParam, hasGoal: !!goalId }),
    initialPageParam: 9999,
    initialData: { pages: initData ? [initData] : [], pageParams: [9999] },
    getNextPageParam: (lastPage) =>
      lastPage?.remainingCount > 0 ? lastPage.lastSeenId : undefined,
    select: (qData) => qData.pages.flatMap((page) => page.notes.toReversed()),
    staleTime,
    retry: 0,
    enabled: !!userId
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
      setIsFirst(false);
    }
  }, [inView]);

  return { data, isFetching, inViewRef: ref };
};

export default useInfiniteNoteList;
