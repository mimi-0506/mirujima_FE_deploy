'use client';

import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const { isTodoCreateModalOpen, isTodoCreateCheckModalOpen } = useModalStore((state) => state);

  return (
    <>
      {isTodoCreateModalOpen && <TodoCreateModal todoId={null} />}
      {isTodoCreateCheckModalOpen && <TodoCreateCheckModal />}
    </>
  );
}
