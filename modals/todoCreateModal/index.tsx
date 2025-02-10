import { useRef, useState } from 'react';

import { debounce } from 'lodash';

import { useModalStore } from '@/provider/store-provider';

import CloseButton from './CloseButton';
import GoalSelector from './GoalSelector';
import Uploader from './Uploader';

export default function TodoCreateModal() {
  const { setIsTodoCreateModalOpen, setIsTodoCreateCheckModalOpen } = useModalStore(
    (state) => state
  );
  const [allValid, setAllValid] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      console.log(Object.fromEntries(formData.entries()));

      //여기에 제출 로직 추가
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    if (event) event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const isFormFilled = Array.from(formData.values()).some((value) => value !== '');

      if (isFormFilled) setIsTodoCreateCheckModalOpen(true);
      else setIsTodoCreateModalOpen(false);
    }
  };

  const handleChangeIsValid = debounce(() => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const datas = Object.fromEntries(formData.entries());
      const isFormAllFilled = datas.title && datas.goal ? true : false;

      setAllValid(isFormAllFilled);
    }
  }, 50);

  const SubmitButton = () => {
    return (
      <button
        disabled={!allValid}
        className={`${
          allValid ? 'bg-blue-500 hover:bg-blue-600' : 'cursor-not-allowed bg-gray-400'
        } rounded px-4 py-2 font-bold text-white transition-colors duration-300`}
      >
        제출
      </button>
    );
  };

  return (
    <dialog
      id="modal"
      className="absolute flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div className="relative min-h-[500px] min-w-[500px] rounded-lg bg-white">
        <CloseButton handleClose={handleClose} />
        <h2 className="mb-4 text-2xl font-semibold">할 일 생성</h2>

        <form onSubmit={handleTodoSubmit} ref={formRef} className="flex flex-col">
          <label>제목</label>
          <input
            name="title"
            placeholder="할 일의 제목을 적어주세요"
            maxLength={30}
            required
            onChange={handleChangeIsValid}
          />

          <Uploader />
          <GoalSelector handleChangeIsValid={handleChangeIsValid} />

          <SubmitButton />
        </form>
      </div>
    </dialog>
  );
}
