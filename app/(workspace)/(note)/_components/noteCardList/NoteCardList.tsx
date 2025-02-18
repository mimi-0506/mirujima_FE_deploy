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
    router.push(`/notes/${id}`, { scroll: false });
  };

  const onClickEdit = (todoId: number) => {
    return () => router.push(`/notes/create?todoId=${todoId}`);
  };

  const onClickDelete = (noteId: number) => {
    return () => mutate(noteId);
  };

  return (
    <div className="space-y-2">
      {data.map((note) => {
        return (
          <NoteCard
            key={note.createdAt}
            note={note}
            onClickNote={onClickNote}
            onClickEdit={onClickEdit(note.todoDto.id)}
            onClickDelete={onClickDelete(note.id)}
          />
        );
      })}
      <div ref={inViewRef} />
    </div>
  );
}
