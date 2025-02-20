import type { TempNoteContentType } from '@/types/note.type';

export const isTempNoteContent = (data: any): data is TempNoteContentType => {
  if (typeof data !== 'object' || data === null) return false;

  for (const key in data) {
    // for in문으로 Object 확인 시 기본으로 상속 받는 프로토타입 무시 (Object.prototype에에 속성을 추가했을 경우 대비)
    if (!data.hasOwnProperty(key)) continue;

    // goalId가 숫자가 아닐 때
    const goalId = Number(key);
    if (isNaN(goalId)) return false;

    // data[goalId]값이 배열이 아닐 때
    const tempNoteList = data[key];
    if (!Array.isArray(tempNoteList)) return false;

    for (const tempNote of tempNoteList) {
      // 노트가 객체가 아닐 때
      if (typeof tempNote !== 'object' || tempNote === null) return false;

      // todoId가 숫자, content가 문자열이 아닐 때
      if (typeof tempNote.todoId !== 'number' || typeof tempNote.content !== 'string') return false;
    }
  }

  return true;
};
