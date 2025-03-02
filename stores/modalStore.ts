import { createStore } from 'zustand/vanilla';

import type { NoteDetailPageModalProps } from '@/app/(workspace)/goals/_components/NoteDetailModal';
import type { NoteConfirmModalProps, NoteLinkModalProps } from '@/types/note.type';

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

export type EditModalProps = {
  onConfirm: (value: string) => void;
  onCancel: () => void;
  initialValue: string;
};

export type DeleteModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export type ModalState = {
  isNoteDetailPageModalOpen: boolean;
  isNoteConfirmModalOpen: boolean;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  isGoalDeleteModalOpen: boolean;
  isGoalEditModalOpen: boolean;
  goalDeleteModalProps?: DeleteModalProps;
  goalEditModalProps?: EditModalProps;
  noteConfirmModalProps?: NoteConfirmModalProps;
  noteLinkModalProps?: NoteLinkModalProps;
  noteDetailPageModalProps?: NoteDetailPageModalProps;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;
};

export type ModalActions = {
  setNoteDetailPageOpen: (now: boolean, props?: NoteDetailPageModalProps) => void;
  setIsTodoCreateModalOpen: (now: boolean) => void;
  setIsTodoCreateCheckModalOpen: (now: boolean) => void;
  setNoteLinkModalOpen: (now: boolean, props?: NoteLinkModalProps) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setGoalEditModalOpen: (isOpen: boolean, props?: EditModalProps) => void;
  setIsNoteConfirmModalOpen: (now: boolean, props?: NoteConfirmModalProps) => void;
  setIsGoalCreateModalOpen: (now: boolean) => void;
  setIsLoading: (now: boolean) => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  isNoteDetailPageModalOpen: false,
  isNoteConfirmModalOpen: false,
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isNoteLinkModalOpen: false,
  isGoalDeleteModalOpen: false,

  isGoalEditModalOpen: false,
  goalDeleteModalProps: undefined,
  goalEditModalProps: undefined,
  noteConfirmModalProps: undefined,
  noteLinkModalProps: undefined,
  isGoalCreateModalOpen: false,
  isLoading: false
};

export const defaultInitState: ModalState = {
  ...initModalState
};
export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setIsNoteConfirmModalOpen: (now, props) =>
      set((state) => ({ ...state, isNoteConfirmModalOpen: now, noteConfirmModalProps: props })),

    setIsTodoCreateModalOpen: (now) => set((state) => ({ ...state, isTodoCreateModalOpen: now })),

    setIsTodoCreateCheckModalOpen: (now) =>
      set((state) => ({ ...state, isTodoCreateCheckModalOpen: now })),

    setNoteLinkModalOpen: (now, props) =>
      set((state) => ({ ...state, isNoteLinkModalOpen: now, noteLinkModalProps: props })),

    setGoalDeleteModalOpen: (isOpen, props) =>
      set((state) => ({ ...state, isGoalDeleteModalOpen: isOpen, goalDeleteModalProps: props })),

    setGoalEditModalOpen: (isOpen, props) =>
      set((state) => ({ ...state, isGoalEditModalOpen: isOpen, goalEditModalProps: props })),

    setIsGoalCreateModalOpen: (now) => set((state) => ({ ...state, isGoalCreateModalOpen: now })),

    setIsLoading: (now) => set((state) => ({ ...state, isLoading: now })),

    setNoteDetailPageOpen: (now, props) =>
      set((state) => ({
        ...state,
        isNoteDetailPageModalOpen: now,
        noteDetailPageModalProps: props
      }))
  }));
};
