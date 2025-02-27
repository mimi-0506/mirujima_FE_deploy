'use client';

import React from 'react';

import Link from 'next/link';

import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';
import useNoteActions from '@/hooks/note/useNoteActions';
import LoadingSpinner from '@/public/icon/spin.svg';

import NoteCard from '../../noteCardList/noteCard/NoteCard';

import type { GoalType } from '@/types/goal.type';

interface Props {
  goal: GoalType;
}

export default function GoalNoteListContent({ goal }: Props) {
  const { data, isFetching, inViewRef } = useInfiniteNoteList(goal.id);
  const { onClickNote, onClickEdit, onClickDelete } = useNoteActions(goal.id);

  if (!data || data.length === 0) {
    return (
      <div className="flex-center gap-2 py-2">
        <p>노트가 없어요..!</p>
        <Link href={`/goals/${goal.id}`} className="rounded bg-solid p-2 text-main hover:underline">
          👉 노트 추가하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="custom-scrollbar max-h-[400px] space-y-2 overflow-y-scroll pb-2">
      {data.map((note) => (
        <NoteCard
          key={note.createdAt}
          note={note}
          onClickNote={onClickNote(note.id)}
          onClickEdit={onClickEdit(note.todoDto.id)}
          onClickDelete={onClickDelete(note.id, note.title)}
        />
      ))}
      {isFetching && (
        <div className="flex-center w-full py-2">
          <LoadingSpinner width="24" height="24" />
        </div>
      )}
      <div ref={inViewRef} />
    </div>
  );
}
