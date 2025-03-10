'use client';

import { useModalStore } from '@/provider/store-provider';

import AddIcon from '../../public/icon/add.svg';

export default function NewTodo() {
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);

  return (
    <>
      <button
        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[8px] bg-main text-white"
        onClick={() => {
          setIsTodoCreateModalOpen(true);
        }}
      >
        <AddIcon />새 할일
      </button>
    </>
  );
}
