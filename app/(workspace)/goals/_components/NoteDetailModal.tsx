'use client';

import { useEffect, useState } from 'react';

import { readNoteFromClient } from '@/apis/clientActions/note';
import EmbedContent from '@/app/(workspace)/(note)/_components/embedContent/EmbedContent';
import ReadOnlyNoteContent from '@/app/(workspace)/(note)/_components/readOnlyNoteContent/ReadOnlyNoteContent';
import { useModalStore } from '@/provider/store-provider';

import NoteModalInGoal from '../_components/NoteModalInGoal';

import type { NoteType } from '@/types/note.type';

export interface NoteDetailPageModalProps {
  params: Promise<{ id: string }>;
  onClose: () => void;
}

export default function NoteDetailModal({ params, onClose }: NoteDetailPageModalProps) {
  const [note, setNote] = useState<NoteType | null>(null);
  const setNoteDetailPageOpen = useModalStore((state) => state.setNoteDetailPageOpen);

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      setNoteDetailPageOpen(false);
    };
  }, []);

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
