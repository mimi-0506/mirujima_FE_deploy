import { createStore } from 'zustand/vanilla';

export type ModalState = {
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
};

export type ModalActions = {
  setIsTodoCreateModalOpen: (now: boolean) => void;
  setIsTodoCreateCheckModalOpen: (now: boolean) => void;
  allClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false
};

export const defaultInitState: ModalState = {
  ...initModalState
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setIsTodoCreateModalOpen: (now) => set((state) => ({ ...state, isTodoCreateModalOpen: now })),
    setIsTodoCreateCheckModalOpen: (now) =>
      set((state) => ({ ...state, isTodoCreateCheckModalOpen: now })),
    allClose: () => set(() => ({ ...initModalState }))
  }));
};
