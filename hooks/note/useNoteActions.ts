import { useRouter } from 'next/navigation';

import useDeleteNote from './useDeleteNote';

const useNoteActions = (goalId: number) => {
  const router = useRouter();

  const { mutate } = useDeleteNote(goalId);

  const onClickNote = (noteId: number) => {
    return () => router.push(`/notes/${noteId}`, { scroll: false });
  };

  const onClickEdit = (todoId: number) => {
    return () => router.push(`/notes/create/${todoId}`);
  };

  const onClickDelete = (noteId: number) => {
    return () => mutate(noteId);
  };

  return { onClickNote, onClickEdit, onClickDelete };
};

export default useNoteActions;
