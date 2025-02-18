import React from 'react';

import { redirect } from 'next/navigation';

import { readNoteFromServer } from '@/apis/serverActions/note';
import { readTodoFromServer } from '@/apis/serverActions/todo';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { NoteType } from '@/types/note.type';

interface Props {
  searchParams: Promise<{ todoId: string }>;
}

export default async function CreateNote({ searchParams }: Props) {
  const { todoId } = await searchParams;

  let note: NoteType | null = null;

  const todo = await readTodoFromServer(Number(todoId));
  if (!todo) redirect('/'); // todoId가 잘못됐을 때 처리

  // 기존에 작성한 노트가 있을 때
  if (todo.noteId) note = await readNoteFromServer(todo.noteId);

  return (
    <main className="h-screen overflow-y-scroll bg-gray100 px-4 pt-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <NoteContent todo={todo} note={note} />
    </main>
  );
}
