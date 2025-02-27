// NoteDetailModal.tsx
'use client';

import { useEffect, useState } from 'react';

import { readNoteFromClient } from '@/apis/clientActions/note';
import EmbedContent from '@/app/(workspace)/(note)/_components/embedContent/EmbedContent';
import ReadOnlyNoteContent from '@/app/(workspace)/(note)/_components/readOnlyNoteContent/ReadOnlyNoteContent';

import NoteModalInGoal from '../_components/NoteModalInGoal';

import type { NoteType } from '@/types/note.type';

interface Props {
  params: Promise<{ id: string }>;
  onClose: () => void;
}

export default function NoteDetailModal({ params, onClose }: Props) {
  const [note, setNote] = useState<NoteType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const id = (await params).id;
        const fetchedNote = await readNoteFromClient(Number(id));
        setNote(fetchedNote || null);
        if (!fetchedNote) onClose();
      } catch (error) {
        console.error('Failed to fetch note:', error);
        onClose();
      }
    })();
  }, [params, onClose]);

  if (!note) return null;

  return (
    <NoteModalInGoal
      embed={<EmbedContent linkUrl={note.linkUrl} isReadOnlyPage />}
      onClose={onClose}
    >
      <ReadOnlyNoteContent note={note} />
    </NoteModalInGoal>
  );
}
