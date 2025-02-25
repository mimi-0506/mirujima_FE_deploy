import React from 'react';

import { redirect } from 'next/navigation';

import { readNoteFromServer } from '@/apis/serverActions/note';

import ReadOnlyNoteContent from '../../_components/readOnlyNoteContent/ReadOnlyNoteContent';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetail({ params }: Props) {
  const id = (await params).id;

  const note = await readNoteFromServer(Number(id));

  if (!note) redirect('/dashboard');

  return (
    <div className="min-h-[calc(100vh-132px)] bg-white px-4 pt-4 md:min-h-[calc(100vh-162px)]">
      <ReadOnlyNoteContent note={note} />
    </div>
  );
}
