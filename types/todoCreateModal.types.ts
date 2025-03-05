import type { GoalType, ISODateString } from '@/types/goal.type';

export type TodoCreateModalState = {
  title: string;
  done: boolean;
  linkUrl: string;
  fileName: string;
  userId?: number;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  goal: GoalType | null;
  priority: number;
  id?: number;
  noteId?: number;
  isEdit: boolean;
};

export type TodoCreateModalActions = {
  setCreatedTodoState: (now: Partial<TodoCreateModalState>) => void;
  resetTodoCreateModal: () => void;
};

export type TodoCreateModalStore = TodoCreateModalState & TodoCreateModalActions;
