'use client';

import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreatModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const { todoCreate, todoCreateCheck } = useModalStore((state) => state);

  return (
    <>
      {todoCreate && <TodoCreatModal />}
      {todoCreateCheck && <TodoCreateCheckModal />}
    </>
  );
}
