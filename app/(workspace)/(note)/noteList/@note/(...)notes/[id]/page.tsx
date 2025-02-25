import React from 'react';

import { redirect } from 'next/navigation';

import { readNoteFromServer } from '@/apis/serverActions/note';
import EmbedContent from '@/app/(workspace)/(note)/_components/embedContent/EmbedContent';
import ReadOnlyNoteContent from '@/app/(workspace)/(note)/_components/readOnlyNoteContent/ReadOnlyNoteContent';

import NoteLayoutModal from './modal';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailModal({ params }: Props) {
  const id = (await params).id;

  const note = await readNoteFromServer(Number(id));

  if (!note) redirect('/dashboard');

  return (
    <NoteLayoutModal embed={<EmbedContent linkUrl={note.linkUrl} isReadOnlyPage />}>
      <ReadOnlyNoteContent note={note} />
    </NoteLayoutModal>
  );
}
