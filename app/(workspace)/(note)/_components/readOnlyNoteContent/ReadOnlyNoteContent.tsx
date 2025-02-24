'use client';

import React from 'react';

import Link from 'next/link';

import EmbedLinkIcon from '@/public/icon/embed-link.svg';
import TodoIcon from '@/public/icon/work.svg';

import { ReadOnlyEditor } from './readOnlyEditor/DynamicReadOnyEditor';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
}

export default function ReadOnlyNoteContent({ note }: Props) {
  return (
    <section className="bg-white">
      <div className="w-full bg-white">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6">
            <TodoIcon width="24" height="24" />
          </div>
          <h2 className="truncate text-[17px] leading-[22px] text-gray500">{note.goalDto.title}</h2>
        </div>

        <div className="my-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-[20px] w-[37px] rounded bg-Cgray px-[3px] py-[2px] text-[12px] font-medium text-gray350">
              <span>To do</span>
            </div>
            <h4 className="truncate text-gray400">{note.todoDto.title}</h4>
          </div>
          <span className="text-sm leading-[16px] text-gray400">{note.goalDto.completionDate}</span>
        </div>

        <div className="mt-6 flex items-center gap-[10px] border-y border-gray200 px-4 py-4">
          <h3 className="w-full text-[22px] font-semibold leading-[28px]">{note.title}</h3>
        </div>

        <div className="space-y-2 px-4 py-[40px]">
          {note.linkUrl && (
            <div className="flex w-full justify-between gap-2 rounded-[20px] bg-Cgray px-4 py-3">
              <Link
                href={note.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="참고 링크 열기"
                className="flex w-[calc(100%-24px)] items-center gap-2 truncate text-slate-800"
              >
                <span>
                  <EmbedLinkIcon />
                </span>
                {note.linkUrl}
              </Link>
            </div>
          )}

          <ReadOnlyEditor defaultContent={note.content} />
        </div>
      </div>
    </section>
  );
}
