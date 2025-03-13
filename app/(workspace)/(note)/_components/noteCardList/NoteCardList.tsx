'use client';

import React from 'react';

import Link from 'next/link';

import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';
import useNoteActions from '@/hooks/note/useNoteActions';
import LoadingSpinner from '@/public/icon/spin.svg';

import NoteCard from './noteCard/NoteCard';

import type { NoteListType } from '@/types/note.types';

interface Props {
  goalId: number | undefined;
  noteList?: NoteListType;
}

export default function NoteCardList({ goalId, noteList }: Props) {
  const { data, isFetching, inViewRef } = useInfiniteNoteList(goalId, noteList);
  const { onClickNote, onClickEdit, onClickDelete } = useNoteActions(goalId);

  if ((!data || data.length === 0) && !isFetching) {
    return (
      <div
        className={
          'flex w-full flex-col items-center gap-2 rounded-2xl border border-gray200 bg-white p-6'
        }
      >
        <p>노트가 없어요..!</p>
        <Link
          href={goalId ? `/goals/${goalId}` : '/todoList'}
          className="rounded text-main hover:underline"
        >
          👉 {goalId ? '목표 상세페이지로 가기' : '할 일 추가하러 가기'}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`space-y-2 ${noteList ? '' : 'custom-scrollbar max-h-[400px] overflow-y-scroll pb-3'}`}
    >
      {Array.isArray(data) &&
        data.map((note) => {
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
