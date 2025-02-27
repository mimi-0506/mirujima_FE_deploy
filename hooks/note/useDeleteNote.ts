import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNote } from '@/apis/clientActions/note';
import { NOTE_DELETE_ERROR, NOTE_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

import type { NoteListType } from '@/types/note.type';
import type { InfiniteData } from '@tanstack/react-query';

const useDeleteNote = (goalId: number) => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
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
    onSuccess: () => {
      setIsLoading(false);
      toast.success(NOTE_DELETE_SUCCESS);
    },
    onError: (_, noteId, ctx) => {
      setIsLoading(false);
      toast.error(NOTE_DELETE_ERROR);

      queryClient.setQueryData<InfiniteData<NoteListType>>(
        ['notes', goalId, userId],
        ctx?.prevList
      );
    },
    onSettled: (_, err, noteId) => {
      queryClient.removeQueries({ queryKey: ['note', noteId, userId] });
      queryClient.invalidateQueries({ queryKey: ['notes', goalId, userId] });

      setIsLoading(false);
    }
  });
};

export default useDeleteNote;
