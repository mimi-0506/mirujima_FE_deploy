import { useRef } from 'react';

import { useModalStore } from '@/provider/store-provider';

import CloseButton from './CloseButton';
import GoalSelector from './GoalSelector';
import Uploader from './Uploader';

export default function TodoCreatModal() {
  const { setTodoCreate, setTodoCreateCheck } = useModalStore((state) => state);
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
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const isFormFilled = Array.from(formData.values()).some((value) => value !== '');

      if (isFormFilled) setTodoCreateCheck(true);
      else setTodoCreate(false);
    }
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
          <input name="title" placeholder="할 일의 제목을 적어주세요" maxLength={30} required />

          <Uploader />
          <GoalSelector />

          <input type="submit" />
        </form>
      </div>
    </dialog>
  );
}
