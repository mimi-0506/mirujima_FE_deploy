'use client';

import TodoCreatModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const { todoCreate } = useModalStore((state) => state);

  return <>{todoCreate && <TodoCreatModal />}</>;
}
