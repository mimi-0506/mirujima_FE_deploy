import { useModalStore } from '@/provider/store-provider';

export default function TodoCreateCheckModal() {
  const { setTodoCreate, setTodoCreateCheck } = useModalStore((state) => state);

  return (
    <dialog
      id="modal"
      className="absolute flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div className="relative min-h-[100px] min-w-[100px] rounded-lg border bg-white">
        <button onClick={() => setTodoCreateCheck(false)}>닫기</button>
        정말 나가시겠어요?
        <br />
        작성된 내용이 모두 삭제됩니다.
        <div>
          <button onClick={() => setTodoCreateCheck(false)}>취소</button>
          <button
            onClick={() => {
              setTodoCreateCheck(false);
              setTodoCreate(false);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
}
