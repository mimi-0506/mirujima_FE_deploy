'use client';

import React from 'react';

import NoteCard from '../noteCard/NoteCard';

import type { NoteListType } from '@/types/note.type';

interface Props {
  noteList: NoteListType;
}

export default function NoteCardList({ noteList }: Props) {
  console.log(noteList);

  return (
    <div className="space-y-[16px]">
      {noteList.notes.map((note) => {
        return <NoteCard key={note.createdAt} note={note} />;
      })}
    </div>
  );
}
