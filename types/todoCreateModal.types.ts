import type { GoalType, ISODateString } from '@/types/goal.types';
import { Priority } from './color.types';

export type TodoCreateModalState = {
  title: string;
  done: boolean;
  linkUrl: string | null;
  fileName: string | null;
  userId?: number;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  goal: Partial<GoalType> | null;
  priority: Priority | 0;
  id?: number;
  noteId?: number | null;
  isEdit: boolean;
};

export type TodoCreateModalActions = {
  setCreatedTodoState: (now: Partial<TodoCreateModalState>) => void;
  resetTodoCreateModal: () => void;
};

export type TodoCreateModalStore = TodoCreateModalState & TodoCreateModalActions;
