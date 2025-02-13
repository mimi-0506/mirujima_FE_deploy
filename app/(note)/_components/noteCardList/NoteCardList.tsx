'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';

import NoteCard from '../noteCard/NoteCard';

import type { NoteListType } from '@/types/note.type';

interface Props {
  noteList: NoteListType;
}

export default function NoteCardList({ noteList }: Props) {
  const params = useParams<{ goalId: string }>();

  const { data, inViewRef } = useInfiniteNoteList(Number(params.goalId), noteList);

  return (
    <div className="space-y-[16px]">
      {data.map((note) => {
        return <NoteCard key={note.createdAt} note={note} />;
      })}
      <div ref={inViewRef} />
    </div>
  );
}
