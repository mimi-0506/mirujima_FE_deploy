'use client';

import React from 'react';

import Image from 'next/image';

import KebabMenu from '@/components/kebab/KebabMenu';

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
      className="hover-animate cursor-pointer space-y-[12px] rounded-2xl border border-gray200 bg-white p-6 hover:border-main hover:drop-shadow-note"
    >
      <div className="flex items-center">
        <div className="flex w-full items-center gap-1">
          <Image
            src={'/icon/note.svg'}
            width={32}
            height={32}
            alt="노트리스트 아이콘"
            className=""
          />
          <h3 className="w-full truncate text-[17px] font-semibold leading-[22px] text-gray500">
            {note.title}
          </h3>
        </div>

        <KebabMenu size={24} onEdit={onClickEdit} onDelete={onClickDelete} />
        {/* <button className="rounded-md bg-Cgray" aria-label="노트 옵션 더보기">
          <Image src={'/icon/more.svg'} width={24} height={24} alt="더보기 아이콘" className="" />
        </button> */}
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
