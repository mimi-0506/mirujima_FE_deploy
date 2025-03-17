'use server';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { NoteListType, NoteType, ReadNoteListType } from '@/types/note.types';
import { apiWithServerToken } from '.';
import { notFound } from 'next/navigation';

export const readNoteListFromServer = async (args: ReadNoteListType) => {
  const { goalId, lastSeenId, pageSize = 10, hasGoal } = args;
  const query = `goalId=${goalId}&lastSeenId=${lastSeenId}&pageSize=${pageSize}&hasGoal=${hasGoal}`;

  const res = await apiWithServerToken.get<ApiResponse<NoteListType>>(`/notes?${query}`);

  return res.data?.result;
};

export const readNoteFromServer = async (noteId: number) => {
  const isInvalid = isNaN(noteId);
  if (isInvalid) notFound();

  const res = await apiWithServerToken.get<ApiResponse<NoteType>>(`/notes/${noteId}`);

  return res.data?.result;
};
