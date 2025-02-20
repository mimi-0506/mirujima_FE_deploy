'use client';

import GoalDeleteConfirmModal from '@/components/modal/GoalDeleteConfirmModal';
import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

import LoadTempNoteConfirmModal from './(workspace)/(note)/_components/modals/lodaTempNoteConfirmModal/LoadTempNoteConfirmModal';
import UploadLinkModal from './(workspace)/(note)/_components/modals/uploadLinkModal/UploadLinkModal';

export default function ModalArea() {
  const {
    isConfirmTempModalOpen,
    confirmTempNoteModalProps,
    isNoteLinkModalOpen,
    noteLinkModalProps,
    isTodoCreateModalOpen,
    isTodoCreateCheckModalOpen,
    isGoalDeleteModalOpen,
    goalDeleteModalProps
  } = useModalStore((state) => state);

  return (
    <>
      {isTodoCreateModalOpen && <TodoCreateModal />}
      {isTodoCreateCheckModalOpen && <TodoCreateCheckModal />}
      {isGoalDeleteModalOpen && goalDeleteModalProps && (
        <GoalDeleteConfirmModal
          onConfirm={goalDeleteModalProps.onConfirm}
          onCancel={goalDeleteModalProps.onCancel}
        />
      )}
      {isConfirmTempModalOpen && confirmTempNoteModalProps ? (
        <LoadTempNoteConfirmModal
          tempNoteTitle={confirmTempNoteModalProps.tempNoteTitle}
          onCancel={confirmTempNoteModalProps.onCancel}
          onConfirm={confirmTempNoteModalProps.onConfirm}
        />
      ) : null}
      {isNoteLinkModalOpen && noteLinkModalProps ? (
        <UploadLinkModal
          defaultValue={noteLinkModalProps.defaultValue}
          onSubmit={noteLinkModalProps.onSubmit}
          linkInputRef={noteLinkModalProps.linkInputRef}
        />
      ) : null}
    </>
  );
}
