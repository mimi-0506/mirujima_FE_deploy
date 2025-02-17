import type { MouseEventHandler, RefObject } from 'react';

import useTodoCreateValidCheck from './useTodoCreatValidCheck';

export default function SubmitButton({ formRef }: { formRef: RefObject<HTMLFormElement | null> }) {
  const { allValid } = useTodoCreateValidCheck();

  //제출 로직 컴포넌트에 분리하고 싶으므로 onSubmit이 아닌 button에서 해결
  const handleTodoSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      console.log(Object.fromEntries(formData.entries()));

      //여기에 제출 로직 추가
    }
  };

  return (
    <button
      onClick={handleTodoSubmit}
      disabled={!allValid}
      className={`${
        allValid ? 'bg-main' : 'cursor-not-allowed bg-gray-400'
      } rounded px-4 py-2 font-bold text-white active:bg-pressed`}
    >
      생성하기
    </button>
  );
}
