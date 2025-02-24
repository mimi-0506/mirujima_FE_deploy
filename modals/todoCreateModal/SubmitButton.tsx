import { type MouseEventHandler, type RefObject } from 'react';

import { fileUpload } from '@/apis/clientActions/s3';
import { useTodoCreateModalStore } from '@/provider/store-provider';

import useTodoCreate from '../../hooks/todoCreate/useSetTodoCreate';
import useTodoCreateValidCheck from '../../hooks/todoCreate/useTodoCreatValidCheck';
import useTodoEdit from '../../hooks/todoCreate/useTodoEdit';

export default function SubmitButton({
  formRef,
  isEdit
}: {
  formRef: RefObject<HTMLFormElement | null>;
  isEdit: any;
}) {
  const { fileName } = useTodoCreateModalStore((state) => state);
  const { setTodoCreate } = useTodoCreate();
  const { setTodoEdit } = useTodoEdit(isEdit?.id);
  const { allValid } = useTodoCreateValidCheck();

  //제출 로직 컴포넌트에 분리하고 싶으므로 onSubmit이 아닌 button에서 해결
  const handleTodoSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      if (data.file instanceof File && data.file.size > 0) {
        const savedPath = await fileUpload(data.file, fileName);

        isEdit ? await setTodoEdit(data, savedPath) : await setTodoCreate(data, savedPath);
      } else isEdit ? await setTodoEdit(data) : await setTodoCreate(data);
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
      {isEdit ? '수정하기' : '생성하기'}
    </button>
  );
}
