import { AxiosError } from 'axios';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { NoteListType, NoteType, ReadNoteListType } from '@/types/note.type';

import { apiWithServerToken } from '.';

export const readNoteListFromServer = async (args: ReadNoteListType) => {
  'use server';
  const { goalId, lastSeenId, pageSize = 10, hasGoal } = args;
  const query = `goalId=${goalId}&lastSeenId=${lastSeenId}&pageSize=${pageSize}&hasGoal=${hasGoal}`;
  try {
    const res = await apiWithServerToken.get<ApiResponse<NoteListType>>(`/notes?${query}`);

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // 추후 에러 처리 추가 예정
    }

    throw error;
  }
};

export const readNoteFromServer = async (noteId: number) => {
  try {
    const res = await apiWithServerToken.get<ApiResponse<NoteType>>(`/notes/${noteId}`);

    return res.data.result;
  } catch (error) {
    if (error instanceof Error) {
      // 추후 에러 처리 예정
    }

    throw error;
  }
};
