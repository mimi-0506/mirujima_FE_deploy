import { useRouter } from 'next/navigation';

import { useModalStore } from '@/provider/store-provider';

import useDeleteNote from './useDeleteNote';
import toast from 'react-hot-toast';
import { NOTE_DELETE_ERROR, NOTE_DELETE_SUCCESS } from '@/constant/toastText';

const useNoteActions = (goalId: number | undefined) => {
  const effectGoalId = goalId ?? 0;
  const router = useRouter();

  const { mutate: deleteNoteMutate } = useDeleteNote(effectGoalId);
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
          deleteNoteMutate(noteId, {
            onSuccess: () => {
              router.back();
              toast.success(NOTE_DELETE_SUCCESS);
            },
            onError: () => toast.error(NOTE_DELETE_ERROR),
            onSettled: () => setIsNoteConfirmModalOpen(false)
          });
        }
      });
    };
  };

  return { onClickNote, onClickEdit, onClickDelete };
};

export default useNoteActions;
