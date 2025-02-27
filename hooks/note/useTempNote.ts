import React from 'react';

import { TEMP_STORAGE_KEY } from '@/constant/tempNoteStorageKey';
import { isTempNoteContent } from '@/utils/note/isTempNoteContent';

import type { TempNoteContentType, TempNoteType } from '@/types/note.type';

const useTempNote = (goalId: number, todoId?: number) => {
  const [tempedNote, setTempedNote] = React.useState<TempNoteType>();
  const [hasTempedNote, setHasTempedNote] = React.useState(false);

  const onLoadTempNoteFromStorage = () => {
    const tempContent = localStorage.getItem(TEMP_STORAGE_KEY);
    if (!tempContent) return;

    try {
      const parsedContent = JSON.parse(tempContent);
      if (!isTempNoteContent(parsedContent)) return;

      return parsedContent;
    } catch (error) {
      console.error('데이터 파싱오류', error);

      return;
    }
  };

  const onSaveTempToStorage = async (noteTitle: string, content: string, link?: string) => {
    if (!todoId) return;

    const note: TempNoteType = { todoId, noteTitle, content, linkUrl: link || '' };
    const tempData = onLoadTempNoteFromStorage();
    if (!tempData) {
      const newTempData: TempNoteContentType = {
        [goalId]: [note]
      };

      localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(newTempData));
    } else {
      if (!tempData[goalId]) tempData[goalId] = [note];
      else {
        const targetIdx = tempData[goalId].findIndex((note) => note.todoId === todoId);
        if (targetIdx === -1) {
          tempData[goalId].push(note); // 노트가 많을 경우를 생각해서 정렬 알고리즘을 적용해야하나..?
        } else {
          tempData[goalId][targetIdx] = note;
        }
      }

      localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(tempData));
    }
  };

  const getTempNote = () => {
    const tempData = onLoadTempNoteFromStorage();
    if (!tempData || !tempData[goalId]) return;

    return tempData[goalId].find((temp) => temp.todoId === todoId);
  };

  // goal 삭제, todo 삭제 시에도 실행되어야함
  const deleteTempNote = () => {
    const tempData = onLoadTempNoteFromStorage();
    if (tempData && tempData[goalId]) {
      if (todoId) {
        // todo 삭제 시, 노트 저장 시
        const newNoteList = tempData[goalId].filter((note) => note.todoId !== todoId);
        tempData[goalId] = newNoteList;
        if (newNoteList.length === 0) {
          delete tempData[goalId];
        }
      } else {
        // goal 삭제 시
        delete tempData[goalId];
      }

      localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(tempData));
    }
  };

  const resetHasTempNote = () => {
    setHasTempedNote(false);
  };

  React.useEffect(() => {
    const temp = getTempNote();
    if (temp) {
      setTempedNote(temp);
      setHasTempedNote(true);
    }
  }, []);

  return {
    onLoadTempNoteFromStorage,
    onSaveTempToStorage,
    deleteTempNote,
    tempedNote,
    hasTempedNote,
    resetHasTempNote
  };
};

export default useTempNote;
