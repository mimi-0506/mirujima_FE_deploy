import { useRouter } from 'next/navigation';

import { useModalStore } from '@/provider/store-provider';

import useDeleteNote from './useDeleteNote';

const useNoteActions = (goalId: number) => {
  const router = useRouter();

  const { mutate } = useDeleteNote(goalId);
  const setIsNoteConfirmModalOpen = useModalStore((state) => state.setIsNoteConfirmModalOpen);

  const onClickNote = (noteId: number) => {
    return () => router.push(`/notes/${noteId}`, { scroll: false });
  };

  const onClickEdit = (todoId: number) => {
    return () => router.push(`/notes/create/${todoId}`);
  };

  const onClickDelete = (noteId: number, title: string) => {
    return () => {
      setIsNoteConfirmModalOpen(true, {
        type: 'delete',
        contentTitle: title,
        onCancel: () => setIsNoteConfirmModalOpen(false),
        onConfirm: () => {
          mutate(noteId);
          setIsNoteConfirmModalOpen(false);
        }
      });
    };
  };

  return { onClickNote, onClickEdit, onClickDelete };
};

export default useNoteActions;
