import React from 'react';

import { readGoalListFromServer } from '@/apis/serverActions/goal';
import NoteIcon from '@/public/icon/note.svg';

import GoalNoteList from '../_components/goalNoteList/GoalNoteList';
import NoGoalNoteList from '../_components/noGoalNoteList/NoGoalNoteList';

interface Props {
  searchParams: Promise<{ initOpen: string | undefined }>;
}

export default async function AllNoteList({ searchParams }: Props) {
  const initOpen = (await searchParams)?.initOpen;
  const goalList = await readGoalListFromServer();

  const showErrorMessage = !goalList || !goalList.goals || goalList.goals.length === 0;

  const initOpenGoalId = isNaN(Number(initOpen)) ? null : Number(initOpen);

  return (
    <section className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <NoteIcon width="24" height="24" />
        <h2>모든 노트 모아보기</h2>
      </div>
      {showErrorMessage ? (
        <section className="pl-8">
          <div className="flex w-full flex-col items-center gap-2 rounded-2xl border border-gray200 bg-white p-6">
            <p>생성한 목표가 없습니다!</p>
            <p className="text-main">사이드바에서 목표를 추가해보세요!</p>
          </div>
        </section>
      ) : (
        Array.isArray(goalList.goals) &&
        goalList.goals.map((goal) => (
          <GoalNoteList
            key={goal.id}
            goalId={goal.id}
            goalTitle={goal.title}
            initOpen={goal.id === initOpenGoalId}
          />
        ))
      )}
      <NoGoalNoteList initOpen={initOpenGoalId === 0} />
    </section>
  );
}
