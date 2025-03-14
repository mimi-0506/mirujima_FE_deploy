'use client';

import { useModalStore } from '@/provider/store-provider';
import dynamic from 'next/dynamic';

const GoalEditModal = dynamic(() => import('@/app/(workspace)/goals/_components/GoalEditModal'));
const GoalCreateModal = dynamic(() => import('@/modals/goalCreateModal'));
const Loading = dynamic(() => import('@/modals/loadingOverlay/Loading'));
const TodoCreateCheckModal = dynamic(() => import('@/modals/todoCreateCheckModal'));
const TodoCreateModal = dynamic(() => import('@/modals/todoCreateModal'));
const NoteConfirmModal = dynamic(
  () => import('./(workspace)/(note)/_components/modals/noteConfirmModal/NoteConfirmModal')
);
const UploadLinkModal = dynamic(
  () => import('./(workspace)/(note)/_components/modals/uploadLinkModal/UploadLinkModal')
);
const GoalDeleteConfirmModal = dynamic(
  () => import('./(workspace)/goals/_components/GoalDeleteConfirmModal')
);
const IOSPWAGuideModal = dynamic(() => import('@/modals/iOSPWAGuideModal/IOSPWAGuideModal'));

const TodoDeleteConfirmModal = dynamic(
  () => import('@/modals/todoDeleteConfirmModal/TodoDeleteConfirmModal')
);

export default function ModalArea() {
  const {
    isIOSPWAGuideModalOpen,
    isNoteConfirmModalOpen,
    noteConfirmModalProps,
    isNoteLinkModalOpen,
    noteLinkModalProps,
    isTodoCreateModalOpen,
    isTodoCreateCheckModalOpen,
    isTodoDeleteConfirmModalOpen,
    todoDeleteConfirmModalProps,
    isGoalDeleteModalOpen,
    isGoalEditModalOpen,
    goalDeleteModalProps,
    goalEditModalProps,
    isGoalCreateModalOpen,
    isLoading
  } = useModalStore((state) => state);

  return (
    <>
      {isIOSPWAGuideModalOpen && <IOSPWAGuideModal />}
      {isTodoCreateModalOpen && <TodoCreateModal />}
      {isTodoCreateCheckModalOpen && <TodoCreateCheckModal />}
      {isTodoDeleteConfirmModalOpen && todoDeleteConfirmModalProps && (
        <TodoDeleteConfirmModal
          onConfirm={todoDeleteConfirmModalProps.onConfirm}
          onCancel={todoDeleteConfirmModalProps.onCancel}
        />
      )}
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
