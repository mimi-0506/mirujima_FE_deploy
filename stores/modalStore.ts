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
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  isGoalDeleteModalOpen: boolean;
  isGoalEditModalOpen: boolean;
  goalDeleteModalProps?: DeleteModalProps;
  goalEditModalProps?: EditModalProps;
};

export type ModalActions = {
  setIsTodoCreateModalOpen: (now: boolean) => void;
  setIsTodoCreateCheckModalOpen: (now: boolean) => void;
  setNoteLinkModalOpen: (now: boolean) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setGoalEditModalOpen: (isOpen: boolean, props?: EditModalProps) => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isNoteLinkModalOpen: false,
  isGoalDeleteModalOpen: false,
  isGoalEditModalOpen: false,
  goalDeleteModalProps: undefined,
  goalEditModalProps: undefined
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
    setNoteLinkModalOpen: (now) => {
      set((state) => ({ ...state, isNoteLinkModalOpen: now }));
    },
    setGoalDeleteModalOpen: (isOpen, props) =>
      set((state) => ({ ...state, isGoalDeleteModalOpen: isOpen, goalDeleteModalProps: props })),
    setGoalEditModalOpen: (isOpen, props) =>
      set((state) => ({ ...state, isGoalEditModalOpen: isOpen, goalEditModalProps: props }))
  }));
};
