import React from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { readGoalFromServer } from '@/api/serverActions/goal';
import { readNoteListFromServer } from '@/api/serverActions/note';

import NoteCardList from '../../_components/noteCardList/NoteCardList';

export const dynamicParams = true;

interface Props {
  params: Promise<{ goalId: string }>;
}

export default async function NoteList({ params }: Props) {
  const { goalId } = await params;

  const goal = await readGoalFromServer(goalId);
  if (!goal) redirect('/'); // goalId가 잘못됐을 때 처리

  const defaultNoteListArgs = { goalId: Number(goalId), lastSeenId: 9999, pageSize: 10 };
  const noteList = await readNoteListFromServer(defaultNoteListArgs);

  return (
    <main className="h-screen overflow-y-scroll bg-gray100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <section className="max-w-[1248px] space-y-[24px] md:pt-4">
        <div className="flex h-[52px] w-full items-center gap-2 rounded-xl pt-[14px]">
          <Image src={'/icon/work.svg'} width={24} height={24} alt="할 일 아이콘" />
          <h2 className="w-full truncate text-gray500">{goal.result?.title}</h2>
          <button className="rounded-md bg-Cgray" aria-label="목표 옵션 더보기">
            <Image src={'/icon/more.svg'} width={24} height={24} alt="더보기 아이콘" />
          </button>
        </div>
        {noteList.result ? <NoteCardList noteList={noteList.result} /> : <div>데이터 없음</div>}
      </section>
    </main>
  );
}
