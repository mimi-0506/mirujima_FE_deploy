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
  isConfirmTempModalOpen: boolean;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  isGoalDeleteModalOpen: boolean;
  isGoalEditModalOpen: boolean;
  goalDeleteModalProps?: DeleteModalProps;
  goalEditModalProps?: EditModalProps;
  confirmTempNoteModalProps?: ConfirmTempNoteModalProps;
  noteLinkModalProps?: NoteLinkModalProps;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;
};

type ConfirmTempNoteModalProps = {
  tempNoteTitle: string | undefined;
  onCancel: () => void;
  onConfirm: () => void;
};

type NoteLinkModalProps = {
  defaultValue: string | undefined;
  onSubmit: () => void;
  linkInputRef: React.RefObject<HTMLInputElement | null>;
};

export type ModalActions = {
  setIsTodoCreateModalOpen: (now: boolean) => void;
  setIsTodoCreateCheckModalOpen: (now: boolean) => void;
  setNoteLinkModalOpen: (now: boolean, props?: NoteLinkModalProps) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setGoalEditModalOpen: (isOpen: boolean, props?: EditModalProps) => void;
  setIsConfirmTempModalOpen: (now: boolean, props?: ConfirmTempNoteModalProps) => void;
  setIsGoalCreateModalOpen: (now: boolean) => void;
  setIsLoading: (now: boolean) => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  isConfirmTempModalOpen: false,
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isNoteLinkModalOpen: false,
  isGoalDeleteModalOpen: false,

  isGoalEditModalOpen: false,
  goalDeleteModalProps: undefined,
  goalEditModalProps: undefined,
  confirmTempNoteModalProps: undefined,
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
    setIsConfirmTempModalOpen: (now, props) =>
      set((state) => ({ ...state, isConfirmTempModalOpen: now, confirmTempNoteModalProps: props })),

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

    setIsLoading: (now) => set((state) => ({ ...state, isLoading: now }))
  }));
};
