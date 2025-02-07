import { createStore } from 'zustand/vanilla';

export type ModalState = {
  todoCreate: boolean;
};

export type ModalActions = {
  setTodoCreate: (now: boolean) => void;
  allClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  todoCreate: false
};

export const defaultInitState: ModalState = {
  ...initModalState
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setTodoCreate: (now) => set((state) => ({ ...state, todoCreate: now })),
    allClose: () => set(() => ({ ...initModalState }))
  }));
};
