import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { TodoType } from '@/types/todo.type';

export default async function CreateNote() {
  // 추후 todoId를 searchParams로 받아서 조회 예정
  const todo: TodoType = {
    goal: {
      id: 1,
      title: '노트를 위한 목표',
      completionDate: '2025.02.10'
    },
    noteId: 4,
    done: false,
    linkUrl: '',
    filePath: '',
    title: '노트를 위한 할 일 4',
    id: 4,
    userId: 5,
    createdAt: '2025-02-10T17:07:40.175123',
    updatedAt: '2025-02-10T17:07:40.175123',
    priority: 1
  };

  // if (!todo) redirect('/');
  // if (todo.noteId === null) note가 있을 때

  return (
    <main className="h-screen overflow-y-scroll bg-gray100 px-4 pt-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <NoteContent todo={todo} />
    </main>
  );
}
