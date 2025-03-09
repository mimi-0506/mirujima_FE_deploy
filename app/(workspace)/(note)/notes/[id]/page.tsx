import React from 'react';

import { redirect } from 'next/navigation';

import { readNoteFromServer } from '@/apis/serverActions/note';

import EmbedContent from '../../_components/embedContent/EmbedContent';
import ContentLayout from '../../_components/layout/ContentLayout';
import ReadOnlyNoteContent from '../../_components/readOnlyNoteContent/ReadOnlyNoteContent';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetail({ params }: Props) {
  const id = (await params).id;

  const note = await readNoteFromServer(Number(id));

  if (!note) redirect('/dashboard');

  return (
    <div className="flex h-full min-h-[calc(100vh-132px)] md:min-h-[calc(100vh-162px)]">
      <EmbedContent linkUrl={note.linkUrl} isReadOnlyPage />
      <ContentLayout>
        <div className="bg-white p-4">
          <ReadOnlyNoteContent note={note} />
        </div>
      </ContentLayout>
    </div>
  );
}
