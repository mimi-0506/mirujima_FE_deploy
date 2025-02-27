'use client';

import React from 'react';

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
    return <div className="text-center">노트가 없음</div>;
  }

  return (
    <div className="custom-scrollbar max-h-[400px] space-y-2 overflow-y-scroll">
      {data.map((note) => (
        <NoteCard
          key={note.createdAt}
          note={note}
          onClickNote={onClickNote(note.id)}
          onClickEdit={onClickEdit(note.todoDto.id)}
          onClickDelete={onClickDelete(note.id)}
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
