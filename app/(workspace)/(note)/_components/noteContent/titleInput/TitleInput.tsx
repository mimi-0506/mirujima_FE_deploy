'use client';

import React from 'react';
import { type Control, type UseFormRegister, useWatch } from 'react-hook-form';

import type { NoteInputData } from '@/schema/noteSchema';

interface Props {
  register: UseFormRegister<NoteInputData>;
  control: Control<NoteInputData>;
}

export default function TitleInput({ register, control }: Props) {
  const titleValue = useWatch({ control, name: 'title' });
  return (
    <div className="flex items-center gap-[10px] border-y border-gray350 px-4">
      <input
        type="text"
        id="note-title-input"
        maxLength={30}
        className="w-full py-2 text-base font-semibold outline-none placeholder:text-gray350 md:text-[22px]"
        placeholder="노트의 제목을 입력해주세요"
        {...register('title')}
      />
      <label
        htmlFor="note-title-input"
        className={`text-xs ${titleValue?.length === 30 ? 'text-main' : 'text-gray350'} `}
      >
        {titleValue?.length || 0}/<span className="text-main">30</span>
      </label>
    </div>
  );
}
