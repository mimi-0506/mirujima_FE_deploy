import type { TodoType } from './todo.types';
import type { ISODateString } from './ISODateString.type';
import type { GoalSummary } from './goal.types';
type NoteCommonFields = {
  title: string;
  content: string;
  linkUrl?: string;
};
export type CreateNoteType = {
  todoId: number;
} & Pick<NoteCommonFields, 'title' | 'content' | 'linkUrl'>;

export type NoteType = {
  todoDto: Pick<TodoType, 'done' | 'filePath' | 'linkUrl' | 'title' | 'id' | 'completionDate'>;
  updatedAt: ISODateString;
  createdAt: ISODateString;
  id: number;
  goalDto: GoalSummary | null;
  userId: number;
} & NoteCommonFields;

export type NoteListType = {
  lastSeenId: number;
  remainingCount: number;
  notes: NoteType[];
};

export type ReadNoteListType = {
  goalId: number;
  lastSeenId: number;
  pageSize?: number;
  hasGoal: boolean;
};

export type UpdateNoteType = Pick<NoteType, 'title' | 'content' | 'linkUrl'>;

export type NoteContentTextLength = {
  textLength: number;
  trimTextLength: number;
};

export type TempNoteType = {
  todoId: number;
  noteTitle: string;
  content: string;
  linkUrl: string;
};

export type TempNoteContentType = {
  [goalId: number]: TempNoteType[];
};
