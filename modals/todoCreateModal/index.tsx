import { useRef } from 'react';

import { TodoCreateModalStoreProvider, useModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import DoneChecker from './DoneChecker';
import GoalSelector from './GoalSelector';
import Overlay from '../Overlay';
import PrioritySelector from './PrioritySelector';
import SubmitButton from './SubmitButton';
import TitleInput from './TitleInput';
import Uploader from './Uploader';
import useSetTodoEditValue from './useSetTodoEditValue';

export default function TodoCreateModal({ todoId = 'test' }: { todoId: string | null }) {
  const { setIsTodoCreateModalOpen, setIsTodoCreateCheckModalOpen } = useModalStore(
    (state) => state
  );
  useSetTodoEditValue(todoId);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const isFormFilled = Array.from(formData.values()).some((value) => value !== '');

      if (isFormFilled) setIsTodoCreateCheckModalOpen(true);
      else setIsTodoCreateModalOpen(false);
    }
  };

  return (
    <Overlay>
      <TodoCreateModalStoreProvider>
        <div className="relative flex min-h-[800px] min-w-[520px] flex-col justify-between rounded-lg bg-white p-6 font-semibold">
          <div className="flex justify-between">
            <h2 className="mb-4 text-2xl font-semibold">{todoId ? '할 일 수정' : '할 일 생성'}</h2>
            <CloseButton handleClose={handleClose} />
          </div>

          <form ref={formRef} className="relative flex h-auto flex-1 flex-col gap-6">
            {todoId && <DoneChecker />}
            <TitleInput />
            <Uploader />
            <PrioritySelector />
            <GoalSelector />
            <SubmitButton formRef={formRef} />
          </form>
        </div>
      </TodoCreateModalStoreProvider>
    </Overlay>
  );
}
