'use client';

import { useModalStore } from '@/provider/store-provider';

export default function NewTodo() {
  const { setTodoCreate } = useModalStore((state) => state);
  return (
    <>
      <button
        onClick={() => {
          setTodoCreate(true);
        }}
      >
        새 할일
      </button>
    </>
  );
}
