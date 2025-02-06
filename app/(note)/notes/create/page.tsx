import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';
import NoteHeader from '../../_components/noteHeader/NoteHeader';

export default function CreateNote() {
  return (
    <main className="min-h-screen px-4">
      <section className="flex flex-col items-center">
        <NoteHeader />
        <NoteContent />
      </section>
    </main>
  );
}
