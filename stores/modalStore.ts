import { createStore } from 'zustand/vanilla';

export type ModalState = {
  todoCreate: boolean;
  todoCreateCheck: boolean;
};

export type ModalActions = {
  setTodoCreate: (now: boolean) => void;
  setTodoCreateCheck: (now: boolean) => void;
  allClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  todoCreate: true,
  todoCreateCheck: true
};

export const defaultInitState: ModalState = {
  ...initModalState
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setTodoCreate: (now) => set((state) => ({ ...state, todoCreate: now })),
    setTodoCreateCheck: (now) => set((state) => ({ ...state, todoCreateCheck: now })),
    allClose: () => set(() => ({ ...initModalState }))
  }));
};
