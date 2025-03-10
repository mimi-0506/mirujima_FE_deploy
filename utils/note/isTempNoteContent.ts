import type { TempNoteContentType } from '@/types/note.type';

export const isTempNoteContent = (data: unknown): data is TempNoteContentType => {
  if (typeof data !== 'object' || data === null) return false;

  const dataObj = data as Record<string, unknown>;

  for (const key in dataObj) {
    if (!Object.prototype.hasOwnProperty.call(dataObj, key)) continue;

    const goalId = Number(key);
    if (isNaN(goalId)) return false;

    const tempNoteList = dataObj[key];
    if (!Array.isArray(tempNoteList)) return false;

    for (const tempNote of tempNoteList) {
      if (typeof tempNote !== 'object' || tempNote === null) return false;
      const note = tempNote as Record<string, unknown>;
      if (typeof note.todoId !== 'number' || typeof note.content !== 'string') return false;
    }
  }

  return true;
};
