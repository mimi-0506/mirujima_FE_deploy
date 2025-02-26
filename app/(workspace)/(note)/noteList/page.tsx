import React from 'react';

import { readGoalListFromServer } from '@/apis/serverActions/goal';
import NoteIcon from '@/public/icon/note.svg';

import GoalNoteList from '../_components/goalNoteList/GoalNoteList';

export default async function AllNoteList() {
  const goalList = await readGoalListFromServer();

  const showErrorMessage = !goalList || !goalList.goals || goalList.goals.length === 0;

  return (
    <section className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <NoteIcon width="24" height="24" />
        <h2>모든 노트 모아보기</h2>
      </div>
      {showErrorMessage ? (
        <div>목표가 없습니다.</div>
      ) : (
        goalList.goals.map((goal) => <GoalNoteList key={goal.createdAt} goal={goal} />)
      )}
    </section>
  );
}
