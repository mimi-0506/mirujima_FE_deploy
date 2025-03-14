import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNote } from '@/apis/clientActions/note';

import { useInfoStore, useModalStore } from '@/provider/store-provider';

import type { NoteListType } from '@/types/note.types';
import type { InfiniteData } from '@tanstack/react-query';

const useDeleteNote = (goalId: number) => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: deleteNote,
    onMutate: async (noteId) => {
      setIsLoading(true);

      await queryClient.cancelQueries({ queryKey: ['notes', goalId, userId] });

      const prevList = queryClient.getQueryData<InfiniteData<NoteListType>>([
        'notes',
        goalId,
        userId
      ]);
      const newList = prevList;

      if (newList) {
        newList.pages.forEach((page) => {
          return page.notes.filter(({ id }) => id !== noteId);
        });
      }

      queryClient.setQueryData<InfiniteData<NoteListType>>(['notes', goalId, userId], newList);

      return { prevList };
    },
    onSuccess: (_, noteId) => {
      queryClient.removeQueries({ queryKey: ['note', noteId, userId] });
      queryClient.invalidateQueries({ queryKey: ['notes', goalId, userId] });
    },
    onError: (_, _noteId, ctx) => {
      queryClient.setQueryData<InfiniteData<NoteListType>>(
        ['notes', goalId, userId],
        ctx?.prevList
      );
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });
};

export default useDeleteNote;
