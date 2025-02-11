'use client';

import React from 'react';

import Image from 'next/image';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
}

export default function NoteCard({ note }: Props) {
  return (
    <article className="space-y-[16px] rounded-lg bg-white p-6">
      <div className="flex h-[28px] w-full items-center justify-between">
        <Image
          src={'/icon/dashboard-gray.svg'} // 아이콘 나오면 수정 예정
          width={28}
          height={28}
          alt="노트리스트 아이콘"
          className=""
        />
        <button className="rounded-full bg-slate-50" aria-label="노트 옵션 더보기">
          <Image src={'/icon/more.svg'} width={24} height={24} alt="더보기 아이콘" className="" />
        </button>
      </div>
      <div className="space-y-[12px]">
        <h4>{note.title}</h4>
        <span className="block h-[1px] w-full bg-slate-200" />
        <div className="flex items-center gap-3 text-slate-700">
          <div className="h-[20px] w-[37px] rounded bg-slate-100 px-[3px] py-[2px] text-[12px] font-medium">
            <span>To do</span>
          </div>
          <p className="text-xs">{note.todoDto.title}</p>
        </div>
      </div>
    </article>
  );
}
