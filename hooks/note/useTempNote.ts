import React from 'react';

import { TEMP_STORAGE_KEY } from '@/constant/tempNoteStorageKey';
import { isTempNoteContent } from '@/utils/note/isTempNoteContent';

import type { TempNoteContentType, TempNoteType } from '@/types/note.types';

const useTempNote = (goalId: number | undefined, todoId?: number) => {
  const effectGoalId = goalId ?? 0;

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

  const onSaveTempToStorage = (noteTitle: string, content: string, link?: string) => {
    if (!todoId) return;

    const note: TempNoteType = { todoId, noteTitle, content, linkUrl: link || '' };
    const tempData = onLoadTempNoteFromStorage();
    if (!tempData) {
      const newTempData: TempNoteContentType = {
        [effectGoalId]: [note]
      };

      localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(newTempData));
    } else {
      if (!tempData[effectGoalId]) tempData[effectGoalId] = [note];
      else {
        const targetIdx = tempData[effectGoalId].findIndex((note) => note.todoId === todoId);
        if (targetIdx === -1) {
          tempData[effectGoalId].push(note);
        } else {
          tempData[effectGoalId][targetIdx] = note;
        }
      }

      localStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(tempData));
    }
  };

  const getTempNote = () => {
    const tempData = onLoadTempNoteFromStorage();
    if (!tempData || !tempData[effectGoalId]) return;

    return tempData[effectGoalId].find((temp) => temp.todoId === todoId);
  };

  // goal 삭제, todo 삭제 시에도 실행되어야함
  const deleteTempNote = () => {
    const tempData = onLoadTempNoteFromStorage();
    if (tempData && tempData[effectGoalId]) {
      if (todoId) {
        // todo 삭제 시, 노트 저장 시
        const newNoteList = tempData[effectGoalId].filter((note) => note.todoId !== todoId);
        tempData[effectGoalId] = newNoteList;
        if (newNoteList.length === 0) {
          delete tempData[effectGoalId];
        }
      } else {
        // goal 삭제 시
        delete tempData[effectGoalId];
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
    tempedNote,
    hasTempedNote,
    onLoadTempNoteFromStorage,
    onSaveTempToStorage,
    deleteTempNote,
    resetHasTempNote
  };
};

export default useTempNote;
