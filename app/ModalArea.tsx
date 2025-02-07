'use client';

import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const { todoCreate, todoCreateCheck } = useModalStore((state) => state);

  return (
    <>
      {todoCreate && <TodoCreateModal />}
      {todoCreateCheck && <TodoCreateCheckModal />}
    </>
  );
}
