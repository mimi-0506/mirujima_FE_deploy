'use client';

import React from 'react';

import Link from 'next/link';

import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';
import useNoteActions from '@/hooks/note/useNoteActions';
import LoadingSpinner from '@/public/icon/spin.svg';

import NoteCard from './noteCard/NoteCard';

import type { NoteListType } from '@/types/note.type';

interface Props {
  goalId: number | undefined;
  noteList?: NoteListType;
}

export default function NoteCardList({ goalId, noteList }: Props) {
  const { data, isFetching, inViewRef } = useInfiniteNoteList(goalId, noteList);
  const { onClickNote, onClickEdit, onClickDelete } = useNoteActions(goalId);

  if ((!data || data.length === 0) && !isFetching) {
    return (
      <div className={`flex-center gap-2 py-2 ${noteList ? 'h-[300px]' : ''}`}>
        <p>노트가 없어요..!</p>
        <Link
          href={goalId ? `/goals/${goalId}` : '/todoList'}
          className="rounded bg-solid p-2 text-main hover:underline"
        >
          👉 {goalId ? '노트' : '할 일'} 추가하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`space-y-2 ${noteList ? '' : 'custom-scrollbar max-h-[400px] overflow-y-scroll pb-3'}`}
    >
      {data.map((note) => {
        return (
          <NoteCard
            key={note.createdAt}
            note={note}
            onClickNote={onClickNote(note.id)}
            onClickEdit={onClickEdit(note.todoDto.id)}
            onClickDelete={onClickDelete(note.id, note.title)}
          />
        );
      })}
      {isFetching && (
        <div className="flex-center w-full py-2">
          <LoadingSpinner width="24" height="24" />
        </div>
      )}
      <div ref={inViewRef} />
    </div>
  );
}
