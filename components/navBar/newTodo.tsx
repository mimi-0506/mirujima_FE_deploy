'use client';

import { useModalStore } from '@/provider/store-provider';

export default function NewTodo() {
  const { setIsTodoCreateModalOpen } = useModalStore((state) => state);
  return (
    <>
      <button
        onClick={() => {
          setIsTodoCreateModalOpen(true);
        }}
      >
        새 할일
      </button>
    </>
  );
}
