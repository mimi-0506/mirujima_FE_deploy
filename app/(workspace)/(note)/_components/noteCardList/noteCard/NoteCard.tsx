'use client';

import React from 'react';

import KebabMenu from '@/components/kebab/KebabMenu';
import NoteIcon from '@/public/icon/note.svg';

import TodoChip from '../../todoChip/TodoChip';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
  onClickNote: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function NoteCard({ note, onClickEdit, onClickDelete, onClickNote }: Props) {
  return (
    <article
      onClick={onClickNote}
      className="color-animate cursor-pointer space-y-[12px] rounded-2xl border border-gray200 bg-white p-6 hover:border-main hover:drop-shadow-note"
    >
      <div className="flex items-center">
        <div className="flex w-[calc(100%-24px)] items-center gap-1">
          <div className="h-8 w-8">
            <NoteIcon width="32" height="32" />
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
        <TodoChip />
        <h4 className="w-[calc(100%-55px)] truncate text-[15px] leading-[20px]">
          {note.todoDto.title}
        </h4>
      </div>
    </article>
  );
}
