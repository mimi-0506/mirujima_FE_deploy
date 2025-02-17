import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNote } from '@/api/clientActions/note';

import { noteKey } from './useInfiniteNoteList';

import type { NoteListType } from '@/types/note.type';
import type { InfiniteData } from '@tanstack/react-query';

const useDeleteNote = (goalId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onMutate: async (noteId) => {
      toast.loading('노트 삭제 중...', { id: 'deleteNote' });

      await queryClient.cancelQueries({ queryKey: [...noteKey.list, goalId] });

      const prevList = queryClient.getQueryData<InfiniteData<NoteListType>>([
        ...noteKey.list,
        goalId
      ]);
      const newList = prevList;

      if (newList) {
        newList.pages.forEach((page) => {
          return page.notes.filter(({ id }) => id !== noteId);
        });
      }

      queryClient.setQueryData<InfiniteData<NoteListType>>([...noteKey.list, goalId], newList);

      return { prevList };
    },
    onSuccess: () => {
      toast.dismiss('deleteNote');
      toast.success('노트가 삭제되었습니다!');
    },
    onError: (_, noteId, ctx) => {
      toast.dismiss('deleteNote');
      toast.error('노트 삭제 실패했습니다.');

      queryClient.setQueryData<InfiniteData<NoteListType>>(
        [...noteKey.list, goalId],
        ctx?.prevList
      );
    },
    onSettled: (_, err, noteId) => {
      queryClient.removeQueries({ queryKey: [...noteKey.detail, noteId] });
      queryClient.invalidateQueries({ queryKey: [...noteKey.list, goalId] });
    }
  });
};

export default useDeleteNote;
