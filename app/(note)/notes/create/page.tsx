import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';

export default async function CreateNote() {
  // 추후 todoId를 searchParams로 받아서 조회 예정
  const todo = {
    goal: {
      id: 1,
      title: '노트를 위한 목표'
    },
    noteId: 4,
    done: false,
    linkUrl: '',
    filePath: '',
    title: '노트를 위한 할 일 4',
    id: 4,
    userId: 5,
    createdAt: '2025-02-10T17:07:40.175123',
    updatedAt: '2025-02-10T17:07:40.175123'
  };

  // if (!todo) redirect('/');
  // if (todo.noteId === null) note가 있을 때

  return (
    <main className="min-h-screen px-4">
      <NoteContent todo={todo} />
    </main>
  );
}
