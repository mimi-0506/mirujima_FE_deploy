import { createStore } from 'zustand/vanilla';

import type { GoalType } from '@/modals/todoCreateModal/type';

export type TodoCreateModalState = {
  title: string;
  done: boolean;
  linkUrl: string;
  fileName: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  goal: GoalType | null;
  priority: number;
  id?: number;
  noteId?: number;
};

export type TodoCreateModalActions = {
  setCreatedTodoState: (now: Partial<TodoCreateModalState>) => void;
  resetTodoCreateModal: () => void;
};

export type TodoCreateModalStore = TodoCreateModalState & TodoCreateModalActions;

const initTodoCreateModalState: TodoCreateModalState = {
  title: '',
  done: false,
  linkUrl: '',
  fileName: '',
  goal: null,
  priority: 0
};
export const defaultInitState: TodoCreateModalState = {
  ...initTodoCreateModalState
};

export const createTodoCreateModalStore = (initState: TodoCreateModalState = defaultInitState) => {
  return createStore<TodoCreateModalStore>()((set) => ({
    ...initState,
    setCreatedTodoState: (now) => set((state: TodoCreateModalState) => ({ ...state, ...now })),

    resetTodoCreateModal: () =>
      set((state: TodoCreateModalState) => ({
        ...initTodoCreateModalState
      }))
  }));
};
