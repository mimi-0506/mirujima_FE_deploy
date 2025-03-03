import type { GoalType } from './goal.type';
import type { TodoType } from './todo.type';

export type CreateNoteType = {
  todoId: number;
  title: string;
  content: string;
  linkUrl?: string;
};

export type NoteType = {
  todoDto: Pick<TodoType, 'done' | 'filePath' | 'linkUrl' | 'title' | 'id' | 'completionDate'>;
  content: string;
  linkUrl: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goalDto: Pick<GoalType, 'id' | 'title' | 'completionDate'> | null;
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

export type NoteConfirmModalProps = {
  type: 'temp' | 'delete';
  contentTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export type NoteLinkModalProps = {
  defaultValue: string | undefined;
  onSubmit: () => void;
  linkInputRef: React.RefObject<HTMLInputElement | null>;
};
