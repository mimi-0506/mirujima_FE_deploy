import type { TempNoteContentType, TempNoteType } from '@/types/note.types';

const isTempNote = (item: unknown): item is TempNoteType => {
  if (typeof item !== 'object' || item === null) return false;

  const note = item as Record<string, unknown>;

  return (
    typeof note.todoId === 'number' &&
    typeof note.noteTitle === 'string' &&
    typeof note.content === 'string' &&
    typeof note.linkUrl === 'string'
  );
};

export const isTempNoteContent = (data: unknown): data is TempNoteContentType => {
  if (typeof data !== 'object' || data === null) return false;

  const record = data as Record<string, unknown>;

  for (const key in record) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue;

    const goalId = Number(key);
    if (isNaN(goalId)) return false;

    const tempNoteList = record[key];
    if (!Array.isArray(tempNoteList)) return false;

    for (const tempNote of tempNoteList) {
      if (!isTempNote(tempNote)) return false;
    }
  }

  return true;
};
