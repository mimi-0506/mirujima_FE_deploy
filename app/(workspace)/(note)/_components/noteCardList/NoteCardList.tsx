'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import useDeleteNote from '@/hooks/note/useDeleteNote';
import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';

import NoteCard from './noteCard/NoteCard';

import type { NoteListType } from '@/types/note.type';

interface Props {
  noteList: NoteListType;
}

export default function NoteCardList({ noteList }: Props) {
  const { goalId } = useParams<{ goalId: string }>();
  const router = useRouter();

  const { data, inViewRef } = useInfiniteNoteList(Number(goalId), noteList);

  const { mutate } = useDeleteNote(Number(goalId));

  const onClickNote = (id: number) => {
    return () => router.push(`/notes/${id}`, { scroll: false });
  };

  const onClickEdit = (todoId: number) => {
    return () => router.push(`/notes/create/${todoId}`);
  };

  const onClickDelete = (noteId: number) => {
    return () => mutate(noteId);
  };

  return (
    <div className="space-y-2">
      {data.length === 0 && <div className="flex-center h-[300px] w-full">데이터 없음</div>}
      {data.map((note) => {
        return (
          <NoteCard
            key={note.createdAt}
            note={note}
            onClickNote={onClickNote(note.id)}
            onClickEdit={onClickEdit(note.todoDto.id)}
            onClickDelete={onClickDelete(note.id)}
          />
        );
      })}
      <div ref={inViewRef} />
    </div>
  );
}
