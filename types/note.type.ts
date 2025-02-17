import type { GoalType } from './goal.type';
import type { TodoType } from './todo.type';
import type { SearchParams } from 'next/dist/server/request/search-params';

export type CreateNoteType = {
  todoId: number;
  title: string;
  content: string;
  linkUrl?: string;
};

export interface NoteSearchParams extends SearchParams {
  todoId: string;
}

export type NoteType = {
  todoDto: Pick<TodoType, 'done' | 'filePath' | 'linkUrl' | 'title' | 'id'>;
  content: string;
  linkUrl: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goalDto: Pick<GoalType, 'id' | 'title' | 'completionDate'>;
  userId: number;
};

export type NoteListType = {
  lastSeenId: number;
  remainingCount: number;
  notes: NoteType[];
};

export type ReadNoteListType = {
  goalId: number;
  lastSeenId: number;
  pageSize?: number;
};

export type UpdateNoteType = Pick<NoteType, 'title' | 'content' | 'linkUrl'>;
