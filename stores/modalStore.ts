import { createStore } from 'zustand/vanilla';
import type { ModalStore, ModalState, ModalType, ModalPropsMap } from '@/types/modalStore.types';

export const defaultInitState: ModalState = {
  openModals: {
    NoteDetailPage: false,
    NoteConfirm: false,
    TodoCreate: false,
    TodoCreateCheck: false,
    NoteLink: false,
    GoalDelete: false,
    GoalEdit: false,
    GoalCreate: false
  },
  modalProps: {},
  isLoading: false
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setModalOpen: <T extends ModalType>(type: T, isOpen: boolean, props?: ModalPropsMap[T]) =>
      set((state) => ({
        ...state,
        openModals: {
          ...state.openModals,
          [type]: isOpen
        },
        modalProps: {
          ...state.modalProps,
          [type]: isOpen ? props : undefined
        }
      })),

    setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading }))
  }));
};
