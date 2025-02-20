import { createStore } from 'zustand/vanilla';

export type ModalState = {
  isConfirmTempModalOpen: boolean;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  isGoalDeleteModalOpen: boolean;
  goalDeleteModalProps?: DeleteModalProps;
  confirmTempNoteModalProps?: ConfirmTempNoteModalProps;
  noteLinkModalProps?: NoteLinkModalProps;
};
export type DeleteModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
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
  setIsConfirmTempModalOpen: (now: boolean, props?: ConfirmTempNoteModalProps) => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  isConfirmTempModalOpen: false,
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isNoteLinkModalOpen: false,
  isGoalDeleteModalOpen: false,
  goalDeleteModalProps: undefined,
  confirmTempNoteModalProps: undefined,
  noteLinkModalProps: undefined
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
    setNoteLinkModalOpen: (now, props) => {
      set((state) => ({ ...state, isNoteLinkModalOpen: now, noteLinkModalProps: props }));
    },
    setGoalDeleteModalOpen: (isOpen, props) =>
      set((state) => ({ ...state, isGoalDeleteModalOpen: isOpen, goalDeleteModalProps: props }))
  }));
};
