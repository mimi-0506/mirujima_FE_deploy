'use client';

import React from 'react';

import KebabMenu from '@/components/kebab/KebabMenu';
import useNoteActions from '@/hooks/note/useNoteActions';

import { Editor } from '../noteContent/editor/DynamicEditor';
import LinkArea from '../noteContent/linkArea/LinkArea';
import NoteInfo from '../noteContent/noteInfo/NoteInfo';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
}

export default function ReadOnlyNoteContent({ note }: Props) {
  const { onClickEdit, onClickDelete } = useNoteActions(note.goalDto?.id);

  return (
    <section className="w-full bg-white">
      <NoteInfo
        goalTitle={note.goalDto?.title}
        todoTitle={note.todoDto.title}
        noteUpdatedAt={note.updatedAt}
      />

      <div className="space-y-2">
        <div className="mt-6 flex gap-[10px] border-y border-gray200 px-4 py-4">
          <h3 className="w-full text-[22px] font-semibold leading-[28px]">{note.title}</h3>
          <KebabMenu
            onEdit={onClickEdit(note.todoDto.id)}
            onDelete={onClickDelete(note.id, note.title)}
            size={24}
          />
        </div>

        <div className="space-y-4 px-4 py-[40px]">
          {note.linkUrl && <LinkArea linkUrl={note.linkUrl} />}
          <Editor defaultContent={note.content} isEditable={false} />
        </div>
      </div>
    </section>
  );
}
