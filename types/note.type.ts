import type { TodoResponseType } from './todo.type';
import type { SearchParams } from 'next/dist/server/request/search-params';

export type NoteDataType = {
  todoId: number;
  title: string;
  content: string;
  linkUrl?: string;
};

export interface NoteSearchParams extends SearchParams {
  todoId: string;
}

export type NoteResponseType = {
  todo: Pick<TodoResponseType, 'done' | 'fileUrl' | 'linkUrl' | 'title' | 'id'>;
  linkUrl: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  };
  userId: number;
  teamId: string;
};
