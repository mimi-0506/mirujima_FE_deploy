import { createStore } from 'zustand/vanilla';
import type { TodoCreateModalState, TodoCreateModalStore } from '@/types/todoCreateModal.types.ts';

const initTodoCreateModalState: TodoCreateModalState = {
  title: '',
  done: false,
  linkUrl: '',
  fileName: '',
  goal: null,
  priority: 0,
  isEdit: false,
  noteId: null
};

export const defaultInitState: TodoCreateModalState = {
  ...initTodoCreateModalState
};

export const createTodoCreateModalStore = (initState: TodoCreateModalState = defaultInitState) => {
  return createStore<TodoCreateModalStore>()((set) => ({
    ...initState,
    setCreatedTodoState: (now: Partial<TodoCreateModalState>) =>
      set((state: TodoCreateModalState) => ({ ...state, ...now })),

    resetTodoCreateModal: () => set(() => ({ ...initTodoCreateModalState }))
  }));
};
