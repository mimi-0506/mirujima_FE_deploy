import { type MouseEventHandler, type RefObject } from 'react';

import { fileUpload } from '@/apis/clientActions/s3';
import { useTodoCreateModalStore } from '@/provider/store-provider';

import useTodoCreate from '../../hooks/todoCreate/useSetTodoCreate';
import useTodoCreateValidCheck from '../../hooks/todoCreate/useTodoCreatValidCheck';
import useTodoEdit from '../../hooks/todoCreate/useTodoEdit';

export default function SubmitButton({ formRef }: { formRef: RefObject<HTMLFormElement | null> }) {
  const fileName = useTodoCreateModalStore((state) => state.fileName);

  const isEdit = useTodoCreateModalStore((state) => state.isEdit);
  const { setTodoCreate } = useTodoCreate();
  const { setTodoEdit } = useTodoEdit();
  const { allValid } = useTodoCreateValidCheck();

  const handleTodoSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      if (data.file instanceof File && data.file.size > 0) {
        const safeFileName = fileName ?? '';
        const savedPath = await fileUpload(data.file, safeFileName);
        isEdit
          ? await setTodoEdit(data, fileName ?? '', savedPath)
          : await setTodoCreate(data, savedPath);
      } else isEdit ? await setTodoEdit(data, fileName ?? '') : await setTodoCreate(data);
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
