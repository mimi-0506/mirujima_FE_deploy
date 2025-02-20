'use client';

import GoalDeleteConfirmModal from '@/app/(workspace)/goals/_components/GoalDeleteConfirmModal';
import GoalEditModal from '@/app/(workspace)/goals/_components/GoalEditModal';
import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const {
    isTodoCreateModalOpen,
    isTodoCreateCheckModalOpen,
    isGoalDeleteModalOpen,
    isGoalEditModalOpen,
    goalDeleteModalProps,
    goalEditModalProps
  } = useModalStore((state) => state);

  return (
    <>
      {isTodoCreateModalOpen && <TodoCreateModal todoId={null} />}
      {isTodoCreateCheckModalOpen && <TodoCreateCheckModal />}
      {isGoalDeleteModalOpen && goalDeleteModalProps && (
        <GoalDeleteConfirmModal
          onConfirm={goalDeleteModalProps.onConfirm}
          onCancel={goalDeleteModalProps.onCancel}
        />
      )}
      {isGoalEditModalOpen && goalEditModalProps && (
        <GoalEditModal
          onConfirm={goalEditModalProps.onConfirm}
          onCancel={goalEditModalProps.onCancel}
          initialValue={goalEditModalProps.initialValue}
        />
      )}
    </>
  );
}
