import React from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery } from '@tanstack/react-query';

import { readNoteListFromClient } from '@/api/clientActions/note';

import type { NoteListType } from '@/types/note.type';

const noteKey = {
  detail: ['note', 'detail'],
  list: ['note', 'list']
};

const useInfiniteNoteList = (goalId: number, initialData: NoteListType) => {
  const { data, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [...noteKey.list, goalId],
    queryFn: ({ pageParam }) => readNoteListFromClient({ goalId, lastSeenId: pageParam }),
    initialPageParam: 9999,
    initialData: { pages: [initialData], pageParams: [] },
    getNextPageParam: (lastPage) => (lastPage.totalCount > 10 ? lastPage.lastSeenId : undefined),
    select: (qData) => qData.pages.flatMap((page) => page.notes.toReversed())
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return { data, isFetching, inViewRef: ref };
};

export default useInfiniteNoteList;
