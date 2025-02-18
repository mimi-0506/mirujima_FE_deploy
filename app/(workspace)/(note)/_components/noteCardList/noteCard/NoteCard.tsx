'use client';

import React from 'react';

import KebabMenu from '@/components/kebab/KebabMenu';
import NoteIcon from '@/public/icon/note.svg';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
  onClickNote: (id: number) => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function NoteCard({ note, onClickEdit, onClickDelete, onClickNote }: Props) {
  return (
    <article
      onClick={() => onClickNote(note.id)}
      className="hover-animate cursor-pointer space-y-[12px] rounded-2xl border border-gray200 bg-white p-6 hover:border-main hover:drop-shadow-note"
    >
      <div className="flex items-center">
        <div className="flex w-full items-center gap-1">
          <div className="h-8 w-8">
            <NoteIcon />
          </div>

          <h3 className="w-full truncate text-[17px] font-semibold leading-[22px] text-gray500">
            {note.title}
          </h3>
        </div>

        <KebabMenu
          size={24}
          onEdit={onClickEdit}
          onDelete={onClickDelete}
          editText="노트 수정"
          deleteText="노트 삭제"
        />
      </div>

      <div className="flex items-center gap-3 text-slate-700">
        <div className="h-[18px] w-[40px] rounded bg-Cgray px-[6px] pb-[2px] pt-[3px] text-[11px] font-medium text-gray350">
          <span>To do</span>
        </div>
        <h4 className="text-[15px] leading-[20px]">{note.todoDto.title}</h4>
      </div>
    </article>
  );
}
