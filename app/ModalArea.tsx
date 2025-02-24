'use client';

import GoalEditModal from '@/app/(workspace)/goals/_components/GoalEditModal';
import GoalCreateModal from '@/modals/goalCreateModal';
import Loading from '@/modals/loadingOverlay/Loading';
import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

import LoadTempNoteConfirmModal from './(workspace)/(note)/_components/modals/lodaTempNoteConfirmModal/LoadTempNoteConfirmModal';
import UploadLinkModal from './(workspace)/(note)/_components/modals/uploadLinkModal/UploadLinkModal';
import GoalDeleteConfirmModal from './(workspace)/goals/_components/GoalDeleteConfirmModal';

export default function ModalArea() {
  const {
    isConfirmTempModalOpen,
    confirmTempNoteModalProps,
    isNoteLinkModalOpen,
    noteLinkModalProps,
    isTodoCreateModalOpen,
    isTodoCreateCheckModalOpen,
    isGoalDeleteModalOpen,
    isGoalEditModalOpen,
    goalDeleteModalProps,
    goalEditModalProps,
    isGoalCreateModalOpen,
    isLoading
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
      {isGoalEditModalOpen && goalEditModalProps ? (
        <GoalEditModal
          isOpen={isGoalEditModalOpen}
          onConfirm={goalEditModalProps.onConfirm}
          onCancel={goalEditModalProps.onCancel}
          initialValue={goalEditModalProps.initialValue}
        />
      ) : null}
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
      {isGoalCreateModalOpen && <GoalCreateModal />}
      {isLoading && <Loading />}
    </>
  );
}
