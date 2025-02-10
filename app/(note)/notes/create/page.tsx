import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { NoteSearchParams } from '@/types/note.type';

export default async function CreateNote({ searchParams }: { searchParams: NoteSearchParams }) {
  // 추후 todoId를 searchParams로 받아서 조회 예정
  const todo = {
    noteId: 447,
    done: false,
    linkUrl: null,
    fileUrl: null,
    title: '노트 테스트',
    id: 3625,
    goal: {
      title: 'note test 2',
      id: 1789
    },
    userId: 270,
    teamId: '4',
    updatedAt: '2025-02-07T20:54:01.375Z',
    createdAt: '2025-02-07T20:54:01.375Z'
  };

  // if (!todo) redirect('/');
  // if (todo.noteId === null) note가 있을 때

  return (
    <main className="min-h-screen px-4">
      <NoteContent todo={todo} />
    </main>
  );
}
