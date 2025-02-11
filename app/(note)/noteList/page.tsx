import React from 'react';

import Image from 'next/image';

import { readNoteListFromServer } from '@/api/serverActions/note';

import NoteCardList from '../_components/noteCardList/NoteCardList';

import type { NoteListType } from '@/types/note.type';

export default async function NoteList() {
  const res = await readNoteListFromServer({ goalId: 1, lastSeenId: 9999, pageSize: 5 });
  const goal = mockList.notes[0].goalDto.title;

  return (
    <main className="h-screen overflow-y-scroll bg-slate-100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <section className="max-w-[792px] space-y-[16px] md:pt-4">
        <h2 className="sr-only md:not-sr-only">노트 모아보기</h2>
        <div className="flex h-[52px] w-full gap-2 rounded-xl bg-white px-6 py-[14px]">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-main">
            <Image src={'/icon/flag-white.svg'} width={14} height={14} alt="깃발" />
          </div>
          <h3 className="w-[calc(100%-32px)] truncate">{goal}</h3>
        </div>
        <NoteCardList noteList={mockList} />
      </section>
    </main>
  );
}
const mockList: NoteListType = {
  lastSeenId: 1,
  totalCount: 4,
  notes: [
    {
      todoDto: {
        id: 4,
        title: '노트를 위한 할 일 4',
        done: false,
        linkUrl: '',
        filePath: ''
      },
      content: '노트 내용',
      linkUrl: null,
      updatedAt: '2025-02-10T20:27:26.341741',
      createdAt: '2025-02-10T20:27:26.341741',
      title: '노트 제목4',
      id: 4,
      goalDto: {
        id: 1,
        title: '노트를 위한 목표'
      },
      userId: 3
    },
    {
      todoDto: {
        id: 3,
        title: '노트를 위한 할 일 3',
        done: false,
        linkUrl: '',
        filePath: ''
      },
      content: '노트를 위한 노트 작성',
      linkUrl: '',
      updatedAt: '2025-02-10T17:08:50.010612',
      createdAt: '2025-02-10T17:08:50.010612',
      title: '노트를 위한 노트 3',
      id: 3,
      goalDto: {
        id: 1,
        title: '노트를 위한 목표'
      },
      userId: 5
    },
    {
      todoDto: {
        id: 2,
        title: '노트를 위한 할 일 2',
        done: false,
        linkUrl: '',
        filePath: ''
      },
      content: '노트를 위한 노트 작성',
      linkUrl: '',
      updatedAt: '2025-02-10T17:08:42.283885',
      createdAt: '2025-02-10T17:08:42.283885',
      title: '노트를 위한 노트 2',
      id: 2,
      goalDto: {
        id: 1,
        title: '노트를 위한 목표'
      },
      userId: 5
    },
    {
      todoDto: {
        id: 1,
        title: '노트를 위한 할 일 1',
        done: false,
        linkUrl: '',
        filePath: ''
      },
      content: '노트를 위한 노트 작성',
      linkUrl: '',
      updatedAt: '2025-02-10T17:08:32.278846',
      createdAt: '2025-02-10T17:08:32.278846',
      title: '노트를 위한 노트 1',
      id: 1,
      goalDto: {
        id: 1,
        title: '노트를 위한 목표'
      },
      userId: 5
    }
  ]
};
