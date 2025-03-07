import { createStore } from 'zustand/vanilla';
import type { ModalStore } from '@/types/modalStore.types';

export const defaultInitState: ModalStore = {
  isNoteDetailPageModalOpen: false,
  noteDetailPageModalProps: null,
  isNoteConfirmModalOpen: false,
  noteConfirmModalProps: null,
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isNoteLinkModalOpen: false,
  noteLinkModalProps: null,
  isGoalDeleteModalOpen: false,
  goalDeleteModalProps: null,
  isGoalEditModalOpen: false,
  goalEditModalProps: null,
  isGoalCreateModalOpen: false,
  isLoading: false,

  setNoteDetailPageOpen: () => {},
  setIsNoteConfirmModalOpen: () => {},
  setIsTodoCreateModalOpen: () => {},
  setIsTodoCreateCheckModalOpen: () => {},
  setNoteLinkModalOpen: () => {},
  setGoalDeleteModalOpen: () => {},
  setGoalEditModalOpen: () => {},
  setIsGoalCreateModalOpen: () => {},
  setIsLoading: () => {}
};

export const createModalStore = (initState: Partial<ModalStore> = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...defaultInitState,
    ...initState,
    setNoteDetailPageOpen: (isOpen, props) =>
      set({ isNoteDetailPageModalOpen: isOpen, noteDetailPageModalProps: props || null }),
    setIsNoteConfirmModalOpen: (isOpen, props) =>
      set({ isNoteConfirmModalOpen: isOpen, noteConfirmModalProps: props || null }),
    setIsTodoCreateModalOpen: (isOpen) => set({ isTodoCreateModalOpen: isOpen }),
    setIsTodoCreateCheckModalOpen: (isOpen) => set({ isTodoCreateCheckModalOpen: isOpen }),
    setNoteLinkModalOpen: (isOpen, props) =>
      set({ isNoteLinkModalOpen: isOpen, noteLinkModalProps: props || null }),
    setGoalDeleteModalOpen: (isOpen, props) =>
      set({ isGoalDeleteModalOpen: isOpen, goalDeleteModalProps: props || null }),
    setGoalEditModalOpen: (isOpen, props) =>
      set({ isGoalEditModalOpen: isOpen, goalEditModalProps: props || null }),
    setIsGoalCreateModalOpen: (isOpen) => set({ isGoalCreateModalOpen: isOpen }),
    setIsLoading: (isLoading) => set({ isLoading })
  }));
};

export type { ModalStore };
