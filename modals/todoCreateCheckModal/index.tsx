import { useModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import Overlay from '../Overlay';

export default function TodoCreateCheckModal() {
  const { setIsTodoCreateModalOpen, setIsTodoCreateCheckModalOpen, resetTodoCreateModal } =
    useModalStore((state) => state);

  const handleClose = () => {
    setIsTodoCreateCheckModalOpen(false);
  };

  const handleCloseAll = () => {
    setIsTodoCreateCheckModalOpen(false);
    setIsTodoCreateModalOpen(false);
    resetTodoCreateModal();
  };

  return (
    <Overlay>
      <div className="relative box-border flex h-[222px] w-[300px] flex-col items-center justify-between rounded-lg bg-white p-4">
        <div className="flex w-full justify-end">
          <CloseButton handleClose={handleClose} />
        </div>
        <p className="mb-10 mt-4 w-full text-center">
          정말 나가시겠어요?
          <br />
          작성된 내용이 모두 삭제됩니다.
        </p>
        <div className="gap=[6px] flex w-full items-center justify-center">
          <button
            onClick={handleClose}
            className="flex h-[48px] w-[120px] items-center justify-center rounded-xl border border-main text-main"
          >
            취소
          </button>
          <button
            onClick={handleCloseAll}
            className="flex h-[48px] w-[120px] items-center justify-center rounded-xl border bg-main text-white"
          >
            확인
          </button>
        </div>
      </div>
    </Overlay>
  );
}
