'use client';
import { useModalStore } from '@/provider/store-provider';

export default function TodoCreatModal() {
  const { setTodoCreate } = useModalStore((state) => state);

  return (
    <div
      id="modal"
      className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={() => {
        setTodoCreate(false);
      }}
    >
      <div className="w-96 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-semibold">모달 제목</h2>
        <p className="mb-4 text-gray-700">여기 모달 내용을 작성하세요!</p>
        <button
          id="closeModal"
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
