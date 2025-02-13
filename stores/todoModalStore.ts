import { createStore } from 'zustand/vanilla';

export type createModalType = {
  title: string;
  done: boolean;
  linkUrl: string;
  filePath: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  goal: {
    id: number;
    title: string;
  };
  priority: number;
  id?: number;
  noteId?: number;
};

export type ModalActions = {
  setTodoCreateModal: (now: createModalType) => void;
  resetTodoCreateModal: () => void;
};

const initTodoCreateModalState: createModalType = {
  title: '',
  done: false,
  linkUrl: '',
  filePath: '',
  goal: {
    id: 0,
    title: ''
  },
  priority: 0
};
export const defaultInitState: createModalType = {
  ...initTodoCreateModalState
};

export const createModalStore = (initState: createModalType = defaultInitState) => {
  return createStore()((set) => ({
    ...initState,
    setTodoCreateModal: (now: createModalType) =>
      set((state: createModalType) => ({ ...state, todoCreateModal: now })),
    resetTodoCreateModal: () =>
      set((state: createModalType) => ({
        ...state,
        todoCreateModal: { ...initTodoCreateModalState }
      }))
  }));
};
