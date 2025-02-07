'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { createNote } from '@/api/note';
import { FaviconIcon } from '@/components/icons';
import { noteSchema } from '@/schema/noteSchema';

import { Editor } from './editor/DynamicEditor';

import type { NoteInputData } from '@/schema/noteSchema';
import type { NoteDataType } from '@/types/note.type';
import type { TodoResponseType } from '@/types/todo.type';

interface Props {
  todo: TodoResponseType;
}

export default function NoteContent({ todo }: Props) {
  const { register, handleSubmit, setValue } = useForm<NoteInputData>({
    resolver: zodResolver(noteSchema)
  });

  const onSubmit: SubmitHandler<NoteInputData> = async (data) => {
    const { title, content, linkUrl } = data;

    const note: NoteDataType = {
      todoId: todo.id,
      title,
      content: '작성 테스트 2', // content text 제한이 있는듯?
      linkUrl
    };

    try {
      const res = await createNote(note);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <div className="w-full max-w-[792px] py-[5px]">
        <div className="flex items-center justify-between py-[5px]">
          <h2 className="text-base text-slate-900">노트 작성</h2>
          <div className="flex gap-2">
            <button
              type="button"
              name="임시저장 버튼"
              className="h-[36px] w-[84px] rounded-xl text-[14px] font-semibold text-blue-500"
            >
              임시 저장
            </button>
            <button
              type="submit"
              name="작성완료 버튼"
              className="h-[36px] w-[84px] rounded-xl bg-slate-400 text-[14px] font-semibold text-white"
            >
              작성 완료
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 py-[5px]">
          <div className="h-6 w-6">
            <FaviconIcon />
          </div>
          <h3 className="truncate text-slate-800">{todo.goal.title}</h3>
        </div>
        <div className="flex items-center gap-2 py-[5px]">
          <div>
            <button
              className="h-[20px] w-[37px] rounded bg-slate-100 px-[3px] py-[2px] text-[12px] font-medium text-slate-700"
              disabled
            >
              To do
            </button>
          </div>
          <h4 className="truncate text-slate-700">{todo.title}</h4>
        </div>
      </div>

      <div className="h-full w-full max-w-[792px] space-y-2 py-[5px]">
        <div>
          <input
            type="text"
            className="w-full border-y border-slate-200 py-2 text-base outline-none"
            placeholder="노트의 제목을 입력해주세요"
            {...register('title')}
          />
        </div>
        <div>
          <p className="text-[12px] font-medium text-slate-800">
            공백 포함 : 총 {0}자 | 공백제외 : 총 {0}자
          </p>
        </div>
        {/* {link && (
        <div className="h-[32px] w-full">
        <Link href={link} target="_blank">
        {link}
        </Link>
        </div>
        )} */}
        <Editor register={register('content')} setValue={setValue} />
      </div>
    </form>
  );
}
