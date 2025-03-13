import { usePathname, useRouter } from 'next/navigation';

import { useModalStore } from '@/provider/store-provider';

import useDeleteNote from './useDeleteNote';
import toast from 'react-hot-toast';
import { NOTE_DELETE_ERROR, NOTE_DELETE_SUCCESS } from '@/constant/toastText';
import _ from 'lodash';

const useNoteActions = (goalId: number | undefined) => {
  const effectGoalId = goalId ?? 0;
  const router = useRouter();
  const pathname = usePathname();

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
        onConfirm: _.throttle(() => {
          deleteNoteMutate(noteId, {
            onSuccess: () => {
              if (pathname.includes('notes')) router.back();
              toast.success(NOTE_DELETE_SUCCESS);
            },
            onError: () => toast.error(NOTE_DELETE_ERROR),
            onSettled: () => setIsNoteConfirmModalOpen(false)
          });
        }, 1000)
      });
    };
  };

  return { onClickNote, onClickEdit, onClickDelete };
};

export default useNoteActions;
