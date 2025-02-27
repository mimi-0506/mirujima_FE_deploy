'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import KebabMenu from '@/components/kebab/KebabMenu';
import useDeleteNote from '@/hooks/note/useDeleteNote';

import { Editor } from '../noteContent/editor/DynamicEditor';
import GoalAndTodoInfo from '../noteContent/goalAndTodoInfo/GoalAndTodoInfo';
import LinkArea from '../noteContent/linkArea/LinkArea';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
}

export default function ReadOnlyNoteContent({ note }: Props) {
  const router = useRouter();

  const { mutate } = useDeleteNote(note.goalDto.id);

  const onEdit = () => {
    router.push(`/notes/create/${note.todoDto.id}`);
  };
  const onDelete = () => {
    mutate(note.id);
  };

  return (
    <section className="bg-white">
      <GoalAndTodoInfo
        goalTitle={note.goalDto.title}
        todoTitle={note.todoDto.title}
        todoCompletionDate={note.todoDto.completionDate}
      />

      <div className="space-y-2">
        <div className="mt-6 flex gap-[10px] border-y border-gray200 px-4 py-4">
          <h3 className="w-full text-[22px] font-semibold leading-[28px]">{note.title}</h3>
          <KebabMenu onEdit={onEdit} onDelete={onDelete} size={24} />
        </div>

        <div className="space-y-4 px-4 py-[40px]">
          {note.linkUrl && <LinkArea linkUrl={note.linkUrl} />}
          <Editor defaultContent={note.content} isEditable={false} />
        </div>
      </div>
    </section>
  );
}
