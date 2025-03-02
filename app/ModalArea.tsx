'use client';

import GoalEditModal from '@/app/(workspace)/goals/_components/GoalEditModal';
import GoalCreateModal from '@/modals/goalCreateModal';
import Loading from '@/modals/loadingOverlay/Loading';
import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

import NoteConfirmModal from './(workspace)/(note)/_components/modals/noteConfirmModal/NoteConfirmModal';
import UploadLinkModal from './(workspace)/(note)/_components/modals/uploadLinkModal/UploadLinkModal';
import GoalDeleteConfirmModal from './(workspace)/goals/_components/GoalDeleteConfirmModal';
import NoteDetailModal from './(workspace)/goals/_components/NoteDetailModal';

export default function ModalArea() {
  const {
    isNoteDetailPageModalOpen,
    noteDetailPageModalProps,
    isNoteConfirmModalOpen,
    noteConfirmModalProps,
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
      {isNoteDetailPageModalOpen && noteDetailPageModalProps ? (
        <NoteDetailModal
          params={noteDetailPageModalProps.params}
          onClose={noteDetailPageModalProps.onClose}
        />
      ) : null}
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
      {isNoteConfirmModalOpen && noteConfirmModalProps ? (
        <NoteConfirmModal
          type={noteConfirmModalProps.type}
          contentTitle={noteConfirmModalProps.contentTitle}
          onCancel={noteConfirmModalProps.onCancel}
          onConfirm={noteConfirmModalProps.onConfirm}
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
