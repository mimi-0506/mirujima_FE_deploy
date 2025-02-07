import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { NoteSearchParams } from '@/types/note.type';
import type { TodoResponseType } from '@/types/todo.type';

// 임의로 생성 goal:1788, todo:3624, note:445, user:270

export default async function CreateNote({ searchParams }: { searchParams: NoteSearchParams }) {
  // 추후 todoId를 searchParams로 받아서 조회 예정
  const todo: TodoResponseType = {
    noteId: 0,
    done: true,
    linkUrl: 'string',
    fileUrl: 'string',
    title: 'todo title',
    id: 3624,
    goal: {
      id: 1788,
      title: 'goal title'
    },
    userId: 270,
    teamId: 'string',
    updatedAt: '2025-02-07T00:50:52.094Z',
    createdAt: '2025-02-07T00:50:52.094Z'
  };

  // if (!todo) redirect('/');/

  return (
    <main className="min-h-screen px-4">
      <NoteContent todo={todo} />
    </main>
  );
}
