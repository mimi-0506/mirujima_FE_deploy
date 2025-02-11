import { AxiosError } from 'axios';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { NoteListType, ReadNoteListType } from '@/types/note.type';

import { apiWithServerToken } from '.';

export const readNoteListFromServer = async ({
  goalId,
  lastSeenId,
  pageSize
}: ReadNoteListType) => {
  'use server';
  const query = `goalId=${goalId}&lastSeenId=${lastSeenId}&pageSize=${pageSize}`;
  try {
    const res = await apiWithServerToken.get<ApiResponse<NoteListType>>(`/notes?${query}`);

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // 추후 에러 처리 추가 예정정
    }
    return 'error';
  }
};
