'use client';

import React from 'react';

import { Editor } from './editor/DynamicEditor';

export default function NoteContent() {
  return (
    <div className="h-full w-full max-w-[792px] space-y-2 py-[5px]">
      <div>
        <input
          type="text"
          className="w-full border-y border-slate-200 py-2 text-base outline-none"
          placeholder="노트의 제목을 입력해주세요"
        />
      </div>
      <Editor />
    </div>
  );
}
